/**
 * User Block Component
 */
import { logout } from 'Actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { PROFILE } from 'Url/frontendUrl';
import { getFilePath } from "Helpers/helpers";
import { NavLink, withRouter } from 'react-router-dom';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { NotificationManager } from 'react-notifications';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

class UserBlock extends Component {

	state = {
		userDropdownMenu: false,
		isSupportModal: false
	}

	/**
	 * Logout User
	 */
	logoutUser(e) {
		e.preventDefault();
		this.props.logout();
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	render() {
		return (
			<div className="top-sidebar">
				{this.props.authUser != null ?
					<div className="sidebar-user-block">
						<Dropdown
							isOpen={this.state.userDropdownMenu}
							toggle={() => this.toggleUserDropdownMenu()}
							className="rct-dropdown"
						>
							<DropdownToggle
								tag="div"
								className="d-flex align-items-center"
							>
								{!this.props.authUser.active ? (
									<Tooltip id="tooltip-status" title={"Votre compte n'est pas activé"}>
										<div className="user-profile position-relative">
											<img
												src={this.props.authUser.avatar ? getFilePath(this.props.authUser.avatar) : require('Assets/avatars/profile.jpg')}
												alt="user profile"
												className="img-fluid rounded-circle"
												width="50"
												height="100"
											/>
											<div className="user-status-pending">
												<div className={`user-status-pending-circle rct-notify`} />
											</div>
										</div>
									</Tooltip>
								) : (
										<div className="user-profile position-relative">
											<img
												src={this.props.authUser.avatar ? getFilePath(this.props.authUser.avatar) : require('Assets/avatars/profile.jpg')}
												alt="user profile"
												className="img-fluid rounded-circle"
												width="50"
												height="100"
											/>
										</div>
									)}
								<div className="user-info">
									<span className="user-name">
										{this.props.authUser.userName}
									</span>
									<i className="zmdi zmdi-chevron-down dropdown-icon"></i>
								</div>
							</DropdownToggle>
							<DropdownMenu>
								<ul className="list-unstyled mb-0">
									<li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
										<p className="text-white mb-0 fs-14">
											{this.props.authUser.userName}
										</p>
									</li>
									<li className="border-top">
										<NavLink to={PROFILE.USER.PERSONAL} className="nav-link" activeClassName="active">
											<i className="zmdi zmdi-account text-primary mr-3"></i>
											<span>
												Espace personnel
											</span>
										</NavLink>
									</li>

									<li className="border-top">
										<a href="#" onClick={(e) => this.logoutUser(e)}>
											<i className="zmdi zmdi-power text-danger mr-3"></i>
											<span>
												Déconnexion
										</span>
										</a>
									</li>
								</ul>
							</DropdownMenu>
						</Dropdown>
					</div> : null}
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings, authUser }) => {
	return { settings, authUser: authUser.data };
};

export default connect(mapStateToProps, {
	logout
})(withRouter((UserBlock)));
