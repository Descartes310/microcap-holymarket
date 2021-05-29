import _ from 'lodash';
import React from 'react';
import {injectIntl} from 'react-intl';
import {useForm} from "react-hook-form";
import {Form, FormGroup} from "reactstrap";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import InputComponent from "Components/InputComponent";
import {NotificationManager} from "react-notifications";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import ErrorInputComponent from "Components/ErrorInputComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {emailValidatorObject, minMaxValidatorObject, passwordValidatorObject} from "Helpers/validator";

const SecondStep = props => {
    const { loading, nextStep, previousStep, setData, intl, defaultState } = props;

    const { register, errors, handleSubmit, watch, control, getValues, setValue} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const acceptLoginWatch = watch('acceptLogin');

    /**
     * On submit
     */
    const onSubmit = (data) => {
        if (acceptLoginWatch && getValues('login').length <= 0) {
            NotificationManager.error("Veuillez entrer un login valide");
            return;
        }
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

            <FormControl fullWidth>
                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    id="acceptLogin"
                    control={control}
                    name={'acceptLogin'}
                    register={register}
                    componentType="select"
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={acceptLoginWatch}
                            onChange={() => setValue('acceptLogin', !acceptLoginWatch)}
                        />
                    } label={"Se connecter avec le login ?"}
                    />}
                />
            </FormControl>

            {acceptLoginWatch && (
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="login">
                        Login
                    </InputLabel>
                    <InputComponent
                        id="login"
                        name={'login'}
                        errors={errors}
                        register={register}
                        isRequired={acceptLoginWatch}
                        className="has-input input-lg"
                    />
                    <span className="has-icon"><i className="ti-pencil"/></span>
                </FormGroup>
            )}

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
