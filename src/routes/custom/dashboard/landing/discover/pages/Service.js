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

              <p>MicroCap conçoit des produits d’épargne et placement accessibles aux très petits capitaux.
              Ces produits sont proposés à des partenaires bancaires et autres établissements financiers,
              seuls habilités selon la règlementation à les commercialiser. Notre positionnement en qualité
                d’architecte produit permet à nos partenaires financiers de capter des flux marginaux.</p>

              <p style={{ fontWeight: 'bold' }}>l’entrepreneuriat pour tous </p>
              <p>
                En commercialisant nos produits, les établissements financiers partenaires nous permettent 
                de disposer des cas d’application pour nos activités d’éducation financière. Ils peuvent en 
                retour toucher des cibles éloignées de leurs offres habituelles en particulier des personnes 
                en situation d’exclusion financière.
              </p>
              <p>
                MicroCap a une parfaite connaissance des personnes en marge du système bancaire, c’est-à-dire 
                des profils ayant difficilement accès aux services bancaires. L’entreprise  jouit d’une expertise 
                avérée à la gestion des personnes en situation de fragilité.  Le service MicroCap c’est:
              </p>
              <ul style={{ paddingLeft: 40, textAlign: 'justify', lineHeight: 1.5, }}>
                <li>La possibilité de développer un réseau de solidarité financière</li>
                <li>Faciliter vos campagnes de love money</li>
                <li>Vous rêvez de créer votre entreprise, vous avez déjà une idée, voir un projet,</li>
                <li>Un accès aux solutions de financement négociées auprès des partenaires pour tout projet de création ou développement d’entreprise.</li>
              </ul>
              <p>
                MicroCap accompagne les entrepreneurs à construire et à qualifier un réseau de solidarité sur lequel ils pourront 
                s’appuyer tout au long de la vie de leur projet. Pour concrétiser son projet, le membre du réseau MicroCap à un 
                accès facilité aux produits financiers de nos partenaires exclusivement distribués et opérés depuis la plateforme. 
                MicroCap intervient comme Intermédiaire en Opérations Banque et en Services de Paiement (IOBSP) mais, n’en a pas le 
                statut. Cette prestation est exclusivement réservée aux personnes accompagnées dans un parcours entrepreneurial.
              </p>
              {/* <p>
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
               */}
              <p style={{ fontWeight: 'bold' }}>Des services financiers accessible à tous</p>
              <p>Pour offrir un service complet à ses membres, MicroCap a étendu son savoir-faire à la collecte et la gestion de la très 
                petite épargne. MicroCap propose la gamme de produits d’épargne ESH “Emploi, Santé et Habitat“, pour faciliter l’accès au 
                financement et créer un effet de levier pour les membres du réseau. La gamme est constituée à ce jour de deux produits :</p>

              <ul style={{ paddingTop: 40, paddingBottom: 10, paddingLeft: 40 }}>
                <li>Le compte d’épargne ESH CASH qui reçoit des dépôts à terme à partir de 3€</li>
                <li>Le compte titre ordinaire ESH Titre qui ne reçoit que des titres compatibles avec notre service. </li>
              </ul>
              <p>La gamme ESH, permet de capter et de gérer de très faibles flux, à partir de 3€, pour favoriser des projets ou des personnes 
                engagées, qui concourent à faciliter l’accès à l’emploi, à la santé et au logement décent : porteurs d’idée ou de projet, TPE 
                et PME. La souscription et la gestion du compte se font via notre plateforme, mais celui-ci est domicilié auprès d’un établissement 
                partenaire de votre choix. Nous ne recevons donc pas les fonds, vos dépôts sont encaissés directement transmis dans un délais de 5 
                jours ouvrés à l’établissement qui tient le compte et qui en assume la responsabilité.</p>
            </p>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}