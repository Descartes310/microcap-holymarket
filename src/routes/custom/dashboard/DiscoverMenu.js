import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import {HashLink} from "react-router-hash-link";
import {AGENTS, AUTH, GALERY_PROJECT, HOME, PASS_DETAILS} from "Url/frontendUrl";

const MAX_MOBILE_SCREEN_WIDTH = 996;

const getWidth = () => {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
};

const getHeight = () => {
    return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
};

class DiscoverMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: getWidth(),
            showMobile: false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    resize = () => {
        this.setState({width: getWidth()})
    };

    onTClick = (event) => {
        event.preventDefault();
        this.setState(state => ({showMobile: !state.showMobile}))
    };


    render() {
        const { width, showMobile} = this.state;
        const isMainNav = width > MAX_MOBILE_SCREEN_WIDTH;

        return (
            <section id="nav">
                <nav
                    id="main-nav"
                    className={`navbar navbar-expand-lg navbar-light bg-light fixed-top scrolling-navbar ${!isMainNav ? 'show-mobile-nav' : ''}`}>
                    <div className="container">
                        <div className="session-logo">
                            <Link to={HOME}>
                                <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                            </Link>
                        </div>
                        <div id="navbarContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                    <HashLink to={`${PASS_DETAILS}`}>
                                        <a className="nav-link" href="#">
                                            Decouvrir
                                        </a>
                                    </HashLink>
                                </li>
                                <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                    <HashLink to={`${PASS_DETAILS}`}>
                                        <a className="nav-link" href="#">
                                            Pass microcap
                                        </a>
                                    </HashLink>
                                </li>
                                <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                    <Link to={GALERY_PROJECT}>
                                        <a className="nav-link" href="#">Gallerie projets</a>
                                    </Link>
                                </li>
                                <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                    <HashLink to={`${AGENTS}`}>
                                        <a className="nav-link" href="#">Réseau d'agent</a>
                                    </HashLink>
                                </li>
                                <li>
                                    <Button
                                        variant="contained"
                                        className="btn-primary mr-2"
                                        onClick={() => props.history.push(AUTH.LOGIN)}>
                                        <IntlMessages id="auth.signin" />
                                    </Button>
                                </li>
                            </ul>{/*<a className="btn btn-primary btn-rounded my-0"
                            href="https://templateflip.com/templates/material-landing" target="_blank">Download</a> */}
                        </div>
                    </div>
                </nav>

                <nav
                    className={`bg-light ${!isMainNav ? 'show-mobile-nav' : ''}`}
                    id="mobile-nav">
                    <div className="row justify-content-between px-2">
                        <div className="logo-block">
                            <Link to={HOME}>
                                <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                            </Link>
                        </div>

                        <div
                            id="menu-toggler"
                            onClick={event => this.onTClick(event)}
                            className={`menu-toggler ${showMobile ? 'active' : ''}`}>
                            <div><span /></div>
                        </div>
                    </div>
                    <SlideDown className={'my-dropdown-slidedown'}>
                        {showMobile ? (
                            <div id="mobile-center">
                                <ul className="">
                                    <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                        <HashLink to={`${PASS_DETAILS}`}>
                                            <a className="nav-link" href="#">
                                                Découvrir
                                            </a>
                                        </HashLink>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                        <HashLink to={`${PASS_DETAILS}`}>
                                            <a className="nav-link" href="#">
                                                Pass microcap
                                            </a>
                                        </HashLink>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                        <Link to={GALERY_PROJECT}>
                                            <a className="nav-link" href="#">Gallerie projets</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                        <HashLink to={`${AGENTS}`}>
                                            <a className="nav-link" href="#">Réseau d'agent</a>
                                        </HashLink>
                                    </li>
                                    <li>
                                        <Button
                                            variant="contained"
                                            className="btn-primary mr-2"
                                            onClick={() => props.history.push(AUTH.LOGIN)}>
                                            <IntlMessages id="auth.signin" />
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </SlideDown>
                </nav>
            </section>
        );
    }
}

export default DiscoverMenu;
