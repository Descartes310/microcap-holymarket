import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import { getContactTypeLabel } from '../data';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import { FormGroup, Input, Button } from 'reactstrap';
import {NotificationManager} from "react-notifications";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class ChangeAccessCredentials extends Component {

    state = {
        pass: null,
        login: null,
        contacts: [],
        contact: null,
        password: null,
        oldPassword: null,
        confirmation: null,
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
        this.getContacts();
     }

    getContacts = () => {
        UserService.getContacts().then((response) => {
            this.setState({contacts: response.filter(c => c.type !== 'ALIAS')})
        });
    }
  
     onSubmitProfile = () => {
        this.props.setRequestGlobalAction(true);

        let datas = {
            login: this.state.login
        };

        UserService.changeAccessLogin(this.props.access.id, datas).then(() => {
            if(this.props.access.reference === this.props.authUser.access) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('id_token');
                localStorage.removeItem('expires_at');
                window.location.reload();
            } else {
                this.props.onClose();
            }
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Ce login est déjà utilisé, veuillez le changer.");
            this.props.onClose();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmitContact = () => {
        this.props.setRequestGlobalAction(true);
        if(!this.state.contact) {
            NotificationManager.error("Sélectionnez un contact");
        }

        let datas = {
            contact_id: this.state.contact.id
        };

        UserService.changeAccessContact(this.props.access.id, datas).then(() => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue, veuillez réessayer");
            this.props.onClose();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

     onSubmitLogin = () => {

        if(!this.state.login) {
            NotificationManager.error("Le login est obligatoire");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let datas = {
            login: this.state.login
        };

        UserService.changeAccessLogin(this.props.access.id, datas).then(() => {
            if(this.props.access.reference === this.props.authUser.access) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('id_token');
                localStorage.removeItem('expires_at');
                window.location.reload();
            } else {
                this.props.onClose();
            }
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Ce login est déjà utilisé, veuillez le changer.");
            this.props.onClose();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
     }

     onSubmitPassword = () => {
         
         if(this.state.password != this.state.confirmation) {
            NotificationManager.error("Les mots de passe ne sont pas les mêmes");
            return;
        }
        
            this.props.setRequestGlobalAction(true);

        let datas = {
            old_password: this.state.oldPassword,
            new_password: this.state.password
        };

        UserService.changeAccessPassword(this.props.access.id, datas).then(() => {
            if(this.props.access.reference === this.props.authUser.access) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('id_token');
                localStorage.removeItem('expires_at');
                window.location.reload();
            } else {
                this.props.onClose();
            }
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("L'ancien mot de passe est incorrect");
            this.props.onClose();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
     }


    render() {

        const { onClose, show, access } = this.props;
        const { login, password, oldPassword, confirmation, contact, contacts } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        Edition de l'accès
                    </h3>
                )}
            >
                <RctCardContent>
                    
                    <FormGroup tag="fieldset">
                        <h2 className="mb-10 mb-20 mt-20">Adresse de notification</h2>
                        <FormGroup className="has-wrapper">
                            <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                                <InputLabel className="text-left">
                                    Contact
                                </InputLabel>
                                <Autocomplete
                                    value={contact}
                                    options={contacts}
                                    id="combo-box-demo"
                                    classes={{ paper: 'custom-input' }}
                                    getOptionLabel={(option) => `${option.value} (${getContactTypeLabel(option.type)})`}
                                    onChange={(__, item) => { this.setState({ contact: item }) }}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div>
                        </FormGroup>

                        <Button
                            color="primary"
                            disabled={!contact}
                            className="ml-0 text-white float-right"
                            onClick={() => this.onSubmitContact()}
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>

                    <FormGroup tag="fieldset">
                        <h2 className="mb-10 mb-20 mt-20">Login</h2>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="login">
                                Login
                            </InputLabel>
                            <Input
                                required
                                id="login"
                                type="text"
                                name='login'
                                value={login}
                                className="input-lg"
                                onChange={(e) => this.setState({ login: e.target.value })}
                            />
                        </FormGroup>

                        <Button
                            color="primary"
                            disabled={!login || !access}
                            className="ml-0 text-white float-right"
                            onClick={() => this.onSubmitLogin()}
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <h2 className="mb-10 mb-20 mt-20">Mot de passe</h2>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="oldPassword">
                                Ancien mot de passe
                            </InputLabel>
                            <Input
                                required
                                id="oldPassword"
                                type="password"
                                name='oldPassword'
                                value={oldPassword}
                                className="input-lg"
                                onChange={(e) => this.setState({ oldPassword: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="password">
                                Nouveau mot de passe
                            </InputLabel>
                            <Input
                                required
                                id="password"
                                type="password"
                                name='password'
                                value={password}
                                className="input-lg"
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="confirmation">
                                Confirmation
                            </InputLabel>
                            <Input
                                required
                                id="confirmation"
                                type="password"
                                name='confirmation'
                                value={confirmation}
                                className="input-lg"
                                onChange={(e) => this.setState({ confirmation: e.target.value })}
                            />
                        </FormGroup>
                        <Button
                            color="primary"
                            disabled={!password || !oldPassword || !confirmation || !access}
                            className="ml-0 text-white float-right"
                            onClick={() => this.onSubmitPassword()}
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                    <h2 className="mb-10 mb-20">Profil utilisateur</h2>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(ChangeAccessCredentials)));