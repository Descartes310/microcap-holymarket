import React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import AppBar from '@material-ui/core/AppBar';
import { FormGroup, Button } from 'reactstrap';
import Toolbar from '@material-ui/core/Toolbar';
import { setRequestGlobalAction } from 'Actions';
import {HOME, AUTH, LANDING} from "Url/frontendUrl";

const VoteOptionProductsEnd = (props) => {

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
                                        <h1 className="p-20">Merci de votre parcipation !</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-column">
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Vos votes ont rapportés des voix à la ville {JSON.parse(localStorage.getItem('PME_CITY'))?.name}. Merci de votre participations.</p>
                                        <FormGroup className="mb-25 row">
                                            <Button
                                                color="primary"
                                                className="w-100 ml-0 mt-15 text-white"
                                                onClick={() => {
                                                    localStorage.removeItem('PME_CITY')
                                                    localStorage.removeItem('PME_LOCALITY')
                                                    localStorage.removeItem('PME_COUNTRY')
                                                    window.location.href = HOME;
                                                }}
                                            >
                                                Continuer
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

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(VoteOptionProductsEnd));
