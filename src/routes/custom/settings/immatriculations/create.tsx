import { connect } from 'react-redux';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import TerritoryType from "Enums/Territories";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import { referraTypes } from 'Helpers/helpers';
import SettingService from 'Services/settings';
import { territoriesTypes } from 'Helpers/datas';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TerritoryService from 'Services/territories';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [code, setCode] = useState('');
    const [label, setLabel] = useState('');
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState(null);
    const [countries, setCountries] = useState([]);
    const [continents, setContinents] = useState([]);
    const [continent, setContinent] = useState(null);
    const [territories, setTerritories] = useState([]);
    const [description, setDescription] = useState('');
    const [referralType, setReferralType] = useState(null);
    const [territoryType, setTerritoryType] = useState(null);

    useEffect(() => {
        if(territoryType?.value == 'MAINLAND') {
            getContinents();
        }
    }, [territoryType]);

    useEffect(() => {
        if(continent) {
            getRegions();
        }
    }, [continent]);

    useEffect(() => {
        if(region) {
            getCountries();
        }
    }, [region]);

    const getCountries = () => {
        TerritoryService.getTerritoryChild({id: region?.id})
        .then(countries => {
            setCountries(countries);
        })
        .catch(error => {
            setCountries([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    const getContinents = () => {
        TerritoryService.getTerritories(TerritoryType.MAINLAND)
        .then(continents => {
            setContinents(continents);
        })
        .catch(error => {
            setContinents([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    const getRegions = () => {
        TerritoryService.getTerritoryChild({id: continent?.id})
        .then(regions => {
            setRegions(regions);
        })
        .catch(error => {
            setRegions([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    const onSubmit = () => {

        if(!label || !code || (territories.length <= 0 && !region && !continent) || !referralType) {
            return;
        }

        let data: any = {
            code: code,
            label: label,
            description: description,
            referralType: referralType.value,
        }

        if(territories.length > 0) {
            data.territories = territories.map(t => t.id);
        } else {
            if(region) {
                data.territories = [region.id];
            } else {
                if(continent) {
                    data.territories = [continent.id];
                } else {
                    return;
                }
            }
        }
            
        props.setRequestGlobalAction(true);
        SettingService.createImmatriculation(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            props.history.push(SETTING.IMMATRICULATION.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Création d'une immatriculation"}
            />
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
                    <FormGroup className="has-wrapper">
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Cible
                        </InputLabel>
                        <Autocomplete
                            value={referralType}
                            id="combo-box-demo"
                            options={referraTypes()}
                            onChange={(__, item) => {
                                setReferralType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                        <InputLabel className="text-left">
                            Type de territoires
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={territoryType}
                            options={territoriesTypes()}
                            classes={{ paper: 'custom-input' }}
                            getOptionLabel={(option) => option.label}
                            onChange={(__, item) => { setTerritoryType(item) }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    { territoryType?.value == 'MAINLAND' && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                            <InputLabel className="text-left">
                                Continents
                            </InputLabel>
                            <Autocomplete
                                value={continent}
                                options={continents}
                                id="combo-box-demo"
                                classes={{ paper: 'custom-input' }}
                                getOptionLabel={(option) => option.label}
                                onChange={(__, item) => { setContinent(item) }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )}

                    { continent && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                            <InputLabel className="text-left">
                                Sous régions (laisser vide pour considérer tout le continent)
                            </InputLabel>
                            <Autocomplete
                                value={region}
                                options={regions}
                                id="combo-box-demo"
                                classes={{ paper: 'custom-input' }}
                                getOptionLabel={(option) => option.label}
                                onChange={(__, item) => { setRegion(item) }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )}

                    { region && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                            <InputLabel className="text-left">
                                Pays (laisser vide pour considérer toute la région)
                            </InputLabel>
                            <Autocomplete
                                multiple
                                value={territories}
                                options={countries}
                                id="combo-box-demo"
                                classes={{ paper: 'custom-input' }}
                                getOptionLabel={(option) => option.label}
                                onChange={(__, items) => { setTerritories(items) }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));