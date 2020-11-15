import React from 'react';
import PropTypes from 'prop-types';

const SingleTitleText = ({text = null, component = null}) => {
    return (
        <div className="d-flex justify-content-center align-items-center py-50">
            {text && (
                <h4>
                    {text}
                </h4>
            )}
            {component}
        </div>
    );
};

SingleTitleText.propTypes = {
    text: PropTypes.string,
    component: PropTypes.any,
};

export default SingleTitleText;
