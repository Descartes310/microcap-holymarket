import _ from 'lodash';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import AppConfig from "Constants/AppConfig";
import { Form, FormGroup } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import InputComponent from "Components/InputComponent";
import FormControl from "@material-ui/core/FormControl";
import ErrorInputComponent from "Components/ErrorInputComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { minMaxValidatorObject, passwordValidatorObject } from "Helpers/validator";

const FirstStep = props => {
    const { loading, nextStep, setData, intl, defaultState } = props;

    const [passwordType, setPasswordType] = useState('password');

    const { register, errors, handleSubmit, watch, control, setValue } = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {
            useEmailAsLogin: true,
            useMicrocapEmail: false
        }
    });

    const isOrganisation = watch('isOrganisation');
    const useEmailAsLogin = watch('useEmailAsLogin');
    const useMicrocapEmail = watch('useMicrocapEmail');
    /**
     * On submit
     */
    const onSubmit = (data) => {
        // Send data
        setData(data);
        // Redirect to the next step
        nextStep();
    };
    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <div className="row align-items-flex-end">
                <FormGroup className="col-12 has-wrapper">
                    <InputComponent
                        isRequired
                        id="userName"
                        type="text"
                        name={'userName'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={"Nom d'utilisateur"}
                    />
                </FormGroup>
            </div>

            <FormControl fullWidth>
                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    id="useMicrocapEmail"
                    control={control}
                    name={'useMicrocapEmail'}
                    register={register}
                    componentType="select"
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={useMicrocapEmail}
                            onChange={() => setValue('useMicrocapEmail', !useMicrocapEmail)}
                        />
                    } label={"Je n'ai pas d'adresse email"}
                    />}
                />
            </FormControl>

            { !useMicrocapEmail && (
                <FormGroup className="has-wrapper">
                    <InputComponent
                        isRequired
                        id="email"
                        type="email"
                        name={'email'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={"Email"}
                    />
                </FormGroup>
            )}

            <FormControl fullWidth>
                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    id="useEmailAsLogin"
                    control={control}
                    name={'useEmailAsLogin'}
                    register={register}
                    componentType="select"
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={useEmailAsLogin}
                            onChange={() => setValue('useEmailAsLogin', !useEmailAsLogin)}
                        />
                    } label={"Utiliser mon email comme login"}
                    />}
                />
            </FormControl>
            
            { !useEmailAsLogin && (
                <FormGroup className="has-wrapper">
                    <InputComponent
                        isRequired
                        id="login"
                        type="text"
                        name={'login'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={"Login"}
                    />
                </FormGroup>
            )}

            <FormGroup className="has-wrapper">
                <InputComponent
                    isRequired
                    id="password"
                    errors={errors}
                    name={'password'}
                    type={passwordType}
                    register={register}
                    className="has-input input-lg"
                    placeholder={intl.formatMessage({ id: "auth.password" })}
                    otherValidator={{ minLength: AppConfig.minPasswordLength }}
                >
                    {errors.password?.type === 'minLength' && (
                        <ErrorInputComponent text={intl.formatMessage({ id: minMaxValidatorObject.minMessage }, { min: AppConfig.minPasswordLength })} />
                    )}
                </InputComponent>
                <span onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')} className="has-icon">
                    <i className={`zmdi zmdi-${passwordType === 'password' ? 'eye' : 'eye-off'}`}></i>
                </span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                <InputComponent
                    isRequired
                    type="Password"
                    errors={errors}
                    register={register}
                    id="passwordConfirmation"
                    name={'passwordConfirmation'}
                    className="has-input input-lg"
                    placeholder={intl.formatMessage({ id: "auth.passwordConfirmation" })}
                    otherValidator={{ validate: value => value === watch('password') }}
                >
                    {errors.passwordConfirmation && (
                        <ErrorInputComponent text={intl.formatMessage({ id: passwordValidatorObject.passwordConfirmation })} />
                    )}
                </InputComponent>
            </FormGroup>

            <FormControl fullWidth>
                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    id="isOrganisation"
                    control={control}
                    name={'isOrganisation'}
                    register={register}
                    componentType="select"
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={isOrganisation}
                            onChange={() => setValue('isOrganisation', !isOrganisation)}
                        />
                    } label={"Créer un compte pour mon organisation"}
                    />}
                />
            </FormControl>

            <FormGroup className="mb-15">
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
        </Form >
    );
};

FirstStep.propTypes = {

};

export default injectIntl(FirstStep);
