import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import AccountService from 'Services/accounts';
import { withRouter } from "react-router-dom";
import { FormGroup, Button  } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CreateInjectionModal extends Component {
  
    state = {
        proof: null,
        transactions: [],
        transaction: null,
        hasBankDeposit: true
    }

    constructor(props) {
        super(props);
        this.getTransactions();
    }    

    getTransactions = () => {
        this.props.setRequestGlobalAction(true),
        AccountService.getFreezingTransactions({types: ['CANTONATION']})
        .then(response => this.setState({ transactions: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {

        const { transaction, proof, hasBankDeposit } = this.state;

        if(!transaction) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {transaction_reference: transaction.reference, proof, hasBankDeposit};

        BankService.createInjection(data, { fileData: ['proof'], multipart: true }).then(() => {
            NotificationManager.success("L'injection a été demandée avec succès");
            this.props.onClose();
        }).catch((err) => {
            NotificationManager.error("Associé un IBAN au compte d'injection");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;

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
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Cantonnements disponibles
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={this.state.transaction}
                            options={this.state.transactions}
                            onChange={(__, item) => {
                                this.setState({ transaction: item });
                            }}
                            getOptionLabel={(option) => `Cantonnement de ${option.amount} ${option.currency} du ${option.valueDate} (${option.reason})`}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={this.state.hasBankDeposit}
                                onChange={(e) => this.setState({ hasBankDeposit: e.target.checked })}
                            />
                        } label={"J'ai fais mon versement à la banque"}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="proof">
                            Justificatif
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionnez le justificatif"
                            handleChange={(file) => { this.setState({ proof: file })}} name="file" types={["PDF", "JPG", "PNG"]} />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Créer l'injection
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreateInjectionModal)));