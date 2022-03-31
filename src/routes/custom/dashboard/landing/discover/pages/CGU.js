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
          <title>Mission Microcap</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        <div className="page-title d-flex align-items-center">
          <IconButton to="/discover" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
            <i className="zmdi zmdi-arrow-left"></i>
          </IconButton>
          <h2>MENTIONS LEGALES / CGU / CGV</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <p>
                Mentions de droits réservés pour le site internet accessible à l'adresse https://app.microcap.fr (ci-après désigné le «Site»).
            </p>
            <p className="font-lg fw-bold">
                Editeur du site
            </p>
            <p>
                A PLUS CONSEILS SAS, société par actions simplifiée, immatriculée au Registre du Commerce et des Sociétés de Bobigny sous 
                le numéro 829 059 401, dont le siège est situé 7, Place du 11 Novembre 1018, 93000 Bobigny (ci-après désigné «A+» ou 
                « A+ Conseils »). <br />
                TVA : FR51 829 059 401
            </p>
            <p>MicroCap est une marque non déposée de A+ Conseils SAS</p>
            <p className="font-lg fw-bold">
                Directeur de publication et exploitation
            </p>
            <p>
                Bernd STIEHL Président <br />
                Contact : contact@aplus-conseils.fr 
            </p>
            <p className="font-lg fw-bold">Hébergeur </p>
            <p>
                Scaleway SAS <br />
                BP 438 <br />
                75366 - Paris CEDEX 08 <br />
                France
            </p>
            <p className="font-lg fw-bold">Dispositions légales spécifiques</p>
            <p>
                Le service MicroCap opéré sur le site https://app.microcap.fr est réservé aux personnes accompagnées par A+ Conseils ou 
                un prestataire partenaire dans la préparation ou la réalisation de leur projet d’entreprise : promoteurs de TPE/PME, 
                porteurs de projet de création d’entreprise. Ce service permet de mutualiser entre membres de la plateforme le risque 
                des projets accompagnés et facilité leur financement. Le risque est porté en dernier ressort par A+ qui partage le risque 
                avec les projets que l’entreprise accompagne en se portant caution solidaire auprès des partenaires financeurs. Notre but 
                ultime est de promouvoir le multi actionnariat et la culture du micro-placement pour offrir en principalement une solution 
                inclusive aux opérations de haut de bilan des TPE/PME mais aussi des solutions de financement complémentaire.
            </p>
            <p>
                MicroCap est un service de A+ Conseils, cabinet d’ingénierie conseil en management. L’entreprise, complémentairement à son service 
                est distributrice des produits financiers et d’assurance pour l’entrepreneuriat :
            </p>
            <ul>
                <li>Produits d’épargne</li>
                <li>Produits de placement</li>
                <li>Produits de crédit</li>
                <li>Assurance pro</li>
            </ul>
            <p>
                A+  est une société par actions simplifiée au capital social de 15 100€ immatriculée au RCS Bobigny sous le numéro 829 059 401. Son 
                siège social est situé au 7 Place 11 novembre 1918, 93000 Bobigny.
            </p>
            <p>
                Le fait pour A+ par le service MicroCap de proposer des produits financiers et d’assurances constitue une activité d’Intermédiation 
                en Opérations de Banque et en Services de Paiement (IOBSP). L’activité d’IOBSP est réglementée et soumise à l’inscription préalable 
                au registre de l’ORIAS (Articles L. 519-1 à L. 519-3-2 du code monétaire et financier).
            </p>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}