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

const ChangeTicketGroup = (props) => {

    const {show, onClose, lineReference, startDate, endDate} = props;
    
    const [group, setGroup] = useState(null);

    const onSubmit = () => {        
        if(!group || group < 1) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            group: Math.ceil(group),
            line_reference: lineReference
        }

        if(startDate) {
            data.start_date = startDate;
        }
        if(endDate) {
            data.end_date = endDate;
        }

        ProductService.changeTicketGroup(data).then(() => {
            NotificationManager.success("Opération déroulée avec succès");
            setGroup(null);
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
                    Création de méga-bond
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="group">
                        Nombre de bond par méga-bond
                    </InputLabel>
                    <InputStrap
                        required
                        id="group"
                        name='group'
                        type="number"
                        value={group}
                        className="input-lg"
                        onChange={(e) => setGroup(e.target.value)}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ChangeTicketGroup));