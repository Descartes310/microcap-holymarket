import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { PRODUCT } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { updateAccountInfos, setRequestGlobalAction } from "Actions";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

class UpdateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryCode: '',
            controlKey: '',
            bankCode: '',
            counterCode: '',
            accountNumber: '',
            accountControlKey: '',
        }
    }

    componentDidMount() {
        this.accountId = this.props.match.params.id;
    }

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    validate = () => {
        if (this.state.countryCode.trim().length <= 0) {
            NotificationManager.error('Le code pays est obligatoire');
            return false;
        }
        if (this.state.controlKey.trim().length <= 0) {
            NotificationManager.error('La clé de controle est obligatoire');
            return false;
        }
        if (this.state.bankCode.trim().length <= 0) {
            NotificationManager.error('Le code banque est obligatoire');
            return false;
        }
        if (this.state.counterCode.trim().length <= 0) {
            NotificationManager.error('Le code guichet est obligatoire');
            return false;
        }
        if (this.state.accountNumber.trim().length <= 0) {
            NotificationManager.error('Le numéro de compte est obligatoire');
            return false;
        }
        if (this.state.accountControlKey.trim().length <= 0) {
            NotificationManager.error('Lea clé du numéro de compte est obligatoire');
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {

            const { countryCode, controlKey, bankCode, counterCode, accountNumber, accountControlKey } = this.state;
            
            this.props.setRequestGlobalAction(true);
            
            let data = {
                iban: countryCode+'-'+controlKey+'-'+bankCode+'-'+counterCode+'-'+accountNumber+'-'+accountControlKey
            };

            updateAccountInfos(this.accountId, data)
                .then((response) => {
                    this.props.history.push(PRODUCT.UNCOMPLETE_ACCOUNTS);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { match, history } = this.props;

        return (
            <>
                <PageTitleBar
                    match={match}
                    history={history}
                    title={"Edition du compte"}
                />
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>

                                <h2 className="font-weight-bold mb-30">IBAN du compte</h2>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="countryCode">
                                            Code pays
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="countryCode"
                                            name={'countryCode'}
                                            value={this.state.countryCode}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('countryCode', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="controlKey">
                                            Clé de controle
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="controlKey"
                                            name={'controlKey'}
                                            value={this.state.controlKey}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('controlKey', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="bankCode">
                                            Code banque
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="bankCode"
                                            name={'bankCode'}
                                            value={this.state.bankCode}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('bankCode', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="counterCode">
                                            Code guichet
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="counterCode"
                                            name={'counterCode'}
                                            value={this.state.counterCode}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('counterCode', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="accountNumber">
                                            Numéro de compte
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="accountNumber"
                                            name={'accountNumber'}
                                            value={this.state.accountNumber}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('accountNumber', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="accountControlKey">
                                            Clé de controle du numéro de compte
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="accountControlKey"
                                            name={'accountControlKey'}
                                            value={this.state.accountControlKey}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('accountControlKey', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <Button
                                        color="primary"
                                        className="fw-bold btn-submit text-white"
                                        onClick={() => this.onSubmit()}
                                    >
                                        Enregistrer
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter((injectIntl(UpdateAccount))));
