/**
 * App Routes
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import { Scrollbars } from 'react-custom-scrollbars';
import classnames from 'classnames';

// Components
import Header from 'Components/Header/Header';
import SidebarContent from 'Components/Sidebar';
import Footer from 'Components/Footer/Footer';

// preload Components
import PreloadHeader from 'Components/PreloadLayout/PreloadHeader';
import PreloadSidebar from 'Components/PreloadLayout/PreloadSidebar';


// app config
import AppConfig from 'Constants/AppConfig';

// actions
import { collapsedSidebarAction, startUserTour } from 'Actions';
import { MenuItem } from 'Components/Sidebar/NavLinks';
import { isMenuAllowed } from 'Helpers/helpers';
import { User } from 'Models';

type Props = {
	startUserTour: Function
	collapsedSidebarAction: Function
	location: any
	settings: any
	sidebarMenus: MenuItem[]
	user: User
}

class MainApp extends Component<Props> {

	state: any = {
		loadingHeader: true,
		loadingSidebar: true
	}

	UNSAFE_componentWillMount() {
		this.updateDimensions();
	}

	componentDidMount() {
		const { windowWidth } = this.state;
		window.addEventListener("resize", this.updateDimensions);
		if (AppConfig.enableUserTour && windowWidth > 600) {
			setTimeout(() => {
				this.props.startUserTour();
			}, 2000);
		}
		setTimeout(() => {
			this.setState({ loadingHeader: false, loadingSidebar: false });
		}, 114);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { windowWidth } = this.state;
		if (nextProps.location !== this.props.location) {
			if (windowWidth <= 1199) {
				this.props.collapsedSidebarAction(false);
			}
		}
	}

	updateDimensions = () => {
		this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}

	findCurrentMenu(menus: MenuItem[]): MenuItem | null {
		const { pathname } = this.props.location;
		const segments: string[] = pathname.split('/');

		for (let i = 0; i < menus.length; i++) {
			const m = menus[i];
			if (m.child_routes && m.child_routes.length) {
				const menu = this.findCurrentMenu(m.child_routes);
				if (menu) {
					return menu;
				}
			}

			const paths = m.path ? m.path.split('/') : [];
			if (segments.length === paths.length) {
				let found = true;
				for (let j = 0; j < segments.length; j++) {
					if (segments[j] !== paths[j] && !segments[j].startsWith(':')) {
						found = false;
					}
				}

				if (found) {
					return m;
				}
			}
		}

		return null;
	}

	isUserAllowed = (): boolean => {
		const menu = this.findCurrentMenu(this.props.sidebarMenus);
		if(menu) {
			console.log("1 => ", this.props.user, menu) 
			console.log("2 => ", isMenuAllowed(this.props.user, menu))
		}
		return menu ? isMenuAllowed(this.props.user, menu) : true;
	}

	render403Page = () => {
		return (
			<div className="rct-page-content p-20 m-20">
				<h1 className="text-center mt-20">Vous n'êtes pas autorisé à voir cette page</h1>
			</div>
		);
	}

	renderPage() {
		const { children } = this.props;
		return (
			<Scrollbars
				className="rct-scroll"
				// autoHide
				// autoHideDuration={100}
				style={this.getScrollBarStyle()}
			>
				<div className="rct-page-content">
					{children}
					<Footer />
				</div>
			</Scrollbars>
		);
	}

	// render header
	renderHeader() {
		const { loadingHeader } = this.state;
		if (loadingHeader) {
			return <PreloadHeader />;
		}
		return <Header />
	}

	//render Sidebar
	renderSidebar() {
		const { loadingSidebar } = this.state;
		if (loadingSidebar) {
			return <PreloadSidebar />;
		}
		return <SidebarContent />
	}

	//Scrollbar height
	getScrollBarStyle() {
		return {
			height: 'calc(100vh - 50px)'
		}
	}

	render() {
		const { navCollapsed, rtlLayout, miniSidebar } = this.props.settings;
		const { windowWidth } = this.state;
		return (
			<div className="app">
				<div className="app-main-container">
					<Sidebar
						sidebar={this.renderSidebar()}
						open={windowWidth <= 1199 ? navCollapsed : false}
						docked={windowWidth > 1199 ? !navCollapsed : false}
						pullRight={rtlLayout}
						onSetOpen={() => this.props.collapsedSidebarAction(false)}
						styles={{ content: { overflowY: '' } }}
						contentClassName={classnames({ 'app-conrainer-wrapper': miniSidebar })}
					>
						<div className="app-container">
							<div className="rct-app-content">
								<div className="app-header">
									{this.renderHeader()}
								</div>
								<div className="rct-page">
									{this.isUserAllowed() ? this.renderPage() : this.render403Page()}
								</div>
							</div>
						</div>
					</Sidebar>
				</div>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings, sidebar, authUser }) => {
	return { 
		settings, 
		sidebarMenus: sidebar.sidebarMenus, 
		user: authUser.data 
	};
}

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction,
	startUserTour
})(MainApp));
