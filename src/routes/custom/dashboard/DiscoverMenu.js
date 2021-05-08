import {Link, withRouter} from "react-router-dom";
import React, {Component} from 'react';
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import {HashLink} from "react-router-hash-link";
import {AGENTS, AUTH, GALERY_PROJECT, HOME, PASS_DETAILS, DISCOVER} from "Url/frontendUrl";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown} from 'reactstrap';

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
            showMobile: false,
            showMobileDorpdown: false,
            showDesktopDorpdown: false
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

    onTClickDropdown = (event) => {
        event.preventDefault();
        this.setState(state => ({showMobileDorpdown: !state.showMobileDorpdown}))
    };

    onTClickDesktopDropdown = (event) => {
        event.preventDefault();
        this.setState(state => ({showDesktopDorpdown: !state.showDesktopDorpdown}))
    };


    render() {
        const { width, showMobile, showMobileDorpdown, showDesktopDorpdown} = this.state;
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
                                <li className="nav-item">
                                <Dropdown isOpen={showDesktopDorpdown} toggle={(event)=> this.onTClickDesktopDropdown(event)} className="nav-item-border">
                                    <DropdownToggle style={{background: "none", border:"none", boxShadow: "none", color: "#464D69", padding: "0.70rem 1rem", fontSize: "inherit", fontWeight: "bold"}}>
                                        Découvrir
                                        <img class={showDesktopDorpdown ? "inline-nav-arrow-final" : "inline-nav-arrow-initial"} src="https://sqy7rm.media.zestyio.com/Downward-Carat.svg" alt="Downward arrow"></img>
                                    </DropdownToggle>
                                    <DropdownMenu className="desktop-dropdown">
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#produits`}>
                                                <a className="nav-link-mobile-sub">
                                                    Produits pour se financer
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#investir`}>
                                                <a className="nav-link-mobile-sub ">
                                                    Produits pour investir
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#services`}>
                                                <a className="nav-link-mobile-sub ">
                                                    Produits des Partenaires
                                                </a>
                                            </HashLink>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#pass`}>
                                                <a className="nav-link-mobile-sub">
                                                    Pass Microcap
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#pioniers`}>
                                                <a className="nav-link-mobile-sub">
                                                    L'équipe
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <HashLink to={`${DISCOVER}/#agents`}>
                                                <a className="nav-link-mobile-sub">
                                                    Point d'accueil
                                                </a>
                                            </HashLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                </li>
                                <li className="nav-item nav-item-border" >
                                    <HashLink to={`${PASS_DETAILS}`}>
                                        <a className="nav-link-mobile" href="#">
                                            Pass microcap
                                        </a>
                                    </HashLink>
                                </li>
                                <li className="nav-item nav-item-border">
                                    <Link to={GALERY_PROJECT}>
                                        <a className="nav-link-mobile" href="#">Gallerie projets</a>
                                    </Link>
                                </li>
                                <li className="nav-item nav-item-border">
                                    <HashLink to={`${AGENTS}`}>
                                        <a className="nav-link-mobile" href="#">Réseau d'agent</a>
                                    </HashLink>
                                </li>
                                <li>
                                    <Button
                                        variant="contained"
                                        className="btn-primary ml-30 mr-2"
                                        onClick={() => this.props.history.push(AUTH.LOGIN)}>
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
                                    <li className="nav-item" style={{marginRight:"30px"}}>
                                        <HashLink to={`${PASS_DETAILS}`}>
                                            <a
                                                href="#"
                                                className="nav-link-mobile"
                                                onClick={(event)=>this.onTClickDropdown(event)}
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
                                                            <a className="nav-link-mobile ml-30" href="#">
                                                                L'équipe
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>) : null}
                                            </SlideDown>
                                        </HashLink>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                        <HashLink to={`${PASS_DETAILS}`}>
                                            <a className="nav-link-mobile" href="#">
                                                Pass microcap
                                            </a>
                                        </HashLink>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                        <Link to={GALERY_PROJECT}>
                                            <a className="nav-link-mobile" href="#">Gallerie projets</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-border" style={{marginRight:"30px"}}>
                                        <HashLink to={`${AGENTS}`}>
                                            <a className="nav-link-mobile" href="#">Réseau d'agent</a>
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

export default withRouter(DiscoverMenu);
