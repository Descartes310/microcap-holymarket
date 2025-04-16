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
import React, {useEffect} from 'react';
import PageFlowService from 'Services/page-flows';
import {HOME, AUTH, LANDING} from "Url/frontendUrl";
import ProspectusDetailPage from 'Routes/custom/fundings/investments/prospectus/details'

const ProspectusDetails = (props) => {

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
            <div style={{ background: 'white', overflowX: 'hidden', overflowY: 'auto', height: '100%', left: 0, position: 'fixed', right: 0 }}>
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
                <div className="session-inner-wrapper" style={{ marginTop: '10%', paddingBottom: '5%' }}>
                    <div className="container">
                        <ProspectusDetailPage notSharable={true} />
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

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(ProspectusDetails));
