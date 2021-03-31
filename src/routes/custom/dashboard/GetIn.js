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
                Le réseau Microcap est un international de solidarité financière auprès duquel chaque membre peut solliciter
                des cautionnement pour obtenir un financement 
                <ul style={{ paddingTop: 40, paddingBottom: 10 }}>
                    <li>Credit banquaire</li>
                    <li>Paiement a credit des achats sur la place de marché Microcap </li>
                    <li>Paiement différé des operations aupres des prestataires: transfert d'argent, loyer, caution pour acceder au bail. </li>
                </ul>

                <p>
                    Pour adherer:
                </p>

                <ul style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <li>S'inscrire</li>
                    <li>Choisir une communauté d'accueil</li>
                </ul>
                
                <Link to={AUTH.REGISTER}>
                    <Button variant="contained" className="btn-primary mr-2 text-white">
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