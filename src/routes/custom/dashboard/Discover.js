import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import QueueAnim from "rc-queue-anim";
import {Link} from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import {AUTH, DISCOVER, HOME} from "Url/frontendUrl";
import AppBar from "@material-ui/core/AppBar/AppBar";

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
                                <div className="center-hor-ver">
                                    <a className="mr-15 text-white" onClick={onUserSignUp}>
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
                <div className="session-inner-wrapper" style={{transform: "translate3d(0%, 4%, 0)"}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-11">
                                <div className="center-hor-ver session-body text-center">
                                    <div className="">
                                        <div className="session-head mb-10 center-hor-ver">
                                            <h1 className="font-weight-bold ctitle">
                                                Découvrez <strong className="text-primary">Microcap</strong>
                                            </h1>
                                        </div>

                                        <div className="row discover">
                                            <div className="col-sm-12 discover-block">
                                                <div className="discover-heading center-hor-ver">
                                                    <h3>À propos de Microcap</h3>
                                                </div>
                                                <div className="discover-content">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-5">
                                                            <img className="img-fluid" src={require("../../../assets/identity/Illustration_3.png")} alt=""/>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <p className="ctext">
                                                                <strong>MicroCap</strong> <b>TESSA MASSE GRACE</b>est une plateforme de soutien à l'initiative entrepreneuriale et citoyenne. En rejoignant le réseau, vous aurez la possibilité de participer activement au succès de projets que nous accompagnons, au mieux, proposer votre projet et intégrer notre programme de professionalisation pour entrepeneurs.
                                                                <br/>

                                                                <strong>Le service MicroCap</strong> est proposé par <strong className="a-plus" style={{fontSize: "17px"}}>A<span style={{fontSize: "14px"}}>+</span></strong> <strong>conseils</strong>, une société d'ingénierie et conseil en management. Le programme d'accompagnement de la plateforme MicroCap permet de faciliter l'accès au financement à tous les porteurs de projet grâce à <strong>MicroCap Invest</strong>, un fonds solidaire d’entrepreneurs géré par A +. Notre ambition est d’exploiter ce véhicule commun d’investissement pour connecter les entrepreneurs du monde dans un système de solidarité permettant de faciliter l’accès aux financements.
                                                                <br/>

                                                                <strong>MicroCap Invest</strong> est ainsi développé et mis en valeur comme un outil de mutualisation des risques et des ressources au profit des entrepreneurs membre du réseau. Par cette approche, nous nous donnons les moyens d’une solidarité entre entrepreneurs, en vu de soutenir leurs projets quel que soit le niveau d’avancement, l’envergure, la situation sociale et professionnelle du porteur. Cette solidarité se traduit sous forme d’un dispositif d’accompagnement inclusif proposé par des entrepreneurs pour les porteurs de projets.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 discover-block">
                                                <div className="discover-heading center-hor-ver">
                                                    <h3>Accompagnement</h3>
                                                </div>
                                                <div className="discover-content">
                                                    <p className="ctext">
                                                        L’accompagnement <strong>MicroCap</strong> est global et couvre :
                                                        <ul className="custom-list ml-40">
                                                            <li>Le développement de compétences (formation, tutorat, mentorat, …)</li>
                                                            <li>La formalisation de projet</li>
                                                            <li>Le réseautage</li>
                                                            <li>Le financement</li>
                                                        </ul>

                                                        La situation internationale dominée par la pandémie du Covid 19, l’emporte sur les pratiques et habitudes régulières et justifie des comportements d’urgence. Cela est aussi vrai pour le développement de projet et, toutes les formes de contribution pour juguler les impacts négatifs de la pandémie étant vivement sollicitées, <strong>MicroCap</strong> a décidé d’agir et a revu son plan directeur prévoyant un démarrage en septembre 2020 pour le ramené au 20 mai 2020. Cela permettra de mobiliser et concentrer de façon précoce, la solidarité des entrepreneurs autour des projets utiles à ce combat.
                                                        <br/>
                                                        Pour cela, face à la menace du chômage et la paupérisation de masse, <strong>MicroCap</strong> accélère son développement pour participer à la relance économique en lançant des programmes à fort impact social. Le Service <strong>MicroCap</strong> permet de connecter les entrepreneurs du monde au fonds <strong>MicroCap</strong> qui se présente ainsi comme un hub financier, en vue de développer un réseau international de solidarité financière. Un premier pays satellite est déjà connecté au Hub financier de France : le Cameroun. <strong>MicroCap</strong> est toujours à la recherche des partenaires financiers (Etablissements de crédit, Etablissement de Micro-Finance, fonds d’investissement, …) en vue de couvrir le plus de pays possible et de proposer une plus grande diversité de produit.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 discover-block">
                                                <div className="discover-heading center-hor-ver">
                                                    <h3>Programme d'urgence</h3>
                                                </div>
                                                <div className="discover-content">
                                                    <p className="ctext">
                                                        Trois programmes sont en cours d’implémentation dans les pays déjà couverts par le service.

                                                        <h4 className="mt-2">En France</h4>

                                                        <ul className="ml-30">
                                                            <li>
                                                                Le programme REEFLEX (Réseau des Entreprises pour l’Efficacité et la flexibilité)
                                                                <br/>
                                                                Reeflex est une plateforme de partage de ressources, d’incitation et d’accompagnement à la mesure de la performance pour les TPE/PME
                                                            </li>
                                                            <li>Le programme Duo Line</li>
                                                        </ul>

                                                        <h4>Au Cameroun</h4>

                                                        <ul className="ml-30">
                                                            <li>Le programme de banque alimentaire</li>
                                                            <li>Le programme Duo Line</li>
                                                        </ul>

                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 discover-block">
                                                <div className="discover-heading center-hor-ver">
                                                    <h3>Pourquoi rejoindre MicroCap ?</h3>
                                                </div>
                                                <div className="discover-content">
                                                    <p className="ctext">
                                                        L’urgence sociale nous l’exige, mobilisons-nous, chacun à sa manière
                                                        <ol className="custom-list ml-20">
                                                            <li>Entrepreneurs : proposez vos projets dans le cadre des programmes encours.</li>
                                                            <li>Investisseurs : accédez en toute sérénité aux marchés des TPE/PME en France et à l’international.</li>
                                                            <li>Petit épargnant : souscrivez aux produits financiers (Comptes d’épargne, actions, obligations, …) proposés par nos partenaires financiers en vue d’accompagner le financement des projets de nos entrepreneurs.</li>
                                                        </ol>
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
            </div>
        </QueueAnim>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {})(injectIntl(Discover));
