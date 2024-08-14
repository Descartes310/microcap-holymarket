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
import CreateContact from '../profiles/users/components/createContact';

class ActivationBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            loading: false,
            codeToVerify: '',
            hasAskCode: true,
            acceptCGU: false,
            numPages: 1,
            pageNumber: 1,
            showCreateContactBox: false,
            member: props.authUser,
            membership: props.authUser.referralId
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.member != prevProps.member && this.props.member) {
            this.setState({
                member: this.props.member,
                membership: this.props.member.referralCode
            });
        }
    }

    componentDidMount() {
        if(!(this.props.member && this.props.member.notificationAddress) && !(!this.props.member && this.props.authUser.notificationAddress)) {
            this.setState({ showCreateContactBox: true });
        }
    }

    handleChange = (__, value) => {
        console.log(value);
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
        let data = {};

        if(this.props.member) {
            data.referral_code = this.props.member.referralCode
        }

        UserService.generateOTP(data)
            .then(() => {
                NotificationManager.success("Un code de vérification vous a été envoyé. Veuillez saisir ce code dans ce formulaire");
                this.setState({ activeTab: 2, hasAskCode: true });
            })
            .catch(() => {
                NotificationManager.error("Aucune adresse de notification fournie.");
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

        let data= {
            userReference: this.props.member ? this.props.member.referralCode : this.state.membership, 
        };

        if(this.props.notification) {
            data.notificationId = this.props.notification.id;
        }

        UserService.confirmOTP(this.state.codeToVerify, data)
        .then(() => {
            NotificationManager.success("Vous avez activaté le profile avec succès");
            if(!this.props.member && this.props.notification) {
                setTimeout(() => {
                    this.logoutUser();
                }, 2000);
            }
            this.props.onClose();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Le code de validation est incorrect");
        })
        .finally(() => {
            this.setState({ loading: false });
            this.props.setRequestGlobalAction(false);
        });
    };

    findUserByMembership = () => {
        this.props.setRequestGlobalAction(true);
        UserService.findUserByReference(this.props.member ? this.props.member.referralCode : this.state.membership)
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
        const { authUser } = this.props;
        const { member, membership, hasAskCode, acceptCGU, showCreateContactBox } = this.state;

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
                                variant="scrollable"
                                textColor="primary"
                            >
                                <Tab label="Code d'activation" />
                                <Tab label="Paramètres de l'accès" disabled={!hasAskCode || this.props.notification} />
                                <Tab label="Activer le" disabled={!member || !hasAskCode} />
                            </Tabs>
                        </div>
                    </AppBar>
                    <SwipeableViews
                        index={this.state.activeTab}
                    >
                        <div className="card mb-0 transaction-box">
                            <TabContainer >
                                { ((this.props.member && this.props.member.notificationAddress) || (!this.props.member && authUser.notificationAddress)) ? (
                                    <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                        <div>
                                            <p>Pour valider votre compte, un code de vérification vous sera envoyé par le moyen que vous avez enregistré.</p>
                                            <p>Cliquez sur le boutton ci-dessous pouur recevoir le code de vérification.</p>
                                        </div>
                                        <Button
                                            color="primary"
                                            disabled={this.state.loading}
                                            className="text-white mr-2"
                                            onClick={this.onAskCode}
                                        >
                                            Envoyer le code de vérification
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                        <div>
                                            <p>Vous n'avez pas encore un contact sur lequel nous pouvons vous envoyer votre code de vérification.</p>
                                            <p>Veuillez commencer par créer un nouveau contact en cliquant sur le boutton ci-dessous.</p>
                                        </div>
                                        <Button
                                            color="primary"
                                            disabled={this.state.loading}
                                            className="text-white mr-2"
                                            onClick={() => {
                                                this.setState({ showCreateContactBox: true });
                                            }}
                                        >
                                            Créer un nouveau contact
                                        </Button>
                                    </div>
                                )}
                            </TabContainer>
                        </div>
                        {this.props.member && (
                            <div className="card mb-0 transaction-box">
                                <TabContainer>
                                    <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                        <FormGroup className="has-wrapper">
                                            <InputLabel className="text-left" htmlFor="membership">
                                                Numéro utilisateur
                                            </InputLabel>
                                            <Input
                                                required
                                                disabled
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
                                                disabled={this.state.loading}
                                                className="text-white mr-2"
                                                onClick={() => this.setState({ activeTab: 2 })}
                                            >
                                                Continuer ma validation
                                            </Button>
                                        </FormGroup>
                                    </div>
                                </TabContainer>
                            </div>
                        )}
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <div className="row">
                                        <Alert color="success" className="w-100">
                                            <h4 className="alert-heading">Note importante!</h4>
                                            <p>
                                                Le code d'activation a été envoyé au contact que vous avez fourni.
                                                Veuillez saisir le code reçu et confirmer les conditions générales d'utilisation de MicroCap.
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
                <CreateContact 
                    show={showCreateContactBox}
                    member={this.props.member ?? this.props.member }
                    setAsNotificatioAddress={true}
                    title={"Par quel moyen souhaitez-vous recevoir le code d'activation"}
                    onClose={(reload = false) => {
                        this.setState({ showCreateContactBox: false });
                        if(reload) {
                            this.onAskCode();
                        }
                    }} 
                />
            </DialogComponent>
        );
    }
}

export default connect(({ authUser }) => ({ authUser: authUser.data }), { setRequestGlobalAction, logout })(ActivationBox);
