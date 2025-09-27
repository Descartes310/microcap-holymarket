import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { MARKETPLACE } from 'Url/frontendUrl';
import UnitSelect from 'Components/UnitSelect';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeliveryZoneService from 'Services/delivery-zones';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { deliveryZoneTypes } from 'Helpers/helpers';

const CreateDeliveryZone = (props) => {

    const [type, setType] = useState(null);
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState(null);


    const onSubmit = () => {

        if(!type || !label || !price || !currency){
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        console.log(currency);

        let data = {
            type: type.value,
            label: label,
            description: description,
            price: parseFloat(price),
            currency: currency?.code
        };

        props.setRequestGlobalAction(true);
        DeliveryZoneService.createDeliveryZone(data).then(() => {
            NotificationManager.success("La zone de livraison a été créée avec succès");
            props.history.push(MARKETPLACE.DELIVERY.ZONE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de la création de la zone de livraison");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'une zone de livraison"} onBackClick={() => props.history.push(MARKETPLACE.DELIVERY.ZONE.LIST)}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type
                        </InputLabel>
                        <Autocomplete
                            value={type}
                            id="type-select"
                            options={deliveryZoneTypes()}
                            onChange={(__, item) => {
                                setType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <div className='row'>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="price">
                                Prix de livraison
                            </InputLabel>
                            <InputStrap
                                required
                                id="price"
                                type="number"
                                name='price'
                                value={price}
                                className="input-lg"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormGroup>
                        <UnitSelect className="col-md-6 col-sm-12 has-wrapper" label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateDeliveryZone));