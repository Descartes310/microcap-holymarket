import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import Button from "@material-ui/core/Button";
import SweetAlert from "react-bootstrap-sweetalert";

const ConfirmBox = ({show, title, message, leftButtonText, leftButtonOnClick, rightButtonText, rightButtonOnClick, intl}) => {

    const _title = (title === undefined || title === null) ? "Confirmation" : title;

    return (
        <SweetAlert
            showCancel
            showConfirm
            show={show}
            title={_title}
            customButtons={(
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white bg-danger font-weight-bold mr-3"
                        onClick={leftButtonOnClick}
                    >
                        {leftButtonText || "Non je ne veux pas"}
                    </Button>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={rightButtonOnClick}
                        className="text-white bg-primary font-weight-bold"
                    >
                        {rightButtonText || "Oui je veux"}
                    </Button>
                </>
            )}
            onConfirm={rightButtonOnClick}
        >
            {message}
        </SweetAlert>
    );
};

ConfirmBox.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.any.isRequired,
    title: PropTypes.string,
    leftButtonText: PropTypes.string,
    leftButtonOnClick: PropTypes.func,
    rightButtonOnClick: PropTypes.func,
};

ConfirmBox.defaultProps = {
};

export default injectIntl(ConfirmBox);
