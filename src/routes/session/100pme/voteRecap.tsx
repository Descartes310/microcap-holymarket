import React, { useState } from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import SystemService from 'Services/systems';
import AppBar from '@material-ui/core/AppBar';
import { FormGroup, Button } from 'reactstrap';
import Toolbar from '@material-ui/core/Toolbar';
import { setRequestGlobalAction } from 'Actions';
import {HOME, AUTH, LANDING, PME_PROJECT} from "Url/frontendUrl";

const VoteRecap = (props) => {

    const city = JSON.parse(localStorage.getItem('PME_CITY'));

    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    const onDiscoverClick = () => {
        props.history.push(LANDING.HOME);
    };

    const onSubmit = () => {
        const locality = localStorage.getItem('PME_LOCALITY');
        const city = JSON.parse(localStorage.getItem('PME_CITY'));
        const country = localStorage.getItem('PME_COUNTRY');
        const user = props.authUser;

        if(city && user && country) {
            props.setRequestGlobalAction(true);
            let data: any = {
                vote: 'VOTE', city_id: city.id, city_name: city.name, referral_code: user.referralId, country
            };

            if(locality) {
                data.locality = locality;
            }
            SystemService.createVote(data)
            .then(() => {
                localStorage.removeItem('PME_CITY')
                localStorage.removeItem('PME_LOCALITY')
                localStorage.removeItem('PME_COUNTRY')
                props.history.push(PME_PROJECT.VOTE_PRODUCT_END);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                props.setRequestGlobalAction(false);
            })
        }
    }

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to={HOME}>
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                    </Link>
                                </div>
                                <div className="center-hor-ver" style={{ marginRight: '10%' }}>
                                    <Button variant="contained" className="btn-light mr-2 p-10" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.signup" />
                                    </Button>
                                    <Button variant="contained" className="btn-primary mr-2 p-10" onClick={onDiscoverClick}>
                                        Tout Microcap
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="center-hor-ver session-body d-flex flex-column">
                                    <div className="session-head mb-10 text-center">
                                        <h1 className="p-20">Terminer mon vote</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-column">
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Vous n'avez pas de produit</p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Pour permettre a votre ville {city.name} de cumuler des voix, reserver un produit</p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>1 vote = 1 like</p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>10 likes = 1 voix</p>
                                        <FormGroup className="mb-25 row d-flex justify-content-around flex-column">
                                            <Button
                                                color="primary"
                                                className="col-sm-12 col-md-5 ml-0 mt-15 text-white"
                                                onClick={() => {
                                                   onSubmit();
                                                }}
                                            >
                                                Voter (pour un like)
                                            </Button>
                                            <Button
                                                color="primary"
                                                className="col-sm-12 col-md-5 ml-0 mt-15 text-white"
                                                onClick={() => {
                                                    props.history.push(PME_PROJECT.VOTE_OPTION);
                                                }}
                                            >
                                                Reserver (pour un max de voix)
                                            </Button>
                                        </FormGroup>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </QueueAnim>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { loading: requestGlobalLoader, authUser }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(VoteRecap));
