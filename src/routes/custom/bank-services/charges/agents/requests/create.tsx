import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "PDF"];

const Create = (props) => {

    const [file, setFile] = useState(null);
    const [banks, setBanks] = useState([]);
    const [bank, setBank] = useState(null);
    const [amount, setAmount] = useState(null);
    const [paidAt, setPaidAt] = useState(null);
    const [coverages, setCoverages] = useState([]);
    const [coverage, setCoverage] = useState(null);
    const [coverageReference, setCoverageReference] = useState(null);    

    useEffect(() => {
        getBanks();
        getCoverages();
    }, []);

    const getCoverages = () => {
        props.setRequestGlobalAction(true),
        BankService.getCoverages()
        .then(response => setCoverages(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getBanks = () => {
        props.setRequestGlobalAction(true),
        BankService.getIntermediateBanks()
        .then(response => setBanks(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!amount || !paidAt || !coverageReference || !bank || !file || !coverage) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            amount,
            paidAt,
            proof: file,
            coverageReference,
            codeBank: bank.value,
            coverageId: coverage.id
        };

        //console.log(data);

        BankService.createChargeRequest(data, { fileData: ['proof'], multipart: true }).then(() => {
            NotificationManager.success("La demande de recharge a été créée avec succès");
            props.history.push(BANK.CHARGE.AGENT.REQUEST.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de la demande");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="amount">
                            Montant à recharger
                        </InputLabel>
                        <InputStrap
                            required
                            id="amount"
                            type="number"
                            name='amount'
                            className="input-lg"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </FormGroup>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Banque de paiement
                        </InputLabel>
                        <Autocomplete
                            value={bank}
                            id="combo-box-demo"
                            options={banks}
                            onChange={(__, item) => {
                                setBank(item);
                            }}
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Couverture
                        </InputLabel>
                        <Autocomplete
                            value={coverage}
                            id="combo-box-demo"
                            options={coverages}
                            onChange={(__, item) => {
                                setCoverage(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Reference couverture
                        </InputLabel>
                        <InputStrap
                            required
                            id="reference"
                            type="text"
                            name='reference'
                            className="input-lg"
                            value={coverageReference}
                            onChange={(e) => setCoverageReference(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="paidAt">
                            Date de paiement
                        </InputLabel>
                        <InputStrap
                            required
                            type="date"
                            id="paidAt"
                            name='paidAt'
                            className="input-lg"
                            value={paidAt}
                            onChange={(e) => setPaidAt(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Charger la couverture
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner la couverture ici"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));