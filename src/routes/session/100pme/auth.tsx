import React, { useState } from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import { useForm } from 'react-hook-form';
import AppConfig from 'Constants/AppConfig';
import { setSession } from 'Helpers/tokens';
import IntlMessages from "Util/IntlMessages";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { setAuthUser } from "Actions/AuthActions";
import {HOME, AUTH, LANDING, PME_PROJECT} from "Url/frontendUrl";
import { FormGroup, Form, Button } from 'reactstrap';
import InputLabel from "@material-ui/core/InputLabel";
import InputComponent from "Components/InputComponent";
import { NotificationManager } from "react-notifications";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import UserService from 'Services/users';
import ActivationBox from '../../custom/notifications/ActivationBox'
import { LOGIN_USER_SUCCESS } from 'Actions/types';
import { useDispatch } from "react-redux";
import { loginUserWithLoginAndPassword, setRequestGlobalAction } from 'Actions';

const Auth = (props) => {

    const { loading } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const { register, errors, handleSubmit } = useForm();
    const [passwordType, setPasswordType] = useState('password');
    const [showRegistration, setShowRegistration] = useState(false);
    const [showActivationBox, setShowActivationBox] = useState(false);

    const countryParam = new URLSearchParams(props.location.search).get("country");
    const cityParam = new URLSearchParams(props.location.search).get("city");

    const onSubmit = (data) => {
        if(showRegistration) {
            const _data = { ...data };

            _data.isOrganisation = false;
            _data.useEmailAsLogin = true;

            props.setRequestGlobalAction(true);
            UserService.registerUser(_data)
            .then((response) => {
                setSession(response.token);
                setUser(response.user);
                dispatch(setAuthUser());
                dispatch({ type: LOGIN_USER_SUCCESS, payload: response.token });
                setTimeout(() => {
                    setShowActivationBox(true);
                }, 1000)
                
            }).catch((err) => {
                console.log(err)
                NotificationManager.error("Cette addresse email est déjà utilisée");
            }).finally(() => {
                props.setRequestGlobalAction(false);
            })
        } else {
            props.loginUserWithLoginAndPassword(data).then(() => {

                if(cityParam && countryParam) {
                    props.history.push(`${PME_PROJECT.VOTE}?city=${cityParam}&country=${countryParam}`);
                } else {
                    props.history.push(`${PME_PROJECT.VOTE}`);
                }
                //props.history.push(PME_PROJECT.VOTE);
            }).catch((err) => {
                NotificationManager.error("Les paramètres fournis sont incorrects");
                console.log(err);
            });
        }
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
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="center-hor-ver session-body d-flex flex-column">
                                    <div className="session-head mb-10 text-center">
                                        <h1 className="p-20">M'authentifier</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex flex-row">
                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={showRegistration}
                                                    onChange={() => setShowRegistration(!showRegistration)}
                                                />
                                            } label={'Je ne suis pas encore membre du réseau MicroCap'}
                                            />
                                        </FormGroup>
                                        { showRegistration ? (
                                            <Form onSubmit={handleSubmit(onSubmit)} className="col-sm-12 has-wrapper">
                                                <FormGroup className="has-wrapper">
                                                    <InputLabel className="text-left" htmlFor="userName">
                                                        Votre nom
                                                    </InputLabel>
                                                    <InputComponent
                                                        id="userName"
                                                        isRequired
                                                        name={'userName'}
                                                        errors={errors}
                                                        register={register}
                                                        className="has-input input-lg"
                                                    />
                                                </FormGroup>
                                                <FormGroup className="has-wrapper">
                                                    <InputLabel className="text-left" htmlFor="email">
                                                        Votre adresse email
                                                    </InputLabel>
                                                    <InputComponent
                                                        id="email"
                                                        type="email"
                                                        isRequired
                                                        name={'email'}
                                                        errors={errors}
                                                        register={register}
                                                        className="has-input input-lg"
                                                    />
                                                </FormGroup>
                                                <FormGroup className="has-wrapper">
                                                    <InputLabel className="text-left" htmlFor="password">
                                                        Votre mot de passe
                                                    </InputLabel>
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
                                                </FormGroup>
                                            </Form>
                                        ) : (
                                            <Form onSubmit={handleSubmit(onSubmit)} className="col-sm-12 has-wrapper">
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
                                                    <InputLabel className="text-left" htmlFor="password"><IntlMessages id="auth.password" /></InputLabel>
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
                                                </FormGroup>
                                            </Form>
                                        )}
                                    </div>
                                </div>
                                { showActivationBox && (
                                    <ActivationBox
                                        show={showActivationBox}
                                        notification={null}
                                        pdfURL={'http://www.africau.edu/images/default/sample.pdf'}
                                        onClose={() => {
                                            setShowActivationBox(false);
                                            if(cityParam && countryParam) {
                                                props.history.push(`${PME_PROJECT.VOTE}?city=${cityParam}&country=${countryParam}`);
                                            } else {
                                                props.history.push(`${PME_PROJECT.VOTE}`);
                                            }
                                        }}
                                    />
                                )}
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

export default connect(mapStateToProps, { setRequestGlobalAction, loginUserWithLoginAndPassword })(injectIntl(Auth));
