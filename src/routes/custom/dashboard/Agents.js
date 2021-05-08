import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { DISCOVER } from "Url/frontendUrl";
import { getFilePath } from "Helpers/helpers";
import { HashLink } from 'react-router-hash-link';
import React, { useState, useEffect } from 'react';
import { getAgents } from "Actions/independentActions";
import DiscoverMenu from "Routes/custom/dashboard/DiscoverMenu";

const Agents = (props) => {
    const { loading, intl } = props;
    const [data, setData] = useState([]);

    document.body.style.overflow = "auto";

    useEffect(() => {
        getAgents().then(data => {
            setData(data)
        })
    }, []);

    return (
        <div>
            {/* <div className="rct-session-wrapper"> */}
            <div className={'global-loader'}>
                {loading && <LinearProgress />}
            </div>
            <DiscoverMenu/>
            <div className="session-inner-wrapper video-player-wrapper pionier-content">
                <div className="pionier-content-text mt-70 py-30 my-50" >
                    <div className="p-30 text-center">
                        <h1 className="font-4x">
                            Nos agents
                        </h1>
                    </div>
                </div>
                <div className="container">
                    <p className="font-lg">
                        MicroCap est aujourd’hui un produit qui permet des services  que nous sommes fiers de présenter. Mais c’est d’abord un mouvement de cœur, de personnes originaires ou sympathisantes des pays du sud en général et de l’Afrique subsaharienne plus particulièrement.
                    </p>
                    <p className="font-lg mb-50">
                        Depuis 2017, le mouvement ne cesse de grandir et compte aujourd’hui des contributeurs sur les 5 continent, des personnes grâce à qui nous pouvons vous proposer ce service. Rejoint le mouvement.
                    </p>

                    <div className="row my-70 person-block">
                        {data.filter(a => a.active === true).map(agent => (
                            <div className="single-item col-lg-4 col-md-5">
                                <div className="item">
                                    <div className="thumb">
                                        <div className="img-wrapper" style={{backgroundImage: `url(${getFilePath(agent.avatar) || require('Assets/img/agent.png')})`}} />
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
                    <h1 className="font-weight-bold text-black text-center font-3x">
                        Assistance
                    </h1>
                    <p className="font-lg">
                        Le service MicroCap est proposé par la société A+ Conseils, Spécialiste de la création et du développement de la PME. <br />
                        Toute réclamation doit être portée directement à notre attention en utilisant un des <HashLink to={`${DISCOVER}/#fh5co-footer`}>contacts Microcap</HashLink>. Vous pouvez également enregistrer une réclamation auprès d’un agent de notre réseau. Nous vous garantissons une prise en charge et un retour en moins de 48H
                    </p>
                </div>
            </div>
        </div>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {})(injectIntl(Agents));
