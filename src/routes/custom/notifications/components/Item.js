import React, {Component} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from "@material-ui/core/ListItem";
import NotificationType from "Enums/NotificationType";
import NotificationService from "Services/notifications";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Item extends Component {

    state = {
        open: false
    }

    markAsRead = () => {
        this.props.setRequestGlobalAction(true);
        NotificationService.markNotificationAsRead(this.props.notification.id).finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.reloadNotifications();
        });
    };

    render() {
        const { notification, onActivationClick, authUser, onFundingActivationClick, onCodevInvitationClick } = this.props;
        return (
            <ListItem className="row px-20 py-3 align-items-center">
                <div className="col-md-9">
                    <div className="d-flex align-items-start">
                        <div className="avatar-wrap mr-15">
                            <span className={`badge badge-xs badge-success mr-10 mt-10 position-relative`}>&nbsp;</span>
                        </div>
                        <div className="comment-wrap">
                            <h4 className="mb-2 font-weight-bold">{notification.title}</h4>
                            <p className="mb-0">{notification.message}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 comment-action w-20 d-flex justify-content-end">
                    <Dropdown direction='left' isOpen={this.state.open} toggle={() => { this.setState({ open: !this.state.open }); }}>
                        <DropdownToggle nav className="header-icon p-0">
                            <Tooltip title="Actions" placement="bottom">
                                <i className="zmdi zmdi-view-list-alt"></i>
                            </Tooltip>
                        </DropdownToggle>
                        <DropdownMenu>
                            { notification.type === NotificationType.ACTIVATION && !authUser.active && (
                                <DropdownItem onClick={() => onActivationClick()}>Activer mon compte</DropdownItem>
                            )}
                            { notification.type === NotificationType.CODEV_INVITATION && (
                                <DropdownItem onClick={() => onCodevInvitationClick()}>Accepter l'invitation</DropdownItem>
                            )}
                            { notification.type === NotificationType.ACTIVATE_FUNDING_ACCOUNT && (
                                <DropdownItem onClick={() => onFundingActivationClick()}>Activer le compte</DropdownItem>
                            )}
                            { notification.status === NotificationType.UNREAD && (
                                <DropdownItem onClick={() => this.markAsRead()}>Marquer comme lue</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </ListItem>
        );
    }
}

export default Item;
