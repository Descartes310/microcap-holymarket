import { getFilePath } from "Helpers/helpers";
import React, { useState, useEffect } from 'react';
import { getPioniers } from "Actions/independentActions";
import DiscoverLayout from "Routes/custom/dashboard/discover/DiscoverLayout";
import TitleHeader from "Routes/custom/dashboard/discover/components/TitleHeader";

const DiscoverPioner = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getPioniers().then(data => {
            setData(data)
        })
    }, []);

    return (
        <DiscoverLayout
            title="Nos pioniers"
            description="MicroCap est aujourd’hui un produit qui permet des services  que nous sommes fiers de présenter. Mais c’est d’abord un mouvement de cœur, de personnes originaires ou sympathisantes des pays du sud en général et de l’Afrique subsaharienne plus particulièrement."
        >
            <div className="session-inner-wrapper video-player-wrapper pionier-content">
                <TitleHeader title="Nos pioniers" />
                <div className="container">
                    <p className="font-lg">
                        MicroCap permet aujourd’hui de proposer des services dont nous sommes fiers. Mais c’est d’abord un mouvement de cœur, 
                        de personnes des personnes qui œuvrent quotidiennement pour soutenir l’entrepreneuriat des plus fragiles.
                    </p>
                    <p className="font-lg mb-50">
                        Depuis 2017, le mouvement ne cesse de grandir et compte aujourd’hui des contributeurs sur les 5 continents, des personnes 
                        grâce à qui nous pouvons vous proposer ce service. Rejoint le mouvement.
                    </p>
                    <div className="row person-block">
                        {data.filter(a => a.active === true).map(agent => (
                            <div className="single-item col-lg-4 col-md-5">
                                <div className="item">
                                    <div className="thumb">
                                        <div className="img-wrapper" style={{backgroundImage: `url(${getFilePath(agent.avatar)})`}} />
                                        {/*<div className="social">
                                            <input type="checkbox" id="toggle2" className="share-toggle" hidden="" />
                                            <label htmlFor="toggle2" className="share-button">
                                                <i className="fas fa-plus"/>
                                            </label>
                                            <a href="#" className="share-icon facebook">
                                                <i className="fab ti-facebook-f"/>
                                            </a>
                                            <a href="#" className="share-icon twitter">
                                                <i className="fab ti-twitter"/>
                                            </a>
                                            <a href="#" className="share-icon instagram">
                                                <i className="fab ti-instagram"/>
                                            </a>
                                        </div>*/}
                                    </div>
                                    <div className="info">
                                        <h4>{agent.name}, <span>{agent.post}</span></h4>
                                        <p>{agent.about}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DiscoverLayout>
    );
};

export default DiscoverPioner;
