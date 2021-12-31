/**
 * Sidebar Content
 */
import React from 'react';
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux';
import NavMenuItem from './NavMenuItem';
import { onToggleMenu } from 'Actions';
import { MenuItem } from './NavLinks';
import { Profile, User } from 'Models';

type StoreData = {
	profile: Profile,
	authUser: User
	[key: string]: any
}

const SidebarContent = (_) => {

	const dispatch = useDispatch();
	const { authUser, profile, communitySpace, sidebarMenus}: StoreData = useSelector((state:any) => ({ 
		sidebarMenus: state.sidebar.sidebarMenus, 
		authUser: state.authUser.data, 
		communitySpace: state.communitySpace,
		profile: state.authUser.data?.user?.profile
	}));

	const stateCategory = communitySpace.status ? 'community' : profile?.name.toString().toLowerCase();
	
	const toggleMenu = (menu) => {
		dispatch(onToggleMenu({
			menu,
			stateCategory	
		}));
	}
	

	const checkMenu = (m: MenuItem): boolean => {
		if (profile) {
			/**
			 * permissions are ok if either menu item's permissions is null 
			 * or all permissions in menu item are also in profile permissions
			 */
			if (m.permissions) {
				const matched = m.permissions.filter(mpName => 
					profile.permissions.findIndex(pp => mpName === pp.name) >= 0
				).length;

				return m.permissions_and 
					? matched === m.permissions.length
					: matched > 0;
			}

			/**
			 * profile is ok if either menu item's profiles is null 
			 * or user profile is menu item's profiles
			 */
			if (m.profiles && (m.profiles.findIndex(mpName => mpName === profile.name) === -1)) {
				return false;
			}

			// permissions and menus are ok
			return true;
		} else {
			return !m.profiles && !m.permissions;
		}
	}

	const getValidMenus = (list: MenuItem[]): MenuItem[] => {
		const valid = [];
		list.forEach(m => {
			if (m.child_routes && m.child_routes.length) {
				const menu: MenuItem = {
					...m, 
					child_routes: getValidMenus(m.child_routes)
				};
				if (menu.child_routes.length) {
					valid.push(menu);
				}
			} else if (checkMenu(m)) {
				valid.push(m);
			} 
		});
		return valid;
	}

	const menus = getValidMenus(sidebarMenus);

	return (
		<div className="rct-sidebar-nav">
			<nav className="navigation">
				<List className="rct-mainMenu p-0 m-0 list-unstyled">
					{authUser && menus.map((menu, key) => {
						// if (authUser.hasPermissions(menu.permissions.map(i => i.name))) {
							return (
								<NavMenuItem
									key={key}
									menu={menu}
									authUser={authUser}
									onToggleMenu={() => toggleMenu(menu)}
								/>
							);
						// }
						return null;
					})}
				</List>
			</nav>
		</div>
	);
	
}

// OLD COMPONENT
const SidebarContent2 = (_) => {

	const dispatch = useDispatch();
	const { 
		authUser, profile, sidebarMenus, communitySpace
	 } = useSelector((state:any) => ({ 
		sidebarMenus: state.sidebar.sidebarMenus, 
		authUser: state.authUser.data, 
		communitySpace: state.communitySpace,
		profile: state.authUser.data?.user?.profile
	}));

	const stateCategory = communitySpace.status ? 'community' : profile?.name.toString().toLowerCase();

	const toggleMenu = (menu) => {
		dispatch(onToggleMenu({
			menu,
			stateCategory
		}));
	}
	

	return (
		<div className="rct-sidebar-nav">
				<nav className="navigation">
				<List className="rct-mainMenu p-0 m-0 list-unstyled">
					{authUser && sidebarMenus[stateCategory].map((menu, key) => {
						// if (authUser.hasPermissions(menu.permissions.map(i => i.name))) {
							return (
								<NavMenuItem
									key={key}
									menu={menu}
									authUser={authUser}
									onToggleMenu={() => toggleMenu(menu)}
								/>
							);
						// }
						return null;
					})}
				</List>
			</nav>
		</div>
	);
	
}
 
export default SidebarContent;
