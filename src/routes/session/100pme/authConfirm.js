import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";

const AuthConfirm = (props) => {

    const {show, onClose, onSuccess, onCancel} = props;
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="sm"
            title={(
                <h3 className="fw-bold">
                    Avertissement
                </h3>
            )}
        >
            <RctCardContent>
                <p style={{ fontSize: 16 }}>
                    Pour participer au challenge 100 PME pour l'emploi proposé par MicroCap, vous devez
                    être inscrit sur la plateforme. Vos données sont exclusivement dédiées à votre identification,
                    elle ne sont ni publiques ni partagées.
                </p>
                <div className='d-flex justify-content-between mt-30'>
                    <Button
                        color="primary"
                        className="ml-0 text-white float-right"
                        onClick={() => onCancel()}
                    >
                        Refuser
                    </Button>
                    <Button
                        color="primary"
                        className="ml-0 text-white float-right"
                        onClick={() => onSuccess()}
                    >
                        S'inscrire
                    </Button>
                </div>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AuthConfirm));