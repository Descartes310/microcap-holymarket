import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import { AUTH } from "Url/frontendUrl";
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class Service extends Component {
  render() {
    return (
      <div className="terms-wrapper p-20" >
        <Helmet>
          <title>Le service Microcap</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        <div className="page-title d-flex align-items-center">
          <IconButton to="/discover" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
            <i className="zmdi zmdi-arrow-left"></i>
          </IconButton>
          <h2>LE SERVICE MICROCAP</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <p>

              <p>MicroCap conçoit des produits d’épargne et placement accessibles aux très petits capitaux. Ces produits sont proposés à des partenaires bancaires et autres établissements financiers , seuls habilités selon la règlementation à les commercialiser. Notre positionnement en qualité d’architecte produit permet à nos partenaires financiers de capter des flux marginaux. </p>
              <p style={{ fontWeight: 'bold' }}>l’entrepreneuriat pour tous </p>
              <p style={{ textAlign: 'justify', lineHeight: 1.5, }}>
                Ouvrez votre PIP MicroCap et Rejoignez notre réseau international de solidarité financière
              </p>
              <ul style={{ paddingLeft: 40, textAlign: 'justify', lineHeight: 1.5, }}>
                <li>Vous êtes solidaire d’un entrepreneur de votre localité ou de l’entrepreneuriat en général,</li>
                <li>Vous voulez fructifier ou diversifier une épargne non essentielle,</li>
                <li>Vous rêvez de créer votre entreprise, vous avez déjà une idée, voir un projet,</li>
                <li>Vous avez déjà créé votre entreprise et vous rencontrez des difficultés de financement,</li>
              </ul>
              <p>
                Le réseau MicroCap et le mécanisme de solidarité de la plateforme valorisent votre action et vous rendent acteur d’une économie de proximité.
              </p>
              <p>En commercialisant nos produits, les établissements financiers partenaires nous permettent  de disposer des cas d’application pour nos activités d’éducation financière. Ils peuvent en retour toucher des cibles éloignées de leurs offres habituelles en particulier des personnes en situation d’exclusion financière que vous pouvez soutenir.</p>
              <p>MicroCap a une parfaite connaissance des personnes en marge du système bancaire, c’est-à-dire des profils difficilement exposés aux services bancaires. L’entreprise  jouit d’une expertise avérée à la gestion des personnes en situation de fragilité.  Le service MicroCap c’est ;</p>
              <ul style={{ paddingTop: 40, paddingBottom: 10, paddingLeft: 40 }}>
                <li>La possibilité de développer un réseau de solidarité financière</li>
                <li>Faciliter vos campagnes de love money</li>
                <li>Un accès aux solutions de financement négociées auprès des partenaires pour tout projet de création ou développement d’entreprise.</li>
              </ul>

              <p>MicroCap accompagne les entrepreneurs à construire et à qualifier un réseau de solidarité sur lequel ils pourront s’appuyer tout au long de la vie de leur projet. Pour concrétiser son projet, le membre du réseau MicroCap à un accès facilites à des produits financiers de nos partenaires exclusivement distribuer et opérés depuis la plateforme. MicroCap intervient en qualité de Intermédiaire en Opérations Banque et  Services de Paiement (IOBSP).</p>
              <p style={{ fontWeight: 'bold' }}>Des services financiers accessible à tous</p>
              <p>Pour offrir un service complet à ses membres, MicroCap a étendu son savoir-faire de MicroCap sur la collecte et la gestion de la très petite épargne. MicroCap propose la gamme de produit d’épargne ESH pour Emploi, Santé et Habitat,  pour faciliter l’accès au financement et créer un effet de levier pour les membres du réseau. La gamme est constituer à ce jour de  deux produits :</p>

              <ul style={{ paddingTop: 40, paddingBottom: 10, paddingLeft: 40 }}>
                <li>le compte d’épargne ESH CASH qui reçoit des dépôts à terme à partir de 3€</li>
                <li>Le compte titre ordinaire ESH Titre qui ne reçoit que des titres compatibles avec notre service. </li>
              </ul>
              <p>La gamme ESH, permet de capter et de gérer de très faibles flux, à partir de 3€, pour  favoriser des projets ou des personnes engagées, qui concourent à faciliter l’accès à l’emploi, à la santé et au logement décent: porteurs d’idée ou de projet, TPE et PME. La souscription et la gestion du compte se font via notre plateforme, mais celui-ci est domicilié auprès d’un établissement partenaire de votre choix. Nous ne recevons donc pas les fonds, vos dépôts sont directement encaissés par l’établissement qui tient le compte et qui en assume la responsabilité.</p>
              <p>Avec les produits ESH, nous vous engageons à une épargne non contraignante mais hautement utile.</p>
            </p>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}