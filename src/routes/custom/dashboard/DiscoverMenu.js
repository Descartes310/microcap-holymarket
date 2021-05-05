import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AGENTS, AUTH, GALERY_PROJECT, HOME, PASS_DETAILS} from "Url/frontendUrl";
import AppConfig from "Constants/AppConfig";
import {Dropdown, DropdownToggle} from "reactstrap";
import {HashLink} from "react-router-hash-link";
import Button from "@material-ui/core/Button";
import IntlMessages from "Util/IntlMessages";


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


/*
Element to slide gets the following CSS:
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.4s ease 0s;
*/

/**
 * Like jQuery's slideDown function - uses CSS3 transitions
 * @param  {Node} elem Element to show and hide
 */
function slideDown(elem) {
    elem.style.maxHeight = '1000px';
    // We're using a timer to set opacity = 0 because setting max-height = 0 doesn't (completely) hide the element.
    elem.style.opacity   = '1';
}

/**
 * Slide element up (like jQuery's slideUp)
 * @param  {Node} elem Element
 * @return {[type]}      [description]
 */
function slideUp(elem) {
    elem.style.maxHeight = '0';
    once( 1, function () {
        elem.style.opacity = '0';
    });
}

/**
 * Call once after timeout
 * @param  {Number}   seconds  Number of seconds to wait
 * @param  {Function} callback Callback function
 */
function once (seconds, callback) {
    var counter = 0;
    var time = window.setInterval( function () {
        counter++;
        if ( counter >= seconds ) {
            callback();
            window.clearInterval( time );
        }
    }, 400 );
}

class DiscoverMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: getWidth()
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        const menuToggler = document.getElementById('menu-toggler');
        this.onTogglerClick(menuToggler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    resize = () => {
        this.setState({width: getWidth()})
    };

    onTogglerClick = (menuToggler) => {
        const mobileContent = document.getElementById('mobile-center');
        mobileContent.style.transition = "all 1s ease-in-out";
        let isActive = menuToggler.classList.contains('active');

        const f = !isActive ? slideUp : slideDown;
        f(mobileContent)
    };


    render() {
        // const width = getWidth();
        const { width } = this.state;
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
                            className="menu-toggler"
                            id="menu-toggler"
                            onClick={event => {
                                event.currentTarget.classList.toggle('active');
                                this.onTogglerClick(event.currentTarget);
                            }}
                        >
                            <div><span /></div>
                        </div>
                    </div>

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

                </nav>
            </section>
        );
    }
}

export default DiscoverMenu;
