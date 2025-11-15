import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RECHARGE_METHODS } from 'Helpers/helpers';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Button, FormGroup, Input as InputStrap } from 'reactstrap';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "PDF"];
const paymentsTypes = ['ACCOUNT_DEPOSIT', 'MICROCAP_TRANSFER'];
class OperationProvisioning extends Component {

    state = {
        amount: 0,
        file: null,
        paymentMethod: null,
        paymentReference: null
     }
  
     constructor(props) {
        super(props);
     }

     onValidate = () => {
        const { amount, paymentMethod, paymentReference, file } = this.state;

        if(!amount || !paymentMethod) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        if(paymentsTypes.includes(paymentMethod.value)) {
            if(!paymentReference) {
                NotificationManager.error('Veuillez bien remplir le formulaire')
                return;
            }
        }
        this.props.onSubmit(amount, paymentMethod.value, paymentReference, file);
     }

    render() {

        const { onClose, show, title } = this.props;
        const { amount, paymentMethod, paymentReference } = this.state;

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
                        <FormGroup className="has-wrapper col-md-12 col-sm-12">
                            <InputLabel className="text-left" htmlFor="label">
                                Montant à payer
                            </InputLabel>
                            <InputStrap
                                required
                                id="amount"
                                type="number"
                                name='amount'
                                value={amount}
                                className="input-lg"
                                onChange={(e) => this.setState({ amount: e.target.value })}
                            />
                        </FormGroup>
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Mode de paiement
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                options={RECHARGE_METHODS}
                                value={paymentMethod}
                                onChange={(__, item) => {
                                    this.setState({ paymentMethod: item });
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        { (paymentMethod && paymentsTypes.includes(paymentMethod.value)) && (
                            <>
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="paymentReference">
                                        Référence de le l'opération
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        type="text"
                                        id="paymentReference"
                                        name='paymentReference'
                                        className="input-lg"
                                        value={paymentReference}
                                        onChange={(e) => this.setState({ paymentReference: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="title">
                                        Charger la preuve
                                    </InputLabel>
                                    <FileUploader
                                        classes="mw-100"
                                        label="Sélectionner la preuve ici"
                                        handleChange={(file) => {
                                            this.setState({ file })
                                        }} name="file" types={fileTypes} />
                                </FormGroup>
                            </>
                        )}
                        <Button
                            color="primary"
                            disabled={amount <= 0 || !paymentMethod}
                            className="w-100 ml-0 mt-15 text-white"
                            onClick={() => this.onValidate()}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(OperationProvisioning)));