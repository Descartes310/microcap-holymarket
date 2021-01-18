import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar/AppBar";
import AppsIcon from '@material-ui/icons/Apps';
import {Switch, Route, Redirect} from "react-router-dom";
import {COMMUNITY_MEMBER} from "Url/frontendUrl";
import InvitationsSidebar from "./InitationsSidebar";
import InvitationsReceived from "./InvitationsReceived";
import InvitationsSend from "./InvitationsSend";
import IntegrationRequest from "./IntegrationRequest";
import InvitationCreate from "./InvitationCreate";
import {withRouter} from 'react-router-dom';

const drawerWidth = 310;

const styles = theme => ({
    root: {
        flexGrow: 1,
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
        width: 230,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
            width: drawerWidth
        },
        backgroundColor: '#fff'
    },
    content: {
        flexGrow: 1
    },
});

class Invitations extends Component {

    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes, theme, match } = this.props;
        const drawer = <InvitationsSidebar />;
        return (
            <div className="chat-wrapper">
                <div className={classes.root}>
                    <Hidden mdUp className="user-list-wrap">
                        <>
                            <div className="rct-tabs">
                                <AppBar className={classes.appBar}>
                                    <Toolbar className="d-flex justify-content-between">
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={this.handleDrawerToggle}
                                            className={classes.navIconHide}>
                                            <AppsIcon />
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>
                            </div>
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
                        </>
                    </Hidden>
                    <Hidden smDown implementation="css" className="user-list-wrap">
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
                    <div className={`chat-content ${classes.content}`}>
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={COMMUNITY_MEMBER.INVITATIONS.LIST.RECEIVED} />
                            <Route path={COMMUNITY_MEMBER.INVITATIONS.LIST.RECEIVED} component={InvitationsReceived} />
                            <Route path={COMMUNITY_MEMBER.INVITATIONS.LIST.REQUEST} component={IntegrationRequest} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(Invitations));
