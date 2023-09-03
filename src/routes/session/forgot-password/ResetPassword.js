import {connect} from "react-redux";
import QueueAnim from 'rc-queue-anim';
import {injectIntl} from "react-intl";
import React, { useState } from 'react';
import {useForm} from "react-hook-form";
import {useQuery} from "Helpers/helpers";
import UserService from 'Services/users';
import AppConfig from 'Constants/AppConfig';
import { Form, FormGroup } from 'reactstrap';
import IntlMessages from "Util/IntlMessages";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, useLocation } from 'react-router-dom';
import {HOME, AUTH} from "../../../urls/frontendUrl";
import InputComponent from "Components/InputComponent";
import { NotificationManager } from "react-notifications";
import { resetPassword, setRequestGlobalAction } from "Actions";
import ErrorInputComponent from "Components/ErrorInputComponent";
import { minMaxValidatorObject, passwordValidatorObject } from "Helpers/validator";

const ResetPassword = ({intl, loading, setRequestGlobalAction, history}) => {
    const { register, errors, handleSubmit, watch } = useForm();

    const [passwordType, setPasswordType] = useState('password');
    const query = useQuery(useLocation);
    const token = query.get('token');
    const isTokenInvalid = (!token === false) || token === '';

    const onSubmit = ({password}) => {

        if (!isTokenInvalid) {
            NotificationManager.error(intl.formatMessage({id: "auth.resetPassword.errorToken"}));
            return;
        }

        setRequestGlobalAction(true);
  
        let datas = {
            token,
            password
        };
  
        UserService.resetPassword(datas)
        .then(() => {
            NotificationManager.success(intl.formatMessage({id: "auth.resetPassword.successText"}));
            history.push(AUTH.LOGIN);
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenu, veuillez réessayer plus tard.");
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
                                            errors={errors}
                                            name={'password'}
                                            type={passwordType}
                                            register={register}
                                            placeholder="Nouveau de passe"
                                            className="has-input input-lg"
                                            otherValidator={{minLength: AppConfig.minPasswordLength}}
                                        >
                                            {errors.password?.type === 'minLength' && (
                                                <ErrorInputComponent text={intl.formatMessage({id: minMaxValidatorObject.minMessage}, {min: AppConfig.minPasswordLength})} />
                                            )}
                                        </InputComponent>
                                        <span onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')} className="has-icon">
                                            <i className={`zmdi zmdi-${passwordType === 'password' ? 'eye' : 'eye-off'}`}></i>
                                        </span>
                                    </FormGroup>
                                    <FormGroup className="has-wrapper">
                                        <InputComponent
                                            isRequired
                                            errors={errors}
                                            type={passwordType}
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

