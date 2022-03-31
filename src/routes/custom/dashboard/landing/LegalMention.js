/**
 * TermsCondition Page
 */
import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class LegalMention extends Component {
  render() {
    return (
      <div className="terms-wrapper p-20" >
        <Helmet>
          <title>MENTIONS LEGALES</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        <div className="page-title d-flex align-items-center">
          <IconButton to="/" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
            <i className="zmdi zmdi-arrow-left"></i>
          </IconButton>
          <h2>MENTIONS LEGALES</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <p>Mentions de droits réservés pour le site internet accessible à l'adresse microcap.fr (ci-après désigné le «Site») </p>
          </RctCollapsibleCard>
          <RctCollapsibleCard customClasses="p-30">
            <h2 className="heading">Directeur de publication et exploitation</h2>
            <p>A PLUS CONSEILS SAS, société par actions simplifiée, immatriculée au Registre du Commerce et des Sociétés de Bobigny sous le numéro 829 059 401, dont le siège est situé 7, Place du 11 Novembre 1018, 93000 Bobigny (ci-après désigné «A+»). </p>
            <p>Bernd STIEHL  Président contact@aplus-conseils.fr </p>
            
          </RctCollapsibleCard>
          <RctCollapsibleCard customClasses="p-30">
            <h2 className="heading">Hébergeur </h2>
            <h3 className="nest-heading">SCALWAY</h3>
            <p className="sub-order">
            Dispositions légale spécifiques :<br/>
            Le service de financement participatif de la plateforme MicroCap et les autres activités règlementées sont proposée à titre expérimentale sur la période du 1er avril 2021 au 30 Septembre 2021. A ce titre, A+ n’autorise pas des produits d’épargne ou de placement supérieur à 500 € sans dépasser un valeur cumulée de tout les produits supérieurs à 3000€, limite aligné sur celle des prêts occasionnels  entre particuliers.<br/>
            Toutes responsabilités juridique et financières sont porté par les promoteurs qui assument leur responsabilité dans le cadre de la société ad hoc MicroCap SNC qui permet d’étendre la responsabilité de l’entreprise aux promoteurs.<br/>
            L’autorité de contrôle prudentiel et de résolution APCR a été informé de l’expérimentation MicroCap par courrier AR daté du 30 Mars 2021, pour une expérimentation couvert par le régime d’exemption avec une limitation globale de collecte de l’épargne et des placement ne dépassant pas 3 Millions d’Euros. MicroCap SNC ne détiens en aucun cas les fonds autres correspondant à l’épargne et aux placements. <br/>
            Au terme de l’expérimentation portée par la société MicroCap SNC, et prévu à la date au plus tard du le 30 septembre 2021,  les souscripteurs des produits d’épargne et de placement se verrons remboursé intégralement, frais de souscription et tout autres compris, par l’établissement domiciliataire.<br/>
            Conformément aux disposition légales prise ci-dessus, la plateforme MicroCap est régis en opération et en responsabilités tel que éditer ci-dessous.
            </p>
            <p className="sub-order">
            Le site internet accessible à l’adresse https://microcap.fr est une plateforme de financement participatif opéré par A+ conseils. Le service est proposé et administré par l’établissement financier dédié qui en assume la responsabilités administrative et réglementaire :<br/>
            MicroCap SNC<br/>
            Au capital de 20 000€ encours d’immatriculation au RCS de Versailles dont le siège sociale est à :<br/>
            3 Allée des bruyère<br/>
            78630 Orgeval - France<br/>
            MicroCap SNC est une société de mission sous la forme d’un fonds d’entrepreneurs proposant l’insertion sociale et l’inclusion financière par l’éducation financière, économique et budgétaire ainsi que le financement de l’entrepreneuriat<br/>
            MicroCap SNC est une société de financement dont la demande d’agréement est soumise à l’APCR en qualité de prestataire de service de paiement<br/>
            Les produits de MicroCap sont exclusivement distribués et commercialisés  sur le site internet opéré par A+ à l’adresse https://microcap.fr.<br/>
            A+ Conseils distribue et commercialise des produits et services d’épargne, de placement et de financement de son organisme de financement MicroCap Invest de façon non exclusive en qualité de Mandataire Intermédiaire en Opérations de Banque et Services de Paiement (MIOBSPS).<br/>
            A+ commercialises des produits d’autres établissement financiers qui concourent à la réalisation du service de financement participatif tel que proposé par MicroCap Invest.<br/>
            La société A+ a fait l’objet d’une demande d’inscription à l’Oriass et jouit d’une assurance police N° XXX auprès de YYY pour couvrir ses activités.<br/>
            Les dispositions spécifiques sont produites pour des documents dédiés pour chaque qualification :<br/>
            En Qualité de directeur de publication :<br/>
            Conditions générales d’utilisation à l’adresse : https:// cgu.microcap.fr<br/>
            En qualité de place de marché  proposants des produits et services de partenaires et des entrepreneurs de la plateforme :<br/>
            Conditions Générales de ventes à l’adresse : https:// cgu.microcap.fr
            </p>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}
