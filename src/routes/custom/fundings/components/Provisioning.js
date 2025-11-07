import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import UnitSelect from 'Components/UnitSelect';
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { FormGroup, Input, Button } from 'reactstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class Provisioning extends Component {

    state = {
        amount: 0,
        paymentAccounts: [],
        paymentMethod: null,
        paymentAccount: null,
        currency: this.props.account.currencyCode
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
        this.getAccounts();
     }

     getAccounts = () => {
        this.props.setRequestGlobalAction(true),
        AccountService.getAccountBySpeciality({special_product: 'CPMCM', referral_code: this.props.authUser.referralId})
        .then((response) => this.setState({paymentAccounts: response}))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show, title, onSubmit } = this.props;
        const { amount, paymentAccount, paymentAccounts, currency } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <FormGroup tag="fieldset">

                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Compte de paiement
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={paymentAccount}
                                options={paymentAccounts}
                                onChange={(__, item) => {
                                    this.setState({ paymentAccount: item });
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="has-wrapper col-md-8 col-sm-12">
                                <InputLabel className="text-left" htmlFor="label">
                                    Montant à payer
                                </InputLabel>
                                <Input
                                    required
                                    id="amount"
                                    type="number"
                                    name='amount'
                                    value={amount}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ amount: e.target.value })}
                                />
                            </FormGroup>
                            <UnitSelect currentCurrency={currency} className="has-wrapper col-md-4 col-sm-12" label="Devise" isCurrency={true} onChange={(c) => this.setState({ currency: c.code })} />
                        </div>
                        <Button
                            color="primary"
                            disabled={amount <= 0 || !paymentAccount || !currency}
                            className="w-100 ml-0 mt-15 text-white"
                            onClick={() => onSubmit(paymentAccount, amount, currency)}
                        >
                            Approvisionner
                        </Button>
                    </FormGroup>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(Provisioning)));