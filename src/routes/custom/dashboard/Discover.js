import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { AUTH, GALERY_PROJECT, DISCOVER, HOME } from "Url/frontendUrl";
import AppBar from "@material-ui/core/AppBar/AppBar";
import headerImg from 'Assets/img/image_revolution.jpg';
import {
    Card,
    CardImg,
    CardText,
    CardBody
} from 'reactstrap';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { getAgents } from "Actions/independentActions";
import {
    Player
} from 'video-react';

const Discover = (props) => {
    const { loading, intl } = props;
    const [data, setData] = useState([])
    /**
     * On navigate to Discover Microcap
     */
    const onUserLogin = () => {
        props.history.push(AUTH.LOGIN);
    };

    document.body.style.overflow = "auto";

    useEffect(() => {
        getAgents().then(data => {
            setData(data)
        })
    }, []);

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
                                <Link to={DISCOVER}>
                                    <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                        Microcap
                                   </a>
                                </Link>
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                    Produits et services
                                </a>
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                    Pass microcap
                                </a>
                                <Link to={GALERY_PROJECT}>
                                    <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                        Gallerie projets
                                    </a>
                                </Link>
                                <a className="mr-30" style={{ fontSize: '1.2em' }}>
                                    Réseau d'agent
                                </a>
                                <Button variant="contained" className="btn-primary mr-2 text-white" onClick={onUserLogin}>
                                    <IntlMessages id="auth.signin" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper video-player-wrapper">
                <div style={{ height: '35vh', backgroundImage: `url(${headerImg})`, backgroundSize: 'contain' }}>
                    <h1 className="font-weight-bold text-white" style={{ fontSize: '3em', padding: '4%' }}>
                        La solidarité, le pouvoir des petits capitaux
                    </h1>
                </div>

                <h1 className="font-weight-bold text-black" style={{ fontSize: '2em', padding: '2%', textAlign: 'center' }}>
                    La solidarité, le pouvoir des petits capitaux
                </h1>
                <p style={{ fontSize: '1.1em', textAlign: 'center' }}>Concilier traditions et innovations pour réinventer une solidarité utile à promouvoir une finance inclusive et vertueuse</p>
                <div className="row" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '2%', paddingBottom: '2%' }}>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/01-solidarite-1.jpg')} alt="Card image cap" />
                            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>En famille, entre camarades, entre collègues, entre compatriotes, adopter la solidarité comme principe. Besoin d'un soutien ou d'un coup de pouce pour entreprendre ?</CardText>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Rejoindre le réseau de solidarité MicroCap
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/tradition-et-innovation.jpg')} alt="Card image cap" />
                            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>Entre tradition et innovation, le love money permet de collecter de l'argent auprès des proches pour vous financer. Avec MicroCap, vous collecter juste l'avis des membres du réseau</CardText>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Developper son réseau
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/budget.jpg')} alt="Card image cap" />
                            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>Sensibiliser et porter l’éducation financière économique et budgétaire à tous pour rationaliser le rapport avec l’argent</CardText>
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
                        poster={require('Assets/img/microcap.png')}
                        src='http://dev1.microcap.fr:8080/files/videos/video_accueil3.mp4'
                    />
                    <p style={{ fontSize: '1.2em', marginTop: 20, textAlign: 'center' }}>
                        Microcap finance votre épargne et vous accompagne dans votre projet: créer une entreprise, devenir actionnaire d'une entreprise, se former
                        à la création d'entreprise
                    </p>
                    {/* <p style={{ fontSize: '1.2em', marginTop: 10, textAlign: 'center' }}>
                        Ouvrir votre Plan d'Investissement Programmé MicroCap et Rejoignez le premier réseau international de solidarité financière
                    </p> */}
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
                                                        - Vous êtes solidaire avec un entrepreneur proche de vous ou, avec les entrepreneurs en général,<br />
                                                        - Vous voulez fructufier ou diversifier votre épargne, <br />
                                                        - Vous rêvez de créer votre entreprise, vous avez déja un idée, voir un projet, <br />
                                                        - Vous avez déjà crée votre entreprise et vous rencontrez des difficultés de financement,<br />
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
                                                    <img className="img-fluid" src={require('Assets/img/card-w.jpg')} alt="" />
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
                                                        Votre reserve MicroCap est utilisable sur une liste de services restreintes benéficiant chacun d'un délai de remboursement prédéfini.<br />
                                                        - Transfert d'argent vers des réseaux partenaires (5 jours)<br />
                                                        - paiement marchand pour tout commerçant agrée(15 jours)<br />
                                                        - Règlement de loyer chez un promoteurs conventionné (30 jours)<br />
                                                        - dépot de garantie pour un bail (90 jours)<br />
                                                        l'usage de la reserve est gratuit sur 3 jours puis facturé à un interêt journalier de 0,045 %
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="discover-content" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-8">
                                                    <h1>Investisseur! ne manquez pas la Liga</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        La ligne d’investissement garantie (Liga)
                                                        Tout placement est exposé au risque de perte partielle ou totale en capital. MicroCap propose aux investisseurs une convention de co-investissement pour limiter la perte en capital.
                                                        Les membres du réseau MicroCap verse une contribution de solidarité  réseau annuelle qui garantit une quotité de tout capital investi sur un projet éligible à la Liga. Cette quotité peut atteindre 100% du capital et, peut être assortie d’une prime de risque. Pour guider les utilisateurs dans leurs choix, les projets de la plateforme sont marqués par un système de notation donnant à titre indicatif le niveau de risque.
                                                        Liga x pour capital garantie à x%,
                                                        Approved pour projet approuvé par une commission technique,
                                                        n lovers pour n personnes qui suivent et aiment le projet
                                                    </p>
                                                </div>
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/invest.jpg')} alt="" />
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
                            <h1 style={{ fontSize: '3em', padding: '4%' }}>Les Pass Microcap</h1>
                        </div>
                        <div className="discover-content">
                            <p className="ctext">
                                <ol className="custom-list ml-20">
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Pass découvert</p>
                                        <p>Gratuit et sans conditions, il permet un accès restreint à la plateforme pour se familiariser avec le service et découvrir nos projets</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Pass réseau</p>
                                        <p>C’est la carte de membre qui est attribué à toute personne qui ouvre un plan d’investissement MicroCap à fin de contribuer ou bénéficier de la solidarité du réseau</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Pass club business</p>
                                        <p>Les porteurs des projets de la plateforme bénéficient des service des professionnels et du concours de partenaires investisseurs ou institutionnels pour le succès de leur entreprise. ils sont soumis au regime de solidarité par l’obligation d’un Pass club business</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Pass ANY-Cycle revelation</p>
                                        <p>Le pass any pour any whère and anytime, est réservé au entrepreneurs de la plateforme pour se lancer à tout moment et ceci
                                        n’importe où si le service microcap y est disponible. Le cycle R ou révélation est un cycle long de trois ans pour créer son entreprise en partant juste d’une intention ou une envie d’entreprendre</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Pass ANY-Cycle incubation </p>
                                        <p>Le pass any pour any whère and anytime, est réservé aux entrepreneurs de la plateforme pour se lancer à tout moment et ceci
                                        n’importe où si le service microcap y est disponible. Le cycle I ou incubation est un cycle de 12 mois pour créer son entreprise en partant d’une idée.</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Pass ANY-Cycle acceleration</p>
                                        <p>Le pass any pour any whère and anytime, est réservé aux entrepreneurs de la plateforme pour se lancer à tout moment et ceci
                                        n’importe où si le service microcap y est disponible. Le cycle A ou accélération est un cycle court de trois ans pour valider une idée ou un projet et lancer son entreprise.</p>
                                    </li>
                                </ol>
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#eeeeee', marginBottom: '7vh' }}>
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Réseau d'agents
                    </h1>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        {data.map(agent => (
                            <div className="col-sm-12 col-md-4 col-lg-3">
                                <RctCard>
                                    <RctCardContent>
                                        <div className="client-post text-center">
                                            <div className="client-thumb mb-20">
                                                <img
                                                    className="rounded"
                                                    src={agent.avatar}
                                                    alt="client"
                                                    width="95"
                                                    height="95"
                                                />
                                            </div>
                                            <div className="client-content">
                                                <h4 className="fw-bold text-capitalize text-primary">{agent.name}</h4>
                                                <span>{agent.email}</span>
                                                <span>{agent.phone}</span>
                                                <span>{agent.address}</span>
                                            </div>
                                        </div>
                                    </RctCardContent>
                                </RctCard>
                            </div>
                        ))}
                    </div>
                </div>

                {/* <RctCard customClasses="p-60">
                    <Clientslider />
                </RctCard> */}
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
