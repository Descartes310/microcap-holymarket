import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import MatButton from "@material-ui/core/Button/Button";
import {Alert} from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

const CustomAsyncComponent = ({loading, data, component, onRetryClick, errorMessageComponent}) => {

    const _onRetryClick = (event) => {
        event.preventDefault();
        onRetryClick();
    };

    return (
        <>
            {loading ? (
                <>
                    <CircularProgress className="progress-primary mr-30 mb-10" />
                    {/*<LinearProgress variant="query" />
                    <br />
                    <LinearProgress color="secondary" variant="query" />*/}
                </>
            ) : data ? (
                <>
                    {component(data)}
                </>
            ) : (
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
            )}
        </>
    );
};

CustomAsyncComponent.propTypes = {

};

export default CustomAsyncComponent;
