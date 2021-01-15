/**
 * Mail App
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'reactstrap';
import Hidden from '@material-ui/core/Hidden';
import AppsIcon from '@material-ui/icons/Apps';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { Helmet } from "react-helmet";
// actions
import {getEmails, setNetworkProfileConfigurationState, setRequestGlobalAction} from 'Actions';

// components
import NetworkPrimary from './NetworkPrimary';
import NetworkProfile from './NetworkProfile';
import NetworkProfileType from './NetworkProfileType';
import AssistantConfiguration from './AssistantConfiguration';
import NetworkSidebar from './NetworkSidebar';
import NetworkBranchIntlMessages from "Components/NetworkBranchIntlMessages";
import {NETWORK} from "Url/frontendUrl";
import BoundaryComponent from "Routes/custom/branch/show/Configuration/BoundaryComponent";
import {NotificationManager} from "react-notifications";
import BranchImage from "Components/BranchImage";
import {injectIntl} from "react-intl";

const drawerWidth = 280;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: theme.direction !== 'rtl' ? drawerWidth : 0,
        marginRight: theme.direction === 'rtl' ? drawerWidth : 0,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        }
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
        backgroundColor: 'transparent',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
});

class Configuration extends React.Component {

    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    componentDidMount() {
        this.props.getEmails();
        const { match } = this.props;
    }

    onStartNetworkConfClick = () => {
        this.props.setRequestGlobalAction(true);
        setNetworkProfileConfigurationState(true, this.props.authUser.user.branch.id)
            .then(() => {
                NotificationManager.success(this.props.intl.formatMessage({id: 'branch.configuration.open.successText'}));
                window.location.reload();
            })
            .catch((error) => {
                // console.log("error => ", JSON.stringify(error));
                NotificationManager.error(error.message);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onCloseNetworkClick = () => {
        this.props.setRequestGlobalAction(true);
        setNetworkProfileConfigurationState(false, this.props.authUser.user.branch.id)
            .then(() => {
                NotificationManager.success(this.props.intl.formatMessage({id: 'branch.configuration.close.successText'}));
                window.location.reload();
            })
            .catch((error) => {
                // console.log("error => ", JSON.stringify(error));
                NotificationManager.error(error.message);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    render() {
        const { classes, theme, match, sendingEmail, authUser } = this.props;
        const drawer = (
            <div className="mail-sidebar-wrap bg-white">
                <div className="user-wrap d-flex justify-content-between">
                    <div className="media align-items-center">
                        <BranchImage
                            logo={authUser.user.branch.logo}
                            width="60"
                            height="60"
                            className="img-fluid rounded-circle mr-3"
                            small
                        />
                        <div className="media-body">
                            <h5 className="text-white mb-0">
                                {authUser.user.branch.name}
                            </h5>
                            {/*<p className="text-white font-xs mb-0">braxton@example.com</p>*/}
                        </div>
                    </div>
                </div>
                <div className="p-20">
                    <Button
                        // component={NavLink}
                        variant="contained"
                        disabled={this.props.loading}
                        onClick={this.onCloseNetworkClick}
                        className="bbbb btn-danger text-white btn-block font-weight-bold"
                    >
                        <i className="zmdi zmdi-lock mr-10 font-lg"></i>
                        <NetworkBranchIntlMessages id="branch.sealNetwork"/>
                    </Button>
                </div>
                <div className="p-20">
                    Réseau
                </div>
                <NetworkSidebar />
            </div>
        );

        return (
            <>
                {authUser.hasNetworkProfileConfigurationStarted() ? (
                    <BoundaryComponent
                        btnText={this.props.intl.formatMessage({id: 'button.start'})}
                        loading={this.props.loading}
                        onButtonClick={this.onStartNetworkConfClick}
                        text={this.props.intl.formatMessage({id: 'branch.configuration.open.text'}, {name: authUser.user.branch.name})}
                    />
                ) : authUser.isNetworkProfileConfigurationFinished() ? (
                    <BoundaryComponent
                        byType={"danger"}
                        onButtonClick={this.onStartNetworkConfClick}
                        btnText={this.props.intl.formatMessage({id: 'button.reset'})}
                        text={this.props.intl.formatMessage({id: 'branch.configuration.close.text'}, {name: authUser.user.branch.name})}
                    />
                ) : (
                    <div className="rct-mail-wrapper">
                        <div className={classes.root}>
                            <AppBar className={classes.appBar}>
                                <Toolbar className="d-flex justify-content-between">
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={this.handleDrawerToggle}
                                        className={classes.navIconHide}>
                                        <AppsIcon />
                                    </IconButton>
                                    {/*<EmailSearch />*/}
                                    {window.location.pathname === NETWORK.CONFIGURATION.NETWORK_PROFILE.LIST && (
                                        <div className="d-flex align-items-center w-100">
                                            <div className="align-items-center justify-content-between px-2 row w-100">
                                                <h3 className="mb-0"><IntlMessages id="branch.profile"/></h3>
                                                <Button
                                                    color="primary"
                                                    className="mb-10 text-white"
                                                    onClick={() => this.props.history.push(NETWORK.CONFIGURATION.NETWORK_PROFILE.CREATE)}
                                                >
                                                    <IntlMessages id="button.add" />
                                                    <i className="zmdi zmdi zmdi-plus ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {window.location.pathname === NETWORK.CONFIGURATION.NETWORK_PROFILE_TYPE.LIST && (
                                        <div className="d-flex align-items-center w-100">
                                            <div className="align-items-center justify-content-between px-2 row w-100">
                                                <h3 className="mb-0">
                                                    Struture du réseau
                                                </h3>
                                                <Button
                                                    color="primary"
                                                    className="mb-10 text-white"
                                                    onClick={() => this.props.history.push(NETWORK.CONFIGURATION.NETWORK_PROFILE_TYPE.CREATE)}
                                                >
                                                    <IntlMessages id="button.add" />
                                                    <i className="zmdi zmdi zmdi-plus ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {window.location.pathname === NETWORK.CONFIGURATION.ASSISTANT_CONFIGURATION.LIST && (
                                        <div className="d-flex align-items-center w-100">
                                            <div className="align-items-center justify-content-between px-2 row w-100">
                                                <h3 className="mb-0"><IntlMessages id="branch.assistantConfiguration"/></h3>
                                                <Button
                                                    color="primary"
                                                    className="mb-10 text-white"
                                                    onClick={() => this.props.history.push(NETWORK.CONFIGURATION.ASSISTANT_CONFIGURATION.CREATE)}
                                                >
                                                    <IntlMessages id="button.add" />
                                                    <i className="zmdi zmdi zmdi-plus ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {window.location.pathname === NETWORK.CONFIGURATION.NETWORK_PROFILE.CREATE && (
                                        <div className="d-flex align-items-center w-100">
                                            <div className="align-items-center justify-content-between px-2 row w-100">
                                                <h3 className="mb-0"><IntlMessages id="branch.createNewNetworkProfile"/></h3>
                                            </div>
                                        </div>
                                    )}

                                    {window.location.pathname === NETWORK.CONFIGURATION.NETWORK_PRIMARY.SELF && (
                                        <div className="d-flex align-items-center w-100">
                                            <div className="align-items-center justify-content-between px-2 row w-100">
                                                <h3 className="mb-0"><IntlMessages id="branch.primary"/></h3>
                                            </div>
                                        </div>
                                    )}
                                </Toolbar>
                            </AppBar>
                            <Hidden mdUp className="mail-list-wrap">
                                <Drawer
                                    variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                    open={this.state.mobileOpen}
                                    onClose={this.handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true,
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>
                            <Hidden smDown implementation="css" className="mail-list-wrap">
                                <Drawer
                                    variant="permanent"
                                    open
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>
                            <div className={`bg-transparent ${classes.content}`}>
                                <div className={classes.toolbar} />
                                {/*<RctCollapsibleCard>*/}
                                {/*<div className="center-holder">*/}
                                    <Switch>
                                        <Redirect exact from={`${match.url}/`} to={NETWORK.CONFIGURATION.NETWORK_PROFILE.SELF} />
                                        <Route path={NETWORK.CONFIGURATION.NETWORK_PROFILE.SELF} component={NetworkProfile} />
                                        <Route path={NETWORK.CONFIGURATION.NETWORK_PROFILE_TYPE.SELF} component={NetworkProfileType} />
                                        <Route path={NETWORK.CONFIGURATION.NETWORK_PRIMARY.SELF} component={NetworkPrimary} />
                                        <Route path={NETWORK.CONFIGURATION.ASSISTANT_CONFIGURATION.SELF} component={AssistantConfiguration} />
                                        {/*<Route path={`${match.url}/compose`} component={ComposeEmail} />*/}
                                    </Switch>
                                {/*</div>*/}
                                {/*</RctCollapsibleCard>*/}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ emailApp, authUser, requestGlobalLoader }) => {
    const { currentEmail, sendingEmail } = emailApp;
    return { currentEmail, sendingEmail, authUser: authUser.data, loading: requestGlobalLoader };
};

export default connect(mapStateToProps, {
    getEmails,
    setRequestGlobalAction
})(withStyles(styles, { withTheme: true })(injectIntl(Configuration)));
