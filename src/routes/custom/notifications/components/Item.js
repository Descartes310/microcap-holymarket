import {Button} from "reactstrap";
import Status from "Enums/Status";
import {Fab} from "@material-ui/core";
import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import NotificationType from "Enums/NotificationType";
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from "react-notifications";

class Item extends Component {

    markAsRead = (notificationId) => {
        this.props.setRequestGlobalAction(true);
        changeNotificationStatus(notificationId).then(data => {
            this.props.getAllNotifications(this.props.authUser.id, 'UNREAD');
            NotificationManager.success("Notification marquée comme lue");
        }).catch(err => {
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
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
                            <h5 className="mb-2">{notification.title}</h5>
                            <p className="mb-0 font-xs">{notification.message}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 comment-action w-20 text-right">
                    {notification.type === NotificationType.REGISTRATION && (
                        <div className="d-flex align-items-center justify-content-end">
                            {authUser.status === Status.PENDING ? (
                                <Button
                                    color="primary"
                                    className="text-white mr-2"
                                    onClick={() => onActivationClick()}
                                >
                                    Activer Mon compte
                                </Button>
                            ) : (
                                <span className="text-success fw-bold d-block comment-date">
                                    <i className="zmdi zmdi-check mr-2"/>
                                    Compte déja validé
                                </span>
                            )}
                        </div>
                    )}
                        <div>
                            <span className="font-xs text-muted font-weight-light d-block comment-date">
                                <TimeFromMoment time={notification.createdAt} />
                            </span>
                            <div className="d-flex align-items-center justify-content-end">
                                <Fab variant="round" size="small" color="primary" className="bg-primary text-white" onClick={() => this.markAsRead()}>
                                        <i className="zmdi zmdi-check"/>
                                </Fab>
                            </div>
                        </div>
                </div>
            </ListItem>
        );
    }
}

export default Item;
