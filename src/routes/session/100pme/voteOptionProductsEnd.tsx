import React from 'react';
import { logout } from 'Actions';
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

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
            <div className='mb-50'></div>
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="center-hor-ver session-body d-flex flex-column">
                                    <div className="session-head mb-10 text-center">
                                        <h1 className="p-20">Merci de votre participation !</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-column">
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Vos votes ont rapportés des voix ou likes à la ville {JSON.parse(localStorage.getItem('PME_CITY'))?.name}. Merci de votre participations.</p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Vous pouvez maintenant vous connecter sur votre espace MicroCap pour profiter de tous nos services. </p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Votre login:  {props?.authUser?.email}</p>
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Votre mot de passe: déjà communiqué </p>
                                        <FormGroup className="mb-25 row">
                                            <Button
                                                color="primary"
                                                className="w-100 ml-0 mt-15 text-white"
                                                onClick={() => {
                                                    localStorage.removeItem('PME_CITY')
                                                    localStorage.removeItem('PME_LOCALITY')
                                                    localStorage.removeItem('PME_COUNTRY')
                                                    localStorage.removeItem('PME_MOTIVATION')
                                                    props.logout();
                                                    props.history.push(AUTH.LOGIN);
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

export default connect(mapStateToProps, { setRequestGlobalAction, logout })(injectIntl(VoteOptionProductsEnd));
