/**
 * App Header
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';

// actions
import { collapsedSidebarAction, darkModeAction } from 'Actions';

// helpers
import { getAppLayout } from "Helpers/helpers";

// components
import Notifications from './Notifications';
import DashboardOverlay from '../DashboardOverlay/DashboardOverlay';
import Cart from './Cart';
import { DISCOVER } from "Url/frontendUrl";

class Header extends Component {

	constructor(props) {
		super(props);
	}


	state = {
		customizer: false,
		isMobileSearchFormVisible: false
	}

	// function to change the state of collapsed sidebar
	onToggleNavCollapsed = (event) => {
		const val = !this.props.navCollapsed;
		this.props.collapsedSidebarAction(val);
	}

	// open dashboard overlay
	openDashboardOverlay(e) {
		var el = document.getElementsByClassName('dashboard-overlay')[0];
		el.classList.toggle("d-none");
		el.classList.toggle("show");
		if (el.classList.contains('show')) {
			document.body.style.overflow = "hidden";
		}
		else {
			document.body.style.overflow = "";
		}
		e.preventDefault();
	}

	// close dashboard overlay
	closeDashboardOverlay() {
		var e = document.getElementsByClassName('dashboard-overlay')[0];
		e.classList.remove('show');
		e.classList.add('d-none');
		document.body.style.overflow = "";
	}

	// mobile search form
	openMobileSearchForm() {
		this.setState({ isMobileSearchFormVisible: true });
	}

	/**
	 * Dark Mode Event Hanlder
	 * Use To Enable Dark Mode
	 * @param {*object} event
	 */
	darkModeHandler(isTrue) {
		if (isTrue) {
			document.body.classList.add("dark-mode");
		}
		else {
			document.body.classList.remove("dark-mode");
		}
		this.props.darkModeAction(isTrue);
	}

	render() {
		const { settings, authUser } = this.props;
		return (
			<AppBar position="static" className="rct-header">
				<Toolbar className="d-flex justify-content-between w-100 pl-0">
					<div className="d-inline-flex align-items-center">
						{(settings.horizontalMenu || settings.agencyMenu) &&
							<div className="site-logo">
								<Link to="/" className="logo-mini">
									<img src={require('Assets/identity/logomicrocap.png')} className="mr-15" alt="site logo" width="35" height="35" />
								</Link>
								{/*<Link to="/" className="logo-normal">
									<img src={require('Assets/img/appLogoText.png')} className="img-fluid" alt="site-logo" width="67" height="17" />
								</Link>*/}
							</div>
						}
						{!settings.agencyMenu &&
							<ul className="list-inline mb-0 navbar-left">
								{!settings.horizontalMenu ?
									<li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
										<Tooltip title="Sidebar Toggle" placement="bottom">
											<IconButton color="inherit" mini="true" aria-label="Menu" className="humburger p-0">
												<MenuIcon />
											</IconButton>
										</Tooltip>
									</li> :
									<li className="list-inline-item">
										<Tooltip title="Sidebar Toggle" placement="bottom">
											<IconButton color="inherit" aria-label="Menu" className="humburger p-0" component={Link} to="/">
												<i className="ti-layout-sidebar-left"></i>
											</IconButton>
										</Tooltip>
									</li>
								}
							</ul>
						}
						<Link to={DISCOVER} className="color-gray-muted text-decoration-underline-hover fw-500 px-3">
							Découvir Microcap
						</Link>
					</div>
					<ul className="navbar-right list-inline mb-0">
						{authUser && (
							<>
								<Notifications />
								<Cart />
							</>
						)}
					</ul>
				</Toolbar>
				<DashboardOverlay
					onClose={() => this.closeDashboardOverlay()}
				/>
			</AppBar>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings, authUser }) => {
	return { settings, authUser: authUser.data };
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction,
	darkModeAction
})(Header));
