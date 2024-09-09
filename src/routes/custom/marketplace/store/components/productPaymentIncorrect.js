import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";

const ProductPaymentIncorrect = (props) => {

    const {show, onClose, onSuccess} = props;
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="sm"
            title={(
                <h3 className="fw-bold">
                    Encaissement non configuré
                </h3>
            )}
        >
            <RctCardContent>
                <p style={{ fontSize: 16 }}>
                    Ce produit n'a pas de configuration d'encaissement associé, 
                    vous devez d'abord l'ajouter dans une configuration de demande d'encaissement.
                </p>
                <div className='d-flex justify-content-between mt-30'>
                    <Button
                        color="primary"
                        className="ml-0 text-white float-right"
                        onClick={() => onClose()}
                    >
                        Plus tard
                    </Button>
                    <Button
                        color="primary"
                        className="ml-0 text-white float-right"
                        onClick={() => onSuccess()}
                    >
                        Associer une configuration
                    </Button>
                </div>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ProductPaymentIncorrect));