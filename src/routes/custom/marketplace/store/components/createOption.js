import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {FormGroup, Input as InputStrap} from 'reactstrap';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const CreateOption = (props) => {

    const {show, onClose, dates} = props;

    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [label, setLabel] = useState(null);
    const [parent, setParent] = useState(null);
    const [parents, setParents] = useState([]);
    const [support, setSupport] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [typeName, setTypeName] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [effectDate, setEffectDate] = useState(null);
    const [createType, setCreateType] = useState(false);
    const [description1, setDescription1] = useState(null);
    const [description2, setDescription2] = useState(null);
    const [description3, setDescription3] = useState(null);
    const [typeDescription, setTypeDescription] = useState(null);

    useEffect(() => {
        getCodevOptionTypes();
        getCodevOptions();
    }, [show]);

    const getCodevOptionTypes = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevOptionTypes().then(response => {
            setTypes(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCodevOptions = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevOptions().then(response => {
            setParents(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSumit = () => {

        if(!label || !type || !support) {
            return;
        }

        let data = {
            title: type,
            label: label,
            support: support,
            reference: props.match.params.reference,
            description1, description2, description3
        }

        props.setRequestGlobalAction(true);
        ProductService.createCodevOption(data).then(response => {
            onClose();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSaveConfig = () => {

        if(!type || !support) {
            NotificationManager.error("Le formulaire n'est pas bien rempli !");
            return;
        }

        NotificationManager.success('La configuration a été enregistrée !');
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajout d'une nouvelle option
                </h3>
            )}
        >
            <RctCardContent>

                {/* <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-0">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={createType}
                                onChange={() => {
                                    setCreateType(!createType);
                                }}
                            />
                        } label={"Créer un nouveau type d'option"}
                        />
                    </FormGroup>
                </div> */}

                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="name">
                        Libellé
                    </InputLabel>
                    <InputStrap
                        required
                        id="name"
                        type="text"
                        name='name'
                        value={label}
                        className="input-lg"
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="type">
                        Type de titre d'option
                    </InputLabel>
                    <InputStrap
                        required
                        id="type"
                        type="text"
                        name='type'
                        value={type}
                        className="input-lg"
                        onChange={(e) => setType(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="support">
                        Type de support d'option
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="support"
                        name="support"
                        value={support}
                        className="input-lg"
                        onChange={(e) => setSupport(e.target.value)}
                    />
                </FormGroup>
                {/* { !createType ? 
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type d'option
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={type}
                            options={types}
                            onChange={(__, item) => {
                                setType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div> :
                    <div className='row'>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Libellé du type d'option
                            </InputLabel>
                            <InputStrap
                                required
                                id="label"
                                type="text"
                                name='label'
                                value={typeName}
                                className="input-lg"
                                onChange={(e) => setTypeName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="description">
                                Description du type d'option
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="description"
                                name='description'
                                className="input-lg"
                                value={typeDescription}
                                onChange={(e) => setTypeDescription(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                } */}

                {/* <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Options parent
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={parent}
                        options={parents}
                        onChange={(__, item) => {
                            setParent(item);
                        }}
                        getOptionLabel={(option) => option.startDate}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div> */}
                
                {/* <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="startDate">
                        Date de début validité
                    </InputLabel>
                    <InputStrap
                        required
                        type="date"
                        id="startDate"
                        name='startDate'
                        value={startDate}
                        className="input-lg"
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </FormGroup>
                
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="endDate">
                        Date de fin validité
                    </InputLabel>
                    <InputStrap
                        required
                        type="date"
                        id="endDate"
                        name='endDate'
                        value={endDate}
                        className="input-lg"
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </FormGroup>
                
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="effectDate">
                        Date d'effet
                    </InputLabel>
                    <InputStrap
                        required
                        type="date"
                        id="effectDate"
                        name='effectDate'
                        value={effectDate}
                        className="input-lg"
                        onChange={(e) => setEffectDate(e.target.value)}
                    />
                </FormGroup> */}

                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="description1">
                        Description
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="description1"
                        name='description1'
                        className="input-lg"
                        value={description1}
                        onChange={(e) => setDescription1(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="description2">
                        Description
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="description2"
                        name='description2'
                        className="input-lg"
                        value={description2}
                        onChange={(e) => setDescription2(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="description3">
                        Description
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="description3"
                        name='description3'
                        className="input-lg"
                        value={description3}
                        onChange={(e) => setDescription3(e.target.value)}
                    />
                </FormGroup>

                <div className="d-flex align-items-end">
                    <FormGroup className="mb-20 mr-10">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSaveConfig()}
                            className="text-white font-weight-bold mb-20"
                        >
                            Ajouter un support
                        </Button>
                    </FormGroup>
                    <FormGroup className="mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSumit()}
                            className="text-white font-weight-bold mb-20"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </div>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateOption));