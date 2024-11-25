import { connect } from 'react-redux';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const ChangeTicketExigibility = (props) => {

    const {show, onClose, lineReference, startDate, endDate} = props;
    
    const [delay, setDelay] = useState(null);

    const onSubmit = () => {        
        if(!delay || delay < 0) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            delay: Math.ceil(delay),
            line_reference: lineReference
        }

        if(startDate) {
            data.start_date = startDate;
        }
        if(endDate) {
            data.end_date = endDate;
        }

        ProductService.changeTicketExigibility(data).then(() => {
            NotificationManager.success("Opération déroulée avec succès");
            setDelay(null);
            onClose(true);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'opération");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={() => onClose(false)}
            size="sm"
            title={(
                <h3 className="fw-bold">
                    Changer la date d'exigibilité
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="delay">
                        Nombre de jour avant échéance
                    </InputLabel>
                    <InputStrap
                        required
                        id="delay"
                        name='delay'
                        type="number"
                        value={delay}
                        className="input-lg"
                        onChange={(e) => setDelay(e.target.value)}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ChangeTicketExigibility));