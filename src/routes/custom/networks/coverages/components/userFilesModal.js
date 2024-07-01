import React from 'react';
import { connect } from 'react-redux';
import UserDocuments from "./userFiles";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";

const UserDocumentsModal = (props) => {

    const {show, onClose} = props;
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Dossier utilisateur: {props.user?.userName}
                </h3>
            )}
        >
            <RctCardContent>
                <UserDocuments reference={props.reference} filters={{ type: 'USER' }} />
                <div className='d-flex justify-content-between mt-20'>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                        onClick={() => {
                            props.onClose();
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                        onClick={() => {
                            props.onValidate();
                        }}
                    >
                        Continuer
                    </Button>
                </div>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(UserDocumentsModal));