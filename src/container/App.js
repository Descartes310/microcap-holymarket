/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

// app signin
import AppSignIn from './../routes/session/login';
import AppSignUp from './../routes/session/register';
import BranchActivation from './../routes/session/token';
import ResetPassword from './../routes/session/forgot-password/ResetPassword';
import SendResetPasswordLink from './../routes/session/forgot-password/SendResetPasswordLink';

// callback component
import {AUTH, DISCOVER, STORE} from "../urls/frontendUrl";
import {setAuthUser, loginIntoStore, disableAppLoading} from 'Actions';
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {getAuthToken} from "Helpers/tokens";
import {isUserIntoStoreValid} from "Helpers/helpers";
import RequestGlobalLoader from "Components/RequestGlobalLoader";
import {AbilityContext} from "Permissions/Can";
import Dashboard from 'Routes/custom/dashboard';
import PermissionAlertBox from "Components/PermissionAlertBox";
import {AsyncDiscover, AsyncStoreWrapper} from "Components/AsyncComponent/AsyncComponent";
import CanRoute from "Components/CanRoute";

class App extends Component {
    static contextType = AbilityContext;

    componentDidMount() {
        this.isNewUser();
    }

    /**
     * Check whether the current user is a new or not
     */
    isNewUser = () => {
        this.props
            .setAuthUser()
            .then(() => this.refreshTokens())
            .finally(() => this.props.disableAppLoading());
    };

    /**
     * Insert tokens data into store
     */
    refreshTokens = () => {
        const { accessToken, refreshToken, expiresIn, tokenType } = getAuthToken();
        if (refreshToken && accessToken)
            this.props.loginIntoStore({
                accessToken,
                tokenType,
                expiresIn,
                refreshToken,
            });
    };

    render() {
        const _isUserIntoStoreValid = isUserIntoStoreValid(this.props.authUser.data, this.props.tokens.data);
        const { location, match, authUser, appLoading } = this.props;
        //const _isUserIntoStoreValid = true;

        return (
            <>
                {appLoading ? (
                    <RctPageLoader />
                ) : (
                    <RctThemeProvider>
                        <NotificationContainer />
                        <RequestGlobalLoader />
                        <PermissionAlertBox />
                        <Router>
                                {_isUserIntoStoreValid ? (
                                    <Switch>
                                        <Route path={'/'} component={Dashboard} />
                                    </Switch>
                                ) : (
                                    <Switch>
                                        <Route exact path={DISCOVER} component={AsyncDiscover} />
                                        <Route path={AUTH.LOGIN} component={AppSignIn} />
                                        <Route path={AUTH.REGISTER} component={AppSignUp} />
                                        <Route path={AUTH.TOKEN} component={BranchActivation} />
                                        <Route path={AUTH.RESET_PASSWORD} component={ResetPassword} />
                                        <Route path={AUTH.FORGOT_PASSWORD} component={SendResetPasswordLink} />

                                        <CanRoute
                                            path={STORE.SELF}
                                            component={AsyncStoreWrapper}
                                            permissions={[]}
                                        />

                                        <Redirect to={AUTH.LOGIN} />
                                    </Switch>
                                )}
                        </Router>
                    </RctThemeProvider>
                )}
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser, tokens, appLoading }) => {
    return { tokens, authUser, appLoading };
};

export default connect(mapStateToProps, {setAuthUser, disableAppLoading, loginIntoStore})(App);
