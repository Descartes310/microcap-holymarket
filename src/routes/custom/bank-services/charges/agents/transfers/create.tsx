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

    const [child, setChild] = useState([]);
    const [amount, setAmount] = useState(null);
    const [source, setSource] = useState(null);  
    const [target, setTarget] = useState(null);  

    useEffect(() => {
        getChild();
    }, []);

    const getChild = () => {
        props.setRequestGlobalAction(true),
        BankService.getChild()
        .then(response => setChild(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!amount || !source || !target) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            amount,
            source, target
        };


        // BankService.createChargeRequest(data, { fileData: ['proof'], multipart: true }).then(() => {
        //     NotificationManager.success("La demande de recharge a été créée avec succès");
        //     props.history.push(BANK.CHARGE.AGENT.TRANSFER.LIST);
        // }).catch((err) => {
        //     console.log(err);
        //     NotificationManager.error("Une erreur est survenu lors de la création de la demande");
        // }).finally(() => {
        //     props.setRequestGlobalAction(false);
        // })
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
                            Payeur
                        </InputLabel>
                        <Autocomplete
                            value={source}
                            id="combo-box-demo"
                            options={child}
                            onChange={(__, item) => {
                                setSource(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Béneficiare
                        </InputLabel>
                        <Autocomplete
                            value={target}
                            id="combo-box-demo"
                            options={child}
                            onChange={(__, item) => {
                                setTarget(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
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