import React, { useState } from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import AppBar from '@material-ui/core/AppBar';
import { voteOptions } from './components/data';
import Toolbar from '@material-ui/core/Toolbar';
import { setRequestGlobalAction } from 'Actions';
import {HOME, AUTH, LANDING, PME_PROJECT} from "Url/frontendUrl";
import { FormGroup, Button } from 'reactstrap';
import SystemService from 'Services/systems';

const VoteOptionReserve = (props) => {

    const option = voteOptions.find(vo => vo.id == props.match.params.id);

    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    const onDiscoverClick = () => {
        props.history.push(LANDING.HOME);
    };

    const onSubmit = () => {
        const city = JSON.parse(localStorage.getItem('PME_CITY'));
        const user = props.authUser;

        if(option && city && user) {
            props.setRequestGlobalAction(true);
            SystemService.createVote({vote: option.value, city_id: city.id, city_name: city.name, referral_code: user.referralId})
            .then((response) => {
                props.history.push(`${PME_PROJECT.VOTE_RESERVE_RECAP}?city=${city.name}&code=${response.code}`);
                localStorage.removeItem('PME_CITY')
            }).catch((err) => {

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
                                        <h1 className="p-20">{option?.label}</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-column">
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>{option?.description}</p>
                                        <FormGroup className="mb-25 row">
                                            <Button
                                                color="primary"
                                                disabled={!option}
                                                className="w-100 ml-0 mt-15 text-white"
                                                onClick={() => {

                                                }}
                                            >
                                                En savoir plus
                                            </Button>
                                            <Button
                                                color="primary"
                                                disabled={!option}
                                                className="w-100 ml-0 mt-15 text-white"
                                                onClick={() => {
                                                    onSubmit();
                                                }}
                                            >
                                                Reserver un Ndjangui Deal
                                            </Button>
                                            <Button
                                                color="primary"
                                                disabled={!option}
                                                className="w-100 ml-0 mt-15 text-white"
                                                onClick={() => {

                                                }}
                                            >
                                                J'ai un code de réservation
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

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(VoteOptionReserve);
