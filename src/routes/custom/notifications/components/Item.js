import React, {Component} from 'react';
import { getFilePath } from "Helpers/helpers";
import { withRouter } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import NotificationType from "Enums/NotificationType";
import NotificationService from "Services/notifications";
import { joinUrlWithParamsId, SUPERVISION } from 'Url/frontendUrl';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Item extends Component {

    ESCAPE_STATUSES = [NotificationType.ACTIVATION, NotificationType.ACTIVATION_PASS, NotificationType.CODEV_INVITATION,
        NotificationType.CODEV_INVITATION_REQUEST, NotificationType.ACTIVATE_FUNDING_ACCOUNT, NotificationType.DEDICATED_GRANT_OFFER,
        NotificationType.INJECTION_REQUEST
    ]

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

    markAsTreated = () => {
        this.props.setRequestGlobalAction(true);
        NotificationService.markNotificationAsTreat(this.props.notification.id).finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.reloadNotifications();
        });
    };

    render() {
        const { notification, onActivationClick, authUser, onFundingActivationClick, tab, onApproveInjection,
            onCodevInvitationClick, onCodevInvitationRequestClick, onActivationPassClick, onInitDealClick } = this.props;
        return (
            <ListItem className="row px-20 py-3 d-flex justify-content-between align-items-center">
                <div className="d-flex col-sm-12 col-md-10">
                    <div className="comment-wrap">
                        <h4 className="mb-2 font-weight-bold">{notification.title}</h4>
                        <p className="mb-0">{notification.message}</p>
                    </div>
                </div>
                <div className="comment-action d-flex justify-content-end col-sm-12 col-md-2">
                    { tab !== 'TREATED' && (
                        <UncontrolledDropdown direction='botton' isOpen={this.state.open} toggle={() => { this.setState({ open: !this.state.open }); }}>
                            <DropdownToggle
                                caret
                                color="primary"
                            >
                                Mes options
                            </DropdownToggle>
                            <DropdownMenu>
                                { notification.type === NotificationType.ACTIVATION && !authUser.active && (
                                    <DropdownItem onClick={() => onActivationClick()}>Activer mon compte</DropdownItem>
                                )}
                                { notification.type === NotificationType.ACTIVATION_PASS && (
                                    <DropdownItem onClick={() => onActivationPassClick()}>Activer mon pass</DropdownItem>
                                )}
                                { (notification.type === NotificationType.CODEV_INVITATION && notification.treatedAt == null) && (
                                    <DropdownItem onClick={() => onCodevInvitationClick()}>Accepter l'invitation</DropdownItem>
                                )}
                                { (notification.type === NotificationType.CODEV_INVITATION_REQUEST && notification.treatedAt == null) && (
                                    <DropdownItem onClick={() => onCodevInvitationRequestClick()}>Repondre à la requête</DropdownItem>
                                )}
                                { (notification.type === NotificationType.ACTIVATE_FUNDING_ACCOUNT && notification.treatedAt == null) && (
                                    <DropdownItem onClick={() => onFundingActivationClick()}>Activer le compte</DropdownItem>
                                )}
                                { (notification.type === NotificationType.DEDICATED_GRANT_OFFER && notification.treatedAt == null) && (
                                    <DropdownItem onClick={() => onInitDealClick()}>Initier un deal</DropdownItem>
                                )}
                                { (notification.type === NotificationType.FILE_AUTHENTIFICATION && notification.treatedAt == null) && (
                                    <DropdownItem onClick={() => this.props.history.push(joinUrlWithParamsId(SUPERVISION.USERS.DETAILS, notification.details.find(nd => nd.type === "USER_REFERENCE")?.value))}>Consulter la pièce</DropdownItem>
                                )}
                                { (notification.type === NotificationType.INJECTION_REQUEST && notification.treatedAt == null) && (
                                    <>
                                        {notification.details.find(nd => nd.type === "INJECTION_PROOF")?.value && (
                                            <DropdownItem onClick={() => {
                                                window.open(getFilePath(notification.details.find(nd => nd.type === "INJECTION_PROOF")?.value), "_blank")
                                            }}>Justificatif</DropdownItem>
                                        )}
                                        <DropdownItem onClick={() => onApproveInjection(true)}>Accepter</DropdownItem>
                                        <DropdownItem onClick={() => onApproveInjection(false)}>Refuser</DropdownItem>
                                    </>
                                )}
                                { (notification.type === NotificationType.OPERATION_RECEIPT && notification.treatedAt == null) && (
                                    notification.details.find(nd => nd.type === "OPERATION_RECEIPT")?.value && (
                                        <DropdownItem onClick={() => {
                                            window.open(getFilePath(notification.details.find(nd => nd.type === "OPERATION_RECEIPT")?.value), "_blank")
                                        }}>Télécharger</DropdownItem>
                                    )
                                )}
                                { !this.ESCAPE_STATUSES.includes(notification.type) && (
                                    notification.status === NotificationType.UNREAD ? 
                                        <DropdownItem onClick={() => this.markAsRead()}>Marquer comme lue</DropdownItem>:
                                        <DropdownItem onClick={() => this.markAsTreated()}>Marquer comme traitée</DropdownItem>
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )}
                </div>
            </ListItem>
        );
    }
}

export default withRouter(Item);
