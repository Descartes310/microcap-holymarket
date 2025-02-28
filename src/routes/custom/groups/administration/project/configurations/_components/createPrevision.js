import { connect } from 'react-redux';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import { bonificationBases } from 'Helpers/datas';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreatePrevision = (props) => {

    const {show, onClose} = props;
    
    const [year, setYear] = useState(null);
    const [base, setBase] = useState(null);
    const [value, setValue] = useState(null);

    const onSubmit = () => {     

        if(!year || !base || !value) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            year, value, base: base.value
        }

        ProjectService.createProjectPrevision(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            onClose();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            setYear(null);
            setBase(null);
            setValue(null);
            props.setRequestGlobalAction(false);
        })
        
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer une prevision projet
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="year">
                        Année d'exercice
                    </InputLabel>
                    <InputStrap
                        required
                        id="year"
                        name='year'
                        type="text"
                        value={year}
                        className="input-lg"
                        onChange={(e) => setYear(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left">
                        Base
                    </InputLabel>
                    <Autocomplete
                        value={base}
                        id="combo-box-demo"
                        onChange={(__, item) => {
                            setBase(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        options={bonificationBases()}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="value">
                        Valeur
                    </InputLabel>
                    <InputStrap
                        required
                        id="value"
                        name="value"
                        type="number"
                        value={value}
                        className="input-lg"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </FormGroup>

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
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreatePrevision));