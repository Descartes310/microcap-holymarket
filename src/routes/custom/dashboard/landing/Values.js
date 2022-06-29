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
          <title>Réseau Microcap</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        <div className="page-title d-flex align-items-center">
          <IconButton to="/discover" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
            <i className="zmdi zmdi-arrow-left"></i>
          </IconButton>
          <h2>RESEAU MICROCAP</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <p>
              Le réseau MicroCap est constitué de personnes affiliées en tant que utilisateurs du service MicroCap auprès d’une
              organisation « Agent MicroCap » c’est-à-dire une organisation ayant avec MicroCap signataire d’une convention valide de
              délégation de mission commerciale ou une convention de représentation commerciale. Le réseau s’étend aux personnes affiliées
              en tant que utilisateurs du service MicroCap auprès d’une organisation « sous agent MicroCap» c’est-à-dire une organisation
              mandataire d’une organisation conventionnée MicroCap. avec MicroCap ou un partenaire de MicroCap. Le réseau MicroCap compte ainsi,
              pour les organisations conventionnées ou mandataires de conventionnées, comme membres : Cela peut être spécifiquement désignées
              comme telles parmi :
            </p>
            <p>les membres adhérent ou les usagers d’une association, </p>
            <p>les employés, les clients, les fournisseurs d’une entreprise, …</p>
            <p>MicroCap compte deux types de conventionnement :</p>

            <ul style={{ paddingLeft: 40, paddingBottom: 10 }}>
              <li>
                Les opérateurs MicroCap : ce sont des établissements assurant sur un territoire précis, une supervision administrative ou
                règlementaire d’un ou plusieurs services MicroCap. L’indisponibilités de certains services dans un pays peut être justifiée
                par l’absence de ce type de conventionnement.
              </li>
              <li>
                Les communautés conventionnées ou communautés MicroCap sont des organisations autorisées à accueillir du public au nom de MicroCap
              </li>
            </ul>

            {/* <Link to={AUTH.REGISTER}>
                <Button variant="contained" className="btn-primary mr-2 text-white">
                  Demander une convention MicroCap
                </Button>
              </Link> */}
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}