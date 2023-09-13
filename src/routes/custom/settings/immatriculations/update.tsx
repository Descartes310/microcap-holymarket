import { connect } from 'react-redux';
import { SETTING } from 'Url/frontendUrl';
import SettingService from 'Services/settings';
import TerritoryType from "Enums/Territories";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import { referraTypes } from 'Helpers/helpers';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TerritoryService from 'Services/territories';
import IconButton from "@material-ui/core/IconButton";
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [code, setCode] = useState('');
    const [label, setLabel] = useState('');
    const [countries, setCountries] = useState([]);
    const [territories, setTerritories] = useState([]);
    const [description, setDescription] = useState('');
    const [referralType, setReferralType] = useState(null);
    const [immatriculation, setImmatriculation] = useState(null);

    useEffect(() => {
        findImmatriculation();
        getCountries();
    }, []);

    useEffect(() => {
        if(countries.length > 0 && immatriculation) {
            setTerritories(countries.filter(c => immatriculation.territories?.split(',').includes(c.reference)));
        }
    }, [countries, immatriculation])

    const findImmatriculation = () => {
        setRequestGlobalAction(true),
        SettingService.findImmatriculation(props.match.params.id)
        .then(response => {
            setImmatriculation(response);
            setCode(response.code);
            setLabel(response.label);
            setDescription(response.description);
            setReferralType(referraTypes().find(t => t.value == response.referralType));
        }).finally(() => setRequestGlobalAction(false))
    }

    const getCountries = () => {
        TerritoryService.getTerritories(TerritoryType.COUNTRY)
        .then(countries => {
            setCountries(countries);
        })
        .catch(error => {
            setCountries([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    const onSubmit = () => {

        if(!label || !code || territories.length <= 0 || !referralType)
            return

        props.setRequestGlobalAction(true);

        let data: any = {
            code: code,
            label: label,
            description: description,
            referralType: referralType.value,
            territories: territories.map(t => t.reference)
        }

        SettingService.updateImmatriculation(props.match.params.id, data).then(() => {
            NotificationManager.success("L'item a été édité avec succès");
            props.history.push(SETTING.IMMATRICULATION.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de l'édition de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Edition de l'immatriculation"}
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
                            Pays autorisés
                        </InputLabel>
                        <Autocomplete
                            multiple
                            value={territories}
                            options={countries}
                            id="combo-box-demo"
                            classes={{ paper: 'custom-input' }}
                            getOptionLabel={(option) => option.label}
                            onChange={(__, items) => { setTerritories(items) }}
                            renderTags={options => {
                                return (
                                    options.map(option =>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                            <IconButton color="primary">
                                                <img src={option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }}/>
                                            </IconButton>
                                            {option.label}
                                        </div>
                                    )
                                )
                        
                            }}
                            renderOption={option => {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                        <IconButton color="primary">
                                            <img src={option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }} />
                                        </IconButton>
                                        {option.label}
                                    </div>
                                );
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));