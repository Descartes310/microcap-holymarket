
import React, { useState } from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, FormGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardFooter
} from 'reactstrap';

// components
import { SessionSlider } from 'Components/Widgets';
import InputComponent from "Components/InputComponent";
import ErrorInputComponent from "Components/ErrorInputComponent";

// validator
import { emailValidatorObject, minMaxValidatorObject } from "Helpers/validator";

// route
import { AUTH, HOME, DISCOVER, TERMS, joinUrlWithParamsId, SONDAGE_SECOND } from "../../../urls/frontendUrl";

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import { loginUserWithEmailAndPassword, createSondage, setRequestGlobalAction } from 'Actions';
import LanguageProvider from "Components/Header/LanguageProvider";
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from "react-intl";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";

const Signin = (props) => {
    const { loading, intl } = props;
    const { control, register, errors, handleSubmit, watch, setValue } = useForm();
    const [response, setResponse] = useState(null);
    const gotServiceNumberWatch = watch('gotServiceNumber');

    /**
     * On User Login
     */
    const onSubmit = (data) => {
        props.loginUserWithEmailAndPassword(data).then((data) => {
            window.location = HOME;
        }).catch();
    };

    const onSubmitSondage = (response, index) => {
        props.setRequestGlobalAction(true);
        createSondage({ response }).then(data => {
            // props.history.push(joinUrlWithParamsId(SONDAGE_SECOND, index));
            setResponse(index);
        }).finally(() => {
            props.setRequestGlobalAction(false)
        })
    }

    /**
     * On User Sign Up
     */
    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    /**
     * On navigate to Discover Microcap
     */
    const onDiscoverClick = () => {
        props.history.push(DISCOVER);
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
                                <div className="center-hor-ver" style={{ marginRight: '10%' }}>
                                    {/* <a className="mr-15 text-white" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.createAccount" />
                                    </a> */}
                                    <Button variant="contained" className="btn-light mr-2 p-10" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.signup" />
                                    </Button>
                                    <Button variant="contained" className="btn-primary mr-2 p-10" onClick={onDiscoverClick}>
                                        Découvrir Microcap
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
                                                <InputLabel className="text-left" htmlFor="email">
                                                    Login ou email
                                                </InputLabel>
                                                <InputComponent
                                                    id="email"
                                                    isRequired
                                                    name={'login'}
                                                    errors={errors}
                                                    register={register}
                                                    className="has-input input-lg"
                                                />
                                                <span className="has-icon"><i className="ti-pencil" /></span>
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
                                                    type="Password"
                                                    errors={errors}
                                                    name={'password'}
                                                    register={register}
                                                    placeholder="......."
                                                    className="has-input input-lg"
                                                    otherValidator={{ minLength: AppConfig.minPasswordLength }}
                                                >
                                                    {errors.password?.type === 'minLength' && (
                                                        <ErrorInputComponent text={intl.formatMessage({ id: minMaxValidatorObject.minMessage }, { min: AppConfig.minPasswordLength })} />
                                                    )}
                                                </InputComponent>
                                                <span className="has-icon"><i className="ti-lock"></i></span>
                                            </FormGroup>

                                            {/* <FormControl fullWidth>
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
                                            </FormControl> */}

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
                                                    <span className="has-icon"><i className="ti-pencil" /></span>
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
                                            <IntlMessages id="auth.termOfService" values={{ name: AppConfig.brandName }} />
                                        </p>
                                        <p>
                                            <a target="_blank" href={TERMS} className="text-muted">
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

            <Dialog
                open={new URLSearchParams(props.location.search).get("social_network") && response == null}
                fullScreen={false}
                aria-labelledby="responsive-dialog-title"
                maxWidth={'lg'}
                fullWidth
            >
                <DialogContent>
                    <div className="showcase-card-block" style={{ backgroundImage: `url(${require('Assets/img/bg-shape-gray.png')})`, padding: '10vh 10vw' }}>
                        <div className="row center-hor-ver mb-70 flex-column intro">
                            <h2 className="font-weight-bold text-black text-center" data-aos="fade-right">
                                Du 1<sup>er</sup> octobre 2021 au 15 novembre 2021
                            </h2>
                            <p data-aos="fade-left" className="text-center">Participer à notre appel à projet pour une dotation financière pouvant atteindre jusqu'à 50 000€ </p>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="300">
                                <Card>
                                    <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                            <p>L'entrepreneuriat ce n'est pas pour moi, mais j'ai un projet personnel </p>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter className="border-0 center-hor-ver">
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmitSondage('NOT_FOR_ME', 1)}>
                                            Sélectionner
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="500">
                                <Card>
                                    <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                            <p>Je suis solitaire, 6 à 24 mois pour une levée des fond malgré le résultat incertain, ça me conviennent </p>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter className="border-0 center-hor-ver">
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmitSondage('ONE_AND_ONLY', 2)}>
                                            Sélectionner
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="700">
                                <Card>
                                    <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                            <p>L'accompagnement au sein du réseau solidaire MicroCap pour constituer les fonds dont j'ai besoin peut me
                                                prendre entre 3 et 36 Mois. Mais pour un résultat 100% assuré, je préfère ce choix</p>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter className="border-0 center-hor-ver">
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmitSondage('WORK_WITH_OTHERS', 3)}>
                                            Sélectionner
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={response ? response >= 1 : false}
                fullScreen={false}
                aria-labelledby="responsive-dialog-title"
                maxWidth={'lg'}
                fullWidth
            >
                <DialogContent>
                    <div className="showcase-card-block" style={{ backgroundImage: `url(${require('Assets/img/bg-shape-gray.png')})`, padding: '5vh 10vw' }}>
                        {response == 1 ?
                            <div className="col-xs-12 col-sm-12 col-md-12 mb-30" data-aos="fade-down" data-aos-duration="300">
                                <Card>
                                    <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                            <p>
                                                Nous vous proposons nos services d'accompagnement individuel à la création d'entreprise
                                            </p>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter className="border-0 center-hor-ver">
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => props.history.push(AUTH.LOGIN)}>
                                            Continuer
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                            :
                            response == 2 ?
                                <div className="col-xs-12 col-sm-12 col-md-12 mb-30" data-aos="fade-down" data-aos-duration="300">
                                    <Card>
                                        <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                                <p>
                                                    Vous préferez la sérénité d'un salaire chaque mois et vous avez un projet personnel à réaliser ?
                                                    Soutenez ceux qui crée les emplois en fructifiant votre épargne sur Microcap. Surtout choisissez à qui et à quoi
                                                    sert votre argent, une transparence inégalée.
                                                </p>
                                            </CardText>
                                        </CardBody>
                                        <CardFooter className="border-0 center-hor-ver">
                                            <Button variant="contained" className="btn-primary mr-2" onClick={() => props.history.push(AUTH.REGISTER)}>
                                                Je m'inscris
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                                :
                                <div className="col-xs-12 col-sm-12 col-md-12 mb-30" data-aos="fade-down" data-aos-duration="300">
                                    <Card>
                                        <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                                <p>
                                                    Bravo! vous pouvez rejoindre MicroCap, le réseau international d'entrepreneurs solidaires. le programme
                                                    d'incubation proposée va vous préparer à présenter et à financer votre projet à votre rythme sur une durée comprise entre 3 et 36 mois.
                                                </p>
                                            </CardText>
                                        </CardBody>
                                        <CardFooter className="border-0 center-hor-ver">
                                            <Button variant="contained" className="btn-primary mr-2" onClick={() => props.history.push(DISCOVER)}>
                                                Découvrir Microcap
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </QueueAnim>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { loginUserWithEmailAndPassword, setRequestGlobalAction })(injectIntl(Signin));
