import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import AppConfig from 'Constants/AppConfig';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import StripeCheckout from 'react-stripe-checkout';
import { RctCardContent } from 'Components/RctCard';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class DebitAccount extends Component {

    state = {
        amount: 0,
        label: '',
        showStripeBox: false,
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {}
  
     onDebit = () => {
        this.props.onSubmit(this.state.amount, this.state.label);
     }
  

    render() {

        const { onClose, show, title } = this.props;
        const { label, amount } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="sm"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <FormGroup tag="fieldset">

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
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

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Raison du débit
                            </InputLabel>
                            <Input
                                required
                                id="label"
                                type="text"
                                name='label'
                                value={label}
                                className="input-lg"
                                onChange={(e) => this.setState({ label: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Button
                                color="primary"
                                disabled={amount <= 0}
                                onClick={() => this.onDebit()}
                                className="w-100 ml-0 mt-15 text-white"
                            >
                                Débiter
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(DebitAccount)));