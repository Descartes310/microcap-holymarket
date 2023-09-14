import { connect } from 'react-redux';
import React, { useState } from 'react';
import { ASSETS } from 'Url/frontendUrl';
import AssetService from 'Services/assets';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { assetActionTypes } from 'Helpers/helpers';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [types, setTypes] = useState([]);
    const [label, setLabel] = useState(null);
    const [description, setDescription] = useState(null);

    const onSubmit = () => {
        
        if(!label || types.length <= 0) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label, description,
            actions: types.map(t => t.value)
        }

        props.setRequestGlobalAction(true);
        AssetService.createProfile(data)
        .then(() => {
            NotificationManager.success("Profil enregistré avec succès");
            props.history.push(ASSETS.PROFILE.LIST);
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
                title={"Création d'un profil de gestion"}
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

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Actions associées
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            multiple
                            value={types}
                            options={assetActionTypes()}
                            onChange={(__, items) => {
                                setTypes(items);
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