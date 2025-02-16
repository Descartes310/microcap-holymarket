import { connect } from 'react-redux';
import React, { useState } from 'react';
import { getTimeUnits } from 'Helpers/datas';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateRule = (props) => {

    const {show, onClose, project} = props;
    
    const [rate, setRate] = useState(null);
    const [base, setBase] = useState(null);
    const [label, setLabel] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [fixPart, setFixPart] = useState(null);
    const [duration, setDuration] = useState(null);
    const [dotation, setDotation] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [periodicity, setPeriodicity] = useState(null);
    const [variablePart, setVariablePart] = useState(null);
    const [basePrevision, setBasePrevision] = useState(null);
    const [effectiveRate, setEffectiveRate] = useState(null);
    const [bonificationDotation, setBonificationDotation] = useState(null);

    const onSubmit = () => {        
        if(!rate || !base || !label || !endDate || !fixPart || !duration || !dotation || !startDate || !periodicity || !variablePart || !basePrevision || !effectiveRate || !bonificationDotation) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            project_reference: project.reference, 
            label, periodicity: periodicity.value,
            startDate, endDate, duration, fixPart, variablePart,
            dotation, basePrevision, rate, base, effectiveRate,
        }

        ProjectService.createProjectRule(data).then(() => {
            NotificationManager.success("La règle a été créée avec succès");
            onClose();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de la règle");
        }).finally(() => {
            resetForm(); 
            props.setRequestGlobalAction(false);
        })
    }

    const resetForm = () => {
        setLabel(null);
        setBase(null);
        setRate(null);
        setEndDate(null);
        setDuration(null);
        setPeriodicity(null);
        setStartDate(null);
        setDotation(null);
        setFixPart(null);
        setVariablePart(null);
        setBasePrevision(null);
        setEffectiveRate(null);
        setBonificationDotation(null);
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Création d'une nouvelle règle
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Désignation
                    </InputLabel>
                    <InputStrap
                        required
                        id="label"
                        type="text"
                        name='label'
                        value={label}
                        className="input-lg"
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </FormGroup>
                
                <div className='row'>
                    <FormGroup className="has-wrapper col-sm-12 col-md-6">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Date de début
                        </InputLabel>
                        <InputStrap
                            required
                            type="date"
                            id="startDate"
                            name='startDate'
                            className="input-lg"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper col-sm-12 col-md-6">
                        <InputLabel className="text-left" htmlFor="duration">
                            Durée
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="duration"
                            name='duration'
                            className="input-lg"
                            value={duration}
                            onChange={(e) => {
                                setDuration(e.target.value);
                            }}
                        />
                    </FormGroup>
                </div>
                <div className='row'>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Périodicité
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={periodicity}
                            options={getTimeUnits()}
                            onChange={(__, item) => {
                                setPeriodicity(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper col-sm-12 col-md-6">
                        <InputLabel className="text-left" htmlFor="endDate">
                            Date de fin
                        </InputLabel>
                        <InputStrap
                            required
                            type="date"
                            id="endDate"
                            name='endDate'
                            className="input-lg"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                        />
                    </FormGroup>
                </div>
                <div className='row'>
                    <FormGroup className="has-wrapper col-sm-12 col-md-4">
                        <InputLabel className="text-left" htmlFor="dotation">
                            Dotation
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="dotation"
                            name='dotation'
                            className="input-lg"
                            value={dotation}
                            onChange={(e) => {
                                setDotation(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper col-sm-12 col-md-4">
                        <InputLabel className="text-left" htmlFor="fixPart">
                            Part fixe
                        </InputLabel>
                        <InputStrap
                            required
                            id="fixPart"
                            type="number"
                            name='fixPart'
                            value={fixPart}
                            className="input-lg"
                            onChange={(e) => {
                                setFixPart(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper col-sm-12 col-md-4">
                        <InputLabel className="text-left" htmlFor="variablePart">
                            Part variable
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="variablePart"
                            name='variablePart'
                            className="input-lg"
                            value={variablePart}
                            onChange={(e) => {
                                setVariablePart(e.target.value);
                            }}
                        />
                    </FormGroup>
                </div>
                <div className='row'>
                    <FormGroup className="has-wrapper col-sm-12 col-md-6">
                        <InputLabel className="text-left" htmlFor="bonificationDotation">
                            Dotation
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            className="input-lg"
                            id="bonificationDotation"
                            name='bonificationDotation'
                            value={bonificationDotation}
                            onChange={(e) => {
                                setBonificationDotation(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper col-sm-12 col-md-6">
                        <InputLabel className="text-left" htmlFor="basePrevision">
                            Prévision base
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="basePrevision"
                            name='basePrevision'
                            className="input-lg"
                            value={basePrevision}
                            onChange={(e) => {
                                setBasePrevision(e.target.value);
                            }}
                        />
                    </FormGroup>
                </div>

                <div className='row'>
                    <FormGroup className="has-wrapper col-sm-12 col-md-6">
                        <InputLabel className="text-left" htmlFor="rate">
                            Taux
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="rate"
                            name='rate'
                            className="input-lg"
                            value={rate}
                            onChange={(e) => {
                                setRate(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper col-sm-12 col-md-6">
                        <InputLabel className="text-left" htmlFor="base">
                            Base
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="base"
                            name='base'
                            className="input-lg"
                            value={base}
                            onChange={(e) => {
                                setBase(e.target.value);
                            }}
                        />
                    </FormGroup>
                </div>
                <FormGroup className="has-wrapper col-sm-12 col-md-12">
                    <InputLabel className="text-left" htmlFor="effectiveRate">
                        Taux effectif
                    </InputLabel>
                    <InputStrap
                        required
                        type="number"
                        id="effectiveRate"
                        name='effectiveRate'
                        className="input-lg"
                        value={effectiveRate}
                        onChange={(e) => {
                            setEffectiveRate(e.target.value);
                        }}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateRule));