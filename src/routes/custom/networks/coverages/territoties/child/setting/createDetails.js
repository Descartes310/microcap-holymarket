import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import {Form, FormGroup} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TerritoryService from 'Services/territories';
import TextField from '@material-ui/core/TextField';
import { territoryDetailsTypes } from 'Helpers/datas';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateTerritoryDetails = (props) => {

    const {show, onClose} = props;
    
    const [type, setType] = useState(null);
    const [amount, setAmount] = useState(null);
    const [typeGroups, setTypeGroups] = useState([]);
    const [selectedDatas, setSelectedDatas] = useState(null);
    const [immatriculations, setImmatriculations] = useState([]);

    useEffect(() => {
        getTypes();
        getImmatriculations();
    }, []);

    useEffect(() => {
        setSelectedDatas([]);
    }, [type]);

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupTypes({})
        .then(response => setTypeGroups(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getImmatriculations = () => {
        props.setRequestGlobalAction(true),
        SettingService.getImmatriculations()
        .then(response => setImmatriculations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!selectedDatas || !type)
            return

        props.setRequestGlobalAction(true);

        let data = {
            type: type?.value,
            value: selectedDatas?.id,
        };

        TerritoryService.createDetails(props.match.params.id, data).then(() => {
            NotificationManager.success("Le details a été édité avec succès");
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de l'édition du details");
        }).finally(() => {
            props.setRequestGlobalAction(false);
            props.onClose();
        })
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Détails de térritoire
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Type de détails
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        options={territoryDetailsTypes()}
                        value={type}
                        onChange={(__, item) => {
                            setType(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>

                { type?.value == 'TYPE_GROUP' && (
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type d'organisation
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={typeGroups}
                            value={selectedDatas}
                            onChange={(__, items) => {
                                setSelectedDatas(items);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                )}

                { type?.value == 'IMMATRICULATION' && (
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Immatriculations
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={immatriculations}
                            value={selectedDatas}
                            onChange={(__, items) => {
                                setSelectedDatas(items);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                )}

                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            onSubmit();
                        }}
                        className="text-white font-weight-bold"
                    >
                        Enregistrer
                    </Button>
                </FormGroup>
            </Form>
                
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateTerritoryDetails));