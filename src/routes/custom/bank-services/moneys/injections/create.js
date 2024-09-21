import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import UnitService from 'Services/units';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CreateInjectionModal extends Component {
  
    state = {
        units: [],
        proof: null,
        amount: null,
        mandates: [],
        mandate: null,
        currency: null,
        hasBankDeposit: true
    }

    constructor(props) {
        super(props);
        this.getMandates();
        this.getUnits();
    }    

    getMandates = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getMandates()
        .then(response => this.setState({ mandates: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getUnits = () => {
        this.props.setRequestGlobalAction(false);
        UnitService.getUnits()
        .then((response) => this.setState({ units: response }))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {

        const { amount, mandate, currency, proof, hasBankDeposit } = this.state;

        if(!amount || !mandate || !currency) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {amount, party_reference: mandate.reference, currency: currency.code, proof, hasBankDeposit};

        BankService.createInjection(data, { fileData: ['proof'], multipart: true }).then(() => {
            NotificationManager.success("L'injection a été demandée avec succès");
        }).catch((err) => {
            NotificationManager.error("Associé un IBAN au compte d'injection");
        }).finally(() => {
            this.props.onClose();
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="amount">
                            Montant à injecter
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="amount"
                            name='amount'
                            value={this.state.amount}
                            className="input-lg"
                            onChange={(e) => this.setState({ amount: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Devise
                        </InputLabel>
                        <Autocomplete
                            value={this.state.unit}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ currency: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            options={this.state.units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Banques
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={this.state.mandate}
                            options={this.state.mandates}
                            onChange={(__, item) => {
                                this.setState({ mandate: item });
                            }}
                            getOptionLabel={(option) => option.label}
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