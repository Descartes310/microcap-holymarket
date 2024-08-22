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
import {HOME, AUTH, LANDING} from "Url/frontendUrl";
import { FormGroup, Button } from 'reactstrap';

const VoteRecap = (props) => {

    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    const onDiscoverClick = () => {
        props.history.push(LANDING.HOME);
    };

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
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Vous n'êtes pas membre du réseau MicroCap</p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Votre vote = 1 like</p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>10 likes = 1 voix</p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Merci de votre participation</p>
                                        <FormGroup className="mb-25 row">
                                            <Button
                                                color="primary"
                                                className="w-100 ml-0 mt-15 text-white"
                                                onClick={() => {
                                                    window.location.href = HOME;
                                                }}
                                            >
                                                Terminer
                                            </Button>
                                            {/* <Button
                                                color="primary"
                                                className="w-100 ml-0 mt-15 text-white"
                                                onClick={() => {

                                                }}
                                            >
                                                Voter et rejoindre MicroCap
                                            </Button> */}
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
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(VoteRecap));
