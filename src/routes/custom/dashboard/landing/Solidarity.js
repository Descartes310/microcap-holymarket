import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import { AUTH } from "Url/frontendUrl";
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class Solidarity extends Component {
    render() {
        return (
            <div className="terms-wrapper p-20" >
                <Helmet>
                    <title>Solidarity</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <div className="page-title d-flex align-items-center">
                    <IconButton to="/discover" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
                        <i className="zmdi zmdi-arrow-left"></i>
                    </IconButton>
                    <h2>DECOUVRIR MICROCAP</h2>
                </div>
                <div className="terms-conditions-rules">
                    <RctCollapsibleCard customClasses="p-30">
                        <p>
                            <p>Il n’y a pas de sélection de projet sur MicroCap ! Venez explorer votre créativité et votre opportunisme,
                            développez des projets à partir de vos idées et à votre rythme mais jamais seul.
                            Pour présenter un projet sur MicroCap, il suffit d’être inscrit dans une formation à l’entrepreneuriat
                            ou d’être suivi par un dispositif d’accompagnement d’entrepreneurs partenaire du service MicroCap. les
                            offres de formations et d’accompagnement sont directement disponible sur la plateforme et organisé en trois
                                cycles dont un cycle d’accélération, un cycle d’incubation et un cycle de révélation.</p>

                            <p>Outre la possibilité de développer une idée personnelle, le service MicroCap porte la politique RSE de
                            l’entreprise construite sur trois piliers : l’inclusion et l’indépendance financière,  l’insertion sociale
                            par l’entrepreneuriat et la promotion de l’investissement à impact.  Les Objectifs du Développement Durable
                            (ODD) constitut notre référentiel d’engagement. Pour favoriser l’émergence des projets à impact, MicroCap
                                dispose de deux outils :</p>

                            <ul style={{ marginTop: 20, padding: 40 }}>
                                <li>Les appels à projets</li>
                                <li>Les programmes spécifiques </li>
                            </ul>

                            <p>Les lauréat de ces parcours, sélectionner par un jury d’excellence, reçoivent une dotation financière.  </p>
                            <p>La stratégie de lancement de MicroCap repose sur une ouverture progressive. Elle consistera durant l’année 
                                2022 à accepter  sur la plateforme uniquement des projets dans le cadre des programmes spécifiques ou 
                                des appels à projets. Ce choix nous permet d’assurer la solidité du service. </p>

                            <strong>NOS PROGRAMMES ET APPELS A PROJETS POUR LANCER VOTRE PROJET EN 2022</strong>
                            <ul style={{ padding: 40 }}>
                                <li>
                                    <strong>Programme Reflex</strong>
                                    <p>Créer une dynamique d’innovation en vue d’apporter plus de flexibilité et d’efficacité au TPE/PME 
                                        dans l’objectif d’améliorer leur résilience. Les projets de ce programme s’organisent en deux catégories : </p>
                                    <ol style={{ marginTop: 20 }}>
                                        <li>Développer ou renforcer l'agilité des TPE/PME</li>
                                        <li>Faciliter l’internationalisation des TPE/PME</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Le programme de banque alimentaire</strong>
                                    <p>
                                    Professionnaliser les filières agricoles et rapprocher le producteur du consommateur par les circuits 
                                    courts géographiques et/ou économiques. Proposer les projets dans l’une des rubriques suivantes :
                                    </p>
                                    <ol style={{ marginTop: 20 }}>
                                        <li>Production</li>
                                        <li>Transformation</li>
                                        <li>Conditionnement et conservation</li>
                                        <li>Logistique</li>
                                        <li>Distribution</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Le programme SERHAB</strong>
                                    <p>
                                        Promouvoir l’accès à un logement décent pour tous. Catégorie spécifique pour présenter un projet :
                                    </p>
                                    <ol style={{ marginTop: 20 }}>
                                        <li>Immobilier d'habitation</li>
                                        <li>Immobilier professionnel (bureaux et commerce)</li>
                                        <li>Immobilier de tourisme et loisir</li>
                                    </ol>
                                </li>
                            </ul>
                            {/* <li style={{ marginTop: 20 }}>
                                    <strong>1004africa</strong>
                                    <p>
                                        Sélection et financement de 100 entrepreneurs Leaders d’une Afrique nouvelle. Celle-là qui se refuse au suivisme et qui se
                                        refuse à demeurer un éternel champ de ruine. Pas de catégorie spécifiques.
                                    </p>
                                </li>
                                <li style={{ marginTop: 20 }}>
                                    <strong>Le programme sOs covid-19</strong>
                                    <p>
                                        Tout projet qui participe à réduire les effets économiques et sociaux de la pandémie du Covid-19
                                    </p>
                                </li>
                            </ul> */}
                            <Link to={AUTH.REGISTER}>
                                <Button variant="contained" className="btn-primary mr-2 text-white">
                                    Candidater
                                </Button>
                            </Link>

                        </p>
                    </RctCollapsibleCard>
                </div>
            </div>
        );
    }
}