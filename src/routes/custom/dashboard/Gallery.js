import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import QueueAnim from "rc-queue-anim";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { AUTH, DISCOVER, HOME, GALERY_PROJECT } from "Url/frontendUrl";
import AppBar from "@material-ui/core/AppBar/AppBar";
import headerImg from 'Assets/img/image_revolution.jpg';
import api from 'Api';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { getAllProjectReactionByBranch } from "Actions/independentActions";
import {
    Player
} from 'video-react';
import { HashLink } from 'react-router-hash-link';
import IconButton from '@material-ui/core/IconButton';

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
        getAllProjectReactionByBranch().then(data => {
            console.log(data);
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
                                <Link to={DISCOVER}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Microcap
                                   </a>
                                </Link>
                                <HashLink to={`${DISCOVER}/#services`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Produits et services
                                    </a>
                                </HashLink>
                                <HashLink to={`${DISCOVER}/#pass`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Pass microcap
                                    </a>
                                </HashLink>
                                <Link to={GALERY_PROJECT}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Gallerie projets
                                    </a>
                                </Link>
                                <HashLink to={`${DISCOVER}/#agents`}>
                                    <a className="mr-30" style={{ fontSize: '1.2em', color: 'black' }}>
                                        Réseau d'agent
                                    </a></HashLink>
                                <Button variant="contained" className="btn-primary mr-2 text-white" onClick={onUserLogin}>
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

                <h1 className="font-weight-bold text-black" style={{ fontSize: '2em', padding: '2%', textAlign: 'center' }}>
                    Gallerie projets
                </h1>
                <p style={{ fontSize: '1.1em', textAlign: 'center', marginBottom: 50 }}>Decouvrez un aperçu de l'activité des projets déjà présent sur la plateforme Microcap</p>

                {data && Object.keys(data).map((key, index) => (
                    <div className="container" key={index}> 
                        <h1 className="font-weight-bold" style={{ fontSize: '1.5em', padding: '2%', }}>
                            {key}
                    </h1>
                        <ul className="mb-0 list-inline attachment-wrap">
                            {data[key].map((item, key) => (
                                <li className="list-inline-item overlay-wrap overflow-hidden rounded">
                                    <img src={item.file} className="size-120 rounded img-fluid" alt="img" />
                                    <div className="overlay-content">
                                        <a href="#" onClick={e => e.preventDefault()} className="d-flex align-items-center justify-content-center h-100 font-2x text-white">
                                            <i className="zmdi zmdi-download"></i>
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {})(injectIntl(Discover));
