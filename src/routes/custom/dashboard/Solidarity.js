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
                            Sur l'année 2021, les projets de la plateforme MicroCap sont présentés par appel à projets dans le cadre des programmes de
                            projets structurants. Ces projets participent à la consolidation service MicroCap par une forte capitalisation et le déploiement
                            d’un système de solidarité et de mutualisation des moyens.
                            <strong>LES PROGRAMMES STRUCTURANTS MICROCAP</strong>
                            <ul style={{ padding: 40 }}>
                                <li>
                                    <strong>Programme Reflex</strong>
                                    <p>Créer une dynamique d’innovation en vue d’apporter plus de flexibilité et d’efficacité au TPE/PME. Les projets de ce
                                    programme s’organisent en deux catégories :</p>
                                    <ol style={{ marginTop: 20 }}>
                                        <li>Développer ou renforcer l'agilité des TPE/PME</li>
                                        <li>Faciliter l’internationalisation des TPE/PME</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Programme de banque alimentaire</strong>
                                    <p>
                                        Professionnaliser les filières agricoles et rapprocher le producteur du consommateur par les circuits courts géographique ou
                                        économique. Proposer les projets dans l’une des rubriques suivantes :
                                    </p>
                                    <ol style={{ marginTop: 20 }}>
                                        <li>Volet production</li>
                                        <li>Volet transformation</li>
                                        <li>Volet conditionnement et conservation</li>
                                        <li>Volet logistique</li>
                                        <li>Volet distribution</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Progamme de SERHAB</strong>
                                    <p>
                                        Promouvoir l’accès au logement décent pour tous. Catégorie spécifique pour présenter un projet :
                                    </p>
                                    <ul style={{ marginTop: 20 }}>
                                        <li>Volet immobilier d'habitation</li>
                                        <li>Volet immobilier professionnel (bureaux et commerce)</li>
                                        <li>Volet immobilier de tourisme et loisir</li>
                                    </ul>
                                </li>
                                <li style={{ marginTop: 20 }}>
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
                            </ul>
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