import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AccountSelect from 'Components/AccountSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { bookingAdvantages, bookingNatures } from 'Helpers/datas';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Create = (props) => {

    const [code, setCode] = useState('');
    const [label, setLabel] = useState('');
    const [nature, setNature] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sponsor, setSponsor] = useState(null);
    const [discounts, setDiscounts] = useState([]);
    const [useLimit, setUseLimit] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [advantages, setAdvantages] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [sponsorLimit, setSponsorLimit] = useState(null);
    const [hasAdvantages, setHasAdvantages] = useState(false);

    useEffect(() => {
        getDiscounts();
    }, []);

    const getDiscounts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getDiscountModels()
            .then((response) => setDiscounts(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        if(!label || !code || !startDate || !endDate || !useLimit || !nature) {
            NotificationManager.error('Le formulaire n\'est pas bien renseigné');
            return;
        }

        var data: any = {
            startDate, endDate, code,
            label, useLimit, nature: nature.value,
        }

        props.setRequestGlobalAction(true);

        ProductService.createBooking(data).then(() => {
            NotificationManager.success('Le code a été créé avec succès');
            props.history.push(MARKETPLACE.STORE.BOOKING.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Un code de reservation avec ce code existe déjà');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
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
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="code">
                                Code
                            </InputLabel>
                            <InputStrap
                                required
                                id="code"
                                type="text"
                                name='code'
                                className="input-lg"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="useLimit">
                                Nombre d'utilisation maximal
                            </InputLabel>
                            <InputStrap
                                required
                                id="useLimit"
                                type="number"
                                name='useLimit'
                                className="input-lg"
                                value={useLimit}
                                onChange={(e) => setUseLimit(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="startDate">
                                Date de début
                            </InputLabel>
                            <InputStrap
                                required
                                id="startDate"
                                type="date"
                                name='startDate'
                                className="input-lg"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="endDate">
                                Date de fin
                            </InputLabel>
                            <InputStrap
                                required
                                id="endDate"
                                type="date"
                                name='endDate'
                                value={endDate}
                                className="input-lg"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Contexte d'utilisation
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={nature}
                            options={bookingNatures()}
                            onChange={(__, item) => {
                                setNature(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={hasAdvantages}
                                onChange={() => setHasAdvantages(!hasAdvantages)}
                            />
                        } label={'Configurer des avantages'}
                        />
                    </FormGroup>
                    { hasAdvantages && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Liste des avantages
                            </InputLabel>
                            <Autocomplete
                                multiple={true}
                                id="combo-box-demo"
                                value={advantages}
                                options={bookingAdvantages()}
                                onChange={(__, items) => {
                                    console.log(items)
                                    setAdvantages(items);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}

                    { advantages.find(a => a.value == 'PAYOUT_BOND' || a.value == 'SHOP_BOND') && (
                        <AccountSelect isSubscritpion={true} isPayment={false} onChange={(_, account) => {
                            setSponsor(account);
                        }}/>
                    )}

                    { advantages.find(a => a.value == 'PAYOUT_BOND' || a.value == 'SHOP_BOND') && sponsor && (
                        <div className='row'>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="sponsor">
                                    Plafond de sponsorisation
                                </InputLabel>
                                <InputStrap
                                    required
                                    id="sponsor"
                                    type="number"
                                    name='sponsor'
                                    className="input-lg"
                                    value={sponsorLimit}
                                    onChange={(e) => setSponsorLimit(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="currency">
                                    Devise
                                </InputLabel>
                                <InputStrap
                                    disabled
                                    id="currency"
                                    type="text"
                                    name='currency'
                                    className="input-lg"
                                    value={sponsor.currencyCode}
                                />
                            </FormGroup>
                        </div>
                    )}
                    { advantages.find(a => a.value == 'DISCOUNT') && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Coupons de réduction
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={discount}
                                options={discounts}
                                onChange={(__, item) => {
                                    setDiscount(item);
                                }}
                                getOptionLabel={(option) => `${option.label} - ${option.percentage}%`}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}
                        
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