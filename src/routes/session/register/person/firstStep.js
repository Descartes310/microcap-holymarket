import _ from 'lodash';
import React from 'react';
import {injectIntl} from 'react-intl';
import {useForm} from "react-hook-form";
import {Form, FormGroup} from "reactstrap";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import FlagCountry from "Components/FlagCountry";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import CountryManager from 'Helpers/CountryManager';
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import {NotificationManager} from "react-notifications";
import FormControl from "@material-ui/core/FormControl";
import ErrorInputComponent from "Components/ErrorInputComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {emailValidatorObject, minMaxValidatorObject, passwordValidatorObject} from "Helpers/validator";

const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const FirstStep = props => {
    const { loading, nextStep, setData, intl, defaultState } = props;

    const { register, errors, handleSubmit, watch, control, setValue, getValues} = useForm({
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

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <div className="row align-items-flex-end">
                <FormGroup className="col-6 has-wrapper">
                    <InputComponent
                        id="firstName"
                        type="text"
                        isRequired
                        name={'firstName'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({id: "components.firstName"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                </FormGroup>
                <FormGroup className="col-6 has-wrapper">
                    <InputComponent
                        id="firstName"
                        type="text"
                        isRequired
                        name={'lastName'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({id: "components.lastName"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                </FormGroup>
            </div>

            <FormGroup className="has-wrapper">
                <InputComponent
                    id="email"
                    type="mail"
                    isRequired
                    name={'email'}
                    errors={errors}
                    register={register}
                    className="has-input input-lg"
                    placeholder={intl.formatMessage({id: "auth.email"})}
                    otherValidator={{pattern: emailValidatorObject.regex}}
                >
                    {errors.email?.type === 'pattern' && (
                        <ErrorInputComponent text={intl.formatMessage({id: emailValidatorObject.message})} />
                    )}
                </InputComponent>
                <span className="has-icon"><i className="zmdi zmdi-email"></i></span>
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
            
            <div className="row">
                {errors.phoneNumber?.type === 'required' && (
                    <div className="col-12">
                        <ErrorInputComponent text={intl.formatMessage({id: errors.phoneNumber?.message})} />
                    </div>
                )}
                <FormGroup className="col-2 has-wrapper">
                    <InputComponent
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        name={'phoneNumberPrefix'}
                        defaultValue={countryWithNumberAndFlag[0].phonePrefixes[0]}
                        as={<Select>
                            {countryWithNumberAndFlag.map(item => (
                                <MenuItem key={item.id} value={item.phonePrefixes[0]} className="center-hor-ver">
                                    <FlagCountry flag={item.flag} label={item.phonePrefixes[0]} />
                                </MenuItem>
                            ))}
                        </Select>}

                    />
                </FormGroup>
                <FormGroup className="col-10 has-wrapper">
                    <InputComponent
                        type="text"
                        isRequired
                        errors={errors}
                        id="phoneNumber"
                        register={register}
                        name={'phoneNumber'}
                        customRequiredDisplay={true}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({id: "auth.phoneNumber"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-phone"></i></span>
                </FormGroup>
            </div>
            <FormGroup className="has-wrapper">
                <InputComponent
                    isRequired
                    id="password"
                    type="Password"
                    errors={errors}
                    name={'password'}
                    register={register}
                    className="has-input input-lg"
                    placeholder={intl.formatMessage({id: "auth.password"})}
                    otherValidator={{minLength: AppConfig.minPasswordLength}}
                >
                    {errors.password?.type === 'minLength' && (
                        <ErrorInputComponent text={intl.formatMessage({id: minMaxValidatorObject.minMessage}, {min: AppConfig.minPasswordLength})} />
                    )}
                </InputComponent>
                <span className="has-icon"><i className="zmdi zmdi-lock-outline"></i></span>
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
                    placeholder={intl.formatMessage({id: "auth.passwordConfirmation"})}
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

FirstStep.propTypes = {

};

export default injectIntl(FirstStep);
