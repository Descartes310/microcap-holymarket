import { connect } from 'react-redux';
import { BROADCAST } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import MessageService from 'Services/messages';
import { broadcastTypes } from 'Helpers/datas';
import { contactTypes } from '../../../../data';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [type, setType] = useState(null);
    const [description, setDescription] = useState('');
    const [concatType, setContactType] = useState(null);

    useEffect(() => {
    }, []);

    const onSubmit = () => {
        if (!label || !description || !concatType || ! type) {
            NotificationManager.error('Le formulaire est mal renseigné')
            return;
        }

        var data: any = {
            label, description, type: type.value, contact_type: concatType.value
        }

        props.setRequestGlobalAction(true);

        MessageService.createBroadcast(data).then(() => {
            NotificationManager.success('Liste créé avec succès');
            props.history.push(BROADCAST.MINE.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenue lors de la liste');
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                        <InputLabel className="text-left">
                            Type de liste
                        </InputLabel>
                        <Autocomplete
                            value={type}
                            options={broadcastTypes()}
                            id="combo-box-demo"
                            classes={{ paper: 'custom-input' }}
                            getOptionLabel={(option) => option.label}
                            onChange={(__, item) => { setType(item) }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                        <InputLabel className="text-left">
                            Type de contact privilégié
                        </InputLabel>
                        <Autocomplete
                            value={concatType}
                            options={contactTypes}
                            id="combo-box-demo"
                            classes={{ paper: 'custom-input' }}
                            getOptionLabel={(option) => option.name}
                            onChange={(__, item) => { setContactType(item) }}
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
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));