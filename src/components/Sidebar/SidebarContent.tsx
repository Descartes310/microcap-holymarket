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
import { isMenuAllowed } from 'Helpers/helpers';

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
			} else if (isMenuAllowed(authUser, m)) {
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
 
export default SidebarContent;
