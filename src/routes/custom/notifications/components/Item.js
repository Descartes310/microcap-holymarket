
import Status from "Enums/Status";
import React, {Component} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from "@material-ui/core/ListItem";
import NotificationType from "Enums/NotificationType";
import NotificationService from "Services/notifications";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

class Item extends Component {

    markAsRead = () => {
        this.props.setRequestGlobalAction(true);
        NotificationService.markNotificationAsRead(this.props.notification.id).finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.reloadNotifications();
        });
    };

    render() {
        const { notification, onActivationClick, authUser } = this.props;
        return (
            <ListItem className="row px-20 py-3 align-items-center" button>
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
                <div className="col-md-3 comment-action w-20 text-right">
                    <UncontrolledDropdown nav className="list-inline-item quciklink-dropdown tour-step-1">
                        <DropdownToggle nav className="header-icon p-0">
                            <Tooltip title="Actions" placement="bottom">
                                <i className="zmdi zmdi-view-list-alt"></i>
                            </Tooltip>
                        </DropdownToggle>
                        <DropdownMenu>
                            <div className="dropdown-content">
                                <ul className="list-unstyled mb-0 dropdown-list d-flex" style={{ flexDirection: 'column' }}>
                                    { notification.type === NotificationType.REGISTRATION && authUser.status === Status.PENDING && (
                                        <li
                                            className="w-100 p-5"
                                            onClick={() => onActivationClick()}
                                        >
                                            <p className="m-5">Activer mon compte</p>
                                        </li>
                                    )}
                                    { notification.status === NotificationType.UNREAD && (
                                        <li
                                            className="w-100 p-5"
                                            onClick={() => this.markAsRead()}
                                        >
                                            <p className="m-5">Marquer comme lue</p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </ListItem>
        );
    }
}

export default Item;
