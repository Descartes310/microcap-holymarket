import { connect } from 'react-redux';
import UserService from 'Services/users';
import UnitService from 'Services/units';
import { ASSETS } from 'Url/frontendUrl';
import AssetService from 'Services/assets';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState(null);
    const [worth, setWorth] = useState(null);
    const [member, setMember] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [membership, setMembership] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        getCurrencies();
    }, []);

    const findUserByMembership = () => {
        props.setRequestGlobalAction(true);
        UserService.findUserByReference(membership)
        .then(response => {
            setMember(response);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getCurrencies = () => {
        props.setRequestGlobalAction(false);
        UnitService.getCurrencies()
        .then((response) => setCurrencies(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        
        if(!label || !member || !worth || !currency) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label, description,
            facial_worth: worth,
            currency: currency.code,
            referral_code: membership
        }

        props.setRequestGlobalAction(true);
        AssetService.createParent(data)
        .then(() => {
            NotificationManager.success("Actif enregistré avec succès");
            props.history.push(ASSETS.ITEM.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("La création a échouée");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'un actif"}
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
                        <InputLabel className="text-left" htmlFor="worth">
                            Valeur faciale
                        </InputLabel>
                        <InputStrap
                            required
                            id="worth"
                            name="worth"
                            type="number"
                            value={worth}
                            className="input-lg"
                            onChange={(e) => setWorth(e.target.value)}
                        />
                    </FormGroup>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Devise
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={currency}
                            options={currencies}
                            onChange={(__, item) => {
                                setCurrency(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div> 
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            type="textarea"
                            id="description"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="membership">
                            Numéro utilisateur
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="membership"
                            name='membership'
                            value={membership}
                            className="input-lg"
                            onChange={(e) => setMembership(e.target.value)}
                        />
                    </FormGroup>

                    {member && (
                        <>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.userName}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.email}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={getReferralTypeLabel(member.referralType)}
                                />
                            </FormGroup>
                        </>
                    )}

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!membership}
                            onClick={() => findUserByMembership()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Vérifier l'utilisateur
                        </Button>
                        <Button
                            color="primary"
                            disabled={!member}
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