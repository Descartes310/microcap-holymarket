import React from 'react';
import { Badge } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import { RctCard, RctCardContent } from 'Components/RctCard';

const BecomeMember = () => {
    return (
       <Typography component="div" style={{ padding: 8 * 3 }}>
           <div id="services" data-aos="fade-up" style={{ padding: '2vh 10vw' }}>
                <div className='container'>
                    <p data-aos="fade-left" className='text-center mt-40 mb-70' style={{ fontSize: '1.2em' }}>
                        Une démarche en trois points chacun Simple et rapide
                    </p>
                    <div className="row item-block">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <RctCard>
                                    <RctCardContent>
                                        <div className="client-post">
                                            <div className="center-holder center-hor-ver client-thumb mb-20">
                                                <div className="img-block first">
                                                    <img
                                                        alt="client"
                                                        src={require(`Assets/img/x4.jpg`)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="client-content text-center">
                                                <h4 className="fw-bold text-capitalize">1. S'incrire sur la plateforme</h4>
                                            </div>
                                        </div>
                                    </RctCardContent>
                                </RctCard>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <RctCard>
                                    <RctCardContent>
                                        <div className="client-post">
                                            <div className="center-holder center-hor-ver client-thumb mb-20">
                                                <div className="img-block second">
                                                    <img
                                                        alt="client"
                                                        src={require(`Assets/img/x2.jpg`)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="client-content text-center">
                                                <h4 className="fw-bold text-capitalize">2. Souscrire à un PASS MicroCap</h4>
                                            </div>
                                        </div>
                                    </RctCardContent>
                                </RctCard>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <RctCard>
                                    <RctCardContent>
                                        <div className="client-post">
                                            <div className="center-holder center-hor-ver client-thumb mb-20">
                                                <div className="img-block third">
                                                    <img
                                                        alt="client"
                                                        src={require(`Assets/img/x3.jpg`)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="client-content text-center">
                                                <h4 className="fw-bold text-capitalize">3. Souscrire à un produit d'épargne MicroCap</h4>
                                            </div>
                                        </div>
                                    </RctCardContent>
                                </RctCard>
                            </div>
                        </div>
                    </div>

                    {/* <p data-aos="fade-left" className='text-center mt-20' style={{ fontSize: '1.2em' }}>
                        MicroCap négocie avec des partenaires financiers la distribution sur la plateforme de 
                        leurs produits d'épargne, à la condition que l'épargne collectée soit essentiellement 
                        réservée au financement des projets de la plateforme MicroCap. Notre conventionnement 
                        apporte à l'épargnant une confiance et une transparence jusqu'à présent inégalées grâce 
                        à la possibilité que nous donnons à l'épargnant de décider sur quels entrepreneurs et 
                        sur quels projets placer son épargne
                    </p> */}

                    <p data-aos="fade-left" className='text-center mt-40 mb-70' style={{ fontSize: '1.2em' }}>
                        Rejoignez le mouvement, qui que vous soyez, il y’a au moins une raison pour rejoindre notre réseau
                    </p>
                    <p style={{ fontSize: '1.2em' }}>
                        <Badge className="mb-10 mr-10" href="#" color="warning">1</Badge>
                        Constituer une épargne pour un projet personnel, petit ou grand
                    </p>
                    <p style={{ fontSize: '1.2em' }}>
                        <Badge className="mb-10 mr-10" href="#" color="warning">2</Badge>
                        Constituer des fonds propres pour un projet entrepreneurial
                    </p>
                    <p style={{ fontSize: '1.2em' }}>
                        <Badge className="mb-10 mr-10" href="#" color="warning">3</Badge>
                        Apporter son soutien au projet d'un proche
                    </p>
                    <p style={{ fontSize: '1.2em' }}>
                        <Badge className="mb-10 mr-10" href="#" color="warning">4</Badge>
                        Rechercher des associés
                    </p>
                    <p style={{ fontSize: '1.2em' }}>
                        <Badge className="mb-10 mr-10" href="#" color="warning">5</Badge>
                        Soutenir l'engagement de MicroCap et accélérer notre impact social.
                    </p>

                    {/* <div className="row center-hor-ver mt-70 flex-column intro">
                        <h3 className="font-weight-bold text-black text-center underline-title mb-50" data-aos="fade-right" style={{ fontSize: '1.5em' }}>
                            Nos produits d'épargne
                        </h3>
                    </div>

                    <div data-aos="fade-left" className='row mt-50'>
                        <p className='w-50 text-center font-weight-bold'>INIT REFLEQ</p>
                        <p className='w-50 text-center font-weight-bold'>MUPECI</p>
                        <p className='w-50 text-center font-weight-bold'>WAF</p>
                        <p className='w-50 text-center font-weight-bold'>SERHAB</p>
                        <p className='w-50 text-center font-weight-bold'>MCM INIT</p>
                        <p className='w-50 text-center font-weight-bold'>OPTION MICROCAP</p>
                    </div> */}
                </div>
            </div>
       </Typography>
    );
 }

export default BecomeMember;