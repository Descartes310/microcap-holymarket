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
    CardBody,
    CardFooter
} from 'reactstrap';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { getMainAgents, getMainPioniers } from "Actions/independentActions";
import {
    Player
} from 'video-react';
import { HashLink } from 'react-router-hash-link';
import { Tooltip } from '@material-ui/core';
import { getFilePath } from "Helpers/helpers";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown} from 'reactstrap';
import "./styles.css";
import ScrollToTopBtn from "./ScrollToTop";
import {
	SocialFeedsWidget
} from "Components/Widgets";
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import DiscoverMenu from "Routes/custom/dashboard/DiscoverMenu";
import DiscoverVideo from "Routes/custom/dashboard/DiscoverVideo";

// import { makeStyles } from '@material-ui/core/styles';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';

const Discover = (props) => {
    const { loading, intl } = props;
    const [data, setData] = useState([]);
    const [pioniers, setPioniers] = useState([]);

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
        <div id="discover-page">
            {/* <div className="rct-session-wrapper"> */}
            <div className={'global-loader'}>
                {loading && <LinearProgress />}
            </div>

            <DiscoverMenu />

            <div className="session-inner-wrapper video-player-wrapper">
                {/*<Parallax className="custom-class" y={[-50, 50]}>*/}
                    <div className="intro-banner" style={{ backgroundImage: `url(${headerImg})` }}>
                        <div className="revolution">
                            {/*TODO: ADD IMAGE HERE*/}
                            <h4>La révolution des petits capitaux</h4>
                        </div>
                        <p>
                            Rejoignez le  <b>réseau de solidarité MicroCap</b>, vos versements sont libres à partir de 3€ sur votre <Link to={SERVICES} style={{ color: 'black', fontSize: '1.1em', fontWeight: 'bold' }}>compte ESH</Link> auprès d’un établissement financier partenaire
                        </p>
                    </div>
                {/*</Parallax>*/}


                {/* <div className="page-title d-flex align-items-center" style={{ padding: 40 }}>
                    <IconButton to="/login" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
                        <i className="zmdi zmdi-arrow-left"></i>
                    </IconButton>
                    <h3>Retour sur Connexion</h3>
                </div> */}

                <div className="showcase-card-block" style={{backgroundImage: `url(${require('Assets/img/bg-shape-gray.png')})`}}>
                    <div className="row center-hor-ver mb-70 flex-column intro">
                        <h2 className="font-weight-bold text-black" data-aos="fade-right">
                            Concilier traditions et innovations
                        </h2>
                        <p data-aos="fade-left">Etendre votre réseau de love money au -delà du cercle familial et amical, </p>
                        <p data-aos="fade-left">réinventer une solidarité utile et promouvoir une finance inclusive</p>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="300">
                            <Card>
                                <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/tradition-et-innovation.jpg')} alt="Card image cap" />
                                <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CardText style={{ fontSize: '1.1em', textAlign: 'center', minHeight: 132 }}>
                                        <p> La solidarité ! une valeur essentielle chez MicroCap. </p>
                                        <p> Entre tradition et innovation, découvrez le love money par MicroCap pour financer vos projets. </p>
                                        <p> Rejoignez le réseau MicroCap, plus large, plus dynamique </p>
                                    </CardText>
                                </CardBody>
                                <CardFooter className="border-0 center-hor-ver">
                                    <Link to={GETIN}>
                                        <Button variant="contained" className="btn-primary mr-2">
                                            Rejoindre Microcap
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="500">
                            <Card>
                                <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/01-solidarite-1.jpg')} alt="Card image cap" />
                                <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CardText style={{ fontSize: '1.1em', textAlign: 'center', minHeight: 132 }}>
                                        <p>Sur MicroCap, pas de sélection de projet mais des dotations chaque trimestre pour les cinq meilleurs projets à impact.</p>
                                        <p>Ensemble, construisons un monde durable</p>
                                        <p><span style={{ fontSize: '1.3em', color: '#ffce39', fontWeight: 'bold' }}>50 000€</span> à gagner pour démarrer !</p>
                                    </CardText>
                                </CardBody>
                                <CardFooter className="border-0 center-hor-ver">
                                    <Link to={SOLIDARITY}>
                                        <Button variant="contained" className="btn-primary mr-2">
                                            Nos projets solidaires
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="700">
                            <Card>
                                <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/budget.jpg')} alt="Card image cap" />
                                <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CardText style={{ fontSize: '1.1em', textAlign: 'center', minHeight: 132 }}>
                                        <p>Notre programme à l’éducation financière pour des personnes en exclusion financière est totalement gratuit.</p>
                                        <p>Vous pouvez aider vos proches dans cette situation à s’en sortir. </p>
                                    </CardText>
                                </CardBody>
                                <CardFooter className="border-0 center-hor-ver">
                                    <Link to={MONEY_MANAGEMENT}>
                                        <Button variant="contained" className="btn-primary mr-2">
                                            Education financière
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>

                <DiscoverVideo />


                <div className="product-section-title" id='produits'>
                    <h2
                        data-aos="fade-down"
                        style={{ fontSize: '3em', padding: '4%' }}
                        className="font-weight-bold text-white text-center"
                    >
                        Produits pour se financer
                    </h2>
                </div>

                <div className="container discover-products">
                    <div className="row justify-content-center">
                        <div className="col-sm-11">
                            <div className="center-hor-ver session-body text-center">
                                <div className="row discover">
                                    <div className="col-sm-12 discover-block">
                                        <div className="discover-content">
                                            <div className="row align-items-center justify-content-lg-between">
                                                <div className="col-md-5" data-aos="fade-right">
                                                    <img className="img-fluid" src={require('Assets/img/large/compressed/money.png')} alt="" />
                                                </div>
                                                <div className="col-md-5 mmt-sm-4" data-aos="fade-left">
                                                    <h4>PIP MicroCap, un compte qui conte des comptes et qui atteste de votre capacité financière</h4>
                                                    <p className="p-block">
                                                        {/* <h2>Un compte qui conte des comptes</h2> */}
                                                        <p>
                                                            Le Plan d’Investissement Programmé (PIP) MicroCap est un compte agrégateur qui indique votre épargne ESH disponible auprès de nos partenaires. . Il reproduit fidèlement l’évolution de l’ensemble de vos comptes ESH: versement, intérêts …
                                                        </p>
                                                        <p>
                                                            Le PIP MicroCap constitue une capacité financière qui vous sert de sureté pour cautionner les membres du réseau. Vous constituez ainsi progressivement votre propre réseau de solidarité qui vous soutiendra  en retour lors d’une future demande de financement
                                                        </p>
                                                        <p className="p-end">
                                                            Le PIP MicroCap donne du sens et de la puissance à votre épargne ESH.
                                                        </p>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content">
                                            <div className="row align-items-center justify-content-lg-between">
                                                <div className="col-md-5 mmt-sm-4 order-2 order-md-1" data-aos="fade-up-right">
                                                    <h4>La carte ESH, pour protéger votre pouvoir d'achat </h4>
                                                    <p className="p-block">
                                                        <p>
                                                            Adossée à votre PIP MicroCap, la carte Emploi-Santé-Habitat vous permet de gagner des services gratuit pour chaque investissement réalisé sur les projets de la plateforme MicroCap. Bénéficiez de droits à la formation, de facilités pour l’insertion ou la reconversion professionnelle, de soins de santé, d’un hébergement. Vos droits aux services gratuit sont valables auprès de tous les entrepreneurs sous convention avec MicroCap.
                                                        </p>
                                                        <p className="p-end">
                                                            Accédez gratuitement à des services essentiels : insertion ou conversion professionnelle, soins de santé, logement décent.
                                                        </p>
                                                    </p>
                                                </div>
                                                <div className="col-md-5 order-sm-first order-md-2 order-1" data-aos="fade-up-left">
                                                    <img className="img-fluid" src={require('Assets/img/large/compressed/card.png')} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content">
                                            <div className="row align-items-center justify-content-lg-between">
                                                <div className="col-md-5" data-aos="fade-down-right">
                                                    <img className="img-fluid" src={require('Assets/img/large/compressed/cash-out.png')} alt="" />
                                                </div>
                                                <div className="col-md-5" data-aos="fade-down-left">
                                                    <h4>La reserve Microcap</h4>
                                                    <p className="p-block">
                                                        <p>
                                                            Fort de son engagement pour une finance plus vertueuse,  MicroCap vous protège de la surconsommation et négocie pour vous auprès de ses partenaires. Chaque compte ESH est associé à une ligne de crédit renouvelable : la réserve ESH. La réserve MicroCap, sur le modèle du PIP MicroCap, est le compte agrégateur de vos réserves ESH qui vous donne droit à une trésorerie de dépannage sur du très court terme (1-90 jours), destinée à pourvoir aux besoins essentiels. La réserve MicroCap est une facilité de trésorerie sous forme de crédit d’urgence ou d’avance sur revenu certains. Elle est utilisable sur une durée prédéfinie pour les services autorisés :  <br />
                                                        </p>
                                                        <ul className="p-list ml-40">
                                                            <li>Transfert d’argent vers des réseaux partenaires &rarr; <em>5 jours</em></li>
                                                            <li>Règlement de tout commerçant ou de tout prestataire conventionné &rarr; <em>15 à 30 jours</em></li>
                                                            <li>Dépôt de garantie pour un bail &rarr; <em>90 jours</em></li>
                                                        </ul>
                                                        <p className="p-end">
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

                <div className="product-section-title" id='investir'>
                    <h2
                        data-aos="fade-down"
                        style={{ fontSize: '3em', padding: '4%' }}
                        className="font-weight-bold text-white text-center"
                    >
                        Produits pour investir
                    </h2>
                </div>

                <div className="container discover-products">
                    <div className="row justify-content-center">
                        <div className="col-sm-11">
                            <div className="center-hor-ver session-body text-center">
                                <div className="row discover">
                                    <div className="col-sm-12 discover-block">
                                        <div className="discover-content">
                                            <div className="row align-items-center justify-content-lg-between">
                                                <div className="col-md-5" data-aos="fade-up-right">
                                                    <h4>La Liga, Investir en toute sérénité: Capital garantie</h4>
                                                    <p className="p-block">
                                                        <p>Tout placement est exposé au risque de perte partielle ou totale en capital. MicroCap propose aux investisseurs une convention de co-investissement sous la forme d’une Ligne d’Investissement Garantie, pour limiter la perte en capital. </p>
                                                        <p>Les membres du réseau MicroCap verse une contribution de solidarité  réseau annuelle qui garantit une quotité de tout capital investi sur un projet éligible à la Liga. Cette quotité peut atteindre 100% du capital et, peut être assortie d’une prime de risque. Pour guider les utilisateurs dans leurs choix, les projets de la plateforme sont marqués par un système de notation donnant à titre indicatif le niveau de risque.</p>
                                                        <p className="p-end">
                                                            Institutions, Investisseurs professionnels, ne manquez pas La liga ! la garantie de la liquidité et la sécurité de votre capital investi
                                                        </p>
                                                        <div className="mt-2">
                                                            <div className="d-flex align-items-center mb-1">
                                                                <div className="bare small rounded d-inline-block" />
                                                                <p className="d-inline-block mb-0">Exemple de notation d'un projet </p>
                                                                <div className="bare small rounded d-inline-block" />
                                                            </div>
                                                            <div>
                                                                <p>Score projet: <strong>80-approved-234</strong> <span>(pour un projet dont le capital investi est garanti à 80%, approuvé par une commission technique et suivi régulièrement par 234 personnes.)</span></p>
                                                            </div>
                                                        </div>
                                                    </p>
                                                </div>
                                                <div className="col-md-5" data-aos="fade-up-left">
                                                    <img className="img-fluid" src={require('Assets/img/large/compressed/invest.png')} alt="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="discover-content">
                                            <div className="row align-items-center justify-content-lg-between">
                                                <div className="col-md-5 order-sm-first order-md-2 order-1" data-aos="fade-down-right">
                                                    <h4>Le compte ISUS, Investir en toute sérénité: Gestion professionnelle assurée</h4>
                                                    <p className="p-block">
                                                        <p>
                                                            Le compte ISUS est un compte titre  ordinaire ouvert auprès d’un établissement financier partenaire, qui vous permet Investir dans les TPE et PME non cotées du réseau MicroCap . Les titres de votre comptes ISUS peuvent être céder à MicroCap en gérance, en jouissance, ou en propriété avec option de reprise sur une période donnée.<br />
                                                            La convention ISUS vous permet d’assurer une gestion professionnelle d’un portefeuille de titres d’entreprises non cotées. Elle vous donne l'opportunité d’investir dans les TPE et PME sans vous soucier du suivi et de la responsabilité investisseur. Ceux-ci étant couverts par un dispositif de mutualisation de MicroCap. <br />
                                                        </p>
                                                        <p className="p-end">
                                                            Information financière, participation aux décisions stratégiques de l’entreprise, l’option et l’opportunité de sortie, la gestion administrative et fiscale, … MicroCap s’occupe de tout
                                                        </p>
                                                    </p>
                                                </div>
                                                <div className="col-md-5 mmt-sm-4 order-2 order-md-1" data-aos="fade-down-left">
                                                    <img className="img-fluid" src={require('Assets/img/large/compressed/cash-out.png')} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div id="services" data-aos="fade-up">
                    <div className="container">
                        <div className="row title-block">
                            <h2 className="font-weight-bold text-black text-center" data-aos="fade-down" data-aos-duration="1500">
                                Solutions de financement des partenaires Microcap
                            </h2>
                        </div>
                        <div className="row item-block">
                            <div className="row justify-content-center">
                                <div className="col-sm-12 col-md-4 col-lg-3">
                                    <RctCard>
                                        <RctCardContent>
                                            <div className="client-post">
                                                <div className="center-holder center-hor-ver client-thumb mb-20">
                                                    <div className="img-block first">
                                                        <img
                                                            alt="client"
                                                            src={require(`Assets/img/x4.jpg`)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="client-content text-center">
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
                                            <div className="client-post">
                                                <div className="center-holder center-hor-ver client-thumb mb-20">
                                                    <div className="img-block second">
                                                        <img
                                                            alt="client"
                                                            src={require(`Assets/img/x2.jpg`)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="client-content text-center">
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
                                            <div className="client-post">
                                                <div className="center-holder center-hor-ver client-thumb mb-20">
                                                    <div className="img-block third">
                                                        <img
                                                            alt="client"
                                                            src={require(`Assets/img/x3.jpg`)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="client-content text-center">
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
                                            <div className="client-post">
                                                <div className="center-holder center-hor-ver client-thumb mb-20">
                                                    <div className="img-block four">
                                                        <img
                                                            alt="client"
                                                            src={require(`Assets/img/x1.jpg`)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="client-content text-center">
                                                    <h4 className="fw-bold text-capitalize">Cofinancement de projets</h4>
                                                    <p>Les partenaires MicroCap sont des acteurs engagés qui partage nos valeurs et soutiennent notre création d’impact. Ils interviennent systématiquement en capital ou en quasi-fonds propres, sur les projets labellisés ESH de la plateforme.</p>
                                                </div>
                                            </div>
                                        </RctCardContent>
                                    </RctCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="pass-section" className="merox-services-area pt-90 pb-90">
                    <div className="area-img">
                        <img src={require('Assets/identity/services-bg.57d4413a.jpg')} alt="img"/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="visibRight col-xl-4 offset-xl-1 col-lg-4 order-2 wow fadeInRight">
                                <div className="title-block lite">
                                    <h4>booster votre abonnement grâce à nos </h4> <h3>Options en <br/> Séries <br/> Limitées</h3>
                                    <Link to={PASS_DETAILS} className="mt-4">
                                        <Button variant="outlined" className="btn-primary mr-2 py-5" >
                                            Tout nos PASS
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="visibLeft col-xl-7 col-lg-8 wow fadeInLeft">
                                <div className="services-box">
                                    <div className="single-services">
                                        <div className="services-content-box">Les services de la plateforme sont accessibles sur abonnement ou PASS: à chacun son rythme, à chacun son Pass.
                                        </div>
                                    </div>
                                    <div className="single-services">
                                        <div className="services-content-box"><p>Chaque PASS MicroCap donne accès à une combinaison de services selon les objectifs de chacun : entreprendre, investir, épargner, soutenir un porteur de projet, … <br />
                                            Les produits financiers de nos partenaires dans chaque PASS se différencient sur les plafonds autorisés, les délais. <br/></p>
                                        </div>
                                    </div>
                                    <div className="single-services">
                                        <div className="services-content-box"><p>
                                            <b>Pour bénéficier des avantages exceptionnels ajoutez une option à votre PASS MicroCap</b>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            <footer id="fh5co-footer" className="fh5co-bg pb-0" role="contentinfo">
                <div className="overlay" />
                <div className="container pb-40">
                    <div className="row row-pb-md">
                        <div className="col-md-3 fh5co-widget">
                            <ul className="fh5co-footer-links">
                                <h3 className="mmb-sm-0">A propos de MicroCap</h3>
                                <p className="font-size-medium">
                                    MicroCap est un service d’accompagnement des entrepreneurs proposé par: <strong>A+ Conseils SAS</strong>, 7 PL du 11 Novembre 1918, 93 000 BOBIGNY.
                                </p>
                            </ul>
                        </div>
                        <div className="col-md-9">
                            {/* <h3>Classes</h3> */}
                            <div className="row">
                                <div className="col-md-3 col-sm-4 col-xs-6">
                                    <ul className="fh5co-footer-links">
                                        <h3 className="mmb-sm-0 mmt-sm-4">Tout MicroCap</h3>
                                        <li><a onClick={() => props.history.push(MISSION)}><span className="ti-angle-right"/> Mission et valeur</a></li>
                                        <li><a onClick={() => props.history.push(VALUES)}><span className="ti-angle-right"/> Réseau Microcap</a></li>
                                        <li><a className="" onClick={() => props.history.push(SERVICES)}><span className="ti-angle-right"/> Le service Microcap</a></li>
                                        <li><a onClick={() => props.history.push(PIONIERS)}><span className="ti-angle-right"/> Les pionniers</a></li>
                                        <li><a className="" onClick={() => props.history.push(AGENTS)}><span className="ti-angle-right"/> Assistances</a></li>
                                        <li><a><span className="ti-angle-right"/> Faqs</a></li>
                                    </ul>
                                </div>

                                <div className="col-md-3 col-sm-4 col-xs-6">
                                    <ul className="fh5co-footer-links">
                                        <h3 className="mmb-sm-0 mmt-sm-4">Informations légales</h3>
                                        <li><a onClick={() => props.history.push(TERMS)}><span className="ti-angle-right"/> CGU</a></li>
                                        <li><a><span className="ti-angle-right"/> CGV</a></li>
                                        <li><a onClick={() => props.history.push(LEGAL_MENTION)}><span className="ti-angle-right"/> Mentions légales</a></li>
                                    </ul>
                                </div>

                                <div className="col-md-3 col-sm-4 col-xs-6">
                                    <ul className="fh5co-footer-links">
                                        <h3 className="mmb-sm-0 mmt-sm-4">Suivez-nous</h3>
                                        <li><a><span className="ti-angle-right"/> Presse</a></li>
                                        <li><a><span className="ti-angle-right"/> News letter</a></li>
                                        <li className="no-link">
                                            <a> <span className="ti-angle-right"/> Réseaux sociaux</a>
                                            <div className="social-card-wrapper">
                                                <div className="row justify-content-center justify-content-sm-start row">
                                                    {/*<div className="col-md-3">*/}
                                                        <SocialFeedsWidget
                                                            type="facebook"
                                                            icon="ti-facebook"
                                                            className="icon-social icon-hover"
                                                            link="https://www.facebook.com/MicroCap-104224985150023/"
                                                        />
                                                    {/*</div>*/}
                                                    {/*<div className="col-md-3">*/}
                                                        <SocialFeedsWidget
                                                            type="twitter"
                                                            icon="ti-twitter"
                                                            wrapClassName="mx-2"
                                                            className="icon-social icon-hover"
                                                            link="https://twitter.com/MicrocapService"
                                                        />
                                                    {/*</div>*/}
                                                    {/*<div className="col-md-3">*/}
                                                        <SocialFeedsWidget
                                                            type="linkedin"
                                                            icon="ti-linkedin"
                                                            className="icon-social icon-hover"
                                                            link="https://www.linkedin.com/company/appmicrocap/"
                                                        />
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-3 col-sm-4 col-xs-6 contact">
                                    <ul className="fh5co-footer-links">
                                        <h3 className="mmb-sm-0 mmt-sm-4">Contact</h3>
                                        <li className="no-link mb-sm-2">
                                            <a
                                                href="mailto:contact@microcap.fr"
                                                className="m-0 d-inline-block icon-text center-ver">
                                                    <i className="material-icons icon mr-2 icon-rounded-bg">mail</i>
                                                    {/*<i className="icon ti-email mr-2 icon-rounded-bg" />*/}
                                                    <span>Contact@microcap.fr</span>
                                            </a>
                                        </li>
                                        <li className="no-link mt-2">
                                            <a
                                                href="tel:+330811030089"
                                                className="m-0 d-inline-block icon-text center-ver">
                                                <i className="material-icons icon mr-2 icon-rounded-bg">call</i>
                                                {/*<i className="material-icons icon ti-android mr-2 icon-rounded-bg" />*/}
                                                <span>+33 0811 030 089</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-black">
                    <div className="row copyright">
                        <div className="col-md-12 text-center text-white py-25">
                            <h4>&copy; 2021 | All Rights Reserved.</h4>
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
