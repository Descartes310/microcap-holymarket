import Slider from "react-slick";
import React, {useState} from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import slide21 from 'Assets/img/slide21.jpg';
import slide23 from 'Assets/img/slide23.jpg';
import SwipeableViews from 'react-swipeable-views';
import BecomeMember from "./components/tabs/BecomeMember";
import SaveBoosting from "./components/tabs/SaveBoosting";
import FinanceProject from "./components/tabs/FinanceProject";
import FarAwayWithMicrocap from "./components/tabs/FarAwayWithMicrocap";
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";

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
    {
        image: slide21,
        leftImage: false,
        title: 'La révolution des petits capitaux',
        description: "Rejoignez le réseau de solidarité MicroCap, vos versements sont libres à partir de 3€ sur votre compte ESH auprès d'un établissement financier partenaire"
    },
    {
        image: slide23,
        leftImage: true,
        title: 'Microcap vous accompagne dans la réalisation de votre projet',
        description: "Création ou développement d'entreprise, actionnariat, formation à l'entrepreneuriat. Inscrivez-vous et choississez l'abonnement qui vous correspond parminos PASS"
    }
]

const Home = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);

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

                <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '15vh 10vw', backgroundImage: `url(${require('Assets/img/bg-shape-gray.png')})` }}>
                    <div className='container'>

                        <div className="row mb-30 flex-column intro">
                            <h2 className="font-weight-bold text-black text-left underline" data-aos="fade-right">
                                Qui nous sommes
                            </h2>
                            <p data-aos="fade-right" className='mt-20 col-md-8'>
                                Nous sommes une société d'investissement à impact qui finance les entrepreneurs en situation de fragilité:
                                freelances, bénéficiaires des minima sociaux, étudiants, migrants, entrepreneurs ruraux ou des quartiers
                                défavorisés, projets se développant sur un double territoire nord-sud...
                            </p>
                        </div>

                        <div className="row mb-70 flex-column intro align-items-end">
                            <h2 className="font-weight-bold text-black text-left underline" data-aos="fade-right">
                                Notre mission
                            </h2>
                            <p data-aos="fade-left" className='mt-20 col-md-8'>
                                Démocratiser l'entrepreneuriat et en faire une voie pertinente pour l'insertion ou la réinsertion professionnelle. 
                                Dans la réalisation de cette mission, nous avons acquis la conviction selon laquelle l'entrepreneuriat pour tous 
                                passe d'abord et surtout, par le financement pour tous.
                            </p>
                        </div>

                        <div className="row mb-30 flex-column intro">
                            <h2 className="font-weight-bold text-black text-left underline" data-aos="fade-right">
                                Ce que nous proposons
                            </h2>
                            <p data-aos="fade-left" className='mt-20 col-md-12'>
                                MicroCap invente le financement participatif par cautionnement mutuel. Un concept de mutualisation des risques 
                                au sein d'une communauté d'entrepreneurs pour faciliter le financement de leurs projets d'entreprise surtout 
                                pendant les phases difficiles et peu suivies par des investisseursclassiques : idéation, création, redressement, retournement.
                                <br /><br />
                                Notre solution est basée sur un modèle contributif qui donne sa chance à toute personne capable de bonne volonté 
                                et de sérieux, contrairement au modèle ultra sélectif basé sur l'analyse technique, moins inclusif mais malheureusement 
                                plus rependu. Ce concept s'inspire d'une pratique courante en Afrique mais aussi existante en Europe: les tontines.
                                <br /><br />
                                La plateforme MicroCap permet à chaque utilisateur de développer et animer un réseau international de solidarité financière, 
                                bien au-delà du cercle familial et amical habituel, afin de faciliter les campagnes de financement participatif dans l'esprit du love money
                            </p>
                        </div>
                    </div>
                </div>

                <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '10vh 10vw' }}>
                    <div className='container'>
                        <div className="row center-hor-ver mb-70 flex-column intro">
                            <h2 className="font-weight-bold text-black text-center underline-title mb-50" data-aos="fade-right">
                                Réseau international de solidarité financière
                            </h2>
                            <p data-aos="fade-left" className='text-center mt-20'>
                                Notre réseau international de solidarité financière est, d'une part une réponse à plusieurs enjeux sociétaux
                                et d'autre part une contribution à trois objectifs du développement durable éditer par les nations unies.
                            </p>
                            <div className="table-responsive mt-25">
                                <table className="table table-hover table-bordered mb-0">
                                    <thead>
                                        <tr style={{ backgroundColor: '#ffb93a' }}>
                                            <th className='text-white'>
                                                <p>Enjeux sociétaux</p>
                                            </th>
                                            <th className='text-white'>
                                                <p>Contribution au développement durable</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>Créer du lien social</p>
                                            </td>
                                            <td>
                                                <p>Une solution créatrice d'emplois et porteuse de croissance économique (Objectif N°8)</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Développer la solidarité internationale</p>
                                            </td>
                                            <td>
                                                <p>Un vecteur de réduction des inégalités sociales : l'entrepreneuriat pour tous (Objectif N°10)</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Faciliter l'accès aux financements</p>
                                            </td>
                                            <td>
                                                <p>Un instrument pour la construction des partenariats inclusifs (Objectif N°17)</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product-section-title" id='produits'>
                    <h2
                        data-aos="fade-down"
                        style={{ fontSize: '3em' }}
                        className="font-weight-bold text-white text-center"
                    >
                        AGIR AVEC MICROCAP
                    </h2>
                </div>

                <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '10vh 10vw' }}>
                    <div className='container'>
                        <div className="row center-hor-ver mb-70 flex-column intro">
                            <h2 className="font-weight-bold text-black text-center underline-title mb-50" data-aos="fade-right">
                                Pour une finance vertueuse et inclusive ou devenir acteur d'une économie de proximité en tant que: 
                                actionnaire, client ou fournisseur engagé
                            </h2>
                        </div>
                    </div>

                    <div className="discover-content mt-30">
                        <Tabs
                            value={activeIndex}
                            onChange={(e, value) => setActiveIndex(value)}
                            textColor="primary"
                            indicatorColor="primary"
                            centered
                        >
                            <Tab label="Dévenir membre du réseau" />
                            <Tab label="Booster votre épargne" />
                            <Tab label="Financer votre projet" />
                            <Tab label="Aller plus loin avec MicroCap" />
                        </Tabs>
                        <SwipeableViews
                            axis={'x'}
                            index={activeIndex}
                            onChangeIndex={(index) => setActiveIntex(index)}
                        >
                            <BecomeMember />
                            <SaveBoosting />
                            <FinanceProject />
                            <FarAwayWithMicrocap />
                        </SwipeableViews>
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
