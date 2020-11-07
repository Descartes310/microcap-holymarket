import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from "reactstrap";

const FetchFailedComponent = ({_onRetryClick, errorMessageComponent}) => {
    return (
        <Alert color="danger">
            {errorMessageComponent ? (
                <>
                    {errorMessageComponent(_onRetryClick)}
                </>
            ) : (
                <>
                    Une erreur est survenue lors du chargement des données <a href="#" className="alert-link text-decoration-underline" onClick={_onRetryClick}>Veuillez réessayer</a>
                </>
            )}
        </Alert>
    );
};

FetchFailedComponent.propTypes = {

};

export default FetchFailedComponent;
