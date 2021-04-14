/**
 * Chat Area Component
 */
import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

// actions
import { sendMessageToUser } from 'Actions';

// app layouts
import { getAppLayout } from 'Helpers/helpers';
import {getMembersOfOneGroup} from "Actions";
import {NotificationManager} from "react-notifications";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import UserAvatar from "Components/UserAvatar";
import { getFilePath } from "Helpers/helpers";

class CommunityItem extends Component {
    state = {
        message: '',
        anchorEl: null,
        chatOptions: [
            'Infos de la communauté',
            'Signaler la communauté',
            'Quitter la communauté'
        ]
    };

    componentDidMount() {
        // this.props.getMembersOfOneGroup(this.props.currentCommunity);
    }


    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    chatOptionsHandler = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    onSubmitMessage(event) {
        event.preventDefault();
        if (this.state.message !== '') {
            let data = {
                user: this.props.selectedUser,
                message: this.state.message,
                isAdmin: true,
                time: 'Just Now'
            };
            this.props.sendMessageToUser(data);
            this.setState({ message: '' });
            setTimeout(() => {
                this.refs.chatScroll.scrollToBottom();
            }, 200);
        }
    }

    render() {
        const { currentCommunity, admin_photo_url } = this.props;
        const { chatOptions, anchorEl } = this.state;

        if (!currentCommunity.loading && currentCommunity.data === null) {
            return (
                <div className="chat-box-main">
                    <div className="text-center">
                        <i className="zmdi zmdi-comments font-3x mb-2"></i>
                    </div>
                </div>
            );
        }

        if (currentCommunity.loading) {
            return (<RctSectionLoader/>)
        }

        return (
            <div className="chat-main-body">
                <div className="chat-head">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="media align-items-center">
                            <IconButton
                                className="mr-3 chat-sidebar-toggler d-none"
                                color="inherit"
                                aria-label="open drawer"
                                // onClick={this.props.onMenuIconPress}
                            >
                                <MenuIcon />
                            </IconButton>
                            <div className="mr-10">
                                <UserAvatar
                                    name={currentCommunity.data.community.label}
                                    avatar={currentCommunity.data.community.avatar ? getFilePath(currentCommunity.data.community.avatar) : require('Assets/img/groups.png')}
                                />
                            </div>
                            <div className="media-body mt-1">
                                <h5 className="mb-0">{currentCommunity.data.community.label}</h5>
                                <span className="font-xs text-muted">{currentCommunity.data.community.description}</span>
                            </div>
                        </div>
                        <div>
                            <IconButton
                                aria-owns={anchorEl ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.chatOptionsHandler}
                            >
                                <i className="zmdi zmdi-more-vert"/>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                {chatOptions.map((option, key) => (
                                    <MenuItem key={key} onClick={this.handleClose}>{option}</MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className="chat-box-main">
                    <div className="text-center">
                        <h3>Cliquez sur le boutton rejoindre pour acceder à l'espace de cette communauté</h3>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ currentCommunity }) => {
    return {currentCommunity};
};

export default withRouter(connect(mapStateToProps, {
    getMembersOfOneGroup
})(CommunityItem));
