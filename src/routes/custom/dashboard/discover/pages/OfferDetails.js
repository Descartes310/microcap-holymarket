import { Helmet } from "react-helmet";
import React, { Component } from 'react';
import PricingBlockV3 from 'Components/Pricing/PricingBlockV3';
import DiscoverLayout from "Routes/custom/dashboard/discover/DiscoverLayout";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import TitleHeader from "Routes/custom/dashboard/discover/components/TitleHeader";

const OfferDetails = () => {
    return (
        <DiscoverLayout>
            <div className="offer-details p-20" >
                <TitleHeader title="Les PASS Microcap" />

                <div className="container">
                    <div className="row">
                        <p className="font-lg">
                            MicroCap propose des abonnement pour profiter pleinement des services de la plateforme et faciliter la gestion des parcours de professionnalisation de nos utilisateurs vers l’entrepreneuriat. MicroCap a également fait le choix de l’indépendance financière afin de pouvoir conduire sa mission d’inclusion financière et de soutiens aux personnes en situation de fragilité. Pour capitaliser et soutenir le fonctionnement indépendant, nous proposons des options payantes sur nos abonnements.
                        </p>
                        <p className="font-lg">
                            Les options MicroCap sur abonnement sont disponibles en série limitée du 1er avril 2021 au 30 septembre 2021.
                        </p>
                    </div>
                    <div className="row">
                        <div className="offer-details-list">
                            <RctCollapsibleCard customClasses="box-shadow-none bg-none">
                                <div className="discover-content mt-30">
                                    <p className="ctext">
                                        <ol className="custom-list">
                                            <li>
                                                <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass découvert <span style={{ color: '#feba3a', fontSize: '1.7em' }}> 0 € </span></p>
                                                <p>Gratuit et sans conditions, il permet un accès restreint à la plateforme pour se familiariser avec le service et découvrir nos projets</p>
                                            </li>
                                            <li>
                                                <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass réseau <span style={{ color: '#feba3a', fontSize: '1.7em' }}> 180 € </span></p>
                                                <p>C’est la carte de membre qui est attribué à toute personne qui ouvre un plan d’investissement MicroCap afin de contribuer ou bénéficier de la solidarité du réseau</p>
                                            </li>
                                            <li>
                                                <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass club business <span style={{ color: '#feba3a', fontSize: '1.7em' }}> 3 000 € </span></p>
                                                <p>Les porteurs des projets de la plateforme bénéficient des service des professionnels et du concours de partenaires investisseurs ou institutionnels  pour le succès de leur entreprise. ils sont soumis au régime de solidarité par l’obligation d’un Pass club business</p>
                                            </li>
                                            <li>
                                                <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass ANY-Cycle revelation <span style={{ color: '#feba3a', fontSize: '1.7em' }}> 5 400 € </span></p>
                                                <p>Le pass any pour any whère and anytime, est réservé au entrepreneurs de la plateforme pour se lancer à tout moment et ceci n’importe où si le service microcap y est disponible. Le cycle R ou révélation est un cycle long de trois ans pour créer son entreprise en partant juste d’une intention ou une envie d’entreprendre.</p>
                                            </li>
                                            <li>
                                                <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass ANY-Cycle incubation <span style={{ color: '#feba3a', fontSize: '1.7em' }}> 13 902 € </span></p>
                                                <p> Le pass any pour any whère and anytime, est réservé aux entrepreneurs de la plateforme pour se lancer à tout moment et ceci n’importe où si le service MicroCap y est disponible. Le cycle I ou incubation est un cycle de 12 mois pour créer son entreprise en partant d’une idée.</p>
                                            </li>
                                            <li>
                                                <p style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>Pass ANY-Cycle acceleration <span style={{ color: '#feba3a', fontSize: '1.7em' }}> 2 640 € </span></p>
                                                <p>Le pass any pour any whère and anytime, est réservé aux entrepreneurs de la plateforme pour se lancer à tout moment et ceci n’importe où si le service MicroCap y est disponible. Le cycle A ou accélération est un cycle court de trois ans pour valider une idée ou un projet et lancer son entreprise.</p>
                                            </li>
                                        </ol>
                                    </p>
                                </div>
                                <h1 className="font-weight-bold text-black" style={{ fontSize: '2em', padding: '2%', textAlign: 'center' }}>
                                    Offrez-vous plus de confort et soutenez notre engagement avec une option MicroCap, quel que soit le PASS choisi
                                </h1>
                                <div className="price-list">
                                    <div className="row row-eq-height">
                                        <PricingBlockV3
                                            planType="free"
                                            type="Option Leaders"
                                            color="primary"
                                            description="Le moins chère"
                                            buttonText="Souscrire"
                                            price="50€"
                                            oldPrice="600€"
                                            features={[
                                                'Remise sur abonnement: 25%',
                                                'Paiements différés: 300€ sur 90 jours',
                                                'Bonification hebdomadaire des cautionnements 30€ max sur 3 mois'
                                            ]}
                                        />
                                        <PricingBlockV3
                                            planType="free"
                                            type="Option Privilège"
                                            color="warning"
                                            description="Le plus intéressant"
                                            buttonText="Souscrire"
                                            price="300€"
                                            reduction
                                            oldPrice="3000€"
                                            features={[
                                                'Remise sur abonnement: 30%',
                                                'Paiements différés: 2000€ sur 180 jours',
                                                'Bonification hebdomadaire des cautionnements 200€ max sur 3',
                                                'Doublement des avantages'
                                            ]}
                                        />
                                        <PricingBlockV3
                                            planType="free"
                                            type="Option Pioniers"
                                            color="info"
                                            description="A saisir"
                                            buttonText="Souscrire"
                                            price="150€"
                                            reduction
                                            oldPrice="1500€"
                                            features={[
                                                'Remise sur abonnement: 30%',
                                                'Paiements différés: 1000€ sur 90 jours',
                                                'Bonification hebdomadaire des cautionnements 100€ max sur 3',
                                                'Doublement des avantages'
                                            ]}
                                        />
                                    </div>
                                </div>
                            </RctCollapsibleCard>
                        </div>
                    </div>
                </div>
            </div>
        </DiscoverLayout>
    );
};

export default OfferDetails;
