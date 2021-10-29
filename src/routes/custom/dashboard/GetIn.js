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
            <h2 className="font-weight-bold mb-30">Le love Money ! pour des liens forts et profitables</h2>

            <p>
              Parce que nous aimons partager des moments agréables, nous ne comptons pas l’argent investi pour les anniversaires,
              les soirées gourmets ou les séquences arrosées  au bar et au night-club. Nous avons ainsi inventé la solidarité de la
              réjouissance, juste pour les plaisirs.
            </p>
            <p>
              Mais la vie nous a forcé à une autre forme de solidarité, la solidarité des pleurs ou des souffrances. Il s’agit parfois
              d’un décès, parfois d’un accident, parfois aussi d’une maladie  très coûteuse.
            </p>

            <h2 className="font-weight-bold mt-50 mb-30">MicroCap, 1er réseau international de solidarité financière…</h2>

            <p>
              C’est le promoteur d’une solidarité pensée, anticipée, utile et profitable entre membre du réseau. En investissant sur
              nos proches ou les proches de proches qui deviennent finalement nos proches, nous nous constitutions une communauté avec
              laquelle nous partageons plus que les simples plaisirs ou des larmes, mais toutes les petites préoccupations du quotidien pour
              notre développement économique et sociale. Investir sur l’humain, cela rempli notre vie de sens et de fierté, et c’est l’opportunité
              que nous offre le service MicroCap.
            </p>
            <p>
              Adhérer au réseau MicroCap en souscrivant à un Pass MicroCap et commencez à construire votre réseau international de
              love money pour créer des liens forts et pour être utile aux personnes que vous aimez.
            </p>

            <h2 className="font-weight-bold mt-50 mb-30">Investir sur l’Emploi, la Santé et l’habitat : chacun son rythme, chacun sa manière…</h2>

            <p>
              Le service MicroCap est promoteur du label ESH, un programme en faveur, de la réalisation par l’entrepreneuriat, de trois ODD
              (objectifs du développement durable) : l’Emploi, la Santé, l’Habitat. Investissez-vous à nos côtés à votre rythme et de la manière
              qui vous convienne:
            </p>

            <ul style={{ paddingLeft: 40, paddingBottom: 10 }}>
              <li className="mb-15">
                <b>Epargnant</b>: vous ouvrez votre compte d’épargne ESH auprès d’un établissement financier partenaire à partir de 3€ puis fléchez
                votre épargne, c’est-à-dire mettre cette épargne au service des entrepreneurs ou des causes de votre choix.
              </li>
              <li className="mb-15">
                <b>Entrepreneurs</b>: portez des projets qui répondent à notre mission ESH
              </li>
              <li>
                <b>Partenaires Business</b>: les investisseurs professionnels, les institutionnels, les prestataires d’accompagnement et assistance des entrepreneurs…
              </li>
            </ul>

            <p style={{ fontSize: 20 }}>
              Avec MicroCap, reprenons le contrôle sur notre argent ! <Link to={`${AUTH.REGISTER}`}>Je m'inscris</Link>
            </p>



            {/* <p>Le love money permet de collecter de l'argent auprès des proches pour vous financer. </p>
            <p>En famille, entre amis, collègues ou compatriotes, etc… c’est un bon début. Avez MicroCap,
              vous pouvez désormais étendre votre réseau au-delà du cercle proche et financer plus
              facilement vos projets. </p>
            <p>Adopter la solidarité comme principe </p>
            <p>MicroCap est le réseau d’entrepreneur accompagnés ou souhaitant se faire accompagner
              par A+ Conseils. A+ encourage les membres du réseau MicroCap à la mutualisation des
              risques et des moyens, ce qui fait de MicroCap un réseau international de solidarité financière.
              Chaque membre peut solliciter le  cautionnements pour obtenir un
              financement d’un partenaire MicroCap</p>

            <ul style={{ paddingTop: 40, paddingBottom: 10 }}>
              <li>Credit banquaire</li>
              <li>Paiement à crédit des achats sur la marketplace (terme plus populaire) microcapshop.com</li>
              <li>Paiement différé des opérations auprès des prestataires: transfert d'argent, loyer, caution pour accéder au bail. </li>
            </ul>

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
            </Link> */}
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}