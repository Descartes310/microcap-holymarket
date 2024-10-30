import { connect } from 'react-redux';
import React, { Component } from 'react';
import AccountService from 'Services/accounts';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap, InputGroup, InputGroupAddon  } from 'reactstrap';

class AccountSelect extends Component {

    state = {
        account: null,
        number: null,
        key: null,
    }
  
    constructor(props) {
        super(props);
    }

    findUserByMembership = () => {
        this.props.setRequestGlobalAction(true);
        let data = {is_subscritpion: this.props.isSubscritpion ?? false, is_payment: this.props.isPayment ?? false};
        AccountService.getAccountByNumberAndKey(this.state.number, this.state.key, data)
        .then(response => {
            console.log(response);
            this.setState({ account: response }, () => {
                if(this.state.account != null) {
                    this.props.onChange(this.state.account, response);
                }
            });
        })
        .catch((err) => {
            if(err?.response?.status == 403) {
                NotificationManager.error('Ce compte n\'est pas enregistré au services de guichet avancé');
            } else {
                NotificationManager.error('Ce compte est inexistant');
            }
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }
  
    render() {

        const { number, key, account } = this.state;

        return (
            <div className='col-md-12 col-sm-12'>
                <div className="d-flex">
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="number">
                            Numéro et clé du compte
                        </InputLabel>
                        <InputGroup>
                            <InputStrap
                                id="number"
                                type="number"
                                value={number}
                                name={'number'}
                                placeholder={'Numéro de compte'}
                                className="col-md-8 col-sm-12 has-input input-lg custom-input"
                                onChange={(e) => this.setState({ number: e.target.value })}
                            />
                            <InputStrap
                                id="key"
                                value={key}
                                name={'key'}
                                type="number"
                                placeholder={'Clé de compte'}
                                className="col-md-4 col-sm-12 ml-10 has-input input-lg custom-input"
                                onChange={(e) => this.setState({ key: e.target.value })}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" variant="contained" onClick={() => {
                                    this.findUserByMembership();
                                }} >
                                    <span className='text-white'>Rechercher</span>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </div>
                {/* {member && (
                    <div className='row'>
                        <FormGroup className="has-wrapper col-md-4 col-sm-12">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={member.userName}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-md-4 col-sm-12">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={member.email}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-md-4 col-sm-12">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={getReferralTypeLabel(member.referralType)}
                            />
                        </FormGroup>
                    </div>
                )} */}
            </div>
        );
    }
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(AccountSelect));
