import {connect} from "react-redux";
import React, {Component} from 'react';
import {getFilePath} from 'Helpers/helpers';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppsIcon from '@material-ui/icons/Apps';
import Toolbar from "@material-ui/core/Toolbar";
import CommunityType from "Enums/CommunityType";
import MatButton from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton";
import {NotificationManager} from "react-notifications";
import {COMMUNITY, joinUrlWithParamsId} from 'Url/frontendUrl';
import GroupsSidebar from "Routes/custom/community/groups/GroupsSidebar";
import InvitationCreateDialog from '../../communityT/members/invitation/InvitationCreateDialog';
import {addGroupToFavourites, getUserCommunities, setCurrentCommunity, setRequestGlobalAction,} from 'Actions';

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
        window.location = joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, this.props.currentCommunity.data.community.id);
    };

    handleFavourite = () => {
        this.props.setRequestGlobalAction(true);
        addGroupToFavourites(this.props.currentCommunity.data.community.id)
            .then(data => {
                if (this.props.currentCommunity.data.favourite)
                    NotificationManager.success("Retiré des favoris");
                else
                    NotificationManager.success("Ajouté aux favoris");
                this.props.getUserCommunities(this.props.authUser.user.id);
                this.props.setCurrentCommunity(this.props.currentCommunity.data.community, !this.props.currentCommunity.data.favourite);
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false);
            })
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
                        {currentCommunity.data ?
                            <div className='d-flex flex-row align-items-center justify-content-center'>
                                <div style={{ flex: 1, paddingLeft: '5%' }}>
                                    <img src={currentCommunity.data.community.image ? getFilePath(currentCommunity.data.community.image) : require('Assets/img/groups.png')} alt="Community image" width="80%" />
                                </div>
                                <div className='d-flex flex-column justify-content-center' style={{ flex: 1 }}>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Nom de la communuaté</h2>
                                        <span>{currentCommunity.data.community.label}</span>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Numéro de référence</h2>
                                        <span>{currentCommunity.data.community.reference}</span>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Type de communauté</h2>
                                        {
                                            currentCommunity.data.community.typeGroup.name === CommunityType.COMMUNAUTE_PROJET ?
                                                <span style={{ backgroundColor: 'rgba(46, 178, 229, 0.8)', padding: 10, marginTop: 20, marginBottom: 20, width: 76, borderRadius: 5, color: 'white', fontSize: '0.8em' }}>
                                                    Communuaté projet
                                                </span>
                                                : null
                                        }
                                        {
                                            currentCommunity.data.community.typeGroup.name === CommunityType.COMMUNAUTE_CONVENTIONNEE ?
                                                <span style={{ backgroundColor: 'rgba(200, 0, 0, 0.5)', padding: 10, marginTop: 20, marginBottom: 20, width: 76, borderRadius: 5, color: 'white', fontSize: '0.8em' }}>
                                                    Communauté conventionnée
                                                </span>
                                                : null
                                        }
                                        {
                                            currentCommunity.data.community.typeGroup.name === CommunityType.COMMUNAUTE_AFFINITE ?
                                                <span style={{ backgroundColor: 'rgba(200, 0, 0, 0.5)', padding: 10, marginTop: 20, marginBottom: 20, width: 76, borderRadius: 5, color: 'white', fontSize: '0.8em' }}>
                                                    Communauté d'affinité
                                                </span>
                                                : null
                                        }
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Nombre de membre</h2>
                                        <span>{currentCommunity.data.members}</span>
                                    </div>
                                </div>
                            </div> : null}
                        {
                            currentCommunity.data ?
                                <div style={{ marginLeft: '10%', marginTop: '5%', marginBottom: '5%' }}>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Description de la communuaté</h2>
                                    </div>

                                    <span>{currentCommunity.data.community.description}</span>
                                </div>
                                : null
                        }
                        {
                            currentCommunity.data ?
                                <div className="text-center" style={{ padding: 10, width: "100%" }}>
                                    <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" onClick={this.handleClickOpenInvation}>Envoyer une invitation</MatButton>
                                    <MatButton variant="contained" className="btn-info ml-10 mb-10 text-white btn-icon" onClick={this.enterInCommunitySpace}>Rejoindre</MatButton>
                                    {
                                        !currentCommunity.data.favourite ?
                                            <MatButton variant="contained" className="btn-success ml-10 mb-10 text-white btn-icon" onClick={this.handleFavourite}>Ajouter aux favoris</MatButton>
                                            :
                                            <MatButton variant="contained" className="btn-danger ml-10 mb-10 text-white btn-icon" onClick={this.handleFavourite}>Retirer des favoris</MatButton>
                                    }
                                    <InvitationCreateDialog open={this.state.open} handleClose={this.handleCloseInvation} />
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

const mapStateToProps = ({ communitySpace, currentCommunity, authUser }) => {
    return {
        communitySpace: communitySpace,
        authUser: authUser.data,
        currentCommunity: currentCommunity
    }
};


export default connect(
    mapStateToProps,
    {setRequestGlobalAction, setCurrentCommunity, getUserCommunities}
)(withStyles(styles, {withTheme: true})(Groups));
