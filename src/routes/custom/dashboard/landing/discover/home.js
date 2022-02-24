import React from 'react';
import Slider from "react-slick";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import slide21 from 'Assets/img/slide21.jpg';
import slide23 from 'Assets/img/slide23.jpg';
import { HashLink } from 'react-router-hash-link';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { Card, CardImg, CardText, CardBody, CardFooter } from 'reactstrap';
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";
import DiscoverVideo from "Routes/custom/dashboard/landing/discover/components/DiscoverVideo";
import { PIONIERS, SOLIDARITY, MONEY_MANAGEMENT, GETIN, PASS_DETAILS, AGENTS } from "Url/frontendUrl";

const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    draggable: true
};

const slides = [
    // {
    //     image: slide22,
    //     leftImage: true,
    //     title: 'La solidarité! une valeur essentielle chez MicroCap',
    //     description: 'MicroCap unit des personnes dans un sentiment d\'entraide financier, d\'assistance ou de collaboration gracieuse'
    // },
    {
        image: slide21,
        leftImage: false,
        title: 'La révolution des petits capitaux',
        description: 'Rejoignez le réseau de solidarité MicroCap, vos versements sont libres à partir de 3€ sur votre compte ESH auprès d’un établissement financier partenaire'
    },
    {
        image: slide23,
        leftImage: true,
        title: 'Microcap vous accompagne dans la réalisation de votre projet',
        description: 'Création ou développement d’entreprise, actionnariat, formation à l’entrepreneuriat. Inscrivez-vous et choississez l\'abonnement qui vous correspond parminos PASS'
    }
]

const Home = (props) => {
    return (
        <DiscoverLayout>
            <div className="session-inner-wrapper video-player-wrapper">
                <div style={{ marginTop: '8.5vh' }}>
                    <Slider {...settings}>
                        {slides.map((slide) => (
                            <div>
                                <div style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: 'cover', height: '52vh',
                                    display: 'flex',
                                    justifyContent: slide.leftImage ? 'flex-end' : 'flex-start'
                                }}
                                >
                                    <div className={`slide-content-left ${slide.leftImage && ", slide-content-right"}`}>
                                        <h1><span>{slide.title}</span></h1>
                                        <p>{slide.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="showcase-card-block d-flex flex-column pb-0" style={{ backgroundImage: `url(${require('Assets/img/bg-shape-gray.png')})` }}>
                    <div className="row mb-70 flex-column intro">
                        <h2 className="font-weight-bold text-black text-left" data-aos="fade-right">
                            Ce que nous faisons
                        </h2>
                        <p data-aos="fade-left" className='mt-20 col-md-6'>
                            MicroCap Invente le financement participatif par cautionnement mutuel. 
                            Un concept de mutualisation des risques au sein d’une communauté d’entrepreneurs 
                            pour faciliter le financement de leurs projets d’entreprise : création, 
                            développement redressement, retournement.
                        </p>
                    </div>

                    <div className="row mb-70 flex-column intro align-items-end">
                        <h2 className="font-weight-bold text-black" data-aos="fade-right">
                            Qui nous sommes
                        </h2>
                        <p data-aos="fade-right" className='mt-20 col-md-6 text-right'>
                            MicroCap est une société d’investissement à impact qui finance les entrepreneurs en 
                            situation de fragilité : freelances, bénéficiaires des minima sociaux, étudiants, 
                            migrants, entrepreneurs ruraux ou des quartiers défavorisés, projets se développant sur 
                            un double territoire nord - sud …
                        </p>
                    </div>

                    <div className="row mb-70 flex-column intro">
                        <h2 className="font-weight-bold text-black text-left" data-aos="fade-right">
                            Notre mission
                        </h2>
                        <p data-aos="fade-left" className='mt-20 col-md-6'>
                            Notre mission est de démocratiser l’entrepreneuriat et d’en faire une voie pertinente pour 
                            l’insertion ou la réinsertion professionnelle. Dans la réalisation de cette mission, nous 
                            avons acquis la conviction selon laquelle l’entrepreneuriat pour tous passe d’abord et 
                            surtout, par le financement pour tous. La solution MicroCap est le financement participatif 
                            par cautionnement mutuel, un concept innovant basé sur un modèle contributif qui donne sa 
                            chance à toute personne capable de bonne volonté et de sérieux, contrairement au modèle sélectif, 
                            moins inclusif et plus rependu. 
                        </p>
                    </div>
                </div>

                <div className="product-section-title" id='produits'>
                    <h2
                        data-aos="fade-down"
                        style={{ fontSize: '3em' }}
                        className="font-weight-bold text-white text-center"
                    >
                        Nous sommes là pour vous
                    </h2>
                </div>

                <div className="showcase-card-block d-flex flex-column pb-0" style={{ paddinTop: '2vh' }}>
                    <div className="row mb-70 flex-column intro">
                        <p data-aos="fade-left" className='text-justify'>
                            Notre mission est de démocratiser l’entrepreneuriat et d’en faire une voie pertinente pour 
                            l’insertion ou la réinsertion professionnelle. Dans la réalisation de cette mission, nous 
                            avons acquis la conviction selon laquelle l’entrepreneuriat pour tous passe d’abord et 
                            surtout, par le financement pour tous. La solution MicroCap est le financement participatif 
                            par cautionnement mutuel, un concept innovant basé sur un modèle contributif qui donne sa 
                            chance à toute personne capable de bonne volonté et de sérieux, contrairement au modèle sélectif, 
                            moins inclusif et plus rependu. 
                        </p>
                    </div>

                    <div className="discover-content mt-30">
                        <ol className="custom-list row">
                            <li className='col-sm-6'>
                                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Devenir membre du réseau et agir avec MicroCap</p>
                            </li>
                            <li className='col-sm-6'>
                                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Booster votre épargne</p>
                            </li>
                            <li className='col-sm-6'>
                                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Financer votre projet</p>
                            </li>
                            <li className='col-sm-6'>
                                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Aller plus loin avec MicroCap</p>
                            </li>
                        </ol>
                    </div>
                </div>

                <div id="pass-section" className="merox-services-area">
                    <div className="container">
                        <div className="row">
                            <div className="visibLeft col-xl-12 col-lg-12 wow fadeInLeft px-0">
                                <div className="services-box">
                                    <div className="single-services">
                                        <div className="services-content-box">Les services </div>
                                    </div>
                                    <div className="single-services">
                                        <div className="services-content-box">Les services </div>
                                    </div>
                                    <div className="single-services">
                                        <div className="services-content-box">Les services </div>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps, {})(injectIntl(Home));
