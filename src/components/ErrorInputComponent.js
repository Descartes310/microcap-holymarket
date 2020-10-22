import React from 'react';
import IntlMessages from "Util/IntlMessages";

const ErrorInputComponent = ({text, otherClassName, ...restProps}) => {
    return (
        <div className="icon-alert mb-10">
            <div className="alert bg-danger text-white" role="alert">
                <span className="alert-addon">
                    <i className="zmdi zmdi-alert-circle"></i>
                </span>
                <p className="text-left text-white custom-error-text">{text}</p>
            </div>
        </div>
    );
};

ErrorInputComponent.defaultProps = {
    otherClassName: '',
};

export default ErrorInputComponent;
