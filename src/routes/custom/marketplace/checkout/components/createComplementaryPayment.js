import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import UnitService from 'Services/units';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class CreateComplementaryPaymentModal extends Component {
  
    state = {
        label: null,
        amount: null,
        currency: null,
        currencies: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getCurrencies();
    }

    getCurrencies = () => {
        this.props.setRequestGlobalAction(true);
        UnitService.getUnits()
            .then((response) => this.setState({ currencies: response, currency: response.find(u => u.code == this.props.currencyCode) }))
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                this.props.setRequestGlobalAction(false);
            })
    }

    onSubmit = () => {

        const { amount, label } = this.state;

        if(!amount || !label) {
            NotificationManager.error("La désignation et le montant sont obligatoires");
            return;
        }

        let data = {label, amount, deletable: true};
        this.props.onSubmit(data);
    }

    render() {

        const { onClose, show } = this.props;
        const { amount, label, currencies, currency } = this.state;

        //console.log(currencies, currency, this.props.currencyCode, currencies.find(u => u.code == this.props.currencyCode));

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Nouveau versement complémentaire
                    </h3>
                )}
            >
                <RctCardContent>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Désignation
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            name="label"
                            value={label}
                            className="input-lg"
                            type={"text"}
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="amount">
                            Montant
                        </InputLabel>
                        <InputStrap
                            required
                            id="amount"
                            name='amount'
                            type="number"
                            value={amount}
                            className="input-lg"
                            onChange={(e) => this.setState({ amount: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left">
                            Devise
                        </InputLabel>
                        <Autocomplete
                            value={currency}
                            disabled={true}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ currency: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            options={currencies.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(CreateComplementaryPaymentModal)));