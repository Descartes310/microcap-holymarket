import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import React, { useEffect, useState } from 'react';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { prestationTypes } from 'Helpers/helpers';

const DIRECTIONS = [
    {
        label: 'Encaissement',
        value: 'CASH_IN'
    },{
        label: 'Décaissement',
        value: 'CASH_OUT'
    }
]
const Update = (props) => {

    const [label, setLabel] = useState('');
    const [type, setType] = useState(null);
    const [direction, setDirection] = useState(null);
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        findPrestation();
    }, [props.match.params.id]);
    
    const findPrestation = () => {
        props.setRequestGlobalAction(true);
        BankService.findPrestation(props.match.params.id).then((response) => {
            setLabel(response.label);
            setDescription(response.description);
            setDirection(DIRECTIONS.find(d => response.direction === d.value));
            setType(prestationTypes.find(pt => pt.value === response.type));
        })
        .catch((err) => {
            console.log(err);
            props.history.goBack();
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        if(!label || !direction || !type) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            type: type.value,
            description: description,
            direction: direction.value
        };

        BankService.updatePrestation(props.match.params.id, data).then(() => {
            NotificationManager.success("La prestation a été créée avec succès");
            props.history.push(BANK.ADMIN.PRESTATION.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de la prestation");
        }).finally(() => {
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
                            type="text"
                            id="description"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Sens de la prestation
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={DIRECTIONS}
                            value={direction}
                            onChange={(__, item) => {
                                setDirection(item);
                                setType(null);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type de prestation
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={prestationTypes.filter(pt => direction && ((direction?.value == 'CASH_IN' && pt.cashin) || (direction?.value !== 'CASH_IN' && !pt.cashin)))}
                            value={type}
                            onChange={(__, item) => {
                                setType(item);
                            }}
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
                            Editer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));