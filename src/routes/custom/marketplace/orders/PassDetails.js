import { connect } from 'react-redux';
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { getReferralTypeLabel } from 'Helpers/helpers';
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

class PassDetails extends Component {

    state = {
        order: null,
        pass: null,
        user: null,
        userReference: null
    }

    constructor(props) {
        super(props);
        this.findPass();
    }

    findPass = () => {
        this.props.setRequestGlobalAction(true);
        UserService.findPassFromOrder(this.props.order.reference)
        .then(response => {
            this.setState({pass: response});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findUserByReference = () => {
        if (!this.state.userReference) {
            return;
        }
        this.props.setRequestGlobalAction(true),
        UserService.findUserByReference(this.state.userReference)
        .then(response => this.setState({ user: response }))
        .catch((err) => {
            this.setState({ user: null });
            NotificationManager.error("Reference incorrecte");
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {
        if (!this.state.user) {
            return;
        }
        this.props.setRequestGlobalAction(true),
        UserService.transferPass(this.state.pass.reference, { referral_code: this.state.userReference })
        .then((response) => {
            this.findPass();
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenu incorrecte");
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show, authUser } = this.props;
        const { pass, userReference, user } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Détails du pass
                    </h3>
                )}
            >
                <RctCardContent>
                    { (authUser.referralId == pass?.referralCode) && (
                        <>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="userReference">
                                    Réference utilisateur
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="userReference"
                                    name="userReference"
                                    className="input-lg"
                                    onChange={(e) => this.setState({ userReference: e.target.value })}
                                />
                            </FormGroup>
                            {user && (
                                <>
                                    <FormGroup className="has-wrapper">
                                        <InputStrap
                                            disabled
                                            className="input-lg"
                                            value={user.userName}
                                        />
                                    </FormGroup>
                                    <FormGroup className="has-wrapper">
                                        <InputStrap
                                            disabled
                                            className="input-lg"
                                            value={user.email}
                                        />
                                    </FormGroup>
                                    <FormGroup className="has-wrapper">
                                        <InputStrap
                                            disabled
                                            className="input-lg"
                                            value={getReferralTypeLabel(user.referralType)}
                                        />
                                    </FormGroup>
                                </>
                            )}
                            <FormGroup>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={!userReference}
                                    onClick={() => this.findUserByReference()}
                                    className="text-white font-weight-bold mr-20 bg-blue"
                                >
                                    Vérifier l'utilisateur
                                </Button>
                                <Button
                                    color="primary"
                                    className="ml-0 text-white float-right"
                                    onClick={() => this.onSubmit()}
                                >
                                    Céder le pass
                                </Button>
                            </FormGroup>
                        </>
                    )}
                    <div className="table-responsive">
                        <table className="table table-hover table-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="fw-bold">Détails</th>
                                    <th className="fw-bold">Valeur</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Nom</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{pass?.label}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Description</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{pass?.description}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Propriétaire</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{pass?.user.userName}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Réference</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{pass?.reference}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Status</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{pass?.active ? 'Valide' : 'Inactif'}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Date d'expiration</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark"><TimeFromMoment time={pass?.expirationDate} showFullDate /></h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(PassDetails));