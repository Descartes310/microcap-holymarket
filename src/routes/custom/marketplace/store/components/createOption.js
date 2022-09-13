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
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateOption = (props) => {

    const {show, onClose} = props;

    const [type, setType] = useState(null);
    const [option, setOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [support, setSupport] = useState(null);

    const [description2, setDescription2] = useState(null);
    const [description3, setDescription3] = useState(null);

    useEffect(() => {
        getCodevOptions();
    }, [show]);

    const getCodevOptions = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevOptions().then(response => {
            setOptions(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSumit = () => {

        if(!option || !type || !support) {
            NotificationManager.error("Le formulaire n'est pas bien renseigné");
            return;
        }

        let data = {
            option_reference: option.reference,
            option_title_label: type,
            product_reference: props.match.params.reference,
            support_option_label: support, option_title_description: description2, 
            support_option_description: description3
        }

        props.setRequestGlobalAction(true);
        ProductService.createCodevConfigOption(data).then(() => {
            setType("");
            setSupport("");
            setDescription2("");
            setDescription3("");
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
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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

                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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
                </div>
                <div className='row'>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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

                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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
                </div>

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