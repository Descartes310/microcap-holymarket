import React from 'react';
import PropTypes from 'prop-types';

const FieldsetComponent = ({wrapperClass, titleClass, title, rounded, ...restProps}) => {

    const _rounded = rounded ? "custom-fieldset-rounded" : '';

    return (
        <div className={`custom-fieldset ${_rounded} ${wrapperClass}`}>
            <p className={"custom-fieldset-title " + titleClass}>{title}</p>
            {restProps.children}
        </div>
    );
};

FieldsetComponent.propTypes = {
    wrapperClass: PropTypes.string,
    titleClass: PropTypes.string,
    title: PropTypes.any.isRequired,
    rounded: PropTypes.bool,
};

FieldsetComponent.defaultProps = {
    rounded: true,
    wrapperClass: '',
    titleClass: '',
};

export default FieldsetComponent;
