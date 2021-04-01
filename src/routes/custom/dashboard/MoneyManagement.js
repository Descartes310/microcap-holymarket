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
              MicroCap est une entreprise de mission qui se propose de démocratiser l’entrepreneuriat par l’accès aux financement.
              Nous parton du constat que ceux à qui les financements sont refusés ne sont pas conscient du pouvoir financier qui est le leur, mis en commun. Ils ne sont pas non
              plus conscients du fait que le mode de consommation auquel nous nous soumettons de plus en plus participe à plus de pauvreté et que, cynique mais vais, leur pouvoir
              collectif finance chaque jour le système qui les appauvrit. Ce qui conduit à des incompréhension et un fort sentiment d’injustice sociale. Nous proposons des
              ressources, des sensibilisations et accompagnements totalement gratuits pour renforcer l’éducation financière, économique et budgétaire, afin de permettre à ce qui le
              souhaitent, de reprendre le contrôle sur leur argent. Nos objectifs recherchés pour vous :

                <ol style={{ paddingTop: 40, paddingBottom: 10 }}>
                    <li>Distinguer pouvoir d’achat et vouloir d’achat</li>
                    <li>Rationnaliser votre budget</li>
                    <li>Décider a qui et à quoi sert votre argent</li>
                    <li>Soutenir et vivre une finance vertueuse et utile</li>
                </ol>

                <p>
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
                </ul>
                
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