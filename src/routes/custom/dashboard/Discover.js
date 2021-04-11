import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { AUTH, DISCOVER, HOME, PIONIERS, TERMS, LEGAL_MENTION, GALERY_PROJECT, SOLIDARITY, MONEY_MANAGEMENT, GETIN, MISSION, VALUES } from "Url/frontendUrl";
import AppBar from "@material-ui/core/AppBar/AppBar";
import headerImg from 'Assets/img/image_revolution.jpg';
import {
    Card,
    CardImg,
    CardText,
    CardBody
} from 'reactstrap';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { getAgents, getMainPioniers } from "Actions/independentActions";
import {
    Player
} from 'video-react';
import { HashLink } from 'react-router-hash-link';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

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
        getAgents().then(data => {
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
                                <Link to={DISCOVER}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Microcap
                                   </a>
                                </Link>
                                <HashLink to={`${DISCOVER}/#services`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Produits et services
                                    </a>
                                </HashLink>
                                <HashLink to={`${DISCOVER}/#pass`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Pass microcap
                                    </a>
                                </HashLink>
                                <Link to={GALERY_PROJECT}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Gallerie projets
                                    </a>
                                </Link>
                                <HashLink to={`${DISCOVER}/#agents`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Réseau d'agent
                                    </a></HashLink>
                                <Button variant="contained" className="btn-primary mr-2 text-white" onClick={onUserLogin}>
                                    <IntlMessages id="auth.signin" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper video-player-wrapper">
                <div style={{ height: '35vh', backgroundImage: `url(${headerImg})`, backgroundSize: 'cover' }}>
                </div>
                <div className="page-title d-flex align-items-center" style={{ padding: 40 }}>
                    <IconButton to="/login" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
                        <i className="zmdi zmdi-arrow-left"></i>
                    </IconButton>
                    <h3>Retour sur Connexion</h3>
                </div>

                <h1 className="font-weight-bold text-black" style={{ fontSize: '2em', padding: '2%', textAlign: 'center' }}>
                    Concilier traditions et innovations
                </h1>
                <p style={{ fontSize: '1.1em', textAlign: 'center' }}>Etendre votre réseau de love money au -delà du cercle familial et amical, réinventer une solidarité utile et promouvoir une finance inclusive</p>
                <p style={{ fontSize: '1.1em', textAlign: 'center' }}>Réinventer une solidarité utilise et promouvoir une finance inclusive et vertueuse</p>
                <div className="row" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '2%', paddingBottom: '2%' }}>
                    <div className="col-xs-12 col-sm-12 col-md-4 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" src={require('Assets/img/tradition-et-innovation.jpg')} alt="Card image cap" />
                            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                    <p> La solidarité ! une valeur essentielle chez MicroCap. </p>
                                    <p> Entre tradition et innovation, découvrez le love money par MicroCap pour financer vos projets. </p>
                                    <p> Rejoignez le réseau MicroCap, plus large, plus dynamique </p>
                                </CardText>
                                <Link to={GETIN}>
                                    <Button variant="contained" className="btn-primary mr-2 text-white">
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
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                    <p>Sur MicroCap, pas de sélection de projet mais des prix chaque trimestre pour les cinq meilleurs projets à impact.</p>
                                    <p>Ensemble, construisons un monde durable</p>
                                    <p><span style={{ fontSize: '1.3em', color: '#ffce39', fontWeight: 'bold' }}>50 000€</span> à gagner pour démarrer !</p>
                                </CardText>
                                <Link to={SOLIDARITY}>
                                    <Button variant="contained" className="btn-primary mr-2 text-white">
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
                                <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                    <p>Notre programme à l’éducation financière pour des personne en exclusion financière est totalement gratuit.</p>
                                    <p>Vous pouvez aider vos proches dans cette situation à s’en sortir. </p>
                                </CardText>
                                <Link to={MONEY_MANAGEMENT}>
                                    <Button variant="contained" className="btn-primary mr-2 text-white">
                                        Education financière
                                    </Button>
                                </Link>
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
                        //src='http://api-preprod.microcap.fr/files/videos/video.mp4'
                        src='http://api.microcap.fr/files/videos/video.mp4'
                    />
                    <p style={{ fontSize: '1.2em', marginTop: 20, textAlign: 'center' }}>
                        Microcap finance votre épargne et vous accompagne dans votre projet:  création d’entreprise, actionnariat, formation à l’entrepreneuriat ...
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
                                                        <h2>Un compte qui conte des comptes</h2>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>
                                                            Notre expertise consiste à concevoir des produits d’épargne et de placement pour nos partenaires bancaires habilités à les commercialiser. Ces produits sont exclusivement distribués et opérés depuis la plateforme MicroCap
                                                            Le Plan d’Investissement Programmé (PIP) MicroCap est un compte agrégateur, conçu et commercialisé par MicroCap. Ce compte totalise les valeurs de toutes vos épargnes en compte chez nos partenaires établissements financiers. Votre PIP MicroCap reproduit fidèlement l’évolution de l’ensemble de vos comptes d’épargne MicroCap auprès des partenaires : versement, intérêts … Nous ne recevons pas les fonds qui restent cantonnés et sécurisés auprès d’un établissement financier traditionnel. 
                                                        </p>
                                                        <h2>Une épargne pour se réaliser </h2>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>
                                                            Le service MicroCap propose le renforcement de l’éducation financière, économique et budgétaire aux utilisateurs ainsi que des solutions financières pour leur permettre de se réaliser socialement sur trois aspects à travers l’entrepreneuriat : trouver ou créer un emplois, accéder au soins de santé, accéder au logement. Pour faire fonctionner votre PIP MicroCap nous avons conçu sous la marque ESH, pour Emploi, Santé et Habitat, et proposons sur la plateforme deux produits d’épargne : le compte ESH Titre et le compte ESH cash. ESH Cash est un compte de dépôt à terme et le ESH Titre est un compte titre ordinaire qui reçoit uniquement des titres compatibles.
                                                        </p>
                                                        <h2>Une épargne qui crée du lien</h2>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>
                                                            Le PIP est l’outils de solidarité des membres du réseau MicroCap. En adhérent au réseau, vous ouvrez automatiquement votre PIP et au moins un compte d’épargne sous-jacent. Le solde de votre PIP constitue une capacité financière que vous pouvez utiliser pour cautionner d’autres membres et, ainsi développer ou entretenir un réseau de solidarité financière. 
                                                        </p>
                                                        <ul style={{ paddingLeft: 40, fontSize: '1em',textAlign: 'justify', fontSize: '1em', lineHeight: 2, }}>
                                                            <li>Vous êtes solidaire d’un entrepreneur de votre localité ou de l’entrepreneuriat en général,</li>
                                                            <li>Vous voulez fructifier ou diversifier votre épargne,</li>
                                                            <li>Vous rêvez de créer votre entreprise, vous avez déjà une idée, voir un projet,</li>
                                                            <li>Vous avez déjà créé votre entreprise et vous rencontrez des difficultés de financement,</li>
                                                        </ul>
                                                        Ouvrez votre PIP MicroCap et Rejoignez notre réseau international de solidarité financière
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discover-content" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-8">
                                                    <h1>La carte ESH Microcap</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        Adossée à votre PIP MicroCap, la carte Emploi-Santé-Habitat vous permet de gagner des services gratuit pour chaque investissement réalisé sur les projets de la plateforme MicroCap. Bénéficiez de droits à la formation, de facilités pour l’insertion ou la reconversion professionnelle, de soins de santé, d’un hébergement. Vos droits aux services gratuit sont valables auprès de tous les entrepreneurs sous convention avec MicroCap.
                                                    </p>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        La carte qui protège votre pouvoir d'achat grâce à l’accès gratuit aux services essentiels : emploi, santé, logement.
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
                                                        Fort de son engagement pour une finance plus vertueuse,  MicroCap vous protège de la surconsommation et vous octroie un fonds de dépannage sur du très court terme (1-90 jours), destinée à pourvoir aux besoins essentiels. La réserve MicroCap est une facilité de trésorerie sous forme de crédit d’urgence ou d’avance sur revenu certains. Elle est utilisable sur une durée prédéfinie pour les services autorisés : <br />
                                                        <ul style={{ paddingLeft: 40, fontSize: '1em' }}>
                                                            <li>Transfert d’argent vers des réseaux partenaires (5 jours)</li>
                                                            <li>Règlement de tout commerçant agréé (15 jours) ou de tout prestataire conventionné (30 jours)</li>
                                                            <li>Dépôt de garantie pour un bail (90 jours) </li>
                                                        </ul>
                                                        l'usage de la réserve est gratuit sur 3 jours puis facturé à un intérêt journalier de 0,045 %
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 style={{ textAlign: 'center', fontSize: '3em' }}>Pour investisseurs</h1>
                                        <div className="discover-content" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-8">
                                                    <h1>Pour investisseurs</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>Vous êtes une institution ou un Investisseur professionnel! ne manquez pas la Liga</p>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>La ligne d’investissement garantie (Liga) vous garantit la liquidité et le sécurité de votre capital investi</p>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>Tout placement est exposé au risque de perte partielle ou totale en capital. MicroCap propose aux investisseurs une convention de co-investissement pour limiter la perte en capital. </p>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>Les membres du réseau MicroCap verse une contribution de solidarité  réseau annuelle qui garantit une quotité de tout capital investi sur un projet éligible à la Liga. Cette quotité peut atteindre 100% du capital et, peut être assortie d’une prime de risque. Pour guider les utilisateurs dans leurs choix, les projets de la plateforme sont marqués par un système de notation donnant à titre indicatif le niveau de risque.</p>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>Exemple : </p>
                                                        <p style={{ textAlign: 'justify', fontSize: '1em', lineHeight: 2,}}>Score projet : 80-approved-234 pour un projet dont le capital investi est garanti à 80%, approuvé par une commission technique et suivi régulièrement par 234 personnes. </p>
                                                    </p>
                                                </div>
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/invest.jpg')} alt="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="discover-content" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <img className="img-fluid" src={require('Assets/img/credit.jpg')} alt="" />
                                                </div>
                                                <div className="col-md-8">
                                                    <h1>Compte ISUS</h1>
                                                    <p style={{ textAlign: 'justify', fontSize: '1.1em', lineHeight: 2, marginTop: 20 }}>
                                                        Investir dans les TPE et PME non cotées en toute sérénité <br />
                                                        Le compte ISUS est un compte titre  ordinaire qui vous permet de domicilier des titres d’entreprises que vous céder à MicroCap en gérance, en jouissance, ou en propriété avec option de reprise sur une période donnée.<br />
                                                        La convention ISUS vous permet d’investir dans les TPE et PME non cotés et d’assurer une gestion professionnelle du portefeuille de titres d’entreprises. Elle vous permet ainsi sans vous soucier du le  suivi et la responsabilité investisseur sont couverts en toute sérénité par le dispositif de mutualisation de MicroCap.<br />
                                                        <ul style={{ paddingLeft: 40, fontSize: '1em' }}>
                                                            <li>Information financière</li>
                                                            <li>Participation à au décision stratégique de l’entreprise</li>
                                                            <li>L’option et l’opportunité de sortie</li>
                                                            <li>La gestion administrative et fiscale</li>
                                                        </ul>
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

                <div style={{ backgroundColor: '#eeeeee', marginBottom: '7vh' }} id="services">
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
                                            <h4 className="fw-bold text-capitalize text-primary">Cautionnement bancaire</h4>
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

                    <div className="col-sm-12 discover-block" style={{ marginTop: '5vh' }} id="pass">
                        <div className="discover-heading center-hor-ver">
                            <h1 style={{ fontSize: '3em', padding: '4%' }}>Les Pass Microcap</h1>
                        </div>
                        <div className="col-md-12">
                            <img className="img-fluid" src={require('Assets/identity/banner.jpg')} alt="" />
                        </div>
                        <p style={{ fontSize: '1.1em', textAlign: 'center', marginTop: 40 }}>
                            Les services de la plateforme sont accessibles sur abonnement ou Pass: à chacun son rythme, à chacun son Pass. Les prix sont H.T.
                            <Link to={GETIN} style={{ marginTop: 40, marginBottom: 20 }}>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Voir les détails
                                </Button>
                            </Link>
                        </p>
                        <div className="discover-content">
                            <p className="ctext">
                                <ol className="custom-list ml-20">
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass découvert</p>
                                        <p>Gratuit et sans conditions, il permet un accès restreint à la plateforme pour se familiariser avec le service et découvrir nos projets</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass réseau</p>
                                        <p>C’est la carte de membre qui est attribué à toute personne qui ouvre un plan d’investissement MicroCap à fin de contribuer ou bénéficier de la solidarité du réseau</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass club business</p>
                                        <p>Les porteurs des projets de la plateforme bénéficient des service des professionnels et du concours de partenaires investisseurs ou institutionnels  pour le succès de leur entreprise. ils sont soumis au régime de solidarité par l’obligation d’un Pass club business</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass ANY-Cycle revelation</p>
                                        <p>Le pass any pour any whère and anytime, est réservé au entrepreneurs de la plateforme pour se lancer à tout moment et ceci n’importe où si le service microcap y est disponible. Le cycle R ou révélation est un cycle long de trois ans pour créer son entreprise en partant juste d’une intention ou une envie d’entreprendre.</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass ANY-Cycle incubation</p>
                                        <p> Le pass any pour any whère and anytime, est réservé aux entrepreneurs de la plateforme pour se lancer à tout moment et ceci n’importe où si le service MicroCap y est disponible. Le cycle I ou incubation est un cycle de 12 mois pour créer son entreprise en partant d’une idée.</p>
                                    </li>
                                    <li>
                                        <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass ANY-Cycle acceleration</p>
                                        <p>Le pass any pour any whère and anytime, est réservé aux entrepreneurs de la plateforme pour se lancer à tout moment et ceci n’importe où si le service MicroCap y est disponible. Le cycle A ou accélération est un cycle court de trois ans pour valider une idée ou un projet et lancer son entreprise.</p>
                                    </li>
                                </ol>
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#eeeeee', marginBottom: '7vh' }} id="pioniers">
                    <h1 className="font-weight-bold text-black text-center" style={{ fontSize: '3em', padding: '4%' }}>
                        Nos pioniers
                    </h1>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        {pioniers.filter(a => a.active == true).map(agent => (
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
                                                <Tooltip title={agent.about}>
                                                    <h4 className="fw-bold text-capitalize text-primary">{agent.name}</h4>
                                                </Tooltip>
                                                <p>{agent.post}</p>
                                                <p>{agent.email}</p>
                                                <p>{agent.phone}</p>
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
                        <Button variant="contained" className="btn-primary mr-2 text-white">
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
                    <div className="row justify-content-center">
                        {data.filter(a => a.active == true).map(agent => (
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
                                                <Tooltip title={agent.about}>
                                                    <h4 className="fw-bold text-capitalize text-primary">{agent.name}</h4>
                                                </Tooltip>
                                                <p>{agent.email}</p>
                                                <p>{agent.phone}</p>
                                                <p>{agent.address}</p>
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
            <footer id="fh5co-footer" className="fh5co-bg" role="contentinfo">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row row-pb-md">
                        <div className="col-md-4 fh5co-widget">
                            <h3>A propos de MicroCap.</h3>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>MicroCap est un service d’accompagnement des entrepreneurs proposé par :</p>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>
                                A+ Conseils SAS
                            </p>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>
                                7 PL du 11 Novembre 1918
                            </p>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>   
                                93 000 BOBIGNY
                            </p>
                            <h3>Contact</h3>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>Email: </p>
                            <p style={{ color: "rgba(255, 255,255, 0.5)" }}>Tel: 0811 030 089</p>
                </div>
                <div className="col-md-8">
                    {/* <h3>Classes</h3> */}
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-6">
                            <ul className="fh5co-footer-links">
                                <li><a href="#" className="activefooter">Tout MicroCap</a></li>
                                <li><a onClick={() => props.history.push(MISSION)}>Mission et valeur</a></li>
                                <li><a onClick={() => props.history.push(VALUES)}>Réseau Microcap</a></li>
                                <li><a onClick={() => props.history.push(PIONIERS)}>Les pionniers</a></li>
                                <li><a href="#">Faqs</a></li>
                            </ul>
                        </div>

                        <div className="col-md-4 col-sm-4 col-xs-6">
                            <ul className="fh5co-footer-links">
                                <li><a href="#" className="activefooter">Informtions légales</a></li>
                                <li><a onClick={() => props.history.push(TERMS)}>CGU</a></li>
                                <li><a href="#">CGV</a></li>
                                <li><a onClick={() => props.history.push(LEGAL_MENTION)}>Mentions légales</a></li>
                            </ul>
                        </div>

                        <div className="col-md-4 col-sm-4 col-xs-6">
                            <ul className="fh5co-footer-links">
                                <li><a href="#" className="activefooter">Suivez-nous</a></li>
                                <li><a href="#">Presse</a></li>
                                <li><a href="#">News letter</a></li>
                                <li><a href="#">Réseaux sociaux</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                    </div>

            <div className="row copyright">
                <div className="col-md-12 text-center">
                    <p style={{ marginTop: '30px' }}>
                        <small className="block">&copy; 2021 | All Rights Reserved.</small>
                        <small className="block">Powered by  dev1.microcap.fr</small>
                    </p>
                </div>
            </div>

        </div>
            </footer >

        </div >
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {})(injectIntl(Discover));
