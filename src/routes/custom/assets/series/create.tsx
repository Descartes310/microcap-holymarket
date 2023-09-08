import { connect } from 'react-redux';
import React, { useState } from 'react';
import { ASSETS } from 'Url/frontendUrl';
import AssetService from 'Services/assets';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { assetSeriesTypes } from 'Helpers/helpers';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [type, setType] = useState(null);
    const [label, setLabel] = useState(null);
    const [description, setDescription] = useState(null);

    const onSubmit = () => {
        
        if(!label || !type) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label, description,
            type: type.value,
        }

        props.setRequestGlobalAction(true);
        AssetService.createSeriesType(data)
        .then(() => {
            NotificationManager.success("Serie enregistrée avec succès");
            props.history.push(ASSETS.SERIES.TYPE.LIST);
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
                title={"Création d'un type de série"}
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
                            Type associé
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={type}
                            options={assetSeriesTypes()}
                            onChange={(__, item) => {
                                setType(item);
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