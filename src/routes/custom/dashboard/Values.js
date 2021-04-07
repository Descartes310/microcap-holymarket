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
              Le réseau MicroCap est constitué de personnes membres d’une organisation signataire d’une convention de délégation de mission ou de représentation avec MicroCap ou un partenaire de MicroCap. Cela peut être spécifiquement désignées comme telles parmi :
                <ul style={{ paddingTop: 40, paddingBottom: 10 }}>
                <li>les membres ou les usagers d’une association,</li>
                <li>les employés, les clients, les fournisseurs d’une entreprise, …</li>
              </ul>

              <p>
                A jour, MicroCap compte deux types de conventionnement :
              </p>

              <ul style={{ paddingTop: 10, paddingBottom: 10 }}>
                <li>Les opérateurs MicroCap : ce sont des établissements assurant sur un territoire précis, une supervision administrative ou règlementaire d’un ou plusieurs services MicroCap. L’indisponibilités de certains services dans un pays peut être justifiée par l’absence de ce type de conventionnement.</li>
                <li>Les communautés conventionnées ou communautés MicroCap sont des organisations autorisées à accueillir du public au nom de MicroCap</li>
              </ul>

              <Link to={AUTH.REGISTER}>
                <Button variant="contained" className="btn-primary mr-2 text-white">
                  Demander une convention Microcap
                </Button>
              </Link>
            </p>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}