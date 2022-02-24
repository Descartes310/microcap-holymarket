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
              <p>« Si tu donnes un poisson à un homme, il se nourrit une fois. Si tu lui apprends à pêcher, 
                il se nourrira toute sa vie », Lao Tseu</p>
              <p>MicroCap est une entreprise à mission qui se propose de démocratiser l’accès au financement. 
                L’objectif est de permettre à tous ceux qui le souhaitent 
                de cocréer leur emploi.</p>

              <p>Nous partons du postulat que les individus à qui les financements sont refusés n’ont pas conscience 
                du pouvoir financier qui est le leur, une fois réuni. Ils ne sont pas non plus conscients du fait 
                que le mode de consommation auquel nous nous soumettons de plus en plus participe à plus de pauvreté 
                et que, leur pouvoir collectif finance chaque jour le système qui les appauvrit. Ce qui peut conduire 
                à des incompréhensions et à un fort sentiment d’injustice sociale. Nous proposons des ressources, des 
                sensibilisations et accompagnement totalement gratuits pour renforcer l’éducation à l’économie et la 
                finance, afin de permettre à ceux qui le souhaitent, de reprendre le contrôle sur leurs ressources. 
                Nos objectifs fixés pour vous :</p>

                <ol style={{ paddingTop: 40, paddingBottom: 10 }}>
                    <li>Distinguer pouvoir d’achat et vouloir d’achat</li>
                    <li>Rationnaliser votre budget</li>
                    <li>Décider à qui et à quoi sert votre argent</li>
                    <li>Soutenir et vivre une finance vertueuse et utile</li>
                </ol>

                <p>
                  Les utilisateurs de la plateforme MicroCap ont accès à un programme de sensibilisation, monitoring 
                  et coaching a la finance responsable. Pour en profiter :
                </p>
                <p>
                  Un webinaire d’une durée de 1H tous les jeudis à 13h. 
                </p>
                <p>
                  Atélier pratique pour adopter et profiter de la finance vertueuse tous les derniers samedis du mois. Prochaines dates: 
                </p>
                <ul style={{ paddingTop: 40, paddingBottom: 10 }}>
                    <li>Exceptionnellement le samedi 3 avril 2021 à 15H00</li>
                    <li>Cycle normal le samedi 24 avril 2021 à 15H00</li>
                </ul>
                
                <Link to={AUTH.REGISTER}>
                    <Button variant="contained" className="btn-primary mr-2">
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