import { connect } from 'react-redux';
import {Form, FormGroup} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const ComplexTableMenu = (props) => {

    const {show, onClose, project, cell} = props;
    
    const [investment, setInvestment] = useState(null);
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        getProjectInvestments();
    }, []);

    const getProjectInvestments = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectInvestments({ reference: project.reference })
        .then(response => {
            setInvestments(response);
            setInvestment(cell ? response.find(r => r.reference == cell?.investmentReference) : null);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const updateDataTableInvestment = () => {
        if(!investment || !cell) {
            NotificationManager.error('Le formulaire est mal renseigné')
            return;
        }

        props.setRequestGlobalAction(true);
        ProjectService.updateDataTableInvestment(cell.id, { investment_reference: investment.reference })
        .then(() => {
            NotificationManager.success('La fiche d\'investissement a été renseignée');
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
                    Option
                </h3>
            )}
        >
            <Form>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="price">
                        Fiche d'investissement
                    </InputLabel>
                    <Autocomplete
                        value={investment}
                        id="combo-box-demo"
                        onChange={(__, item) => {
                            setInvestment(item);
                        }}
                        options={investments}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>

                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                        onClick={() => {
                            updateDataTableInvestment();
                        }}
                    >
                        Enregistrer
                    </Button>
                </FormGroup>
            </Form>
                
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ComplexTableMenu));