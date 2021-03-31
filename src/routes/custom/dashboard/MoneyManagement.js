import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import { AUTH } from "Url/frontendUrl";
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class MoneyManagement extends Component {
  render() {
    return (
      <div className="terms-wrapper p-20" >
        <Helmet>
          <title>Reprendre le controle sur votre argent</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        <div className="page-title d-flex align-items-center">
            <IconButton to="/discover" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
                <i className="zmdi zmdi-arrow-left"></i>
            </IconButton>
            <h2>REPRENDRE LE CONTROLE SUR VOTRE ARGENT</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <p>
                Reprendre le controle sur votre argent
                <ol style={{ paddingTop: 40, paddingBottom: 10 }}>
                    <li>Rationnaliser votre budget</li>
                    <li>Decider a qui et a quoi sert votre argent</li>
                    <li>Soutenir et vivre la finance vertueuse ou utile</li>
                </ol>

                <p>
                    3 objectifs qui decoule de la mission de Microcap renforcer l'education financiere
                    economique et budgetaire.
                    Les utilisateurs de la plateforme Microcap on acces a un programme de sensibilisation, 
                    monitoring et coaching a la finance vertueuse.
                    Webinaire tous les jeudis a 13h pour une durée de 1h S'inscrire
                    Atelier pratique pour adopter et profiter de la finance vertueuse.
                </p>
                <p>
                    Tous les derniers samedis du mois
                </p>
                <p>
                    Prochaine date: 13 fevrier 2021
                </p>
                
                <Link to={AUTH.REGISTER}>
                    <Button variant="contained" className="btn-primary mr-2 text-white">
                        S'inscrire
                    </Button>
                </Link>
            </p>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}