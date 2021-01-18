/**
 * Chat
 */
import { connect } from "react-redux";
import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { statusCommunitySpaceStatus, setCommunitySpaceData } from 'Actions/CommunityAction';
import GroupsSidebar from "Routes/custom/community/groups/GroupsSidebar";
import CommunityItem from "Routes/custom/community/groups/CommunityItem";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import EmailSearch from "Routes/mail/components/EmailSearch";
import AppBar from "@material-ui/core/AppBar/AppBar";
import AppsIcon from '@material-ui/icons/Apps';
import MatButton from '@material-ui/core/Button';
import InvitationCreateDialog from '../../communityT/members/invitation/InvitationCreateDialog';
import { COMMUNITY } from 'Url/frontendUrl';

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

class Groups extends Component {

    state = {
        mobileOpen: false,
        open: false
    };

    constructor(props) {
        super(props);
     }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    enterInCommunitySpace = () => {
        this.props.statusCommunitySpaceStatus(true);
        this.props.setCommunitySpaceData(this.props.currentCommunity.data.id);
        this.props.history.push(COMMUNITY.MEMBERS.LIST);
    }

    join = () => {
        this.props.history.push(COMMUNITY.MEMBERS.LIST);
    }

    handleClickOpenInvation = () => {
        this.setState({ open: true });
    };

    handleCloseInvation = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme, currentCommunity } = this.props;
        const drawer = <GroupsSidebar />;
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
                        <CommunityItem onMenuIconPress={this.handleDrawerToggle} />
                        {
                            currentCommunity.data ?
                                <div className="text-center" style={{ position: "absolute", top: "60%", padding: 10, width: "100%" }}>
                                    <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" onClick={this.handleClickOpenInvation}>Envoyer une invitation</MatButton>
                                    <MatButton variant="contained" className="btn-info ml-10 mb-10 text-white btn-icon" onClick={this.enterInCommunitySpace}>Rejoindre</MatButton>
                                    <InvitationCreateDialog open={this.state.open} handleClose={this.handleCloseInvation}/>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ communitySpace, currentCommunity }) => {
    return {
        communitySpace: communitySpace,
        currentCommunity: currentCommunity
    }
};


export default connect(mapStateToProps, { statusCommunitySpaceStatus, setCommunitySpaceData })
    (withStyles(styles, { withTheme: true })(Groups));
