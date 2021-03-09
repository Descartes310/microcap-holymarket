/**
 * Mail App
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { Helmet } from "react-helmet";
// actions
import { getEmails } from 'Actions';

// components
import Configuration from './Configuration';
import NetworkSidebar from './Configuration/NetworkSidebar';

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

class BranchShow extends React.Component {

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

    render() {
        const { classes, theme, match, sendingEmail } = this.props;
        const drawer = (
            <div className="mail-sidebar-wrap">
                <div className="user-wrap d-flex justify-content-between">
                    <div className="media align-items-center">
                        <img
                            src={require('Assets/avatars/profilejpg')}
                            alt="user-profile"
                            className="img-fluid rounded-circle mr-3"
                            width="60"
                            height="60"
                        />
                        <div className="media-body">
                            <h5 className="text-white mb-0">Braxton Hudson</h5>
                            <p className="text-white font-xs mb-0">braxton@example.com</p>
                        </div>
                    </div>
                </div>
                <div className="p-20">
                </div>
                <NetworkSidebar />
            </div>
        );
        return (
            <div className="rct-mail-wrapper">
                <div className={classes.root}>
                    <AppBar className={classes.appBar}>
                        <Toolbar className="d-flex justify-content-between">
                            {/*<IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}>
                                <MenuIcon />
                            </IconButton>*/}
                            <EmailSearch />
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
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={`${match.url}/network-profile`} />
                            <Route path={`${match.url}/network-profile`} component={Configuration} />
                            {/*<Route path={`${match.url}/compose`} component={ComposeEmail} />*/}
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ emailApp }) => {
    const { currentEmail, sendingEmail } = emailApp;
    return { currentEmail, sendingEmail };
};

export default connect(mapStateToProps, {
    getEmails
})(withStyles(styles, { withTheme: true })(BranchShow));
