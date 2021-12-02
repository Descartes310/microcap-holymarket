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
import { createBrokerAgency, setRequestGlobalAction, getBrokerAccounts, getOrganisationMembers } from "Actions";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            members: [],
            accounts: [],
            account: null,
            managerId: null,
            hostCountry: null
        }
    }

    componentDidMount() {
        this.loadAccounts();
        this.getMembers();
    }

    getMembers = () => {
        this.props.setRequestGlobalAction(true);
        getOrganisationMembers('BROKER_AGENCY').then(members => {
            this.setState({ members })
        }).catch(err => {
            this.setState({ members: [] })
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

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
        if (!this.state.managerId) {
            NotificationManager.error("Le responsable est obligatoire");
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            let data = {
                label: this.state.label,
                product_id: this.state.account,
                manager_id: this.state.managerId,
                hostCountry: this.state.hostCountry,
            };

            createBrokerAgency(data)
                .then(() => {
                    NotificationManager.success("Nouvelle agence créée avec succès");
                    this.props.history.push(BROKER.AGENCIES.LIST);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { match, history } = this.props;
        const { accounts, members } = this.state;

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
                                                <MenuItem value={country.id}>
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
                                        <InputLabel className="text-left" htmlFor="manager">
                                            Responsable
                                        </InputLabel>
                                        <select
                                            className="form-control"
                                            style={{ width: '100%', display: 'inline-block' }}
                                            onChange={(e) => this.setState({ managerId: e.target.value })}
                                        >
                                            <option value={null}>
                                                Choisissez un responsable
                                            </option>
                                            {
                                                members.map((item, index) => (
                                                    <option key={index} value={item.user.id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
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
