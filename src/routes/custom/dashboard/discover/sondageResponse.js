import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from 'react';
import headerImg from 'Assets/img/image_revolution.jpg';
import { createSondage, setRequestGlobalAction } from 'Actions';
import DiscoverLayout from "Routes/custom/dashboard/discover/DiscoverLayout";
import {
    Card,
    CardText,
    CardBody,
    CardFooter
} from 'reactstrap';
import {
    AUTH, DISCOVER, SERVICES
} from "Url/frontendUrl";

const SondageResponse = (props) => {
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
                    {props.match.params.id == 1 ?
                        <div className="col-xs-12 col-sm-12 col-md-12 mb-30" data-aos="fade-down" data-aos-duration="300">
                            <Card>
                                <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                        <p>
                                            Nous vous proposons nos services d'accompagnement individuel à la création d'entreprise
                                        </p>
                                    </CardText>
                                </CardBody>
                                <CardFooter className="border-0 center-hor-ver">
                                    <Button variant="contained" className="btn-primary mr-2" onClick={() => props.history.push(AUTH.LOGIN)}>
                                        Continuer
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        :
                        props.match.params.id == 2 ?
                            <div className="col-xs-12 col-sm-12 col-md-12 mb-30" data-aos="fade-down" data-aos-duration="300">
                                <Card>
                                    <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                            <p>
                                                Vous préferez la sérénité d'un salaire chaque mois et vous avez un projet personnel à réaliser ?
                                                Soutenez ceux qui crée les emplois en fructifiant votre épargne sur Microcap. Surtout choisissez à qui et à quoi
                                                sert votre argent, une transparence inégalée.
                                            </p>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter className="border-0 center-hor-ver">
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => props.history.push(AUTH.REGISTER)}>
                                            Je m'inscris
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                            :
                            <div className="col-xs-12 col-sm-12 col-md-12 mb-30" data-aos="fade-down" data-aos-duration="300">
                                <Card>
                                    <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                            <p>
                                                Bravo! vous pouvez rejoindre MicroCap, le réseau international d'entrepreneurs solidaires. le programme
                                                d'incubation proposée va vous préparer à présenter et à financer votre projet à votre rythme sur une durée comprise entre 3 et 36 mois.
                                            </p>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter className="border-0 center-hor-ver">
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => props.history.push(DISCOVER)}>
                                            Découvrir Microcap
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                    }
                </div>
            </div>
        </DiscoverLayout >
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(SondageResponse));
