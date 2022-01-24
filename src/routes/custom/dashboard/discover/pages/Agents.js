import { DISCOVER } from "Url/frontendUrl";
import { getFilePath } from "Helpers/helpers";
import { HashLink } from 'react-router-hash-link';
import React, { useState, useEffect } from 'react';
import DiscoverLayout from "Routes/custom/dashboard/discover/DiscoverLayout";
import TitleHeader from "Routes/custom/dashboard/discover/components/TitleHeader";

const Agents = () => {
    const [data, setData] = useState([]);

    document.body.style.overflow = "auto";

    useEffect(() => {
    }, []);

    return (
        <DiscoverLayout title="Nos agents">
            <div className="session-inner-wrapper video-player-wrapper pionier-content">
                <TitleHeader title="Nos agents" />
                <div className="container">
                    <p className="font-lg">
                        Ce sont des structures capables d’offrir un service d’accueil physique. Elles sont conventionnées pour
                        permettre d’assurer un service de proximité au membres du réseau MicroCap : Nos agents vous proposeront
                        informations et assistance pour vous permettre de mieux profiter de vos services.
                    </p>
                    <p className="font-lg">
                        La liste des agents MicroCap évolue chaque jour, n’hésitez pas à nous contacter pour connaitre le point
                        d’accueil le plus proche de vous.
                    </p>
                    <p className="font-lg mb-50">
                        Ils ont déjà rejoint notre réseau d’agents :
                    </p>
                    {/* <p className="font-lg">
                        MicroCap est aujourd’hui un produit qui permet des services  que nous sommes fiers de présenter. 
                        Mais c’est d’abord un mouvement de cœur, de personnes originaires ou sympathisantes des pays du sud en 
                        général et de l’Afrique subsaharienne plus particulièrement.
                    </p>
                    <p className="font-lg mb-50">
                        Depuis 2017, le mouvement ne cesse de grandir et compte aujourd’hui des contributeurs sur les 5 continent, 
                        des personnes grâce à qui nous pouvons vous proposer ce service. Rejoint le mouvement.
                    </p> */}

                    <div className="row my-70 person-block">
                        {data.filter(a => a.active === true).map(agent => (
                            <div className="single-item col-lg-4 col-md-5">
                                <div className="item">
                                    <div className="thumb">
                                        <div className="img-wrapper" style={{ backgroundImage: `url(${getFilePath(agent.avatar) || require('Assets/img/profile.jpg')})` }} />
                                    </div>
                                    <div className="info">
                                        <h4>{agent.name}, <span>{agent.post}</span></h4>
                                        <p>{agent.about}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h1 className="font-weight-bold text-black text-center font-3x">
                        Assistance
                    </h1>
                    <p className="font-lg">
                        Le service MicroCap est proposé par la société A+ Conseils, Spécialiste de la création et du développement de la PME. <br />
                        Toute réclamation doit être portée directement à notre attention en utilisant un des <HashLink to={`${DISCOVER}/#fh5co-footer`}>contacts Microcap</HashLink>. Vous pouvez également enregistrer une réclamation auprès d’un agent de notre réseau. Nous vous garantissons une prise en charge et un retour en moins de 48H
                    </p>
                </div>
            </div>
        </DiscoverLayout>
    );
};

export default Agents;
