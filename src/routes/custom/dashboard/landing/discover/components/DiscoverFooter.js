import React from 'react';
import {LANDING} from "Url/frontendUrl";
import { Link } from 'react-router-dom';
import {SocialFeedsWidget} from "Components/Widgets";
import ScrollToTopBtn from "Routes/custom/dashboard/landing/discover/components/ScrollToTop";

const DiscoverFooter = ({props}) => {
    return (
        <footer id="fh5co-footer" className="fh5co-bg pb-0" role="contentinfo">
            <div className="overlay" />
            <div className="container pb-40">
                <div className="row row-pb-md">
                    <div className="col-md-3 fh5co-widget">
                        <ul className="fh5co-footer-links">
                            <h3 className="mmb-sm-0">A propos de MicroCap</h3>
                            <p className="font-size-medium">
                                MicroCap est un service d’accompagnement des entrepreneurs proposé par: <strong>A+ Conseils SAS</strong>, 7 PL du 11 Novembre 1918, 93 000 BOBIGNY.
                            </p>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {/* <h3>Classes</h3> */}
                        <div className="row">
                            <div className="col-md-3 col-sm-4 col-xs-6">
                                <ul className="fh5co-footer-links">
                                    <h3 className="mmb-sm-0 mmt-sm-4">Tout MicroCap</h3>
                                    <li><Link to={LANDING.MISSION}><a><span className="ti-angle-right"/> Mission et valeur</a></Link></li>
                                    <li><Link to={LANDING.VALUES}><a><span className="ti-angle-right"/> Réseau Microcap</a></Link></li>
                                    <li><Link to={LANDING.SERVICES}><a><span className="ti-angle-right"/> Le service Microcap</a></Link></li>
                                    <li><Link to={LANDING.PIONIERS}><a><span className="ti-angle-right"/> Les pionniers</a></Link></li>
                                    <li><Link to={LANDING.AGENTS}><a><span className="ti-angle-right"/> Assistances</a></Link></li>
                                    <li><Link to={'#'}><a><span className="ti-angle-right"/> Blog</a></Link></li>
                                </ul>
                            </div>

                            <div className="col-md-3 col-sm-4 col-xs-6">
                                <ul className="fh5co-footer-links">
                                    <h3 className="mmb-sm-0 mmt-sm-4">Informations légales</h3>
                                    <li><Link to={LANDING.CGU}><a><span className="ti-angle-right"/> CGU</a></Link></li>
                                    <li><Link to={LANDING.CGU}><a><span className="ti-angle-right"/> CGV</a></Link></li>
                                    <li><Link to={LANDING.CGU}><a><span className="ti-angle-right"/> Mentions légales</a></Link></li>
                                </ul>
                            </div>

                            <div className="col-md-3 col-sm-4 col-xs-6">
                                <ul className="fh5co-footer-links">
                                    <h3 className="mmb-sm-0 mmt-sm-4">Suivez-nous</h3>
                                    <li><a><span className="ti-angle-right"/> Presse</a></li>
                                    <li><a><span className="ti-angle-right"/> News letter</a></li>
                                    <li className="no-link">
                                        <a> <span className="ti-angle-right"/> Réseaux sociaux</a>
                                        <div className="social-card-wrapper">
                                            <div className="row justify-content-center justify-content-sm-start row">
                                                {/*<div className="col-md-3">*/}
                                                <SocialFeedsWidget
                                                    type="facebook"
                                                    icon="ti-facebook"
                                                    className="icon-social icon-hover"
                                                    link="https://www.facebook.com/MicroCap-104224985150023/"
                                                />
                                                {/*</div>*/}
                                                {/*<div className="col-md-3">*/}
                                                <SocialFeedsWidget
                                                    type="twitter"
                                                    icon="ti-twitter"
                                                    wrapClassName="mx-2"
                                                    className="icon-social icon-hover"
                                                    link="https://twitter.com/MicrocapService"
                                                />
                                                {/*</div>*/}
                                                {/*<div className="col-md-3">*/}
                                                <SocialFeedsWidget
                                                    type="linkedin"
                                                    icon="ti-linkedin"
                                                    className="icon-social icon-hover"
                                                    link="https://www.linkedin.com/company/appmicrocap/"
                                                />
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-3 col-sm-4 col-xs-6 contact">
                                <ul className="fh5co-footer-links">
                                    <h3 className="mmb-sm-0 mmt-sm-4">Contact</h3>
                                    <li className="no-link mb-sm-2">
                                        <a
                                            href="mailto:contact@microcap.fr"
                                            className="m-0 d-inline-block icon-text center-ver">
                                            <i className="material-icons icon mr-2 icon-rounded-bg">mail</i>
                                            {/*<i className="icon ti-email mr-2 icon-rounded-bg" />*/}
                                            <span>Contact@microcap.fr</span>
                                        </a>
                                    </li>
                                    {/* <li className="no-link mt-2">
                                        <a
                                            href="tel:+330811030089"
                                            className="m-0 d-inline-block icon-text center-ver">
                                            <i className="material-icons icon mr-2 icon-rounded-bg">call</i>
                                            <span>+33 0811 030 089</span>
                                        </a>
                                    </li> */}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="row copyright">
                    <div className="col-md-12 text-center text-white py-25">
                        <h4>&copy; 2021 | All Rights Reserved.</h4>
                    </div>
                </div>
            </div>
            <ScrollToTopBtn />
        </footer >
    );
};

export default DiscoverFooter;
