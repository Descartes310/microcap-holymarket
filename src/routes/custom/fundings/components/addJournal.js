import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UserSelect from 'Components/UserSelect';
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const AddJournal = (props) => {

    const {show, onClose, currentAccount} = props;
    
    const [label, setLabel] = useState(null);
    const [member, setMember] = useState(null);
    const [account, setAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if(member) {
            getAccounts();
        }
    }, [member]);

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getAccountBySpeciality({special_product: 'CODEV', referral_code: member.referralCode})
        .then(response => setAccounts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {        
        if(!account || !label) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }
        props.setRequestGlobalAction(true);
        AccountService.createJournal(currentAccount?.reference, {label, codev_reference: account.reference})
        .then(() => {
            onClose();
            NotificationManager.success('Le journal a été créé');
        })
        .catch((err) => {
            NotificationManager.error('Une erreur est survenue, veuillez reessayer plus tard')
        })
        .finally(() => {
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
                    Ajouter un journal
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Désignation du journal
                    </InputLabel>
                    <InputStrap
                        required
                        id="label"
                        type="text"
                        name='label'
                        value={label}
                        className="input-lg"
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </FormGroup>
                <UserSelect label={'Numéro utilisateur'} fromMyOrganisation={false} onChange={(_, user) => {
                    setMember(user);
                }}/>
                { member && (
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
                )}

                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onSubmit}
                        disabled={!account || !label}
                        className="text-white font-weight-bold"
                    >
                        Enregistrer
                    </Button>
                </FormGroup>
            </Form>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AddJournal));