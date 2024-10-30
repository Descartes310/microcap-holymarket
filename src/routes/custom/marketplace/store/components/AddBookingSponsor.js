import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import AccountSelect from 'Components/AccountSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';


const AddBookingSponsor = (props) => {

    const [account, setAccount] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const {show, onClose} = props;

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajouter un sponsor
                </h3>
            )}
        >
            <RctCardContent>
                <Form onSubmit={props.onSubmit}>
                    <AccountSelect isSubscritpion={true} onChange={(_, account) => {
                        setAccount(account);
                    }}/>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Compte
                        </InputLabel>
                        <Autocomplete
                            value={account}
                            options={props.accounts}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setAccount(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="quantity">
                            Plafond de sponsorisation
                        </InputLabel>
                        <InputStrap
                            required
                            id="quantity"
                            type="text"
                            name='quantity'
                            className="input-lg"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold"
                            onClick={() => {
                                props.onSubmit(account, quantity);
                                props.onClose();
                            }}
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCardContent>
        </DialogComponent>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(AddBookingSponsor));