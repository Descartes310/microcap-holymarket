import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import { AUTH } from "Url/frontendUrl";
import PricingBlockV3 from 'Components/Pricing/PricingBlockV3';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class OfferDetails extends Component {
  render() {
    return (
      <div className="terms-wrapper p-20" >
        <Helmet>
          <title>Pass Microcap</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        <div className="page-title d-flex align-items-center">
          <IconButton to="/discover" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
            <i className="zmdi zmdi-arrow-left"></i>
          </IconButton>
          <h2>DECOUVREZ LES PASS MICROCAP</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <p>
              MicroCap propose des abonnement pour profiter pleinement des services de la plateforme et faciliter la gestion des parcours de professionnalisation de nos utilisateur vers l’entrepreneuriat. MicroCap a également fait le choix de l’indépendance financière afin de pouvoir conduire sa mission d’inclusion financière et de soutiens aux personnes en situation de fragilité. Pour capitaliser et soutenir le fonctionnement indépendant, nous proposons des options payantes sur nos abonnements.
            </p>
            <p>
              Les options MicroCap sont disponibles série limitée du 1er avril 2021 au 30 septembre 2021.
            </p>
            <div className="price-list">
              <div className="row row-eq-height">
                <PricingBlockV3
                  planType="free"
                  type="Option Leaders"
                  color="primary"
                  description="Le moins chère"
                  buttonText="Souscrire"
                  price="50€"
                  oldPrice="600€"
                  features={[
                    'Remise sur abonnement: 25%',
                    'Paiements différés: 300€ sur 90 jours',
                    'Bonification hebdomadaire des cautionnements 30€ max sur 3 mois'
                  ]}
                />
                <PricingBlockV3
                  planType="free"
                  type="Option Privilège"
                  color="warning"
                  description="Le plus intéressant"
                  buttonText="Souscrire"
                  price="300€"
                  reduction
                  oldPrice="3000€"
                  features={[
                    'Remise sur abonnement: 60%',
                    'Paiements différés: 2000€ sur 180 jours',
                    'Bonification hebdomadaire des cautionnements 200€ max sur 3',
                    'Doublement des avantages'
                  ]}
                />
                <PricingBlockV3
                  planType="free"
                  type="Option Pioniers"
                  color="info"
                  description="A saisir"
                  buttonText="Souscrire"
                  price="150€"
                  reduction
                  oldPrice="1500€"
                  features={[
                    'Remise sur abonnement: 40%',
                    'Paiements différés: 1000€ sur 90 jours',
                    'Bonification hebdomadaire des cautionnements 100€ max sur 3',
                    'Doublement des avantages'
                  ]}
                />
              </div>
            </div>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}