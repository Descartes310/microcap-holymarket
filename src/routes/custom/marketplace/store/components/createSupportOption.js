import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {FormGroup, Input as InputStrap} from 'reactstrap';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const CreateSupportOption = (props) => {

    const {show, onClose, dates} = props;

    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [parent, setParent] = useState(null);
    const [parents, setParents] = useState([]);
    const [endDate, setEndDate] = useState(null);
    const [typeName, setTypeName] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [effectDate, setEffectDate] = useState(null);
    const [createType, setCreateType] = useState(false);
    const [typeDescription, setTypeDescription] = useState(null);

    useEffect(() => {
        getCodevSupportOptionTypes();
        getCodevSupportOptions();
    }, [show]);

    const getCodevSupportOptionTypes = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevSupportOptionTypes().then(response => {
            setTypes(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCodevSupportOptions = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevSupportOptions().then(response => {
            setParents(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSumit = () => {

        if(!endDate || !startDate || !effectDate) {
            return;
        }

        let data = {
            end_date: endDate,
            start_date: startDate,
            effect_date: effectDate,
            reference: props.match.params.reference
        }

        if(parent) {
            data.option_parent = parent.reference;
        }


        if(!createType) {
            if(!type) {
                return;
            }
            data.type_reference = type.reference;
        } else {
            if(!typeName || !typeDescription) {
                return;
            }
            data.type_name = typeName;
            data.type_description = typeDescription;
        }

        props.setRequestGlobalAction(true);
        ProductService.createCodevSupportOption(data).then(response => {
            onClose();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajout d'un support d'option
                </h3>
            )}
        >
            <RctCardContent>

                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-0">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={createType}
                                onChange={() => {
                                    setCreateType(!createType);
                                }}
                            />
                        } label={"Créer un nouveau type de support d'option"}
                        />
                    </FormGroup>
                </div>

                { !createType ? 
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type de support d'option
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
                                Libellé du type de support d'option
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
                                Description du type de support d'option
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
                }

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Support d'option parent
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
                </div>
                
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
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
                </FormGroup>

                <FormGroup className="float-right mb-20">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => onSumit()}
                        className="text-white font-weight-bold mb-20"
                    >
                        Enregistrer
                    </Button>
                </FormGroup>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateSupportOption));