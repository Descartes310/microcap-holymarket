
import React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, FormGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';

// components
import { SessionSlider } from 'Components/Widgets';
import InputComponent from "Components/InputComponent";
import ErrorInputComponent from "Components/ErrorInputComponent";

// validator
import {emailValidatorObject, minMaxValidatorObject} from "Helpers/validator";

// route
import {AUTH, HOME} from "../../../urls/frontendUrl";

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {loginUserWithEmailAndPassword} from 'Actions';
import LanguageProvider from "Components/Header/LanguageProvider";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from "react-intl";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Signin = (props) => {
    const { loading, intl } = props;
    const { control, register, errors, handleSubmit, watch, setValue } = useForm();

    const gotServiceNumberWatch = watch('gotServiceNumber');

    /**
     * On User Login
     */
    const onSubmit = (data) => {
        console.log("data => ", data);
        props.loginUserWithEmailAndPassword(data).catch();
    };

    /**
     * On User Sign Up
     */
    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
                {/*<div className={'global-loader'}>
                    {loading && <LinearProgress />}
                </div>*/}
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to={HOME}>
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                    </Link>
                                </div>
                                <div className="center-hor-ver">
                                    <a className="mr-15 text-white" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.createAccount" />
                                    </a>
                                    <Button variant="contained" className="btn-light mr-2" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.signup" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-7 col-md-7 col-lg-8">
                                <div className="center-hor-ver session-body text-center">
                                    <div className="">
                                        <div className="session-head mb-10">
                                            <h2 className="font-weight-bold">
                                                <IntlMessages id="auth.login.title" values={{name: AppConfig.brandName}}/>
                                            </h2>
                                            <p className="mb-0">
                                                <IntlMessages id="auth.login.subTitle" />
                                            </p>
                                            {/* This text is just a work around to add the width of the form input */}
                                            <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                        </div>
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <FormGroup className="has-wrapper">
                                                <InputLabel className="text-left" htmlFor="email"><IntlMessages id="auth.email"/></InputLabel>
                                                <InputComponent
                                                    id="email"
                                                    isRequired
                                                    name={'email'}
                                                    errors={errors}
                                                    register={register}
                                                    className="has-input input-lg"
                                                    placeholder="example@gmail.com"
                                                />
                                                <span className="has-icon"><i className="ti-email"/></span>
                                            </FormGroup>
                                            <FormGroup className="has-wrapper">
                                                <div className="d-flex justify-content-between">
                                                    <InputLabel className="text-left" htmlFor="password"><IntlMessages id="auth.password"/></InputLabel>
                                                    <Link to={AUTH.FORGOT_PASSWORD}>
                                                        <InputLabel
                                                            className="text-right text-primary text-decoration-underline-hover font-weight-bold"
                                                            htmlFor="password">
                                                            <IntlMessages id="sidebar.forgotPassword"/> ?
                                                        </InputLabel>
                                                    </Link>
                                                </div>
                                                <InputComponent
                                                    isRequired
                                                    id="password"
                                                    type="Password"
                                                    errors={errors}
                                                    name={'password'}
                                                    register={register}
                                                    placeholder="......."
                                                    className="has-input input-lg"
                                                    otherValidator={{minLength: AppConfig.minPasswordLength}}
                                                >
                                                    {errors.password?.type === 'minLength' && (
                                                        <ErrorInputComponent text={intl.formatMessage({id: minMaxValidatorObject.minMessage}, {min: AppConfig.minPasswordLength})} />
                                                    )}
                                                </InputComponent>
                                                <span className="has-icon"><i className="ti-lock"></i></span>
                                            </FormGroup>

                                            <FormControl fullWidth>
                                                <InputComponent
                                                    isRequired
                                                    className="mt-0"
                                                    errors={errors}
                                                    control={control}
                                                    register={register}
                                                    componentType="select"
                                                    id="gotServiceNumber"
                                                    name={'gotServiceNumber'}
                                                    // defaultValue={data[0]}
                                                    as={<FormControlLabel control={
                                                        <Checkbox
                                                            color="primary"
                                                            checked={gotServiceNumberWatch}
                                                            onChange={() => setValue('gotServiceNumber', !gotServiceNumberWatch)}
                                                        />
                                                    } label={"Accès nomade ?"}
                                                    />}
                                                />
                                            </FormControl>

                                            {gotServiceNumberWatch && (
                                                <FormGroup className="has-wrapper">
                                                    <InputLabel className="text-left" htmlFor="serviceNumber">
                                                        Numéro de service
                                                    </InputLabel>
                                                    <InputComponent
                                                        isRequired
                                                        errors={errors}
                                                        id="serviceNumber"
                                                        register={register}
                                                        name={'serviceNumber'}
                                                        className="has-input input-lg"
                                                        />
                                                    <span className="has-icon"><i className="ti-pencil"/></span>
                                                </FormGroup>
                                            )}

                                            <FormGroup className="mb-15">
                                                <Button
                                                    type="submit"
                                                    size="large"
                                                    color="primary"
                                                    variant="contained"
                                                    className="btn-block text-white w-100"
                                                    disabled={loading}
                                                    // onClick={() => this.onUserLogin()}
                                                >
                                                    <IntlMessages id="auth.signin" />
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                        <p className="text-muted">
                                            <IntlMessages id="auth.termOfService" values={{name: AppConfig.brandName}}/>
                                        </p>
                                        <p>
                                            <a target="_blank" href="#/terms-condition" className="text-muted">
                                                <IntlMessages id="common.termOfService" />
                                            </a>
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-5 col-md-5 col-lg-4">
                                <SessionSlider />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </QueueAnim>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {loginUserWithEmailAndPassword})(injectIntl(Signin));
