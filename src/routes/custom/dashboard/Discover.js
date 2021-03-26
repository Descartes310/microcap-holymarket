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

// import Video from 'Assets/data/videos/video_accueil3.mp4'

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
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                   Microcap
                                </a>
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                   Produits et services
                                </a>
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                   Offres
                                </a>
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                   Galerie projets
                                </a>
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                   Reseau d'agent
                                </a>
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                   Contact
                                </a>
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
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/01-solidarite-1.jpg')} alt="Card image cap" />
                            <CardBody>
                                <CardText>La solidarité familiale, la solidarité entre camarade ou entre collègue, la solidarité nationale; Un principe très éfficace lors de coup durs: et pourquoi pas pour entreprendre ?​</CardText>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Rejoindre le réseau de solidarité MicroCap
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/tradition-et-innovation.jpg')} alt="Card image cap" />
                            <CardBody>
                                <CardText>Entre tradition et innovation, le love money permet de collecter de l'argent auprès des proches pour vous financer. Avec MicroCap, vous collecter juste l'avis des membres du réseau</CardText>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Developper son réseau
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/budget.jpg')} alt="Card image cap" />
                            <CardBody>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Reprendre le contrôle avec MicroCap
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <div
                    className="col-sm-12 col-md-8 col-lg-8 offset-lg-2"
                >
                    <Player
                        playsInline
                        poster="https://ucf71a9a3fc561e4a20d21a900fe.previews.dropboxusercontent.com/p/thumb/ABEXVRGoaXRi20AQImCJdrGdL3GTQZ4G2s5rZgs7pCuMNcAEcCPLj0-chyxKlxo_5gQI7l9SAeT70z3e1gh4N0MPYe7wLQZRR42WBD9Ens40sRsYzDKTRB8DdDqUzU0n564C4Cpu_INwD3XBoOPtUGoWs65QP2KVdDbn2As61_UR_UbXOJ_SnD6JoSubmhsrqWFR78SxilSaPWUMx1R6Yu2Kw3PLJ0j13P5yRaTKSIB2PoXV1qkee4pVFUDuR6OwERRS0VKqlZsOF7amDS7DEpsXRLgyunG_TDj3UqupL85t5gCLfAEdVQiOb-4of55GwEFIkrjzZqnL5vB1aDoDQwBHoWvbaZq8vA8FMbpM5I7J-A/p.png"
                        src='http://dev1.microcap.fr:8080/files/videos/video_accueil3.mp4'
                    />
                    <p style={{ fontSize: '1.2em', marginTop: 20, textAlign: 'center' }}>
                    Microcap finance votre épargne et vous accompagne dans votre projet: créer une entreprise, devenir actionnaire d'une entreprise, se former à la création d'entreprise​
                    </p>
                    <p style={{ fontSize: '1.2em', marginTop: 10, textAlign: 'center' }}>
                    Ouvrir votre Plan d'Investissement Programmé MicroCap et Rejoignez le premier réseau international de solidarité financière​
                    </p>
                </div>

                <div style={{ backgroundColor: '#eeeeee', marginTop: '7vh' }}>
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
                                        <div className="discover-content" style={{ marginTop: '7vh', marginBottom: '7vh' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/money.jpg')} alt="" />
                                                </div>
                                                <div className="col-md-8">
                                                    <h1>Le PIP Microcap</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        Vous êtes solidaire avec un entrepreneur proche de vous ou, avec les entrepreneurs en général, 
                                                        Vous voulez fructufier ou diversifier votre épargne
                                                        Vous rêvez de créer votre entreprise, vous avez déja un idée, voir un projet ...
                                                        Vous avez déjà crée votre entreprise et vous rencontrez des difficultés de financement,
                                                        Ouvrez votre PIP MicroCap et beneficier du soutien de tous les membres du réseau MicroCap détententeur chacun d'un PIP MicroCap 
                                                        Le PIP MicroCap est un plan d'épargne qui vous permet d'investir à partir de 5€ dans l'économie réelle et dans les entreprises de proximité. Vous pouvez participer à la création ou au developpement d'une entreprise portée par un proche, d'une entreprise qui représente mieux vos valeurs, d'une entreprise qui repond à vos besoins.
                                                        Le PIP MicroCap est un compte d'épargne en titres financiers qui agrège en valeur les poduits d'épargnes et de placements proposés des établissements financiers partenaires et exclusivement distribués et opérés sur la plateforme MicroCap.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-8">
                                                    <h1>La carte ESH Microcap</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        La carte qui protège votre pouvoir d'achat sur les besoins essentiels, l'arme de destruction massive contre la pauvreté. La carte carte Emploi, Santé et Habitat est adossée à votre PIP MicroCap et vous permet de cumuler, pour chaque investissement que vous réalisez sur les projets de la plateforme MicroCap, des droits à la formation d'insersion ou de convertion professionnel, aux actes de soins de santé, aux heures hébergement gratuit . Vous échapper ainsi à l'inflation et pouvez excercer vos droits auprès des entrepreneurs sous convention quelque soit leur pays d'implantation.
                                                    </p>
                                                </div>
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/card.jpg')} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/credit.jpg')} alt="" />
                                                </div>
                                                <div className="col-md-8">
                                                    <h1>La reserve Microcap</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        La reserve MicroCap vous dépanne sur du très court terme, 1 à 90 jours sur des besoins essentiels. MicroCap vous engage à la finance vertueuse et vous protège contre la consommation à outrance et apauvrissante. Conformement à cet engagement de MicroCap, la reserve proposée est une facilité de caisse qui repond à une notion d'urgence ou d'avance sur un revenu certain à très court terme. 
                                                        Votre reserve MicroCap est utilisable sur une liste de services restreintes benéficiant chacun d'un délai de remboursement prédéfini. 
                                                        - Transfert d'argent vers des réseaux partenaires (5 jours)
                                                        - paiement marchand pour tout commerçant agrée(15 jours)
                                                        - Règlement de loyer chez un promoteurs conventionné (30 jours)
                                                        - dépot de garantie pour un bail (90 jours)
                                                        l'usage de la reserve est gratuit sur 3 jours puis facturé à un interêt journalier de 0,045 %
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

                <div style={{ backgroundColor: '#eeeeee', marginBottom: '7vh' }}>
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
                                                src={require(`Assets/img/x4.jpg`)}
                                                alt="client"
                                                width="95"
                                                height="95"
                                            />
                                        </div>
                                        <div className="client-content">
                                            <h4 className="fw-bold text-capitalize text-primary">Garantie de Cautionnement bancaire</h4>
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
                                                src={require(`Assets/img/x2.jpg`)}
                                                alt="client"
                                                width="95"
                                                height="95"
                                            />
                                        </div>
                                        <div className="client-content">
                                            <h4 className="fw-bold text-capitalize text-primary">Garantie des livraisons des commandes en prévente</h4>
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
                                                src={require(`Assets/img/x3.jpg`)}
                                                alt="client"
                                                width="95"
                                                height="95"
                                            />
                                        </div>
                                        <div className="client-content">
                                            <h4 className="fw-bold text-capitalize text-primary">Préfinancement du PIP Microcap</h4>
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
                                                src={require(`Assets/img/x1.jpg`)}
                                                alt="client"
                                                width="95"
                                                height="95"
                                            />
                                        </div>
                                        <div className="client-content">
                                            <h4 className="fw-bold text-capitalize text-primary">Cofinancement en capital et quasi fonds propres</h4>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                    </div>

                    <div className="col-sm-12 discover-block" style={{ marginTop: '5vh' }}>
                        <div className="discover-heading center-hor-ver">
                            <h1 style={{ fontSize: '3em', padding: '4%' }}>Les offres et pass Microcap</h1>
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
                    {/* <div className="row" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '2%', paddingBottom: '2%' }}>
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
                    </div> */}
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
