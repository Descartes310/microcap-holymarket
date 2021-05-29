import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';

// components
import {connect} from "react-redux";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import {withRouter} from "react-router-dom";
import {Badge, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {Scrollbars} from "react-custom-scrollbars";
import List from "@material-ui/core/List";
import GroupItem from "Routes/custom/community/groups/GroupItem";
import {getUserCommunities} from "Actions";
import Button from "@material-ui/core/Button";
import IntlMessages from "Util/IntlMessages";
import FormControl from "@material-ui/core/FormControl";
import UserProfileCreate from "Routes/custom/users/user-profile/Create";
import CommunityCreate from "Routes/custom/community/groups/CommunityCreate";
import classnames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import {COMMUNITY_ADMIN} from "Url/frontendUrl";
import InvitationType from "Enums/InvitationType";
import InvitationCreateDialog from './InvitationCreateDialog'

class InvitationsSidebar extends Component {

    state = {
        open: false,
     };
  
     handleClickOpenInvation = () => {
        this.setState({ open: true });
     };
  
     handleCloseInvation = () => {
        this.setState({ open: false });
     };

    componentDidMount() {
        // this.props.getUserCommunities();
    }

    render() {
        const { userCommunities, history, comInvitationsPending } = this.props;

        const nbInvReceived = comInvitationsPending ? comInvitationsPending.filter(i => i.type === InvitationType.INVITATION).length : 0;
        const nbInvRequest = comInvitationsPending ? comInvitationsPending.filter(i => i.type === InvitationType.REQUEST).length : 0;
        const nbInvSend = comInvitationsPending ? comInvitationsPending.filter(i => i.type === InvitationType.INVITATION_SEND).length : 0;

        return (
            <>
                <div className="chat-sidebar">
                    <div>
                        <div className="justify-content-between align-items-center mt-2 mb-30 px-15 row">
                        </div>
                        <div className="chat-list">
                            <Scrollbars
                                autoHide
                                className="rct-scroll"
                                style={{ height: "calc(100vh - 188px)" }}
                            >
                                <>
                                    <List className="p-0 mb-0 filters list-unstyled">
                                        <ListItem
                                            button
                                            onClick={() => this.props.history.push(COMMUNITY_ADMIN.INVITATIONS.LIST.RECEIVED)}
                                            // className={classnames({ 'item-active': selectedFolder === folder.id })}
                                        >
                                            <i className={`mr-20 zmdi zmdi-inbox`} />
                                            <span className="filter-title">
                                                Demande d'adhésions
                                                {comInvitationsPending  && nbInvReceived > 0 && (<Badge className="ml-2" color="primary" pill>
                                                    {comInvitationsPending.filter(i => i.type === InvitationType.REQUEST).length}
                                                </Badge>)}
                                            </span>
                                        </ListItem>
                                        <ListItem
                                            button
                                            onClick={() => this.props.history.push(COMMUNITY_ADMIN.INVITATIONS.LIST.SEND)}
                                            // className={classnames({ 'item-active': selectedFolder === folder.id })}
                                        >
                                            <i className={`mr-20 zmdi zmdi-mail-send`} />
                                            <span className="filter-title">
                                                Invitations Envoyés
                                                {comInvitationsPending && nbInvSend > 0 && (<Badge className="ml-2" color="primary" pill>
                                                    {comInvitationsPending.filter(i => i.type === InvitationType.INVITATION_SEND).length}
                                                </Badge>)}
                                            </span>
                                        </ListItem>
                                    </List>
                                </>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, userCommunities, comInvitationsPending }) => {
    return { requestGlobalLoader, authUser: authUser.data, userCommunities: userCommunities.data, comInvitationsPending: comInvitationsPending.data }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(InvitationsSidebar));

