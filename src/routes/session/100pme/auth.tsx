import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { injectIntl } from "react-intl";
import AuthConfirm from "./authConfirm";
import UserService from 'Services/users';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import AppConfig from 'Constants/AppConfig';
import { setSession } from 'Helpers/tokens';
import IntlMessages from "Util/IntlMessages";
import AppBar from '@material-ui/core/AppBar';
import TerritoryType from "Enums/Territories";
import Toolbar from '@material-ui/core/Toolbar';
import { setAuthUser } from "Actions/AuthActions";
import { LOGIN_USER_SUCCESS } from 'Actions/types';
import TerritoryService from "Services/territories";
import TextField from '@material-ui/core/TextField';
import { FormGroup, Form, Button } from 'reactstrap';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputComponent from "Components/InputComponent";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ErrorInputComponent from "Components/ErrorInputComponent";
import {HOME, AUTH, LANDING, PME_PROJECT} from "Url/frontendUrl";
import ActivationBox from '../../custom/notifications/ActivationBox';
import { loginUserWithLoginAndPassword, setRequestGlobalAction } from 'Actions';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import RegistrationSuccess from 'Routes/session/register/components/registrationSuccess';

const Auth = (props) => {

    const { loading } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [countries, setCountries] = useState([]);
    const [showSweetAlert, setShowSweetAlert] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [residenceCountry, setResidenceCountry] = useState(null);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showActivationBox, setShowActivationBox] = useState(false);
    const [passwordConfirmType, setPasswordConfirmType] = useState('password');
    const [showConfirmRegistration, setShowConfirmRegistration] = useState(false);
    const { register, errors, handleSubmit, watch, setValue, control } = useForm();

    const cityParam = new URLSearchParams(props.location.search).get("city");
    const countryParam = new URLSearchParams(props.location.search).get("country");

    const isOrganisation = watch('isOrganisation');
    const useMicrocapEmail = watch('useMicrocapEmail');

    useEffect(() => {
        _getCountries();
    }, []);

    const _getCountries = () => {
        TerritoryService.getTerritories(TerritoryType.COUNTRY)
        .then(countries => {
            setCountries(countries);
        })
        .catch(error => {
            setCountries([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    const onSubmit = (data) => {
        if(showRegistration) {
            const _data = { ...data };

            _data.isOrganisation = false;
            _data.useEmailAsLogin = true;

            _data.isOrganisation = data.isOrganisation ? data.isOrganisation : false;

            if (residenceCountry)
                _data.residenceCountry = residenceCountry.id;
            
            if (useMicrocapEmail)
                delete _data.email;
            
            props.setRequestGlobalAction(true);
            UserService.registerUser(_data)
            .then((response) => {
                setSession(response.token);
                dispatch(setAuthUser());
                dispatch({ type: LOGIN_USER_SUCCESS, payload: response.token });
                setUser(response.user);
                setShowSweetAlert(true);
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
                                        <h1 className="p-20">M'identifier</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex flex-row">
                                        {/* <FormGroup className="col-sm-12 has-wrapper">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={showRegistration}
                                                    onChange={() => {
                                                        if(!showRegistration) {
                                                            setShowConfirmRegistration(true);
                                                        } else {
                                                            setShowRegistration(false);
                                                        }
                                                    }}
                                                />
                                            } label={'Je ne suis pas encore membre du réseau MicroCap'}
                                            />
                                        </FormGroup> */}
                                        { showRegistration ? (
                                            <Form onSubmit={handleSubmit(onSubmit)} className="col-sm-12 has-wrapper">
                                                <FormControl fullWidth className='mb-20 pl-15'>
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
                                                                onChange={(e) => setValue('isOrganisation', e.target.checked)}
                                                            />
                                                        } label={"Je suis une personne morale"}
                                                        />}
                                                    />
                                                </FormControl>
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
                                                { !useMicrocapEmail && (
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
                                                )}

                                                <FormControl fullWidth className='mb-20'>
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
                                                        } label={"Je n'ai pas une adresse email"}
                                                        />}
                                                    />
                                                </FormControl>

                                                <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                                                    <InputLabel className="text-left">
                                                        Pays de résidence
                                                    </InputLabel>
                                                    <Autocomplete
                                                        value={residenceCountry}
                                                        options={countries}
                                                        id="combo-box-demo"
                                                        classes={{ paper: 'custom-input' }}
                                                        getOptionLabel={(option) => option.label}
                                                        onChange={(__, item) => { setResidenceCountry(item) }}
                                                        renderTags={options => {
                                                            return (
                                                                options.map(option =>
                                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                                                        <IconButton color="primary">
                                                                            <img src={AppConfig.api.territory+option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }}/>
                                                                        </IconButton>
                                                                        {option.label}
                                                                    </div>
                                                                )
                                                            )
                                                    
                                                        }}
                                                        renderOption={option => {
                                                            return (
                                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                                                    <IconButton color="primary">
                                                                        <img src={AppConfig.api.territory+option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }} />
                                                                    </IconButton>
                                                                    {option.label}
                                                                </div>
                                                            );
                                                        }}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                    />
                                                </div>
                                            
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
                                                <FormGroup className="has-wrapper">
                                                    <InputLabel className="text-left" htmlFor="password">
                                                        Ressaisir le même mot de passe
                                                    </InputLabel>
                                                    <InputComponent
                                                        isRequired
                                                        type={passwordConfirmType}
                                                        errors={errors}
                                                        register={register}
                                                        id="passwordConfirmation"
                                                        name={'passwordConfirmation'}
                                                        className="has-input input-lg"
                                                        otherValidator={{ validate: value => value === watch('password') }}
                                                    >
                                                        {errors.passwordConfirmation && (
                                                            <ErrorInputComponent text={"Les mots de passe doivent être les identiques"} />
                                                        )}
                                                    </InputComponent>
                                                    <span onClick={() => setPasswordConfirmType(passwordConfirmType === 'password' ? 'text' : 'password')} className="has-icon">
                                                        <i className={`zmdi zmdi-${passwordConfirmType === 'password' ? 'eye' : 'eye-off'}`}></i>
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
                                                        <IntlMessages id="auth.signup" />
                                                    </Button>
                                                    <Button
                                                        size="large"
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            if(!showRegistration) {
                                                                setShowConfirmRegistration(true);
                                                            } else {
                                                                setShowRegistration(false);
                                                            }
                                                        }}
                                                        className="btn-block text-white w-100"
                                                    >
                                                        <IntlMessages id="Je suis déjà membre du réseau MicroCap" />
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
                                                    <Button
                                                        size="large"
                                                        color="primary"
                                                        variant="contained"    
                                                        onClick={() => {
                                                            if(!showRegistration) {
                                                                setShowConfirmRegistration(true);
                                                            } else {
                                                                setShowRegistration(false);
                                                            }
                                                        }}
                                                        className="btn-block text-white w-100"
                                                    >
                                                        <IntlMessages id="Je ne suis pas encore membre du réseau MicroCap" />
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
            <AuthConfirm
                show={showConfirmRegistration}
                onClose={() => {
                    setShowConfirmRegistration(false);
                }}
                onSuccess={() => {
                    setShowRegistration(true);
                    setShowConfirmRegistration(false);
                }}
                onCancel={() => {
                    setShowRegistration(false);
                    setShowConfirmRegistration(false);
                }}
            />
            { showSweetAlert && user && (
               <RegistrationSuccess
                  show={showSweetAlert}
                  onConfirm={() => {
                    setShowSweetAlert(false);
                    setShowActivationBox(true);
                  }}
                  user={user}
               />
            )}
        </QueueAnim>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction, loginUserWithLoginAndPassword })(injectIntl(Auth));
