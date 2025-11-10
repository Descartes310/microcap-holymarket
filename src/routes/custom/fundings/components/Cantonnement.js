import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import UserSelect from 'Components/UserSelect';
import UnitSelect from 'Components/UnitSelect';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { FormGroup, Input, Button } from 'reactstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class Cantonnement extends Component {

    state = {
        amount: 0,
        accounts: [],
        reason: '',
        member: null,
        account: null,
        dueDate: null,
        currency: this.props.account.currencyCode
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
     }

     getAccounts = (member) => {
        this.props.setRequestGlobalAction(true),
        AccountService.getAccountBySpeciality({special_product: 'CPMCM', referral_code: member.referralCode})
        .then((response) => this.setState({accounts: response}))
        .finally(() => this.props.setRequestGlobalAction(false))
    }
  
    onSubmit = () => {
        this.props.onSubmit(this.state.amount, this.state.currency, this.state.account, this.state.member.referralCode, this.state.dueDate, this.state.reason);
    }
  

    render() {

        const { onClose, show, title } = this.props;
        const { reason, amount, dueDate, currency, member, account, accounts } = this.state;

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

                        <div className="row">
                            <FormGroup className="has-wrapper col-md-8 col-sm-12">
                                <InputLabel className="text-left" htmlFor="label">
                                    Montant à cantonner
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

                        <FormGroup className="has-wrapper col-md-12 col-sm-12">
                            <InputLabel className="text-left" htmlFor="dueDate">
                                Date d'échéance
                            </InputLabel>
                            <Input
                                required
                                id="dueDate"
                                type="date"
                                name='dueDate'
                                value={dueDate}
                                className="input-lg"
                                onChange={(e) => this.setState({ dueDate: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Raison du cantonnement
                            </InputLabel>
                            <Input
                                required
                                id="reason"
                                type="text"
                                name='reason'
                                value={reason}
                                className="input-lg"
                                onChange={(e) => this.setState({ reason: e.target.value })}
                            />
                        </FormGroup>
                        <UserSelect label={'Numéro bénéficiaire'} onChange={(_, member) => {
                            this.setState({member: member}, () => {
                                this.getAccounts(member);
                            });
                        }}/>
                        {member && (
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Compte bénéficiaire
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={account}
                                    options={accounts}
                                    onChange={(__, item) => {
                                        this.setState({ account: item });
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                        )}

                        <FormGroup>
                            <Button
                                color="primary"
                                disabled={amount <= 0 || !reason || !account || !member || !currency}
                                onClick={() => this.onSubmit()}
                                className="w-100 ml-0 mt-15 text-white"
                            >
                                Cantonner
                            </Button>
                        </FormGroup>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(Cantonnement)));