import React, {Component, useState} from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link, useLocation } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

// app config
import AppConfig from 'Constants/AppConfig';
import LanguageProvider from "Components/Header/LanguageProvider";
import {connect} from "react-redux";
import {resetPassword, setRequestGlobalAction} from "Actions";
import {injectIntl} from "react-intl";
import IntlMessages from "Util/IntlMessages";
import {HOME, AUTH} from "../../../urls/frontendUrl";
import InputComponent from "Components/InputComponent";
import {minMaxValidatorObject} from "Helpers/validator";
import ErrorInputComponent from "Components/ErrorInputComponent";
import {useForm} from "react-hook-form";
import {NotificationManager} from "react-notifications";
import {requestErrorProcessing, useQuery} from "Helpers/helpers";

const ResetPassword = ({intl, loading, setRequestGlobalAction, history}) => {
    const { register, errors, handleSubmit } = useForm();

    const query = useQuery(useLocation);
    const token = query.get('token');
    const isTokenInvalid = (!token === false) || token === '';

    const onSubmit = ({password}) => {
        if (!isTokenInvalid) {
            NotificationManager.error(intl.formatMessage({id: "auth.resetPassword.errorToken"}));
            return;
        }

        setRequestGlobalAction(true);
        resetPassword({password, token})
            .then(() => {
                NotificationManager.success(intl.formatMessage({id: "auth.resetPassword.successText"}));
                history.push(AUTH.LOGIN);
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorTab = requestErrorProcessing(error.response.data);
                    errorTab.forEach(item => {
                        NotificationManager.error(item);
                    });
                } else {
                    NotificationManager.error(intl.formatMessage({id: "auth.resetPassword.errorToken"}));
                }
            })
            .finally(() =>  setRequestGlobalAction(false));
    };

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper" key="1">
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to={HOME}>
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                    </Link>
                                </div>
                                <LanguageProvider />
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper p-4 h-100 p-md-0">
                    <div className="row">
                        <div className="col-sm-8 col-lg-5 mx-auto">
                            <div className="session-body text-center">
                                <div className="session-head mb-30">
                                    <h2><IntlMessages id="auth.resetPassword.title" /></h2>
                                    <h4 className="mb-0">
                                        <IntlMessages id="auth.resetPassword.subTitle" />
                                    </h4>
                                </div>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <FormGroup className="has-wrapper">
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
                                    <FormGroup>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={isTokenInvalid && loading}
                                            className="btn-primary text-white btn-block btn-large w-100">
                                            <IntlMessages id="auth.resetPassword.btnText"/>
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </QueueAnim>
    );
};

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(injectIntl(ResetPassword));

