import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { AUTH, DISCOVER, HOME, GALERY_PROJECT, PASS_DETAILS, AGENTS } from "Url/frontendUrl";
import AppBar from "@material-ui/core/AppBar/AppBar";
import headerImg from 'Assets/img/image_revolution.jpg';
import api from 'Api';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { getAgents } from "Actions/independentActions";
import { HashLink } from 'react-router-hash-link';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { getFilePath } from "Helpers/helpers";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DiscoverMenu from "Routes/custom/dashboard/DiscoverMenu";

const Agents = (props) => {
    const { loading, intl } = props;
    const [data, setData] = useState([])
    /**
     * On navigate to Discover Microcap
     */
    const onUserLogin = () => {
        props.history.push(AUTH.LOGIN);
    };

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

                    <div className="row justify-content-center">
                        {data.filter(a => a.active === true).map(agent => (
                            <div className="col-sm-12 col-md-4 col-lg-3">
                                <RctCard>
                                    <RctCardContent>
                                        <div className="client-post text-center">
                                            <div className="client-thumb mb-20">
                                                <img
                                                    className="rounded"
                                                    src={getFilePath(agent.avatar)}
                                                    alt="client"
                                                    width="95"
                                                    height="95"
                                                />
                                            </div>
                                            <div className="client-content">
                                                <Tooltip title={agent.about}>
                                                    <h4 className="fw-bold text-capitalize text-primary">{agent.name}</h4>
                                                </Tooltip>
                                                <p>{agent.post}</p>
                                                <p>{agent.email}</p>
                                                <p>{agent.phone}</p>
                                                <p>{agent.about}</p>
                                            </div>
                                        </div>
                                    </RctCardContent>
                                </RctCard>
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
