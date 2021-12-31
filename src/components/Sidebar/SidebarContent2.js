/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import { onToggleMenu } from 'Actions';
import Can from "Permissions/Can";

class SidebarContent extends Component {
	toggleMenu(menu, stateCategory) {
		let data = {
			menu,
			stateCategory
		}
		this.props.onToggleMenu(data);
	}

	render() {
		const { sidebarMenus,  } = this.props.sidebar;
		const { authUser } = this.props;
		const menuType = authUser?.user.profile.name.toString().toLowerCase();
		return (
			<div className="rct-sidebar-nav">
					<nav className="navigation">
					<List className="rct-mainMenu p-0 m-0 list-unstyled">
						{authUser && sidebarMenus[this.props.communitySpace.status ? 'community' : menuType].map((menu, key) => {
							// if (authUser.hasPermissions(menu.permissions.map(i => i.name))) {
								return (
									<NavMenuItem
										key={key}
										menu={menu}
										authUser={authUser}
										onToggleMenu={() => this.toggleMenu(menu, this.props.communitySpace.status ? 'community' : menuType)}
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
}

// map state to props
const mapStateToProps = ({ sidebar, settings, authUser, communitySpace }) => {
	return { sidebar, settings, authUser: authUser.data, communitySpace };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
