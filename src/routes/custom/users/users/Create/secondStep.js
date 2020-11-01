import React from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import {emailValidatorObject, minMaxValidatorObject, passwordValidatorObject} from "Helpers/validator";
import ErrorInputComponent from "Components/ErrorInputComponent";
import AppConfig from "Constants/AppConfig";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import _ from 'lodash';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";

const SecondStep = props => {
    const { loading, nextStep, previousStep, setData, intl, defaultState } = props;

    const { register, errors, handleSubmit, watch, control, getValues} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    /**
     * On submit
     */
    const onSubmit = (data) => {
        // Send data
        setData(data);
        // Redirect to the next step
        nextStep();
    };

    const onPreviousClicked = (event) => {
        event.preventDefault();
        const values = getValues();
        setData(values);
        previousStep();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="email"><IntlMessages id="auth.email"/></InputLabel>
                <InputComponent
                    id="email"
                    type="mail"
                    isRequired
                    name={'email'}
                    errors={errors}
                    register={register}
                    className="has-input input-lg"
                    placeholder={'example@gmail.com'}
                    otherValidator={{pattern: emailValidatorObject.regex}}
                >
                    {errors.email?.type === 'pattern' && (
                        <ErrorInputComponent text={intl.formatMessage({id: emailValidatorObject.message})} />
                    )}
                </InputComponent>
                <span className="has-icon"><i className="zmdi zmdi-email"></i></span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="password"><IntlMessages id="auth.password"/></InputLabel>
                <InputComponent
                    isRequired
                    id="password"
                    type="Password"
                    errors={errors}
                    name={'password'}
                    register={register}
                    placeholder={'......'}
                    className="has-input input-lg"
                    otherValidator={{minLength: AppConfig.minPasswordLength}}
                >
                    {errors.password?.type === 'minLength' && (
                        <ErrorInputComponent text={intl.formatMessage({id: minMaxValidatorObject.minMessage}, {min: AppConfig.minPasswordLength})} />
                    )}
                </InputComponent>
                <span className="has-icon"><i className="zmdi zmdi-lock-outline"></i></span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="passwordConfirmation"><IntlMessages id="auth.passwordConfirmation"/></InputLabel>
                <InputComponent
                    isRequired
                    type="Password"
                    errors={errors}
                    register={register}
                    placeholder={'......'}
                    id="passwordConfirmation"
                    name={'passwordConfirmation'}
                    className="has-input input-lg"
                    otherValidator={{validate: value => value === watch('password')}}
                >
                    {errors.passwordConfirmation && (
                        <ErrorInputComponent text={intl.formatMessage({id: passwordValidatorObject.passwordConfirmation})} />
                    )}
                </InputComponent>
                <span className="has-icon"><i className="zmdi zmdi-lock-outline"></i></span>
            </FormGroup>
            <FormGroup className="mb-15">
                <Button
                    color="primary"
                    disabled={loading}
                    variant="outlined"
                    className="font-weight-bold mr-2"
                    onClick={onPreviousClicked}
                >
                    <i className="ti-arrow-left font-weight-bold mr-2"></i> <IntlMessages id="button.previous" />
                </Button>

                <Button
                    // type="submit"
                    color="primary"
                    disabled={loading}
                    variant="contained"
                    className="text-white font-weight-bold"
                    onClick={handleSubmit(onSubmit)}
                >
                    <IntlMessages id="button.next" /> <i className="ti-arrow-right font-weight-bold ml-2"></i>
                </Button>
            </FormGroup>
        </Form>
    );
};

SecondStep.propTypes = {

};

export default injectIntl(SecondStep);
