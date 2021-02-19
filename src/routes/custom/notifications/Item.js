import {Button} from "reactstrap";
import Status from "Enums/Status";
import {Fab} from "@material-ui/core";
import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import NotificationType from "Enums/NotificationType";

class Item extends Component {
    render() {
        const { notification, onActivationClick, authUser, onAskingPieceClick } = this.props;
        return (
            <ListItem className="row px-20 py-3 align-items-center notification-hover-wrapper" button>
                <div className="col-md-9">
                    <div className="d-flex align-items-start">
                        <div className="avatar-wrap mr-15">
                            <span className={`badge badge-xs badge-success mr-10 mt-10 position-relative`}>&nbsp;</span>
                            {/*<img src={comment.userAvatar} alt="project logo" className="rounded-circle" width="40" height="40" />*/}
                        </div>
                        <div className="comment-wrap">
                            <h5 className="mb-2">{notification.title}</h5>
                            <p className="mb-0 font-xs">{notification.message}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 comment-action w-20 text-right">
                    {notification.notificationType === NotificationType.ACTIVATE_ACCOUNT ? (
                        <div className="notification-hover d-flex align-items-center justify-content-end">
                            {authUser.user.status === Status.PENDING ? (
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
                    ) : notification.notificationType === NotificationType.PIECE_REQUEST ? (
                        <>
                          <span className="font-xs text-muted font-weight-light d-block comment-date">{notification.createdAt.fromNow()}</span>
                          <div className="notification-hover d-flex align-items-center justify-content-end">
                              <Fab variant="round" size="small" className="bg-blue text-white btn-sm mx-1" onClick={onAskingPieceClick}>
                                  <i className="zmdi zmdi-menu"/>
                              </Fab>
                          </div>
                        </>
                    ) : (
                        <>
                          <span className="font-xs text-muted font-weight-light d-block comment-date">{notification.createdAt.fromNow()}</span>
                          <div className="notification-hover d-flex align-items-center justify-content-end">
                              <Fab variant="round" size="small" color="primary" className="btn-sm mx-1 bg-primary text-white">
                                  <i className="zmdi zmdi-check"/>
                              </Fab>
                              <Fab variant="round" size="small" className="bg-blue text-white btn-sm mx-1">
                                  <i className="zmdi zmdi-menu"/>
                              </Fab>
                          </div>
                        </>
                    )}
                </div>
            </ListItem>
        );
    }
}

Item.propTypes = {};

export default Item;
