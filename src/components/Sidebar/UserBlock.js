/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

// components
import SupportPage from '../Support/Support';

// redux action
import { logout } from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Status from "Enums/Status";
import FieldsetComponent from "Components/FieldsetComponent";

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
							{this.props.authUser.user.status === Status.PENDING ? (
								<Tooltip id="tooltip-status" title={"Votre compte n'est pas activé"}>
									<div className="user-profile position-relative">
										<img
											src={require('Assets/avatars/user-15.jpg')}
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
										src={require('Assets/avatars/user-15.jpg')}
										alt="user profile"
										className="img-fluid rounded-circle"
										width="50"
										height="100"
									/>
								</div>
							)}
							<div className="user-info">
								<span className="user-name ml-4">
									{this.props.authUser.userName}
								</span>
								<i className="zmdi zmdi-chevron-down dropdown-icon ml-2"></i>
							</div>
						</DropdownToggle>
						<DropdownMenu>
							<ul className="list-unstyled mb-0">
								<li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
									<p className="text-white mb-0 fs-14">
										{this.props.authUser.userName}
									</p>
									<span className="text-white fs-14">
										{this.props.authUser.user.login}
									</span>
								</li>
								<li className="mt-3">
									<FieldsetComponent title={"Réference"} titleClass={"text-dark"}>
										<p className="text-dark fw-bold mb-0">{this.props.authUser.user.reference}</p>
									</FieldsetComponent>
								</li>
								<li className="border-top">
									<a href="#" onClick={(e) => this.logoutUser(e)}>
										<i className="zmdi zmdi-power text-danger mr-3"></i>
										<span>
											Deconnexion
										</span>
									</a>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
				</div>
				<SupportPage
					isOpen={this.state.isSupportModal}
					onCloseSupportPage={() => this.onCloseSupportPage()}
					onSubmit={() => this.onSubmitSupport()}
				/>
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
})(UserBlock);
