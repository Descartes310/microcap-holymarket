import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from 'react';
import headerImg from 'Assets/img/image_revolution.jpg';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { createSondage, setRequestGlobalAction } from 'Actions';
import { getMainAgents, getMainPioniers } from "Actions/independentActions";
import DiscoverLayout from "Routes/custom/dashboard/discover/DiscoverLayout";
import DiscoverVideo from "Routes/custom/dashboard/discover/components/DiscoverVideo";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardFooter
} from 'reactstrap';
import {
    joinUrlWithParamsId, SERVICES, SONDAGE_SECOND
} from "Url/frontendUrl";

const SondageFirst = (props) => {

    const onSubmit = (response, index) => {
        props.setRequestGlobalAction(true);
        createSondage({ response }).then(data => {
            console.log(joinUrlWithParamsId(SONDAGE_SECOND, index))
            props.history.push(joinUrlWithParamsId(SONDAGE_SECOND, index));
        }).finally(() => {
            props.setRequestGlobalAction(false)
        })
    }
    return (
        <DiscoverLayout>
            <div className="session-inner-wrapper video-player-wrapper">
                {/*<Parallax className="custom-class" y={[-50, 50]}>*/}
                <div className="intro-banner" style={{ backgroundImage: `url(${headerImg})` }}>
                    <div className="revolution">
                        {/*TODO: ADD IMAGE HERE*/}
                        <img src={require('Assets/img/large/revolution.png')} alt="" className="img-fluid" />
                        {/*<h4>La révolution des petits capitaux</h4>*/}
                    </div>
                    <p>
                        Rejoignez le  <b>réseau de solidarité MicroCap</b>, vos versements sont libres à partir de 3€ sur votre <Link to={SERVICES} style={{ color: 'black', fontSize: '1.1em', fontWeight: 'bold' }}>compte ESH</Link> auprès d’un établissement financier partenaire
                    </p>
                </div>

                <div className="showcase-card-block" style={{ backgroundImage: `url(${require('Assets/img/bg-shape-gray.png')})`, padding: '5vh 10vw' }}>
                    <div className="row center-hor-ver mb-70 flex-column intro">
                        <h2 className="font-weight-bold text-black text-center" data-aos="fade-right">
                            Du 1<sup>er</sup> octobre 2021 au 15 novembre 2021
                        </h2>
                        <p data-aos="fade-left" className="text-center">Participer à notre appel à projet pour une dotation financière pouvant atteindre jusqu'à 50 000€ </p>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="300">
                            <Card>
                                <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                        <p>L'entrepreneuriat ce n'est pas pour moi, mais j'ai un projet personnel </p>
                                    </CardText>
                                </CardBody>
                                <CardFooter className="border-0 center-hor-ver">
                                    <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmit('NOT_FOR_ME', 1)}>
                                        Sélectionner
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="500">
                            <Card>
                                <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                        <p>Je suis solitaire, 6 à 24 mois pour une levée des fond malgré le résultat incertain, ça me conviennent </p>
                                    </CardText>
                                </CardBody>
                                <CardFooter className="border-0 center-hor-ver">
                                    <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmit('ONE_AND_ONLY', 2)}>
                                        Sélectionner
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 mb-30" data-aos="fade-down" data-aos-duration="700">
                            <Card>
                                <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                        <p>L'accompagnement au sein du réseau solidaire MicroCap pour constituer les fonds dont j'ai besoin peut me 
                                            prendre entre 3 et 36 Mois. Mais pour un résultat 100% assuré, je préfère ce choix</p>
                                    </CardText>
                                </CardBody>
                                <CardFooter className="border-0 center-hor-ver">
                                    <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmit('WORK_WITH_OTHERS', 3)}>
                                        Sélectionner
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </DiscoverLayout >
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(SondageFirst));
