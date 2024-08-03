import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { setRequestGlobalAction } from 'Actions';
import React, {useEffect, useState} from 'react';
import PageFlowService from 'Services/page-flows';
import {HOME, AUTH, LANDING, LANDING_PAGE_FLOW} from "Url/frontendUrl";

const LandingPageFlow = (props) => {

    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(null);
    const [basePages, setBasePages] = useState([]);

    useEffect(() => {
        getBasePages();
        const token = new URLSearchParams(props.location.search).get("token");
        if(token) {
            findPage(token);
        }
    }, [props.location.search]);

    const getPages = (reference) => {
        props.setRequestGlobalAction(true);
        PageFlowService.getChild(reference)
        .then(response => {
            setPages(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getBasePages = () => {
        props.setRequestGlobalAction(true);
        PageFlowService.getBasePageFlows({})
        .then(response => {
            setBasePages(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const findPage = (reference) => {
        props.setRequestGlobalAction(true);
        PageFlowService.find(reference)
        .then(response => {
            setPage(response);
            getPages(response.reference)
        })
        .catch(err => {
            props.history.goBack();
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

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
                                        <h1 className="p-20">{ page ? page.label : 'Reservation d\'un plan CODEV' }</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-column">
                                        { page && (
                                            page.link ? (
                                                <div className='w-100' style={{ marginBottom: '5%' }}>
                                                    <p style={{ fontSize: '1.1rem' }}>
                                                        <span dangerouslySetInnerHTML={{__html: page.description}}></span>
                                                    </p>
                                                    <a
                                                        style={{
                                                            color: 'white',
                                                            display: 'block',
                                                            width: 'min-content',
                                                            background: '#008000bd',
                                                            padding: 10
                                                        }}
                                                        target='blank'
                                                        href={`${page.link}`}
                                                    >
                                                        Continuer
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="row w-100 d-flex justify-content-around">
                                                    { pages.map(page => (
                                                        <div className='p-10 col-sm-12 col-md-6 col-lg-4 text-center'>
                                                            <a
                                                                style={{
                                                                    color: 'white',
                                                                    display: 'block',
                                                                    background: '#ffb817',
                                                                    padding: 20
                                                                }}
                                                                href={`${LANDING_PAGE_FLOW}?token=${page.reference}`}
                                                            >
                                                                {page.label}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        )} 
                                        { pages.length <= 0 && (
                                            <div className="row w-100 d-flex justify-content-around">
                                                {
                                                    basePages.map(page => (
                                                        <div className='p-10 col-sm-12 col-md-6 col-lg-4 text-center'>
                                                            <a
                                                                style={{
                                                                    color: 'white',
                                                                    display: 'block',
                                                                    background: '#ffb817',
                                                                    padding: 20
                                                                }}
                                                                href={`${LANDING_PAGE_FLOW}?token=${page.reference}`}
                                                            >
                                                                {page.label}
                                                            </a>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(LandingPageFlow));
