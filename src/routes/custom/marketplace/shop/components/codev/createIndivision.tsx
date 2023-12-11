import { connect } from 'react-redux';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputLabel, TextField } from '@material-ui/core';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";

const Indivision = (props) => {

    const { show, onClose } = props;
    const [amount, setAmount] = useState(null);
    const [distribution, setDistribution] = useState(null);
    const [denomination, setDenomination] = useState(null);

    const onSumit = () => {

        if(!denomination || !amount || !distribution) {
            return;
        }

        let depositAmount = Number(props?.data.product?.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value);

        if(amount >= depositAmount) {
            alert("Le montant du versement unitaire est incorrect");
        }

        let data = {
            unitAmount: amount,
            denomination: denomination,
            distribution: distribution.value
        }

        props.onValidate(data);
        onClose();
    }

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Nouvelle Indivision
                </h3>
            )}
        >
            <RctCardContent>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                    Une indivision autorise plusieurs personnes à faire les versements sur un même compte/plan d'épargne
                </div>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                    <h4 className='mb-40'>Montant périodique: {getPriceWithCurrency(props?.data.product?.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value, props?.data.product?.details.find(d => d.type == 'PRICE_CURRENCY')?.value)}</h4>
                    <div className='row'>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Montant du versement unitaire
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="amount"
                                name='amount'
                                className="input-lg"
                                value={amount}
                                max={props?.data.product?.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row d-flex align-items-center">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="denomination">
                                Dénomination de l'indivision
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="denomination"
                                name='denomination'
                                className="input-lg"
                                value={denomination}
                                onChange={(e) => setDenomination(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Distribution de l'indivision
                            </InputLabel>
                            <Autocomplete
                                value={distribution}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setDistribution(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={[
                                    // {label: 'Libre', value: 'PUBLIC'}, 
                                    {label: 'Privée', value: 'PRIVATE'}
                                ]}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => onClose()}
                            className="primary font-weight-bold mb-20"
                        >
                            Annuler
                        </Button>
                    </FormGroup>
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSumit()}
                            className="text-white font-weight-bold mb-20"
                        >
                            Créer l'indivision
                        </Button>
                    </FormGroup>
                </div>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Indivision));