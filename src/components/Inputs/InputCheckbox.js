import React from 'react';
import PropTypes from 'prop-types';
import InputComponent from "Components/InputComponent";

const InputCheckbox = ({wrapClassName = '', containerClassName = '', textClassName = '', text, ...restProps}) => {
    return (
        <div className={`${containerClassName}`}>
            <div className={`d-flex center-ver ${wrapClassName}`}>
                <InputComponent
                    type="checkbox"
                    {...restProps}
                />
                <span className={`${textClassName}`}>{text}</span>
            </div>
        </div>
    );
};

InputCheckbox.propTypes = {

};

export default InputCheckbox;
