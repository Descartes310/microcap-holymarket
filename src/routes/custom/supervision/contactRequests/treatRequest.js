import { connect } from 'react-redux';
import React, { useState } from 'react';
import SystemService from 'Services/systems';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const TreatRequest = (props) => {

    const {show, onClose} = props;
    const [comment, setComment] = useState(null);


    const onSubmit = () => {

        if(!comment) {
            return;
        }

        let data = {
            comment
        };

        props.setRequestGlobalAction(true);

        SystemService.treatContactRequest(props.reference, data).then(() => {
            NotificationManager.success('La demande a été enregistrée');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            onClose(true);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Traiter la demande
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="comment">
                        Commentaire
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="comment"
                        name='comment'
                        value={comment}
                        className="input-lg"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </FormGroup>

                <Button
                    color="primary"
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(TreatRequest));