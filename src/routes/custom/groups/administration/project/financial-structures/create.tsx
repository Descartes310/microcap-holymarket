import { connect } from 'react-redux';
import { FUNDING, GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UnitSelect from 'Components/UnitSelect';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [option, setOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [amount, setAmount] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [quantity, setQuantity] = useState(null);

    useEffect(() => {
        getOptions();
    }, []);

    const getOptions = () => {
        props.setRequestGlobalAction(true);
        let data: any = {
            type: new URLSearchParams(props.location.search).get("type") ?? 'PROJECT'
        }
        let reference = new URLSearchParams(props.location.search).get("reference");
        if(reference) {
            data.reference = reference;
        }
        GroupService.getFundingOptions(data).then(response => {
            setOptions(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!option || !quantity || !label) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            label, 
            emission: quantity,
            nominal_amount: amount,
            funding_option_reference: option.reference,
            type: new URLSearchParams(props.location.search).get("type") ?? 'PROJECT',
        }

        let reference = new URLSearchParams(props.location.search).get("reference");
        if(reference) {
            data.reference = reference;
        }

        GroupService.createFinancialStructure(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            let type = new URLSearchParams(props.location.search).get("type") ?? 'PROJECT'
            let reference = new URLSearchParams(props.location.search).get("reference");
            if(type == 'BIGDEAL' && reference) {
                props.history.push(joinUrlWithParamsId(FUNDING.FINANCIAL_STRUCTURES.ITEM.STRUCTURES, reference))
            } else {
                props.history.push(GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.LIST);
            }
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>

            <PageTitleBar
                title={"Structures financieres"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Intitulé
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>

                    <div className='row'>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Option de financement
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={option}
                                options={options}
                                onChange={(__, item) => {
                                    setOption(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Valeur faciale
                            </InputLabel>
                            <InputStrap
                                required
                                id="amount"
                                type="number"
                                name='amount'
                                value={amount}
                                className="input-lg"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormGroup>
                        <UnitSelect label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
                    </div>

                    <div className='row'>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="quantity">
                                Emission (nombre de support à emettre)
                            </InputLabel>
                            <InputStrap
                                required
                                id="quantity"
                                type="number"
                                name='quantity'
                                value={quantity}
                                className="input-lg"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="emissionPrime">
                                Prime d'émission
                            </InputLabel>
                            <InputStrap
                                type="text"
                                disabled={true}
                                id="emissionPrime"
                                name="emissionPrime"
                                className="input-lg"
                                value={(amount && option && currency) ? getPriceWithCurrency(Math.max(0, amount - option.nominalAmount), currency.code) : '0'}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="total">
                                Montant total
                            </InputLabel>
                            <InputStrap
                                id="total"
                                name="total"
                                type="text"
                                disabled={true}
                                className="input-lg"
                                value={(amount && option && currency && quantity) ? getPriceWithCurrency(Math.max(0, amount - option.nominalAmount) * quantity, currency.code) : '0'}
                            />
                        </FormGroup>
                    </div>

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
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));