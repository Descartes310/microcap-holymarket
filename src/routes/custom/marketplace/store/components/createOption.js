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

    const {show, onClose} = props;

    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [option, setOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [support, setSupport] = useState(null);
    const [supports, setSupports] = useState([]);
    const [hasTirage, setHasTirage] = useState(false);

    useEffect(() => {
        getCodevOptions();
        getSupports();
        getTypes();
    }, [show]);

    const getCodevOptions = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevOptions().then(response => {
            setOptions(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getSupports = () => {
        props.setRequestGlobalAction(true),
        ProductService.getCodevTypeSupportOptions()
        .then(response => setSupports(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        ProductService.getCodevTypeOptionTitles()
        .then(response => setTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSumit = () => {

        if(!option || !type || !support) {
            NotificationManager.error("Le formulaire n'est pas bien renseigné");
            return;
        }

        let data = {
            hasTirage,
            type_reference: type.reference,
            option_reference: option.reference,
            support_reference: support.reference,
            product_reference: props.match.params.reference,
        }

        props.setRequestGlobalAction(true);
        ProductService.createCodevConfigOption(data).then(() => {
            setType(null);
            setSupport(null);
        }).catch(() => {
            NotificationManager.error("Le formulaire n'est pas bien renseigné");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajout d'une nouvelle config
                </h3>
            )}
        >
            <RctCardContent>

                <div className='row'>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Options disponible
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={option}
                            options={options}
                            onChange={(__, item) => {
                                setOption(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Option de titre associé
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
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Support d'option associé
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={support}
                            options={supports}
                            onChange={(__, item) => {
                                setSupport(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                </div>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={hasTirage}
                            onChange={() => {
                                setHasTirage(!hasTirage);
                            }}
                        />
                    } label={"Associer un tirage"}
                    />
                </FormGroup>

                <div className="d-flex align-items-end">
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