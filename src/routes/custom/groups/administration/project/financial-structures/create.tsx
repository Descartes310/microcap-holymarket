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
import FundingService from 'Services/funding';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [deals, setDeals] = useState([]);
    const [deal, setDeal] = useState(null);
    const [option, setOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [amount, setAmount] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [prospectus, setProspectus] = useState(null);
    const [itemReference] = useState(new URLSearchParams(props.location.search).get("reference"))
    const [itemType] = useState(new URLSearchParams(props.location.search).get("type") ?? 'PROJECT')

    useEffect(() => {
        if(itemType === 'MEMBER') {
            getDeals();
        } else {
            getOptions();
        }
    }, []);

    useEffect(() => {
        if(deal) {
            getActiveProspectus();
            getOptions();
        }
    }, [deal]);

    const getDeals = () => {
        props.setRequestGlobalAction(true),
        FundingService.getRequests({mine: true, received: false, type: 'BIGDEAL'})
        .then(response => setDeals(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getActiveProspectus = () => {
        props.setRequestGlobalAction(true);
        let data: any = {
            type: itemType
        }
        let reference = deal.reference;
        if(reference) {
            data.reference = reference;
        }
        FundingService.getActiveProspectus(data).then(response => {
            setProspectus(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }    

    const getOptions = () => {
        props.setRequestGlobalAction(true);
        let data: any = {
            type: deal ? 'BIGDEAL' : itemType
        }
        let reference = deal ? deal.reference : itemReference;
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

        if(itemType === 'BIGDEAL' && prospectus == null) {
            NotificationManager.error('Pas de prospectus actif')
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            label, 
            type: itemType,
            emission: quantity,
            nominal_amount: amount,
            funding_option_reference: option.reference,
        }

        let reference = itemReference;
        if(reference) {
            data.reference = reference;
        }
        if(prospectus) {
            data.prospectus_reference = prospectus.reference;
        }

        GroupService.createFinancialStructure(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            let type = itemType
            let reference = itemReference;
            if(type == 'MEMBER' && reference) {
                props.history.push(FUNDING.FINANCIAL_STRUCTURES.ITEM.LIST)
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

                    { itemType === 'MEMBER' && (
                        <div className='row'>
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Big deals
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={deal}
                                    options={deals}
                                    onChange={(__, item) => {
                                        setDeal(item);
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                        </div>
                    )}

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
                                disabled={itemType !== 'PROJECT' && !deal}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    { itemType === 'MEMBER' && (
                        <>
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="prospectus">
                                    Prospectus
                                </InputLabel>
                                <InputStrap
                                    disabled
                                    id="prospectus"
                                    type="text"
                                    name='prospectus'
                                    className="input-lg"
                                    value={prospectus?.label}
                                />
                            </FormGroup>
                        </>
                    )}

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