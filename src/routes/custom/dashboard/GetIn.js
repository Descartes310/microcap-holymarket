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
          <title>Rejoindre Microcap</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        <div className="page-title d-flex align-items-center">
          <IconButton to="/discover" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
            <i className="zmdi zmdi-arrow-left"></i>
          </IconButton>
          <h2>REJOINDRE LE RESEAU MICROCAP</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <p>
              <p>Le love money permet de collecter de l'argent auprès des proches pour vous financer. </p>
              <p>En famille, entre amis, collègues ou compatriotes, … c’est un bon début. Avez MicroCap, vous pouvez désormais étendre votre réseau au-delà du cercle proche et financer plus facilement vos projets. </p>
              <p>Adopter la solidarité comme principe </p>
              <p>MicroCap est un réseau international de solidarité financière auprès duquel chaque membre peut solliciter des cautionnements pour obtenir un financement</p>

              <ul style={{ paddingTop: 40, paddingBottom: 10 }}>
                <li>Credit banquaire</li>
                <li>Paiement a crédit des achats sur la place de marché MicroCap</li>
                <li>Paiement différé des opérations auprès des prestataires: transfert d'argent, loyer, caution pour accéder au bail. </li>
              </ul>

              {/* <p>
                  Les utilisateurs de la plateforme MicroCap ont accès a un programme de sensibilisation, monitoring et coaching a la finance vertueuse. Pour en profiter :
                </p>
                <p>
                  Un Webinaire d’une durée de 1H tous les jeudis à 13h.
                </p>
                <p>
                  Atelier pratique pour adopter et profiter de la finance vertueuse tous les derniers samedis du mois. Prochaines dates :
                </p>
                <ul style={{ paddingTop: 40, paddingBottom: 10 }}>
                    <li>Exceptionnellement le samedi 3 avril 2021 à 15H00</li>
                    <li>Cycle normal le samedi 24 avril 2021 à 15H00</li>
                </ul> */}

              <p>
                Pour adhérer:
                </p>

              <ul style={{ paddingTop: 10, paddingBottom: 10 }}>
                <li>S'inscrire</li>
                <li>Choisir une communauté d'accueil</li>
              </ul>

              <Link to={AUTH.REGISTER}>
                <Button variant="contained" className="btn-primary mr-2">
                  Adhérer
                </Button>
              </Link>
            </p>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}