import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import React, { useState } from 'react';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import TextField from '@material-ui/core/TextField';
import { structureMissionTypes } from 'Helpers/datas';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [type, setType] = useState(null);
    const [description, setDescription] = useState('');

    const onSubmit = () => {

        if(!label || !type) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label: label,
            type: type?.value,
            description: description
        }
        
        props.setRequestGlobalAction(true);
        GroupService.createStructureMission(data).then(() => {
            NotificationManager.success("L'item a été créée avec succès");
            props.history.push(GROUP.STRUCTURE.MISSION.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
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
                        Type
                    </InputLabel>
                    <Autocomplete
                        value={type}
                        id="combo-box-demo"
                        onChange={(__, item) => {
                            setType(item);
                        }}
                        options={structureMissionTypes()}
                        getOptionLabel={(option) => option.label}
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
                        Ajouter
                    </Button>
                </FormGroup>
            </Form>
        </RctCollapsibleCard>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));