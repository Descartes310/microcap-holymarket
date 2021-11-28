import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import { setRequestGlobalAction, creditCounterCashdesk } from "Actions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';

class CreditCashdeskModal extends Component {

    state = {
        amount: 0
    }

    constructor(props) {
        super(props);
    }

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    onSubmit = () => {
        if (this.state.amount > 0) {
            
            this.props.setRequestGlobalAction(true);

            let data = {
                amount: this.state.amount
            };

            creditCounterCashdesk(this.props.cashdesk.id, data)
                .then(() => {
                    NotificationManager.success("La caisse a été créditée avec succès");
                    this.props.onClose();
                })
                .catch(() => null)
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {

        const { show, cashdesk, onClose } = this.props;

        return (
            <Dialog
                fullWidth
                open={show}
                maxWidth={'sm'}
                onClose={() => onClose()}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <div className="row justify-content-between align-items-center">
                        <h2>Créditer la caisse {cashdesk.label}</h2>
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            onClick={() => onClose()}
                        >
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Form onSubmit={this.onSubmit}>
                        <div className="row">
                            <FormGroup className="col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="label">
                                    Montant à créditer
                                </InputLabel>
                                <InputStrap
                                    required
                                    id="amount"
                                    type={'number'}
                                    name={'amount'}
                                    value={this.state.amount}
                                    className="has-input input-lg input-border"
                                    onChange={event => this.handleOnFormChange('amount', event.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="row mb-10">
                            <Button
                                color="primary"
                                className="fw-bold btn-submit text-white"
                                onClick={() => this.onSubmit()}
                            >
                                Créditer la caisse
                            </Button>
                        </div>
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }
}
export default connect(() => { }, { setRequestGlobalAction })(injectIntl(CreditCashdeskModal));
