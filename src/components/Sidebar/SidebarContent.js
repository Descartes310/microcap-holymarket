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
		const { sidebarMenus, authUser } = this.props.sidebar;
		return (
			<div className="rct-sidebar-nav">
					<nav className="navigation">
					<List
						className="rct-mainMenu p-0 m-0 list-unstyled"
					>
						{sidebarMenus.main.map((menu, key) => {
							// if (menu.permissions.includes(authUser.profile.permissions)) {
							if (true) {
								return (
									<Can I={menu.permissions} on={menu.subject} key={key}>
										<NavMenuItem
											menu={menu}
											onToggleMenu={() => this.toggleMenu(menu, 'main')}
										/>
									</Can>
								)
							}

							return null
						})}
					</List>
				</nav>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ sidebar, settings, authUser }) => {
	return { sidebar, settings, authUser: authUser.data };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
