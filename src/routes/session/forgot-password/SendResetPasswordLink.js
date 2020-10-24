import React, {Component, useState} from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

// app config
import AppConfig from 'Constants/AppConfig';
import LanguageProvider from "Components/Header/LanguageProvider";
import {connect} from "react-redux";
import {sendResetPasswordLink, setRequestGlobalAction} from "Actions";
import {injectIntl} from "react-intl";
import IntlMessages from "Util/IntlMessages";
import {HOME, AUTH} from "../../../services/frontendRoute";
import InputComponent from "Components/InputComponent";
import {emailValidatorObject} from "Helpers/validator";
import ErrorInputComponent from "Components/ErrorInputComponent";
import {useForm} from "react-hook-form";
import {NotificationManager} from "react-notifications";
import {requestErrorProcessing} from "Helpers/helpers";

const SendResetPasswordLink = ({intl, loading, setRequestGlobalAction}) => {
   const { register, errors, handleSubmit } = useForm();

   const onSubmit = ({email}) => {
      setRequestGlobalAction(true);
      sendResetPasswordLink(email)
          .then(() => {
             NotificationManager.success(intl.formatMessage({id: "auth.resetPasswordLink.successText"}))
          })
          .catch(error => {
             if (error && error.response && error.response.data) {
                const errorTab = requestErrorProcessing(error.response.data);
                errorTab.forEach(item => {
                   NotificationManager.error(item);
                });
             } else {
                NotificationManager.success(intl.formatMessage({id: "error.500"}))
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
                            <h2><IntlMessages id="auth.resetPasswordLink.title" /></h2>
                            <h4 className="mb-0">
                               <IntlMessages id="auth.resetPasswordLink.subTitle" />
                            </h4>
                         </div>
                         <Form onSubmit={handleSubmit(onSubmit)}>
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
                                   otherValidator={{pattern: emailValidatorObject.regex}}>
                                  {errors.email?.type === 'pattern' && (
                                      <ErrorInputComponent text={intl.formatMessage({id: emailValidatorObject.message})} />
                                  )}
                               </InputComponent>
                               <span className="has-icon"><i className="ti-email"></i></span>
                            </FormGroup>
                            <FormGroup>
                               <Button
                                   type="submit"
                                   disabled={loading}
                                   variant="contained"
                                   className="btn-info text-white btn-block btn-large w-100">
                                  <IntlMessages id="auth.resetPasswordLink.btnText"/>
                               </Button>
                            </FormGroup>
                            <Button
                                component={Link}
                                to={AUTH.LOGIN}
                                className="btn-dark btn-block btn-large text-white w-100">
                               <IntlMessages id="auth.haveAccountLogin"/> ?
                            </Button>
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

export default connect(mapStateToProps, {setRequestGlobalAction})(injectIntl(SendResetPasswordLink));

