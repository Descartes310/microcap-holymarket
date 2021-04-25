import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { AUTH, DISCOVER, HOME, GALERY_PROJECT, AGENTS, PASS_DETAILS } from "Url/frontendUrl";
import AppBar from "@material-ui/core/AppBar/AppBar";
import headerImg from 'Assets/img/image_revolution.jpg';
import api from 'Api';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { getPioniers } from "Actions/independentActions";
import { HashLink } from 'react-router-hash-link';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { getFilePath } from "Helpers/helpers";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Discover = (props) => {
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
        getPioniers().then(data => {
            setData(data)
        })
    }, []);

    return (
        <div>
            {/* <div className="rct-session-wrapper"> */}
            <div className={'global-loader'}>
                {loading && <LinearProgress />}
            </div>
            <AppBar position="static" className="session-header">
                <Toolbar>
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <div className="session-logo">
                                <Link to={HOME}>
                                    <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                </Link>
                            </div>
                            <div className="center-hor-ver">
                            <UncontrolledDropdown nav className="list-inline-item vr-super">
                                    <DropdownToggle nav caret className="text-white">
                                        <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                            Découvir
                                        </a>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#produits`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                Produits pour se financer
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#investir`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Produits pour investir
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#services`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Produits des Partenaires
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#pass`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Pass Microcap
                                                </a>
                                            </HashLink>
                                        </DropdownItem><DropdownItem>
                                            <HashLink to={`${DISCOVER}/#pioniers`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    L'équipe
                                                </a>
                                            </HashLink>
                                        </DropdownItem><DropdownItem>
                                            <HashLink to={`${DISCOVER}/#agents`}>
                                                <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                                    Point d'accueil
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <HashLink to={`${PASS_DETAILS}`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Pass microcap
                                    </a>
                                </HashLink>
                                <Link to={GALERY_PROJECT}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Gallerie projets
                                    </a>
                                </Link>
                                <HashLink to={`${AGENTS}`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Réseau d'agent
                                    </a></HashLink>
                                <Button variant="contained" className="btn-primary mr-2" onClick={onUserLogin}>
                                    <IntlMessages id="auth.signin" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper video-player-wrapper">
                <div style={{ height: '35vh', backgroundImage: `url(${headerImg})`, backgroundSize: 'cover' }}>
                </div>
                <div className="page-title d-flex align-items-center" style={{ padding: 40 }}>
                    <IconButton to="/discover" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
                        <i className="zmdi zmdi-arrow-left"></i>
                    </IconButton>
                    <h3>Retour sur Découvrir Microcap</h3>
                </div>
                <div className="container">
                    <p>
                        MicroCap est aujourd’hui un produit qui permet des services  que nous sommes fiers de présenter. Mais c’est d’abord un mouvement de cœur, de personnes originaires ou sympathisantes des pays du sud en général et de l’Afrique subsaharienne plus particulièrement.
                    </p>
                    <p>
                        Depuis 2017, le mouvement ne cesse de grandir et compte aujourd’hui des contributeurs sur les 5 continents, des personnes grâce à qui nous pouvons vous proposer ce service. <b>Rejoingez le mouvement.</b>
                    </p>
                    <h1 className="font-weight-bold text-black" style={{ fontSize: '2em', padding: '2%', textAlign: 'center' }}>
                        Nos pioniers
                    </h1>

                    <div className="row justify-content-center">
                        {data.filter(a => a.active == true).map(agent => (
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
                </div>
            </div>
        </div>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {})(injectIntl(Discover));
