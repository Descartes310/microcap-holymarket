
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { injectIntl } from "react-intl";
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { AUTH, LANDING } from "../../../urls/frontendUrl";
import { createSondage, setRequestGlobalAction } from 'Actions';
import { Card, CardText, CardBody, CardFooter } from 'reactstrap';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const TellUs = (props) => {
    const [response, setResponse] = useState(null);
    const [show, setShow] = useState(false);


    const onSubmitSondage = (response, index) => {
        props.setRequestGlobalAction(true);
        createSondage({ response }).then(data => {
            // props.history.push(joinUrlWithParamsId(SONDAGE_SECOND, index));
            setResponse(index);
        }).finally(() => {
            props.setRequestGlobalAction(false)
        })
    }
    return (
        <QueueAnim type="bottom" duration={2000}>
            <Dialog
                open={(props.search && response == null) || props.show}
                fullWidth
                maxWidth={'lg'}
                fullScreen={false}
                aria-labelledby="responsive-dialog-title"
                onClick={() => { props.onClose(); { setResponse([]); } }}
            >
                <DialogTitle>
                    <div className="row justify-content-end align-items-center">
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            onClick={() => { setResponse([]); setShow(false) }}
                        >
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="showcase-card-block" style={{ backgroundImage: `url(${require('Assets/img/bg-shape-gray.png')})`, padding: '10vh 10vw' }}>
                        <div className="row center-hor-ver mb-70 flex-column intro">
                            <h2 className="font-weight-bold text-black text-center" data-aos="fade-right">
                                Du 1<sup>er</sup> octobre 2022 au 15 decembre 2022
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
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmitSondage('NOT_FOR_ME', 1)}>
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
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmitSondage('ONE_AND_ONLY', 2)}>
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
                                        <Button variant="contained" className="btn-primary mr-2" onClick={() => onSubmitSondage('WORK_WITH_OTHERS', 3)}>
                                            Sélectionner
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={response ? response >= 1 : false}
                fullScreen={false}
                aria-labelledby="responsive-dialog-title"
                maxWidth={'lg'}
                onClick={() => { props.onClose(); { setResponse(null); } }}
                fullWidth
            >
                <DialogTitle>
                    <div className="row justify-content-end align-items-center">
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            onClick={() => { setResponse(null); setShow(false) }}
                        >
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="showcase-card-block" style={{ backgroundImage: `url(${require('Assets/img/bg-shape-gray.png')})`, padding: '5vh 10vw' }}>
                        {
                            response == 1 ?
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
                                response == 2 ?
                                    <div className="col-xs-12 col-sm-12 col-md-12 mb-30" data-aos="fade-down" data-aos-duration="300">
                                        <Card>
                                            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                <CardText style={{ fontSize: '1.1em', textAlign: 'center' }}>
                                                    <p>
                                                        Nous vous proposons notre offre SAICE, le Services d'Accompagnement Individuel à la Création d'Entreprise.
                                                        pour être recontacter par un conseiller à la création d’entreprise, écrire à : saice.support@aplus-conseils.fr
                                                    </p>
                                                </CardText>
                                            </CardBody>
                                            <CardFooter className="border-0 center-hor-ver">
                                                <Button variant="contained" className="btn-primary mr-2" onClick={() => setResponse(null)}>
                                                    Fermer
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
                                                <Button variant="contained" className="btn-primary mr-2" onClick={() => { props.history.push(LANDING.HOME); setResponse(null) }}>
                                                    Tout Microcap
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </QueueAnim>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(injectIntl(TellUs));
