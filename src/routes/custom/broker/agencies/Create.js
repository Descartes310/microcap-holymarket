import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { BROKER } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select/Select";
import { NotificationManager } from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { createbrokerAgency, setRequestGlobalAction, getBrokerAccounts } from "Actions";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            accounts: [],
            account: null,
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
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }

        if (!this.state.account) {
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            let data = {
                label: this.state.label,
                product_id: this.state.account
            };

            createbrokerAgency(data)
                .then(() => {
                    NotificationManager.success("Nouvelle agence créé avec succès");
                    this.props.history.push(BROKER.AGENCIES.LIST);
                })
                .catch(() => null)
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
