import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import {
    AUTH, DISCOVER, HOME, PIONIERS, TERMS, LEGAL_MENTION,
    GALERY_PROJECT, SOLIDARITY, MONEY_MANAGEMENT, GETIN, MISSION,
    VALUES, PASS_DETAILS, AGENTS, SERVICES
} from "Url/frontendUrl";
import AppBar from "@material-ui/core/AppBar/AppBar";
import headerImg from 'Assets/img/image_revolution.jpg';
import {
    Card,
    CardImg,
    CardText,
    CardBody
} from 'reactstrap';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { getMainAgents, getMainPioniers } from "Actions/independentActions";
import {
    Player
} from 'video-react';
import { HashLink } from 'react-router-hash-link';
import { Tooltip } from '@material-ui/core';
import { getFilePath } from "Helpers/helpers";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./styles.css";
import ScrollToTopBtn from "./ScrollToTop";
import {
	SocialFeedsWidget
} from "Components/Widgets";

const Discover = (props) => {
    const { loading, intl } = props;
    const [data, setData] = useState([]);
    const [pioniers, setPioniers] = useState([]);
    /**
     * On navigate to Discover Microcap
     */
    const onUserLogin = () => {
        props.history.push(AUTH.LOGIN);
    };

    document.body.style.overflow = "auto";

    useEffect(() => {
        getMainAgents().then(data => {
            setData(data)
        })
        getMainPioniers().then(data => {
            setPioniers(data)
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
                                {/* <Link to={DISCOVER}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Microcap
                                   </a>
                                </Link> */}
                                <UncontrolledDropdown nav className="list-inline-item vr-super">
                                    <DropdownToggle nav caret className="text-white">
                                        <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                            Découvir
                                        </a>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#produits`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Produits pour se financer
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#investir`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Produits pour investir
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#services`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Produits des Partenaires
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#pass`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Pass Microcap
                                                </a>
                                            </HashLink>
                                        </DropdownItem><DropdownItem>
                                            <HashLink to={`${DISCOVER}/#pioniers`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    L'équipe
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#agents`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Point d'accueil
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                <HashLink to={`${PASS_DETAILS}`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Pass microcap
                                    </a>
                                </HashLink>
                                <Link to={GALERY_PROJECT}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Gallerie projets
                                    </a>
                                </Link>
                                <HashLink to={`${AGENTS}`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Réseau d'agent
                                    </a></HashLink>
                                <Button variant="contained" className="btn-primary mr-2" onClick={onUserLogin}>
                                    <IntlMessages id="auth.signin" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper video-player-wrapper">
                <div style={{ height: '35vh', backgroundImage: `url(${headerImg})`, backgroundSize: 'cover' }}>
                    <p style={{ paddingTop: '17vh', textAlign: 'center', marginLeft: '10%' }}>
                        Rejoignez le  <b>réseau de solidarité MicroCap</b>, vos versements sont libres à partir de 3€ sur votre <Link to={SERVICES} style={{ color: 'black', fontSize: '1.1em', fontWeight: 'bold' }}>compte ESH</Link> auprès d’un établissement financier partenaire
                    </p>
                </div>
                {/* <div className="page-title d-flex align-items-center" style={{ padding: 40 }}>
                    <IconButton to="/login" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
                        <i className="zmdi zmdi-arrow-left"></i>
                    </IconButton>
                    <h3>Retour sur Connexion</h3>
                </div> */}

                <h1 className="font-weight-bold text-black" style={{ fontSize: '2em', padding: '2%', textAlign: 'center' }}>
                    Concilier traditions et innovations
                </h1>
                <p style={{ fontSize: '1.1em', textAlign: 'center' }}>Etendre votre réseau de love money au -delà du cercle familial et amical, </p>
                <p style={{ fontSize: '1.1em', textAlign: 'center' }}>réinventer une solidarité utile et promouvoir une finance inclusive</p>
                <div className="row" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '2%', paddingBottom: '2%' }}>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/tradition-et-innovation.jpg')} alt="Card image cap" />
                            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center', minHeight: 132 }}>
                                    <p> La solidarité ! une valeur essentielle chez MicroCap. </p>
                                    <p> Entre tradition et innovation, découvrez le love money par MicroCap pour financer vos projets. </p>
                                    <p> Rejoignez le réseau MicroCap, plus large, plus dynamique </p>
                                </CardText>
                                <Link to={GETIN}>
                                    <Button variant="contained" className="btn-primary mr-2">
                                        Rejoindre Microcap
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/01-solidarite-1.jpg')} alt="Card image cap" />
                            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center', minHeight: 132 }}>
                                    <p>Sur MicroCap, pas de sélection de projet mais des dotations chaque trimestre pour les cinq meilleurs projets à impact.</p>
                                    <p>Ensemble, construisons un monde durable</p>
                                    <p><span style={{ fontSize: '1.3em', color: '#ffce39', fontWeight: 'bold' }}>50 000€</span> à gagner pour démarrer !</p>
                                </CardText>
                                <Link to={SOLIDARITY}>
                                    <Button variant="contained" className="btn-primary mr-2">
                                        Nos projets solidaires
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/budget.jpg')} alt="Card image cap" />
                            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center', minHeight: 132 }}>
                                    <p>Notre programme à l’éducation financière pour des personnes en exclusion financière est totalement gratuit.</p>
                                    <p>Vous pouvez aider vos proches dans cette situation à s’en sortir. </p>
                                </CardText>
                                <Link to={MONEY_MANAGEMENT}>
                                    <Button variant="contained" className="btn-primary mr-2">
                                        Education financière
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </div>
                </div>


                <div
                    className="row" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '2%', paddingBottom: '2%' }}
                >
                    <Player
                        playsInline
                        poster={require('Assets/img/microcap.png')}
                        //src='http://api-preprod.microcap.fr/files/videos/video.mp4'
                        src='http://api.microcap.fr/files/videos/video.mp4'
                    />
                    <p style={{ fontSize: '1.2em', marginTop: 20, textAlign: 'center' }}>
                        Microcap vous accompagne dans la réalisation de votre projet:  création ou développement d’entreprise, actionnariat, formation à l’entrepreneuriat ...<br />
                        <Link to={AUTH.REGISTER} style={{ color: '#e19d00' }}>İnscrivez-vous</Link> et choississez l’abonnement qui vous correspond parmi <Link to={PASS_DETAILS} style={{ color: '#e19d00' }}>nos PASS</Link>
                    </p>
                    {/* <p style={{ fontSize: '1.2em', marginTop: 10, textAlign: 'center' }}>
                        Ouvrir votre Plan d'Investissement Programmé MicroCap et Rejoignez le premier réseau international de solidarité financière
                    </p> */}
                </div>

                <div style={{ backgroundColor: '#eeeeee', marginTop: '7vh' }} id='produits'>
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Produits pour se financer
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
                                                    <h1 style={{ textAlign: 'left', width: '70%' }}>PIP MicroCap, un compte qui conte des comptes et qui atteste de votre capacité financière</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        {/* <h2>Un compte qui conte des comptes</h2> */}
                                                        <p style={{ textAlign: 'justify', fontSize: '0.9em', lineHeight: 1.5, }}>
                                                            Le Plan d’Investissement Programmé (PIP) MicroCap est un compte agrégateur qui indique votre épargne ESH disponible auprès de nos partenaires. . Il reproduit fidèlement l’évolution de l’ensemble de vos comptes ESH: versement, intérêts …
                                                        </p>
                                                        <p style={{ textAlign: 'justify', fontSize: '0.9em', lineHeight: 1.5, }}>
                                                            Le PIP MicroCap constitue une capacité financière qui vous sert de sureté pour cautionner les membres du réseau. Vous constituez ainsi progressivement votre propre réseau de solidarité qui vous soutiendra  en retour lors d’une future demande de financement
                                                        </p>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 1.5, color: 'black', fontWeight: 'bold' }}>
                                                            Le PIP MicroCap donne du sens et de la puissance à votre épargne ESH.
                                                        </p>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content" style={{ marginTop: '5%', marginBottom: '7%' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-8">
                                                    <h1 style={{ textAlign: 'right' }}>La carte ESH, pour protéger votre pouvoir d'achat </h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 1.5, marginTop: 20 }}>
                                                        Adossée à votre PIP MicroCap, la carte Emploi-Santé-Habitat vous permet de gagner des services gratuit pour chaque investissement réalisé sur les projets de la plateforme MicroCap. Bénéficiez de droits à la formation, de facilités pour l’insertion ou la reconversion professionnelle, de soins de santé, d’un hébergement. Vos droits aux services gratuit sont valables auprès de tous les entrepreneurs sous convention avec MicroCap.
                                                    </p>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 1.5, color: 'black', fontWeight: 'bold' }}>
                                                        Accédez gratuitement à des services essentiels : insertion ou conversion professionnelle, soins de santé, logement décent.
                                                    </p>
                                                </div>
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/card-w.jpg')} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content" style={{ marginTop: '5%', marginBottom: '7%' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/credit.jpg')} alt="" />
                                                </div>
                                                <div className="col-md-8">
                                                    <h1 style={{ textAlign: 'left' }}>La reserve Microcap</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 1.5, marginTop: 20 }}>
                                                        Fort de son engagement pour une finance plus vertueuse,  MicroCap vous protège de la surconsommation et négocie pour vous auprès de ses partenaires. Chaque compte ESH est associé à une ligne de crédit renouvelable : la réserve ESH. La réserve MicroCap, sur le modèle du PIP MicroCap, est le compte agrégateur de vos réserves ESH qui vous donne droit à une trésorerie de dépannage sur du très court terme (1-90 jours), destinée à pourvoir aux besoins essentiels. La réserve MicroCap est une facilité de trésorerie sous forme de crédit d’urgence ou d’avance sur revenu certains. Elle est utilisable sur une durée prédéfinie pour les services autorisés :  <br />
                                                        <ul style={{ paddingLeft: 40, fontSize: '1em' }}>
                                                            <li>Transfert d’argent vers des réseaux partenaires &rarr; <em>5 jours</em></li>
                                                            <li>Règlement de tout commerçant ou de tout prestataire conventionné &rarr; <em>15 à 30 jours</em></li>
                                                            <li>Dépôt de garantie pour un bail &rarr; <em>90 jours</em></li>
                                                        </ul>
                                                        <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 1.5, color: 'black', fontWeight: 'bold' }}>
                                                            Utilisez votre réserve gratuitement sur 3 jours ! Au-delà, facturation d’un intérêt journalier.
                                                        </p>
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

                <div style={{ backgroundColor: '#eeeeee', marginTop: '7vh' }} id='investir'>
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Produits pour investir
                    </h1>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-11">
                            <div className="center-hor-ver session-body text-center">
                                <div className="row discover">
                                    <div className="col-sm-12 discover-block"></div>
                                    <div className="discover-content" style={{ marginTop: '5%', marginBottom: '7%' }}>
                                        <div className="row align-items-center">
                                            <div className="col-md-8">
                                                <h1 style={{ textAlign: 'right' }}>La Liga, Investir en toute sérénité : Capital garantie</h1>
                                                <p style={{ textAlign: 'justify', fontSize: '1.2em', lineHeight: 2, marginTop: 20 }}>
                                                    <p style={{ textAlign: 'justify', fontSize: '0.9em', lineHeight: 1.5, }}>Tout placement est exposé au risque de perte partielle ou totale en capital. MicroCap propose aux investisseurs une convention de co-investissement sous la forme d’une Ligne d’Investissement Garantie, pour limiter la perte en capital. </p>
                                                    <p style={{ textAlign: 'justify', fontSize: '0.9em', lineHeight: 1.5, }}>Les membres du réseau MicroCap verse une contribution de solidarité  réseau annuelle qui garantit une quotité de tout capital investi sur un projet éligible à la Liga. Cette quotité peut atteindre 100% du capital et, peut être assortie d’une prime de risque. Pour guider les utilisateurs dans leurs choix, les projets de la plateforme sont marqués par un système de notation donnant à titre indicatif le niveau de risque.</p>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 1.5, color: 'black', fontWeight: 'bold' }}>
                                                        Institutions, Investisseurs professionnels, ne manquez pas La liga ! la garantie de la liquidité et la sécurité de votre capital investi
                                                    </p>
                                                    <p style={{ textAlign: 'justify', fontSize: '0.7em', lineHeight: 1.5, }}>Exemple de notation d'un projet: </p>
                                                    <p style={{ textAlign: 'justify', fontSize: '0.7em', lineHeight: 1.2, }}>Score projet : 80-approved-234 <span style={{ fontSize: '0.8em' }}>(pour un projet dont le capital investi est garanti à 80%, approuvé par une commission technique et suivi régulièrement par 234 personnes.)</span></p>
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <img className="img-fluid" src={require('Assets/img/invest.jpg')} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="discover-content" style={{ marginTop: '5%', marginBottom: '7%' }}>
                                        <div className="row align-items-center">
                                            <div className="col-md-4">
                                                <img className="img-fluid" src={require('Assets/img/credit.jpg')} alt="" />
                                            </div>
                                            <div className="col-md-8">
                                                <h1 style={{ textAlign: 'left' }}>Le compte ISUS, Investir en toute sérénité : Gestion professionnelle assurée</h1>
                                                <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2, marginTop: 20 }}>
                                                    Le compte ISUS est un compte titre  ordinaire ouvert auprès d’un établissement financier partenaire, qui vous permet Investir dans les TPE et PME non cotées du réseau MicroCap . Les titres de votre comptes ISUS peuvent être céder à MicroCap en gérance, en jouissance, ou en propriété avec option de reprise sur une période donnée.<br />
                                                    La convention ISUS vous permet d’assurer une gestion professionnelle d’un portefeuille de titres d’entreprises non cotées. Elle vous donne l'opportunité d’investir dans les TPE et PME sans vous soucier du suivi et de la responsabilité investisseur. Ceux-ci étant couverts par un dispositif de mutualisation de MicroCap. <br />
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 1.5, color: 'black', fontWeight: 'bold' }}>
                                                        Information financière, participation aux décisions stratégiques de l’entreprise, l’option et l’opportunité de sortie, la gestion administrative et fiscale, … MicroCap s’occupe de tout
                                                    </p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#eeeeee', marginBottom: '7vh' }} id="services">
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Solutions de financement des partenaires Microcap
                    </h1>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <RctCard>
                                <RctCardContent>
                                    <div className="client-post" style={{ minHeight: 300 }}>
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
                                            <h4 className="fw-bold text-capitalize">Cautionnement bancaire</h4>
                                            <p>Pour obtenir facilement un crédit auprès de votre établissement bancaire habituel.</p>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <RctCard>
                                <RctCardContent>
                                    <div className="client-post" style={{ minHeight: 300 }}>
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
                                            <h4 className="fw-bold text-capitalize">Garantie des livraisons</h4>
                                            <p>Depuis votre espace personnel, profitez des préventes et des ventes privées de nos entrepreneurs. La livraison de vos commandes est garantie.  </p>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <RctCard>
                                <RctCardContent>
                                    <div className="client-post" style={{ minHeight: 300 }}>
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
                                            <h4 className="fw-bold text-capitalize">Préfinancement du PIP</h4>
                                            <p>Votre PIP MicroCap est destiné à la réalisation d’un projet. Vous pouvez obtenir à tout moment sous forme de crédit bancaire le capital que vous souhaitez constituer à terme sur votre PIP.</p>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <RctCard>
                                <RctCardContent>
                                    <div className="client-post" style={{ minHeight: 300 }}>
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
                                            <h4 className="fw-bold text-capitalize">Cofinancement de projets</h4>
                                            <p>Les partenaires MicroCap sont des acteurs engagés qui partage nos valeurs et soutiennent notre création d’impact. Ils interviennent systématiquement en capital ou en quasi-fonds propres, sur les projets labellisés ESH de la plateforme.</p>
                                        </div>
                                    </div>
                                </RctCardContent>
                            </RctCard>
                        </div>
                    </div>

                </div>
                <div style={{ backgroundColor: '#eeeeee', marginBottom: '7vh' }} id="pass">
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Les Pass Microcap
                    </h1>
                </div>
                <div className="container">
                    <div className="col-sm-12 discover-block" style={{ marginTop: '5vh' }} id="pass">
                        <div className="col-md-12">
                            <img className="img-fluid" src={require('Assets/identity/banner.jpg')} alt="" />
                        </div>
                        <p style={{ fontSize: '1.1em', textAlign: 'center', marginTop: 40 }}>
                            Les services de la plateforme sont accessibles sur abonnement ou PASS: <b>à chacun son rythme, à chacun son Pass.</b> <br />

                            <p style={{ textAlign: 'left', fontSize: '1em', marginTop: 40 }}>Chaque PASS MicroCap donne accès à une combinaison de services selon les objectifs de chacun : entreprendre, investir, épargner, soutenir un porteur de projet, … <br />
                            Les produits financiers de nos partenaires dans chaque PASS se différencient sur les plafonds autorisés, les délais. <br />
                                <b>Pour bénéficier des avantages exceptionnels ajoutez une option à votre PASS MicroCap</b></p> <br />
                            <Link to={PASS_DETAILS} style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
                                <Button variant="contained" className="btn-primary mr-2" style={{ padding: 20 }}>
                                    Tout nos PASS
                                </Button>
                            </Link>
                        </p>
                    </div>
                </div>

                <div style={{ backgroundColor: '#eeeeee', marginBottom: '7vh' }} id="pioniers">
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Nos pioniers
                    </h1>
                </div>

                <div className="container">
                    <p>
                        MicroCap est le fruit de l’investissement des hommes et de femmes engagés qui partagent nos valeurs de solidarité et de justice sociale. Ces personnes d’horizon divers apportent leur concours quotidiennement à notre développement : ce sont nos pionniers. Vous pouvez en faire partir et renforcer le mouvement, il vous suffit de prendre une option sur un abonnement MicroCap.
                    </p>
                    <p className="mt-40" style={{ color: 'black', fontSize: '1.1em', fontWeight: 'bold' }}>
                        Pour vous servir et assurer la qualité du service, vous avez en responsabilité :
                    </p>
                    <div className="row justify-content-center">
                        {pioniers.filter(a => a.active == true).map(agent => (
                            <div className="col-sm-12 col-md-4 col-lg-3">
                                <RctCard>
                                    <RctCardContent>
                                        <div className="client-post text-center">
                                            <div className="client-thumb mb-20">
                                                <img
                                                    className="rounded"
                                                    src={getFilePath(agent.avatar)}
                                                    alt="client"
                                                    width="95"
                                                    height="95"
                                                />
                                            </div>
                                            <div className="client-content">
                                                <Tooltip title={agent.about}>
                                                    <h4 className="fw-bold text-capitalize text-primary">{agent.name}</h4>
                                                </Tooltip>
                                                <p>{agent.post}</p>
                                                <p>{agent.email}</p>
                                                <p>{agent.phone}</p>
                                                <p>{agent.about}</p>
                                            </div>
                                        </div>
                                    </RctCardContent>
                                </RctCard>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-50">
                    <Link to={PIONIERS}>
                        <Button variant="contained" className="btn-primary mr-2">
                            Voir les pioniers
                        </Button>
                    </Link>
                </div>

                <div style={{ backgroundColor: '#eeeeee', marginBottom: '7vh' }} id="agents">
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Réseau d'agents
                    </h1>
                </div>

                <div className="container">
                    <p>
                        Les services MicroCap sont 100% disponibles en ligne. Par soucis de proximité, nous nouons des conventions avec des structures offrant des capacités d’accueil physique pour vous informer ou vous assister : Ce sont les agents MicroCap communément appelé « communauté conventionnée » ou « communauté MicroCap ». Le réseau de communautés capable de vous accueillir croit tous les jours, n’hésitez pas à nous contacter par mail ou par téléphone pour avoir le point d’accueil le plus proche pour vous.
                    </p>
                    <p className="mt-40" style={{ color: 'black', fontSize: '1.1em', fontWeight: 'bold' }}>
                        Ils ont récemment rejoint notre réseau d’agent :
                    </p>
                    <div className="row justify-content-center">
                        {data.filter(a => a.active == true).map(agent => (
                            <div className="col-sm-12 col-md-4 col-lg-3">
                                <RctCard>
                                    <RctCardContent>
                                        <div className="client-post text-center">
                                            <div className="client-thumb mb-20">
                                                <img
                                                    className="rounded"
                                                    src={getFilePath(agent.avatar)}
                                                    alt="client"
                                                    width="95"
                                                    height="95"
                                                />
                                            </div>
                                            <div className="client-content">
                                                <Tooltip title={agent.about}>
                                                    <h4 className="fw-bold text-capitalize text-primary">{agent.name}</h4>
                                                </Tooltip>
                                                <p>{agent.email}</p>
                                                <p>{agent.phone}</p>
                                                <p>{agent.address}</p>
                                                <p>{agent.about}</p>
                                            </div>
                                        </div>
                                    </RctCardContent>
                                </RctCard>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-center mb-50">
                    <Link to={AGENTS}>
                        <Button variant="contained" className="btn-primary mr-2">
                            Voir les agents
                        </Button>
                    </Link>
                </div>

                {/* <RctCard customClasses="p-60">
                    <Clientslider />
                </RctCard> */}
            </div>
            {/* </div> */}
            <footer id="fh5co-footer" className="fh5co-bg" role="contentinfo">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row row-pb-md">
                        <div className="col-md-3 fh5co-widget gapes-mobile">
                            <h3>A propos de MicroCap.</h3>
                            <p style={{ marginTop: '5%', color: "rgba(255, 255,255, 0.5)" }}>MicroCap est un service d’accompagnement des entrepreneurs proposé par :</p>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>
                                A+ Conseils SAS
                            </p>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>
                                7 PL du 11 Novembre 1918
                            </p>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>
                                93 000 BOBIGNY
                            </p>
                        </div>
                        <div className="col-md-9 gapes-mobile">
                            {/* <h3>Classes</h3> */}
                            <div className="row">
                                <div className="col-md-3 col-sm-4 col-xs-6 gapes-bottom">
                                    <ul className="fh5co-footer-links">
                                        <h3>Tout MicroCap</h3>
                                        <li><a className="gapes-top" onClick={() => props.history.push(MISSION)}><span className="ti-angle-right"/> Mission et valeur</a></li>
                                        <li><a onClick={() => props.history.push(VALUES)}><span className="ti-angle-right"/> Réseau Microcap</a></li>
                                        <li><a className="gapes-between" onClick={() => props.history.push(SERVICES)}><span className="ti-angle-right"/> Le service Microcap</a></li>
                                        <li><a onClick={() => props.history.push(PIONIERS)}><span className="ti-angle-right"/> Les pionniers</a></li>
                                        <li><a className="gapes-between" onClick={() => props.history.push(AGENTS)}><span className="ti-angle-right"/> Assistances</a></li>
                                        <li><a><span className="ti-angle-right"/> Faqs</a></li>
                                    </ul>
                                </div>

                                <div className="col-md-3 col-sm-4 col-xs-6 gapes-bottom">
                                    <ul className="fh5co-footer-links">
                                        <h3>Informations légales</h3>
                                        <li><a className="gapes-top" onClick={() => props.history.push(TERMS)}><span className="ti-angle-right"/> CGU</a></li>
                                        <li><a><span className="ti-angle-right"/> CGV</a></li>
                                        <li><a  className="gapes-between" onClick={() => props.history.push(LEGAL_MENTION)}><span className="ti-angle-right"/> Mentions légales</a></li>
                                    </ul>
                                </div>

                                <div className="col-md-3 col-sm-4 col-xs-6 gapes-bottom">
                                    <ul className="fh5co-footer-links">
                                        <h3>Suivez-nous</h3>
                                        <li><a className="gapes-top"><span className="ti-angle-right"/> Presse</a></li>
                                        <li><a><span className="ti-angle-right"/> News letter</a></li>
                                        <li>
                                            <a className="gapes-between"> <span className="ti-angle-right"/> Réseaux sociaux</a>
                                            <div className="social-card-wrapper">
                                                <div className="row">
                                                    <div className="col-sm-6 col-md-3 col-lg-3 w-xs-half-block">
                                                        <SocialFeedsWidget
                                                            type="facebook"
                                                            icon="ti-facebook"
                                                            link="https://www.facebook.com/MicroCap-104224985150023/"
                                                        />
                                                    </div>
                                                    <div className="col-sm-6 col-md-3 col-lg-3 w-xs-half-block">
                                                        <SocialFeedsWidget
                                                            type="twitter"
                                                            icon="ti-twitter"
                                                            link="https://twitter.com/MicrocapService"
                                                        />
                                                    </div>
                                                    <div className="col-sm-6 col-md-3 col-lg-3 w-xs-half-block">
                                                        <SocialFeedsWidget
                                                            type="linkedin"
                                                            icon="ti-linkedin"
                                                            link="https://www.linkedin.com/company/appmicrocap/"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-3 col-sm-4 col-xs-6">
                                    <ul className="fh5co-footer-links">
                                        <h3>Contact</h3>
                                        <li><p className="gapes-top" style={{ color: "rgba(255, 255,255, 0.5)" }}>Email: </p></li>
                                        <li><p style={{ color: "rgba(255, 255,255, 0.5)" }}>Tel: 0811 030 089</p></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row copyright">
                            <div className="col-md-12 text-center">
                                <h4 style={{ marginTop: '30px' }}>
                                    <p style={{ color: "rgba(255, 255,255, 0.5)" }} size = '0.9em' >&copy; 2021 | All Rights Reserved.</p>
                                </h4>
                            </div>
                        </div>
                    </div>

                </div>
                <ScrollToTopBtn />
            </footer >

        </div >
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {})(injectIntl(Discover));
