import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import ErrorInputComponent from './ErrorInputComponent';
import { requiredValidatorObject } from './../helpers/validator';
import {injectIntl} from "react-intl";
import {Controller} from "react-hook-form";

const InputComponent = ({componentType = 'input', name, type, register, errors, control, options, defaultValue, isRequired = true, otherValidator = {}, handleOnChange, children, intl, customRequiredDisplay = false, ...restProps}) => {
    const requiredProps = isRequired ? {...requiredValidatorObject} : {};

    const renderComponent = () => {
        if (componentType === 'select') {
            return (
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    {...restProps}
                />
            );
        }
        else if (componentType === 'textarea') {
            return (
                <textarea
                    cols={30}
                    name={name}
                    {...restProps}
                    ref={register({
                        ...requiredProps,
                        ...otherValidator})
                    }
                />
            )
        }
        else return (
                <Input
                    type={type ? type : 'text'}
                    name={name}
                    className="form-control"
                    innerRef={register({
                        ...requiredProps,
                        ...otherValidator})
                    }
                    {...restProps}
                />
            );
    };

    return (
        <>
            {isRequired && !customRequiredDisplay && errors[name]?.type === 'required' && (
                <ErrorInputComponent text={intl.formatMessage({id: errors[name]?.message})} />
            )}
            {children}
            {renderComponent()}
        </>
    );
};

export default React.memo(injectIntl(InputComponent));
