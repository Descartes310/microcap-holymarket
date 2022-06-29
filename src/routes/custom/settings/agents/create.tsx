import { connect } from 'react-redux';
import { SETTING } from 'Url/frontendUrl';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import TerritoryType from "Enums/Territories";
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import TerritoryService from "Services/territories";
import { FileUploader } from "react-drag-drop-files";
import Select from "@material-ui/core/Select/Select";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
const TYPES = [
    { name: 'Dirigeant Microcap', value: 'MANAGER' },
    { name: 'Pionnier Up', value: 'PASS_UP' },
    { name: 'Pionnier Leader', value: 'PASS_LEADER' },
    { name: 'Pionnier Privilège', value: 'PASS_PREMIUM' },
];

const Create = (props) => {

    const [post, setPost] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState(null);
    const [file, setFile] = useState(null);
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState(null);
    const [telephone, setTelephone] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        _getCountries();
    }, []);

    const onSubmit = () => {
        if(!name || !address || !telephone || !email || !country || !post) {
            NotificationManager.error('Veuillez renseigner toutes les informations');
            return;
        }

        let datas: any = {
            name, address, phone: telephone,
            email, country: country.label, 
            type: getType().value, about, post
        };

        if(file) {
            datas.avatar = file;
        }

        if(type)
            datas.nature = type;

        props.setRequestGlobalAction(true);
        
        SettingService.createAgent(datas, { fileData: ['avatar'], multipart: true }).then(() => {
            NotificationManager.success("L'agent a bien été créé");
            props.history.push(getType().value === 'AGENT' ? SETTING.AGENT.LIST : SETTING.PIONIER.LIST)
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const getType = () => {
        if(window.location.pathname.includes('agent')) {
            return { label: 'Créattion d\'agent', value: 'AGENT' };
        } else {
            return { label: 'Création de pionnier', value: 'PIONIER' };
        }
    }

    const _getCountries = () => {
        TerritoryService.getTerritories(TerritoryType.COUNTRY)
        .then(countries => {
            setCountries(countries);
        })
        .catch(error => {
            setCountries([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    return (
        <>
            <PageTitleBar
                title={getType().label}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Noms & prénoms
                        </InputLabel>
                        <InputStrap
                            required
                            id="name"
                            type="text"
                            name='name'
                            className="input-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="email">
                            Adresse Email
                        </InputLabel>
                        <InputStrap
                            required
                            id="email"
                            type="email"
                            name='email'
                            className="input-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="telephone">
                            Numéro de téléphone
                        </InputLabel>
                        <InputStrap
                            required
                            id="telephone"
                            type="text"
                            name='telephone'
                            className="input-lg"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="address">
                            Adresse physique
                        </InputLabel>
                        <InputStrap
                            required
                            id="address"
                            type="text"
                            name='address'
                            className="input-lg"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="post">
                            Poste occupé
                        </InputLabel>
                        <InputStrap
                            required
                            id="post"
                            type="text"
                            name='post'
                            className="input-lg"
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                        />
                    </FormGroup>
                    { getType().value === 'PIONIER' && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left pl-2" htmlFor="type-helper">
                                Type du Pionnier
                            </InputLabel>
                            <Select
                                style={{ width: '100%' }}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                input={<Input name="type" id="type-helper" style={{ width: '100%' }} />}
                            >
                                {TYPES.map(item => (
                                    <MenuItem key={item.value} value={item.value} style={{ width: '100%' }}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormGroup>
                    )}
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Photo
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner votre photo ici"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="about">
                            A propos
                        </InputLabel>
                        <InputStrap
                            required
                            id="about"
                            type="text"
                            name='about'
                            className="input-lg"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Pays de résidence
                        </InputLabel>
                        
                        <Autocomplete
                            options={countries}
                            id="combo-box-demo"
                            value={country}
                            onChange={(__, item) => {
                                setCountry(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

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