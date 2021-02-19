import React, {Component} from 'react';
import {Media} from "reactstrap";
import UserAvatar from "Components/UserAvatar";
import Button from "@material-ui/core/Button";
import InvitationType from "Enums/InvitationType";
import IntlMessages from "Util/IntlMessages";
import SweetAlert from "react-bootstrap-sweetalert";
import {
    acceptInvitation,
    cancelInvitation,
    deleteInvitation,
    getInvitationsPending,
    markAsStarEmail,
    onSelectEmail,
    setRequestGlobalAction
} from "Actions";
import {NotificationManager} from "react-notifications";
import {connect} from "react-redux";
import {ERROR_500} from "Constants/errors";
import {withRouter} from "react-router-dom";

class InvitationItem extends Component {
    constructor(props) {
        super(props);
        this.invitationType = this.props.invitation.type;
        this.state = {
            showWarningBox: false,
        }
    }

    onAccept = () => {
        this.props.setRequestGlobalAction(true);
        acceptInvitation(this.props.invitation.invitationId)
            .then(() => {
                NotificationManager.success("Vous faite maintenant partir du groupe " + this.props.invitation.group.label);
                this.props.getInvitationsPending(this.props.authUser.user.id);
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onCancel = () => {
        this.setState({showWarningBox: true});
    };

    handleActiveConfirmed = () => {
        this.props.setRequestGlobalAction(true);
        const func = this.invitationType === InvitationType.INVITATION_SEND ? cancelInvitation : deleteInvitation;
        func(this.props.invitation.id)
            .then(() => {
                NotificationManager.success(this.invitationType === InvitationType.INVITATION
                    ? "Invitation refusé avec succès"
                    : this.invitationType === InvitationType.INVITATION_SEND
                        ? "Invitation annulé avec succès"
                        : "Demande annulé avec succès"
                );
                this.props.getInvitationsPending(this.props.authUser.user.id);
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    render() {
        const { invitation, loading } = this.props;
        const { showWarningBox } = this.state;
        return (
            <>
                <li>
                    <div className="d-flex justify-content-between">
                        <Media className="mb-10">
                            <UserAvatar
                                name={invitation.group.label}
                                avatar={invitation.group.avatar}
                            />
                            <Media body>
                                <h5 className="m-0 pt-5 fs-14">{invitation.group.label}</h5>
                                <span className="fs-12 align-self-center">{invitation.group.shortDescription}</span>
                            </Media>
                        </Media>
                        {/*<span className="small align-self-center">19 Mar 2017</span>*/}
                    </div>
                    <div className="d-flex justify-content-between">
                        {this.invitationType === InvitationType.INVITATION ? (
                            <div className="text-justify">
                                <p className="subject">
                                    Vous avez une demande d'adhesion de la part de ce groupe.
                                    Voulez-vous accepter ?
                                </p>
                                <div className="d-flex">
                                    <Button
                                        size="small"
                                        disabled={loading}
                                        variant="contained"
                                        onClick={() => this.onAccept()}
                                        className="btn-primary mr-5 mb-10 text-white">
                                        Accepté
                                    </Button>
                                    <Button
                                        size="small"
                                        disabled={loading}
                                        variant="contained"
                                        onClick={() => this.onCancel()}
                                        className="btn-danger mb-10 text-white">
                                        Refusé
                                    </Button>
                                </div>
                            </div>
                        ) : this.invitationType === InvitationType.INVITATION_SEND ? (
                            <div className="text-justify">
                                <p className="subject">
                                    Votre invitation a été envoyé avec succès.
                                </p>
                                <div className="d-flex">
                                    <Button
                                        size="small"
                                        disabled={loading}
                                        variant="contained"
                                        onClick={() => this.onCancel()}
                                        className="btn-danger mb-10 text-white">
                                        Annuler l'invitation
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-justify">
                                <p className="subject">
                                    Votre demande d'adhesion a été envoyé et est en cours de traitement par le groupe.
                                </p>
                                <div className="d-flex">
                                    <Button
                                        size="small"
                                        disabled={loading}
                                        variant="contained"
                                        onClick={() => this.onCancel()}
                                        className="btn-danger mb-10 text-white">
                                        Annuler la demande
                                    </Button>
                                </div>
                            </div>
                        )}
                        <SweetAlert
                            type="danger"
                            showCancel
                            showConfirm
                            show={showWarningBox}
                            title={"Confirmation"}
                            customButtons={(
                                <>
                                    <Button
                                        color="blue"
                                        disabled={loading}
                                        variant="outlined"
                                        onClick={() => this.setState({showWarningBox: false})}
                                        className="text-white bg-blue font-weight-bold mr-3"
                                    >
                                        Non je ne veux pas
                                    </Button>
                                    <Button
                                        color="primary"
                                        disabled={loading}
                                        variant="contained"
                                        className="text-white font-weight-bold"
                                        onClick={() => this.handleActiveConfirmed()}
                                    >
                                        Oui je veux
                                    </Button>
                                </>
                            )}
                            onConfirm={() => this.handleActiveConfirmed()}
                        >
                            {this.invitationType === InvitationType.INVITATION
                                ? "Voulez vous vraiment refusé l'invitation ?"
                                : "Voulez-vous vraiment annuler ?"}
                        </SweetAlert>
                    </div>
                </li>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalAction, authUser }) => {
    return {loading: requestGlobalAction, authUser: authUser.data};
};

export default withRouter(connect(mapStateToProps, {
    getInvitationsPending,
    setRequestGlobalAction,
    onSelectEmail,
    markAsStarEmail
})(InvitationItem));
