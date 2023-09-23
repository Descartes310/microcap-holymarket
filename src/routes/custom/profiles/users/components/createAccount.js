import { connect } from 'react-redux';
import React, { useState } from 'react';
import AccountService from 'Services/accounts';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const CreateAccount = (props) => {

    const {show, onClose} = props;
    const [label, setLabel] = useState(null);
    const [bic, setBic] = useState(null);
    const [type, setType] = useState(null);
    const [iban, setIban] = useState(null);
    const [bankCode, setBankCode] = useState(null);
    const [agencyCode, setAgencyCode] = useState(null);

    const onSubmit = () => {

        if(!label || !iban || !bankCode || !agencyCode || !bic) {
            return;
        }

        let data = {
            label, iban, bic, type: type.value, bankCode, agencyCode
        };

        props.setRequestGlobalAction(true);

        AccountService.createExternalAccount(data).then(() => {
            NotificationManager.success('Le compte a été enregistré');
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            setType(null);
            setIban(null);
            setBic(null);
            setBankCode(null);
            setAgencyCode(null)
            props.setRequestGlobalAction(false);
            onClose(true);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer un nouveau compte
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Label
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
                <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                    <InputLabel className="text-left">
                        Type de compte
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={type}
                        options={[{name: "Bancaire", value: "BANK"}]}
                        onChange={(__, item) => {
                            setType(item);
                        }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                {type && (
                    <>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="agencyCode">
                                Code Agence
                            </InputLabel>
                            <InputStrap
                                required
                                id="agencyCode"
                                type="text"
                                name='agencyCode'
                                value={agencyCode}
                                className="input-lg"
                                onChange={(e) => setAgencyCode(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="bankCode">
                                Code Banque
                            </InputLabel>
                            <InputStrap
                                required
                                id="bankCode"
                                type="text"
                                name='bankCode'
                                value={bankCode}
                                className="input-lg"
                                onChange={(e) => setBankCode(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="iban">
                                IBAN
                            </InputLabel>
                            <InputStrap
                                required
                                id="iban"
                                type="text"
                                name='iban'
                                value={iban}
                                className="input-lg"
                                onChange={(e) => setIban(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="bic">
                                BIC
                            </InputLabel>
                            <InputStrap
                                required
                                id="bic"
                                type="text"
                                name='bic'
                                value={bic}
                                className="input-lg"
                                onChange={(e) => setBic(e.target.value)}
                            />
                        </FormGroup>
                    </>
                )}

                <Button
                    color="primary"
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateAccount));