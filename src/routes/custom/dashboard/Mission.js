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
          <h2>MISSION ET VALEURS</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <p>
            MicroCap est un établissement de la société A+ Conseils, qui porte la mission de promouvoir l'inclusion et l’indépendance financière par la solidarité et le love money. 
            </p>
            <p>
              <b>Le love money</b> (traduit littéralement par « argent de l’amour ») représente l’argent de ceux qui nous aiment. Ce concept consiste à faire appel à des proches (amis, familles) pour qu’ils s’impliquent financièrement à la création ou au développement d’une entreprise en devenant actionnaires. Le love money constitue ainsi un <b>moyen de financer son entreprise</b> en renforçant ses fonds propres.  Les montants sont très variables (de quelques dixaines à plusieurs milliers d’euros), la logique est bien particulière: elle implique <b>proximité et confiance</b>. Il s’agit généralement pour les proches d’une <b>démarche affective</b>: la principale raison de leur investissement est d’aider un proche à développer son entreprise et non de faire un placement rentable.
            </p>
            <p>
            MicroCap propose une plateforme de financement par cautionnement mutuel qui permet d'étendre une campagne de collecte de fonds love money, dans le cadre d'un projet entrepreneurial, au-delà de la sphère familiale ou amicale pour, toucher en toute sérénité les collègues, les camarades ou de parfaits inconnus avec lesquels le collecteur pourrait se trouver des affinités.
            </p>
            <p>
            Conscient du fait que les environnements sociaux de chacun ne rendent pas toujours facile une campagne de levée de fonds par le love money, MicroCap permet aux défavorisés capables de faire preuve de volonté et de sérieux, d’étendre leur réseau de proximité en devenant membre d’un réseau international de solidarité financière. 
            </p>
            <p>
            Nous engageons tous nos collaborateurs, les membres du réseau et tous ceux qui s’intéressent de près ou de loin à MicroCap, aux valeurs qui ont motivées et construites cette initiative :
            </p>
            <p style={{ textAlign: 'center', fontSize: '1.3em', fontWeight: 'bold' }}>
              La solidarité – l’innovation – l’engagement – la persévérance
            </p>

            <Link to={AUTH.REGISTER}>
                <Button variant="contained" className="btn-primary mr-2 text-white">
                  Rejoignez nous
                </Button>
              </Link>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}