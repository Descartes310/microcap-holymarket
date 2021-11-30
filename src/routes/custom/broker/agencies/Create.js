import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { BROKER } from "Url/frontendUrl";
import IntlMessages from "Util/IntlMessages";
import { withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import CountryManager from 'Helpers/CountryManager';
import Select from "@material-ui/core/Select/Select";
import { NotificationManager } from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { createBrokerAgency, setRequestGlobalAction, getBrokerAccounts } from "Actions";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            label: '',
            accounts: [],
            password: '',
            account: null,
            telephone: '',
            hostCountry: null
        }
    }

    componentDidMount() {
        this.loadAccounts();
    }

    loadAccounts = () => {
        this.props.setRequestGlobalAction(true);
        getBrokerAccounts().then(accounts => {
            this.setState({ accounts })
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    validate = () => {
        if (this.state.label.trim().length <= 0) {
            NotificationManager.error("Le nom de l'agence est obligatoire");
            return false;
        }

        if (!this.state.account) {
            NotificationManager.error("Le compte de l'agence est obligatoire");
            return false;
        }
        if (this.state.hostCountry.trim().length <= 0) {
            NotificationManager.error("Le pays de l'agence doit être sélectionné");
            return false;
        }
        if (this.state.email.trim().length <= 0 || this.state.telephone.trim().length <= 0 || this.state.password.trim().length <= 0) {
            NotificationManager.error("Les informations du responsables sont obligatoires");
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            let data = {
                label: this.state.label,
                email: this.state.email,
                password: this.state.password,
                product_id: this.state.account,
                telephone: this.state.telephone,
                hostCountry: this.state.hostCountry,
            };

            createBrokerAgency(data)
                .then(() => {
                    NotificationManager.success("Nouvelle agence créée avec succès");
                    this.props.history.push(BROKER.AGENCIES.LIST);
                })
                .catch((err) => {
                    NotificationManager.error("L'adresse email est déjà utilisée");
                    this.props.history.push(BROKER.AGENCIES.LIST)
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { match, history } = this.props;
        const { accounts } = this.state;

        return (
            <>
                <PageTitleBar
                    match={match}
                    history={history}
                    title={"Création d'une nouvelle agence"}
                />
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>

                                <h2 className="font-weight-bold mb-30">Informations sur l'agence</h2>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Nom de l'agence
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="label"
                                            name={'label'}
                                            value={this.state.label}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('label', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row mb-5">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left pl-2" htmlFor="hostCountry">
                                            Pays d'implantation
                                        </InputLabel>
                                        <Select
                                            value={this.state.country}
                                            onChange={event => { this.setState({ hostCountry: event.target.value }) }}
                                            input={<Input name="hostCountry" id="hostCountry" />}>
                                            {CountryManager.optionsNameAndFlag.map((country, __) => (
                                                <MenuItem value={country.name}>
                                                    {country.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="account">
                                            Compte d'opération associé
                                        </InputLabel>
                                        <Select
                                            value={this.state.account}
                                            onChange={event => { this.setState({ account: event.target.value }) }}
                                            input={<Input name="account" id="account" />}>
                                            {accounts.map((account, __) => (
                                                <MenuItem value={account.id}>
                                                    {account.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormGroup>
                                </div>

                                <h2 className="font-weight-bold mt-15 mb-30">Informations sur le responsable</h2>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="email">
                                            Adresse email
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="email"
                                            name={'email'}
                                            value={this.state.email}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('email', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="telephone">
                                            Numéro de téléphone
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="telephone"
                                            name={'telephone'}
                                            value={this.state.telephone}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('telephone', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="password">
                                            Mot de passe
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="password"
                                            name={'password'}
                                            value={this.state.password}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('password', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <Button
                                        color="primary"
                                        className="fw-bold btn-submit text-white"
                                        onClick={() => this.onSubmit()}
                                    >
                                        <i className="fw-bold ti-check mr-2" />
                                        <IntlMessages id="button.submit" />
                                    </Button>
                                </div>

                            </Form>
                        </RctCollapsibleCard>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Create))));
