import { connect } from 'react-redux';
import {Form, FormGroup} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const AddConsolidation = (props) => {

    const {show, onClose, currentAccount} = props;
    
    const [account, setAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getAccounts()
        .then(response => setAccounts(response.filter(a => a.id != currentAccount.id)))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {        
        if(!account) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }
        props.setRequestGlobalAction(true);
        AccountService.addConsolidation(currentAccount?.reference, account?.reference)
        .then((response) => {
            onClose();
        })
        .finally(() => {
            setAccount(null);
            props.setRequestGlobalAction(false);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajouter un compte
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Comptes
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={account}
                        options={accounts}
                        onChange={(__, item) => {
                            setAccount(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>

                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onSubmit}
                        className="text-white font-weight-bold"
                    >
                        Enregistrer
                    </Button>
                </FormGroup>
            </Form>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AddConsolidation));