import { connect } from 'react-redux';
import UserService from 'Services/users';
import TerritoryType from "Enums/Territories";
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TerritoryService from 'Services/territories';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import { FormGroup, Col, Button, Label, Input } from 'reactstrap';

const UpdateAddress = (props) => {

    const {show, onClose, item} = props;
    const [zip, setZip] = useState(item.zipCode);
    const [city, setCity] = useState(item.city);
    const [label, setLabel] = useState(item.label);
    const [region, setRegion] = useState(item.region);
    const [country, setCountry] = useState(null);
    const [address, setAddress] = useState(item.address);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = () => {
        TerritoryService.getTerritories(TerritoryType.COUNTRY)
        .then(response => {
            setCountries(response);
            setCountry(response.find(c => c.details.find(d => d.code == 'ISO2')?.value === item.country));
        })
        .catch(error => {
            setCountries([]);
            NotificationManager.error("An error occur " + error);
        });
     };

    const onSubmit = () => {
        
        if(!label || !address || !zip || !city || !region || !country) {
            NotificationManager.error("Le formulaire n'est pas bien renseigné");
            return;
        }
        
        let data = {
            label, country: country.details.find(d => d.code == 'ISO2')?.value ?? 'CM', region, city, address, zip
        };
        
        
        props.setRequestGlobalAction(true);
        UserService.updateAddress(item.reference, data).then(() => {
            NotificationManager.success('L\'adresse a été enregistré');
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            setCountry(null);
            setRegion(null);
            setLabel(null);
            setCity(null);
            setAddress(null);
            setZip(null);
            onClose(true);
            props.setRequestGlobalAction(false);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={() => onClose(false)}
            size="md"
            title={(
                <h3 className="fw-bold">
                    {props.title ? props.title : 'Editer l\'adresse'}
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup row>
                  <Col sm={12} md={6}>
                     <Label for="label">Désignation</Label>
                     <Input
                        type="text"
                        name="label"
                        id="label"
                        className="mb-4 mb-sm-0 input-lg"
                        value={label}
                        onChange={(e) => {
                            setLabel(e.target.value)
                        }}
                     />
                  </Col>
                  <Col sm={12} md={6}>
                     <Label for="address">Adresse</Label>
                     <Input
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        className="mb-4 mb-sm-0 input-lg"
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Col sm={12} md={6}>
                     <Label className="text-left">
                        Pays
                     </Label>
                     <Autocomplete
                        id="combo-box-demo"
                        options={countries}
                        classes={{ paper: 'custom-input' }}
                        getOptionLabel={(option) => option.label}
                        value={country}
                        onChange={(__, item) => {
                            setCountry(item)
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                     />
                  </Col>
                  <Col sm={12} md={6}>
                     <Label for="stateName">Region/Province/Etat</Label>
                     <Input
                        type="text"
                        name="state"
                        id="stateName"
                        value={region}
                        className="mb-4 mb-sm-0 input-lg"
                        onChange={(e) => {
                            setRegion(e.target.value)
                        }}
                     />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} md={6}>
                     <Label for="city">Ville</Label>
                     <Input
                        type="text"
                        name="city"
                        id="city"
                        value={city}
                        className="mb-10 mb-sm-0 input-lg"
                        onChange={(e) => {
                            setCity(e.target.value)
                        }}
                     />
                  </Col>
                  <Col sm={12} md={6}>
                     <Label for="zip">Code ZIP</Label>
                     <Input
                        type="number"
                        name="zip"
                        id="zip"
                        value={zip}
                        className="mb-4 mb-sm-0 input-lg"
                        onChange={(e) => {
                            setZip(e.target.value)
                        }}
                     />
                  </Col>
                </FormGroup>
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(UpdateAddress));