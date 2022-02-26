import { connect } from "react-redux";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import UserService from "Services/users";
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from "react-swipeable-views";
import TabContainer from "Components/TabContainer";
import { getReferralTypeLabel } from 'Helpers/helpers';
import DialogComponent from "Components/DialogComponent";
import { setRequestGlobalAction, logout } from "Actions";
import { NotificationManager } from "react-notifications";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { FormGroup, Input, Button, Alert } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

class ActivationBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            loading: false,
            codeToVerify: '',
            hasAskCode: false,
            acceptCGU: false,
            numPages: 1,
            pageNumber: 1,
            membership: props.authUser.referralId,
            member: props.authUser,
        }
    }

    handleChange = (__, value) => {
        this.setState({ activeTab: value });
    };

    getNotificationAccessReference = () => {
        let accessReference = null;
        if(this.props.notification) {
            let notificationAccessDetails = this.props.notification.details.find(d => d.type === 'ACCESS_REF');
            if(notificationAccessDetails) {
                accessReference = notificationAccessDetails.value;
            }
        }
        return accessReference;
    };

    logoutUser = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        window.location.replace('/login');
	}

    onAskCode = () => {
        this.props.setRequestGlobalAction(true);
        this.setState({ loading: true });
        UserService.generateOTP()
            .then(() => {
                NotificationManager.success("Un code vous a été envoyé par email. Veuillez saisir ce code dans ce formulaire");
                this.setState({ activeTab: 1, hasAskCode: true });
            })
            .finally(() => {
                this.setState({ loading: false });
                this.props.setRequestGlobalAction(false);
            });
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages, pageNumber: 1 });
    }

    onVerifyCode = () => {
        this.props.setRequestGlobalAction(true);
        this.setState({ loading: true });
        UserService.confirmOTP(this.state.codeToVerify, {userReference: this.state.membership, notificationId: this.props.notification.id})
            .then(() => {
                NotificationManager.success("Vos nouveaux paramètres on été envoyés à votre email");
                this.props.onClose();
                setTimeout(() => {
                    this.logoutUser();
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Le code OTP est incorrect");
            })
            .finally(() => {
                this.setState({ loading: false });
                this.props.setRequestGlobalAction(false);
            });
    };

    findUserByMembership = () => {
        this.props.setRequestGlobalAction(true);
        UserService.findUserByReference(this.state.membership)
        .then(response => {
            this.setState({ member: response });
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { member, membership, hasAskCode, acceptCGU } = this.state;

        return (
            <DialogComponent
                title="Acivation de l'accès"
                onClose={this.props.onClose}
                show={this.props.show}
            >
                <>
                    <AppBar position="static" color="default">
                        <div className="d-flex align-items-center">
                            <Tabs
                                value={this.state.activeTab}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Demander un code d'activation" />
                                <Tab label="Paramètres de l'accès"  disabled={!hasAskCode} />
                                <Tab label="Activer l'accès" disabled={!member || !hasAskCode} />
                            </Tabs>
                        </div>
                    </AppBar>
                    <SwipeableViews
                        index={this.state.activeTab}>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <div>
                                        <p>Commencez la procédure en demandant un code OTP qui vous sera envoyé par email.</p>
                                        <p>Cliquez sur le boutton ci-dessous.</p>
                                    </div>
                                    <Button
                                        color="primary"
                                        disabled={this.state.loading}
                                        className="text-white mr-2"
                                        onClick={this.onAskCode}
                                    >
                                        Initier la demande
                                    </Button>
                                </div>
                            </TabContainer>
                        </div>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="membership">
                                            Numéro utilisateur
                                        </InputLabel>
                                        <Input
                                            required
                                            type="text"
                                            id="membership"
                                            name='membership'
                                            value={membership}
                                            className="input-lg"
                                            onChange={(e) => this.setState({ membership: e.target.value })}
                                        />
                                    </FormGroup>
                                    {member && (
                                        <>
                                            <FormGroup className="has-wrapper">
                                                <Input
                                                    disabled
                                                    className="input-lg"
                                                    value={member.userName}
                                                />
                                            </FormGroup>
                                            <FormGroup className="has-wrapper">
                                                <Input
                                                    disabled
                                                    className="input-lg"
                                                    value={getReferralTypeLabel(member.referralType)}
                                                />
                                            </FormGroup>
                                        </>
                                    )}
                                    <FormGroup>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            disabled={!membership}
                                            onClick={() => this.findUserByMembership()}
                                            className="text-white font-weight-bold mr-20 bg-blue"
                                        >
                                            Vérifier l'utilisateur
                                        </Button>
                                        <Button
                                            color="primary"
                                            disabled={this.state.loading}
                                            className="text-white mr-2"
                                            onClick={() => this.setState({ activeTab: 2 })}
                                        >
                                            Continuer
                                        </Button>
                                    </FormGroup>
                                </div>
                            </TabContainer>
                        </div>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <div className="row">
                                        <Alert color="success" className="w-100">
                                            <h4 className="alert-heading">Note importante!</h4>
                                            <p>
                                                Après l'activation, de nouveaux paramètres de connexion vous serons envoyés par demail.
                                                Veuillez les utiliser pour les prochaines connexions.
                                            </p>
                                            <hr />
                                            <p className="mb-0">
                                                Vous pouvez éditer vos paramètres à tout moment dans votre profile.
                                            </p>
                                        </Alert>

                                        <div className="col-sm-12 mt-20">
                                            <InputLabel className="text-left" htmlFor="label">
                                                Entrer le code d'activation reçu
                                            </InputLabel>
                                        </div>
                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <Input
                                                required
                                                id="label"
                                                name={'label'}
                                                value={this.state.codeToVerify}
                                                className="has-input input-lg border"
                                                onChange={event => this.setState({ codeToVerify: event.target.value })}
                                            />
                                        </FormGroup>
                                        <div>
                                            <Checkbox
                                                color="primary"
                                                onChange={(e) => this.setState({ acceptCGU: e.target.checked })}
                                            />
                                            <label>J'ai pris connaissance et accepte les conditions d'utilisation du compte</label>
                                        </div>
                                        <div className="col-sm-12 mt-10">
                                            <label>Conditions générale d'utilisation</label>
                                            <label>Politique de confidentialités</label>
                                        </div>
                                        <div className="col-sm-12">
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={this.onVerifyCode}
                                                    className="text-white bg-blue mr-2"
                                                    disabled={this.state.codeToVerify.length === 0 || this.state.loading || !acceptCGU}
                                                >
                                                    Vérifier mon code
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabContainer>
                        </div>
                    </SwipeableViews>
                </>
            </DialogComponent>
        );
    }
}

export default connect(({ authUser }) => ({ authUser: authUser.data }), { setRequestGlobalAction, logout })(ActivationBox);
