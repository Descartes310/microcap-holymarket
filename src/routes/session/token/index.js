import { Input } from "reactstrap";
import { connect } from "react-redux";
import QueueAnim from 'rc-queue-anim';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useQuery } from "Helpers/helpers";
import { Link } from 'react-router-dom';
import { AUTH, HOME, DISCOVER } from "../../../urls/frontendUrl";
import AppConfig from 'Constants/AppConfig';
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IntlMessages from "Util/IntlMessages";
import { NotificationManager } from "react-notifications";
import { activateBranch, setRequestGlobalAction } from "Actions";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

const BranchActivation = ({ setRequestGlobalAction }) => {
    const query = useQuery(useLocation);
    const defaultToken = query.get('token');

    const [token, setToken] = useState(defaultToken ? defaultToken : '');
    const [finished, setFinished] = useState(false);

    const onSubmit = () => {
        setRequestGlobalAction(true);
        const data = {
            token
        };
        activateBranch(data)
            .then(() => {
                NotificationManager.success("Branche activé avec succès");
                setFinished(true);
            })
            .catch(() => NotificationManager.error("Token invalide. Veuillez re-essayer"))
            .finally(() => setRequestGlobalAction(false));
    };

    /**
     * On User Sign Up
     */
    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    /**
     * On navigate to Discover Microcap
     */
    const onDiscoverClick = () => {
        props.history.push(DISCOVER);
    };


    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
                {/*<div className={'global-loader'}>
                    {loading && <LinearProgress />}
                </div>*/}
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to={HOME}>
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-8 col-lg-8 offset-md-2 offset-lg-2">
                                <div className="center-hor-ver session-body text-center">
                                    <div className="">
                                        <div className="session-head mb-10">
                                            <h2 className="font-weight-bold">
                                                <IntlMessages id="auth.login.title" values={{ name: AppConfig.brandName }} />
                                            </h2>
                                            <p className="mb-0">
                                                <IntlMessages id="auth.login.subTitle" />
                                            </p>
                                            {/* This text is just a work around to add the width of the form input */}
                                        </div>
                                        <div className="text-center">
                                            <div className="row justify-content-center mt-md-70">
                                                <div className="col-md-12 col-sm-12">
                                                    {finished ? (
                                                        <div>
                                                            <h2 className="text-success">
                                                                Branche activé avec succès
                                                            </h2>
                                                            <Link to={HOME}>
                                                                <Button
                                                                    type="button"
                                                                    size="large"
                                                                    color="primary"
                                                                    variant="contained"
                                                                    className="btn-block text-white w-100"
                                                                    style={{ margin: '20px' }}
                                                                >
                                                                    Connectez-vous ici
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                            <div>
                                                                <h2 className="">Activation de la branche</h2>

                                                                <div className="form-link bg-white px-3 py-20 my-30">
                                                                    <InputLabel className="text-left" htmlFor="url">
                                                                        Entrer le token que vous avez reçu
                                                                    </InputLabel>
                                                                    <Input
                                                                        type="text"
                                                                        value={token}
                                                                        className="form-control"
                                                                        onChange={event => setToken(event.target.value)}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    onClick={onSubmit}
                                                                    className="text-white bg-primary font-weight-bold mr-3"
                                                                >
                                                                    Activer la branche
                                                                </Button>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-muted">
                                            <IntlMessages id="auth.termOfService" values={{ name: AppConfig.brandName }} />
                                        </p>
                                        <p>
                                            <a target="_blank" href="#/terms-condition" className="text-muted">
                                                <IntlMessages id="common.termOfService" />
                                            </a>
                                        </p>
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

BranchActivation.propTypes = {

};

export default connect(() => { }, { setRequestGlobalAction })(BranchActivation);
