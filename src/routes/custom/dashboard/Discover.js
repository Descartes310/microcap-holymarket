import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { AUTH, DISCOVER, HOME } from "Url/frontendUrl";
import AppBar from "@material-ui/core/AppBar/AppBar";
import headerImg from 'Assets/img/bg-1.jpg';
import {
    Card,
    CardImg,
    CardText,
    CardBody
} from 'reactstrap';
import { RctCard, RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import {
    Player
} from 'video-react';

import Clientslider from './client-slider';

const Discover = (props) => {
    const { loading, intl } = props;

    /**
     * On User Sign Up
     */
    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    /**
     * On navigate to Discover Microcap
     */
    const onUserLogin = () => {
        props.history.push(AUTH.LOGIN);
    };

    document.body.style.overflow = "auto";

    return (
        <div>
            {/* <div className="rct-session-wrapper"> */}
            <div className={'global-loader'}>
                {loading && <LinearProgress />}
            </div>
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
                                <a className="mr-15" onClick={onUserSignUp}>
                                    <IntlMessages id="auth.createAccount" />
                                </a>
                                <Button variant="contained" className="btn-light mr-2" onClick={onUserSignUp}>
                                    <IntlMessages id="auth.signup" />
                                </Button>
                                <Button variant="contained" className="btn-primary mr-2 text-white" onClick={onUserLogin}>
                                    Se connecter
                                    </Button>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper video-player-wrapper">
                <div style={{ height: '35vh', backgroundImage: `url(${headerImg})` }}>
                    <h1 className="font-weight-bold text-white" style={{ fontSize: '3em', padding: '4%' }}>
                        Le pouvoir des petits capitaux
                    </h1>
                </div>
                <div className="row" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '2%', paddingBottom: '2%' }}>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/bg-1.jpg')} alt="Card image cap" />
                            <CardBody>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Read More
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/bg-1.jpg')} alt="Card image cap" />
                            <CardBody>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Read More
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/bg-1.jpg')} alt="Card image cap" />
                            <CardBody>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Read More
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-8 col-lg-8 offset-lg-2"
                >
                    <Player
                        playsInline
                        poster="https://reactify.theironnetwork.org/data/images/sintel.jpg"
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                    <p style={{ fontSize: '1.2em', marginTop: 20 }}>
                        Microcap finance votre épargne et vous accompagne dans votre projet: créer une entreprise, devenir actionnaire d'une
                        entreprise, se former à la création d'entreprise.
                        Rejoignez MicroCap, rejoignez le premier réseau international de solidarité financière
                    </p>
                </RctCollapsibleCard>

                <div style={{ backgroundColor: '#eeeeee' }}>
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Les produits MicroCap
                    </h1>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-11">
                            <div className="center-hor-ver session-body text-center">
                                <div className="row discover">
                                    <div className="col-sm-12 discover-block">
                                        <div className="discover-content">
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/bg-1.jpg')} alt="" />
                                                </div>
                                                <div className="col-md-8">
                                                    <h1>Le PIP Microcap</h1>
                                                    <p>
                                                        est une plateforme de soutien à l'initiative entrepreneuriale et citoyenne. En
                                                        rejoignant le réseau, vous aurez la possibilité de participer activement au succès
                                                        de projets que nous accompagnons, au mieux, proposer votre projet et intégrer notre
                                                        programme de professionalisation pour entrepeneurs.
                                                        </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content">
                                            <div className="row align-items-center">
                                                <div className="col-md-8">
                                                    <h1>Le PIP Microcap</h1>
                                                    <p>
                                                        est une plateforme de soutien à l'initiative entrepreneuriale et citoyenne. En
                                                        rejoignant le réseau, vous aurez la possibilité de participer activement au succès
                                                        de projets que nous accompagnons, au mieux, proposer votre projet et intégrer notre
                                                        programme de professionalisation pour entrepeneurs.
                                                        </p>
                                                </div>
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/bg-1.jpg')} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content">
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/bg-1.jpg')} alt="" />
                                                </div>
                                                <div className="col-md-8">
                                                    <h1>Le PIP Microcap</h1>
                                                    <p>
                                                        est une plateforme de soutien à l'initiative entrepreneuriale et citoyenne. En
                                                        rejoignant le réseau, vous aurez la possibilité de participer activement au succès
                                                        de projets que nous accompagnons, au mieux, proposer votre projet et intégrer notre
                                                        programme de professionalisation pour entrepeneurs.
                                                        </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#eeeeee' }}>
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Les services MicroCap
                    </h1>
                </div>


                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <RctCard>
                                <RctCardContent>
                                    <div className="client-post text-center">
                                        <div className="client-thumb mb-20">
                                            <img
                                                className="rounded"
                                                src={require(`Assets/img/bg-1.jpg`)}
                                                alt="client"
                                                width="95"
                                                height="95"
                                            />
                                        </div>
                                        <div className="client-content">
                                            <h4 className="fw-bold text-capitalize text-primary">xxx</h4>
                                            <span className="d-block">
                                                <a href="#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">xxx</a>
                                            </span>
                                            <span className="d-block">
                                                <a href="#" tel="+1 207-589-4752" className="text-dark text-capitalize">xxx</a>
                                            </span>
                                            <span className="d-block text-dark text-capitalize">xxx</span>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <RctCard>
                                <RctCardContent>
                                    <div className="client-post text-center">
                                        <div className="client-thumb mb-20">
                                            <img
                                                className="rounded"
                                                src={require(`Assets/img/bg-1.jpg`)}
                                                alt="client"
                                                width="95"
                                                height="95"
                                            />
                                        </div>
                                        <div className="client-content">
                                            <h4 className="fw-bold text-capitalize text-primary">xxx</h4>
                                            <span className="d-block">
                                                <a href="#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">xxx</a>
                                            </span>
                                            <span className="d-block">
                                                <a href="#" tel="+1 207-589-4752" className="text-dark text-capitalize">xxx</a>
                                            </span>
                                            <span className="d-block text-dark text-capitalize">xxx</span>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <RctCard>
                                <RctCardContent>
                                    <div className="client-post text-center">
                                        <div className="client-thumb mb-20">
                                            <img
                                                className="rounded"
                                                src={require(`Assets/img/bg-1.jpg`)}
                                                alt="client"
                                                width="95"
                                                height="95"
                                            />
                                        </div>
                                        <div className="client-content">
                                            <h4 className="fw-bold text-capitalize text-primary">xxx</h4>
                                            <span className="d-block">
                                                <a href="#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">xxx</a>
                                            </span>
                                            <span className="d-block">
                                                <a href="#" tel="+1 207-589-4752" className="text-dark text-capitalize">xxx</a>
                                            </span>
                                            <span className="d-block text-dark text-capitalize">xxx</span>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <RctCard>
                                <RctCardContent>
                                    <div className="client-post text-center">
                                        <div className="client-thumb mb-20">
                                            <img
                                                className="rounded"
                                                src={require(`Assets/img/bg-1.jpg`)}
                                                alt="client"
                                                width="95"
                                                height="95"
                                            />
                                        </div>
                                        <div className="client-content">
                                            <h4 className="fw-bold text-capitalize text-primary">xxx</h4>
                                            <span className="d-block">
                                                <a href="#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">xxx</a>
                                            </span>
                                            <span className="d-block">
                                                <a href="#" tel="+1 207-589-4752" className="text-dark text-capitalize">xxx</a>
                                            </span>
                                            <span className="d-block text-dark text-capitalize">xxx</span>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                    </div>

                    <div className="col-sm-12 discover-block">
                        <div className="discover-heading center-hor-ver">
                            <h1>Les offres et pass Microcap</h1>
                        </div>
                        <div className="discover-content">
                            <p className="ctext">
                                <ol className="custom-list ml-20">
                                    <li>Entrepreneurs : proposez vos projets dans le cadre des programmes encours.</li>
                                    <li>Investisseurs : accédez en toute sérénité aux marchés des TPE/PME en France et à l’international.</li>
                                    <li>Petit épargnant : souscrivez aux produits financiers (Comptes d’épargne, actions, obligations, …) </li>
                                    <li>Petit épargnant : souscrivez aux produits financiers (Comptes d’épargne, actions, obligations, …) </li>
                                    <li>Petit épargnant : souscrivez aux produits financiers (Comptes d’épargne, actions, obligations, …) </li>
                                    <li>Petit épargnant : souscrivez aux produits financiers (Comptes d’épargne, actions, obligations, …) </li>
                                </ol>
                            </p>
                        </div>
                    </div>
                    <div className="row" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '2%', paddingBottom: '2%' }}>
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                            <Card>
                                <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/bg-1.jpg')} alt="Card image cap" />
                                <CardBody>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                            <Card>
                                <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/bg-1.jpg')} alt="Card image cap" />
                                <CardBody>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                            <Card>
                                <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/bg-1.jpg')} alt="Card image cap" />
                                <CardBody>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>


                <RctCard customClasses="p-60">
						<Clientslider />
					</RctCard>
            </div>
            {/* </div> */}
        </div>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {})(injectIntl(Discover));
