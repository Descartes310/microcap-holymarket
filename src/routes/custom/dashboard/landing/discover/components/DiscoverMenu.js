import { connect } from "react-redux";
import React, { Component } from 'react';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import AppConfig from "Constants/AppConfig";
import Button from "@material-ui/core/Button";
import { HashLink } from "react-router-hash-link";
import { Link, withRouter } from "react-router-dom";
import { AUTH, LANDING, HOME } from "Url/frontendUrl";
import TellUs from "../../../../../session/login/TellUs";
import { DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';

const MAX_MOBILE_SCREEN_WIDTH = 996;

const getWidth = () => {
    return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
};

class DiscoverMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            width: getWidth(),
            showMobile: false,
            showMobileDorpdown: false,
            showDesktopDorpdown: false,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    resize = () => {
        this.setState({ width: getWidth() })
    };

    onTClick = (event) => {
        event.preventDefault();
        this.setState(state => ({ showMobile: !state.showMobile }))
    };

    onTClickDropdown = (event) => {
        event.preventDefault();
        this.setState(state => ({ showMobileDorpdown: !state.showMobileDorpdown }))
    };

    onTClickDesktopDropdown = (event) => {
        event.preventDefault();
        this.setState(state => ({ showDesktopDorpdown: !state.showDesktopDorpdown }))
    };


    render() {
        const { authUser, history } = this.props;
        const { width, showMobile, showMobileDorpdown, showDesktopDorpdown, show } = this.state;

        const isMainNav = width > MAX_MOBILE_SCREEN_WIDTH;

        return (
            <section id="nav">
                <nav
                    id="main-nav"
                    className={`navbar navbar-expand-lg navbar-light bg-light 
                    fixed-top scrolling-navbar px-0 ${!isMainNav ? 'show-mobile-nav' : ''} justify-content-between pl-20 pr-20`}
                >
                    {/* <div className="container"> */}
                        <div className="session-logo">
                            <Link to={HOME}>
                                <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                            </Link>
                        </div>
                        <div id="navbarContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item nav-item-border" >
                                    <HashLink to={`${LANDING.HOME}`} className="nav-link-mobile">
                                        Accueil
                                    </HashLink>
                                </li>

                                <li className="nav-item nav-item-border" >
                                    <HashLink to={`${LANDING.PASS_DETAILS}`} className="nav-link-mobile">
                                        Blog
                                    </HashLink>
                                </li>
                                <li className="nav-item">
                                    <Dropdown isOpen={showDesktopDorpdown} toggle={(event) => this.onTClickDesktopDropdown(event)} className="nav-item-border">
                                        <DropdownToggle style={{ background: "none", border: "none", boxShadow: "none", color: "#464D69", padding: "0.70rem 1rem", fontSize: "inherit", fontWeight: "bold" }}>
                                            Découvrir
                                            <img class={showDesktopDorpdown ? "inline-nav-arrow-final" : "inline-nav-arrow-initial"} src="https://sqy7rm.media.zestyio.com/Downward-Carat.svg" alt="Downward arrow"></img>
                                        </DropdownToggle>
                                        <DropdownMenu className="desktop-dropdown">
                                            <DropdownItem>
                                                <HashLink to={`${LANDING.DISCOVER}`}>
                                                    <a className="nav-link-mobile-sub">
                                                        Découvrir Microcap
                                                    </a>
                                                </HashLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <HashLink to={`${LANDING.DISCOVER}/#produits`}>
                                                    <a className="nav-link-mobile-sub">
                                                        Produits pour se financer
                                                    </a>
                                                </HashLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <HashLink to={`${LANDING.DISCOVER}/#investir`}>
                                                    <a className="nav-link-mobile-sub ">
                                                        Produits pour investir
                                                    </a>
                                                </HashLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <HashLink to={`${LANDING.DISCOVER}/#services`}>
                                                    <a className="nav-link-mobile-sub ">
                                                        Produits des Partenaires
                                                    </a>
                                                </HashLink>
                                            </DropdownItem>

                                            <DropdownItem>
                                                <HashLink to={`${LANDING.DISCOVER}/#pass-section`}>
                                                    <a className="nav-link-mobile-sub">
                                                        Pass Microcap
                                                    </a>
                                                </HashLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <HashLink to={`${LANDING.DISCOVER}/#team-section`}>
                                                    <a className="nav-link-mobile-sub">
                                                        L'équipe
                                                    </a>
                                                </HashLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <HashLink to={`${LANDING.DISCOVER}/#team-section`}>
                                                    <a className="nav-link-mobile-sub">
                                                        Point d'accueil
                                                    </a>
                                                </HashLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </li>
                                <li className="nav-item nav-item-border" >
                                    <HashLink to={`${LANDING.PASS_DETAILS}`} className="nav-link-mobile">
                                        Pass microcap
                                    </HashLink>
                                </li>
                                <li className="nav-item nav-item-border">
                                    <Link to={LANDING.GALERY_PROJECT} className="nav-link-mobile">
                                        Gallerie projets
                                    </Link>
                                </li>
                                <li className="nav-item nav-item-border">
                                    <HashLink to={`${LANDING.AGENTS}`} className="nav-link-mobile">
                                        Réseau d'agents
                                    </HashLink>
                                </li>
                                <li className="center-hor-ver">
                                    {authUser.data ? (
                                        <Link
                                            to={HOME}
                                            className="mr-2 btn-inflated font-size-inherit outlined">
                                            Espace personnel
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                to={AUTH.LOGIN}
                                                className="mr-2 btn-inflated font-size-inherit">
                                                Se connecter
                                            </Link>
                                            <Link
                                                to={'#'}
                                                onClick={() => this.setState({ show: true })}
                                                className="mr-2 btn-inflated font-size-inherit"
                                            >
                                                Microcap en 2 cliques
                                            </Link>
                                        </>
                                    )}
                                </li>
                            </ul>{/*<a className="btn btn-primary btn-rounded my-0"
                            href="https://templateflip.com/templates/material-landing" target="_blank">Download</a> */}
                        </div>
                    {/* </div> */}
                </nav>

                <nav
                    className={`bg-light ${!isMainNav ? 'show-mobile-nav' : ''}`}
                    id="mobile-nav">
                    <div className="row justify-content-between">
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
                                    <li className="nav-item" style={{ marginRight: "30px" }}>
                                        <HashLink to={`${LANDING.PASS_DETAILS}`}>
                                            <a
                                                href="#"
                                                className="nav-link-mobile"
                                                onClick={(event) => this.onTClickDropdown(event)}
                                            >
                                                Découvrir
                                                <i className={`drop-arrow ti-angle-${showMobileDorpdown ? 'up' : 'down'}`} />
                                            </a>
                                            <SlideDown className={'second-dropdown-mobile'}>
                                                {showMobileDorpdown ? (
                                                    <div id="dropdown-mobile-center">
                                                        <ul>
                                                            <li className="nav-item nav-item-border">
                                                                <a className="nav-link-mobile ml-30" href="#">
                                                                    Produits pour se financer
                                                                </a>
                                                            </li>
                                                            <li className="nav-item nav-item-border">
                                                                <a className="nav-link-mobile ml-30" href="#">
                                                                    Produits pour investir
                                                                </a>
                                                            </li>
                                                            <li className="nav-item nav-item-border">
                                                                <a className="nav-link-mobile ml-30" href="#">
                                                                    Produits des Partenaires
                                                                </a>
                                                            </li>
                                                            <li className="nav-item nav-item-border">
                                                                <a className="nav-link-mobile ml-30" href="#">
                                                                    Pass Microcap
                                                                </a>
                                                            </li>
                                                            <li className="nav-item nav-item-border">
                                                                <a className="nav-link-mobile ml-30" href="#team-section">
                                                                    L'équipe
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>) : null}
                                            </SlideDown>
                                        </HashLink>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{ marginRight: "30px" }}>
                                        <HashLink to={`${LANDING.PASS_DETAILS}`}>
                                            <a className="nav-link-mobile" href="#">
                                                Pass microcap
                                            </a>
                                        </HashLink>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{ marginRight: "30px" }}>
                                        <Link to={LANDING.GALERY_PROJECT}>
                                            <a className="nav-link-mobile" href="#">Gallerie projets</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{ marginRight: "30px" }}>
                                        <HashLink to={`${LANDING.AGENTS}`}>
                                            <a className="nav-link-mobile" href="#">Réseau d'agents</a>
                                        </HashLink>
                                    </li>
                                    <li>
                                        {authUser.data ? (
                                            <Link
                                                to={HOME}
                                                className="mr-2 btn-inflated font-size-inherit outlined">
                                                Espace personnel
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    to={AUTH.LOGIN}
                                                    className="mr-2 btn-inflated font-size-inherit">
                                                    Se connecter
                                                </Link>
                                                <Button
                                                    style={{ color: 'white' }}
                                                    onClick={() => this.setState({ show: true })}
                                                    className="mr-2 btn-inflated font-size-inherit"
                                                >
                                                    Microcap en 2 cliques
                                                </Button>
                                            </>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </SlideDown>
                </nav>
                <TellUs
                    show={show}
                    history={this.props.history}
                    onClose={() => this.setState({ show: false })}
                />
            </section>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps, {})(withRouter(DiscoverMenu));
