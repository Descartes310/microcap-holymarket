import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import UserService from 'Services/users';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';

class verifyUserOTPModal extends Component {

    state = {
        otp: null
    }

    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        if(this.props.type == "INIT_OPERATION") {
            if(!this.props.accountId || !this.state.otp) {
                NotificationManager.error("Le formulaire n'est pas correctement renseigné");
                return;
            }

            let data = {
                otp: this.state.otp,
                accountId: this.props.accountId,
            };

            this.props.setRequestGlobalAction(true);
            BankService.checkCodeToClient(data).then(() => {
                this.props.callback(this.state.otp);
            }).catch(err => {
                NotificationManager.error("Code incorrect");
            }).finally(() => {
                this.props.setRequestGlobalAction(false);
            });
        } else {
            if(this.props.type == "CONFIRM_OPERATION") {
                this.props.callback(this.state.otp);
            } else {
                if(!this.props.type || !this.state.otp) {
                    NotificationManager.error("Le formulaire n'est pas correctement renseigné");
                    return;
                }
    
                let data = {
                    otp: this.state.otp, type: this.props.type
                };
    
                this.props.setRequestGlobalAction(true);
                UserService.findAuthOTP(data).then(() => {
                    this.props.callback(this.state.otp);
                }).catch(err => {
                    NotificationManager.error("Code incorrect");
                }).finally(() => {
                    this.props.setRequestGlobalAction(false);
                });
            }
        }
    }

    render() {
        const { onClose, show, title } = this.props;
        const { otp } = this.state;
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
                <Form onSubmit={this.onSubmit}>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="otp">
                            Code OTP
                        </InputLabel>
                        <InputStrap
                            type="text"
                            value={otp}
                            className="input-lg"
                            onChange={(e) => this.setState({ otp: e.target.value })}
                        />
                    </FormGroup>
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onClose()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Annuler
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Continuer
                        </Button>
                    </div>
                </Form>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(verifyUserOTPModal)));