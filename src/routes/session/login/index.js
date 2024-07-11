
import TellUs from './TellUs';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import { useForm } from 'react-hook-form';
import AppConfig from 'Constants/AppConfig';
import { Form, FormGroup } from 'reactstrap';
import IntlMessages from "Util/IntlMessages";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { SessionSlider } from 'Components/Widgets';
import { AUTH, HOME, LANDING} from "Url/frontendUrl";
import InputLabel from "@material-ui/core/InputLabel";
import InputComponent from "Components/InputComponent";
import { NotificationManager } from "react-notifications";
import { loginUserWithLoginAndPassword, setRequestGlobalAction } from 'Actions';

const Signin = (props) => {

    const { loading, intl } = props;
    const [show, setShow] = useState(false);
    const { register, errors, handleSubmit } = useForm();
    const [passwordType, setPasswordType] = useState('password');

    const onSubmit = (data) => {
        props.loginUserWithLoginAndPassword(data).then(() => {
            // window.location = HOME;
        }).catch((err) => {
            NotificationManager.error("Les paramètres fournis sont incorrects");
            console.log(err);
        });
    };

    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    const onDiscoverClick = () => {
        props.history.push(LANDING.HOME);
    };

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to={HOME}>
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                    </Link>
                                </div>
                                <div className="center-hor-ver" style={{ marginRight: '10%' }}>
                                    <Button variant="contained" className="btn-light mr-2 p-10" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.signup" />
                                    </Button>
                                    <Button variant="contained" className="btn-primary mr-2 p-10" onClick={onDiscoverClick}>
                                        Tout Microcap
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
                                                <IntlMessages id="auth.login.title" values={{ name: AppConfig.brandName }} />
                                            </h2>
                                            <p className="mb-0">
                                                <IntlMessages id="auth.login.subTitle" />
                                            </p>
                                            {/* This text is just a work around to add the width of the form input */}
                                            <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                        </div>
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <FormGroup className="has-wrapper">
                                                <InputLabel className="text-left" htmlFor="login">
                                                    Login
                                                </InputLabel>
                                                <InputComponent
                                                    id="login"
                                                    isRequired
                                                    name={'login'}
                                                    errors={errors}
                                                    register={register}
                                                    className="has-input input-lg"
                                                />
                                            </FormGroup>
                                            <FormGroup className="has-wrapper">
                                                <div className="d-flex justify-content-between">
                                                    <InputLabel className="text-left" htmlFor="password"><IntlMessages id="auth.password" /></InputLabel>
                                                    <Link to={AUTH.FORGOT_PASSWORD}>
                                                        <InputLabel
                                                            className="text-right text-primary text-decoration-underline-hover font-weight-bold"
                                                            htmlFor="password">
                                                            <IntlMessages id="sidebar.forgotPassword" /> ?
                                                        </InputLabel>
                                                    </Link>
                                                </div>
                                                <InputComponent
                                                    isRequired
                                                    id="password"
                                                    errors={errors}
                                                    name={'password'}
                                                    register={register}
                                                    type={passwordType}
                                                    className="has-input input-lg"
                                                >
                                                </InputComponent>
                                                <span onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')} className="has-icon">
                                                    <i className={`zmdi zmdi-${passwordType === 'password' ? 'eye' : 'eye-off'}`}></i>
                                                </span>
                                            </FormGroup>

                                            <FormGroup className="mb-15">
                                                <Button
                                                    size="large"
                                                    type="submit"
                                                    color="primary"
                                                    disabled={loading}
                                                    variant="contained"
                                                    className="btn-block text-white w-100"
                                                >
                                                    <IntlMessages id="auth.signin" />
                                                </Button>
                                                {/* <Button
                                                    size="large"
                                                    type="button"
                                                    variant="contained"
                                                    onClick={() => setShow(true)}
                                                    className="btn-block text-white w-100"
                                                    style={{ backgroundColor: '#2f2e40a6' }}
                                                >
                                                    MicroCap en 2 cliques
                                                </Button> */}
                                                <div className="d-flex justify-content-end">
                                                    <Link to={AUTH.REGISTER}>
                                                        <InputLabel
                                                            className="text-right text-primary text-decoration-underline-hover font-weight-bold mt-10"
                                                        >
                                                            Je n'ai pas encore de compte
                                                        </InputLabel>
                                                    </Link>
                                                </div>
                                            </FormGroup>
                                        </Form>
                                        <p className="text-muted">
                                            <IntlMessages id="auth.termOfService" values={{ name: AppConfig.brandName }} />
                                        </p>
                                        <p>
                                            <a target="_blank" href={LANDING.TERMS} className="text-muted">
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

            <TellUs
                show={show} 
                history={props.history}
                onClose={() => setShow(false)}
                search={new URLSearchParams(props.location.search).get("social_network")}
            />
        </QueueAnim>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { loginUserWithLoginAndPassword, setRequestGlobalAction })(injectIntl(Signin));
