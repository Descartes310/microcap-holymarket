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
                            Sur l'année 2021, les projets de la plateforme Microcap sont présentés par appel à projet
                            dans le cardre des programme de projets structurant. Ces projets participent a la
                            consolidation du systeme de solidarité et de mutualisation des moyens.
                            Vous pouvez presenter un projet pour:
                            <ul style={{ padding: 40 }}>
                                <li>
                                    <strong>Programme de banque alimentaire</strong>
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
                                    <ol style={{ marginTop: 20 }}>
                                        <li>Volet d'habitation</li>
                                        <li>Volet de bureau</li>
                                        <li>Volet de tourisme et loisir</li>
                                    </ol>
                                </li>
                                <li>
                                    <strong>Programme Reflex</strong>
                                    <ol style={{ marginTop: 20 }}>
                                        <li>Pour les programmes permettant de developper l'agilité des TPE</li>
                                        <li>Pour les programmes permettant de developper l'agilité des TME</li>
                                    </ol>
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