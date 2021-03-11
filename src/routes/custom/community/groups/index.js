/**
 * Chat
 */
import { connect } from "react-redux";
import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { statusCommunitySpaceStatus, setCommunitySpaceData, setCommunitySpaceAdmins } from 'Actions/CommunityAction';
import GroupsSidebar from "Routes/custom/community/groups/GroupsSidebar";
import CommunityItem from "Routes/custom/community/groups/CommunityItem";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import EmailSearch from "Routes/mail/components/EmailSearch";
import AppBar from "@material-ui/core/AppBar/AppBar";
import AppsIcon from '@material-ui/icons/Apps';
import MatButton from '@material-ui/core/Button';
import { getCommunityAdmins, getUserCommunities } from 'Actions'
import InvitationCreateDialog from '../../communityT/members/invitation/InvitationCreateDialog';
import { COMMUNITY } from 'Url/frontendUrl';
import GroupItem2 from "./GroupItem2";
import CustomList from "Components/CustomList";

const drawerWidth = 310;

const styles = theme => ({

});

class Groups extends Component {

    state = {
        mobileOpen: false,
        open: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserCommunities(this.props.authUser.user.id);
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    enterInCommunitySpace = (id) => {
        getCommunityAdmins(id).then(data => {
            this.props.statusCommunitySpaceStatus(true);
            this.props.setCommunitySpaceAdmins(data);
            this.props.setCommunitySpaceData(id);
            this.props.history.push(COMMUNITY.MEMBERS.LIST);
        })
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
        const { classes, userCommunities, loading } = this.props;
        return (
            <div className="chat-wrapper">
                {/* <div> */}
                <CustomList
                    loading={loading}
                    list={userCommunities}
                    itemsFoundText={n => `${n} Groupe(s) trouvé(s)`}
                    renderItem={list => (
                        <>
                            {!list || (list && list.length === 0) ? (
                                <div className="no-found-user-wrap d-flex justify-content-center align-items-center py-50">
                                    <h4> Aucune communauté trouvée</h4>
                                </div>
                            ) : (
                                    <div className="row" style={{ paddingBottom: 50 }}>
                                        {list.map((community, key) => (
                                            <div className="col-sm-6 col-md-4 col-lg-3" key={key}>
                                                <GroupItem2 group={community} isMember={true} enterInCommunitySpace={this.enterInCommunitySpace} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </>
                    )}
                />
                {/* </div> */}
            </div>
        );
    }
}

const mapStateToProps = ({ authUser, communitySpace, currentCommunity, userCommunities }) => {
    return {
        communitySpace: communitySpace,
        currentCommunity: currentCommunity,
        userCommunities: userCommunities.data,
        loading: userCommunities.loading,
        error: userCommunities.error,
        authUser: authUser.data
    }
};


export default connect(mapStateToProps, { statusCommunitySpaceStatus, setCommunitySpaceData, getUserCommunities, setCommunitySpaceAdmins })
    (withStyles(styles, { withTheme: true })(Groups));
