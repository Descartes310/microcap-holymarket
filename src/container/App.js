/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Horizontal Layout
import HorizontalLayout from './HorizontalLayout';

//Agency Layout
import AgencyLayout from './AgencyLayout';

//Main App
import RctDefaultLayout from './DefaultLayout';

// boxed layout
import RctBoxedLayout from './RctBoxedLayout';

// CRM layout
import CRMLayout from './CRMLayout';

// app signin
import AppSignIn from './../routes/session/login';
import AppSignUp from './../routes/session/register';
import ResetPassword from './../routes/session/forgot-password/ResetPassword';
import SendResetPasswordLink from './../routes/session/forgot-password/SendResetPasswordLink';

// async components
import {
    AsyncSessionLockScreenComponent,
    AsyncSessionForgotPasswordComponent,
    AsyncSessionPage404Component,
    AsyncSessionPage500Component,
    AsyncTermsConditionComponent
} from 'Components/AsyncComponent/AsyncComponent';

//Auth0
import Auth from '../Auth/Auth';

// callback component
import Callback from "Components/Callback/Callback";
import {AUTH, HOME} from "../services/frontendRoute";
import {setAuthUser, loginIntoStore, disableAppLoading} from 'Actions';
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {getAuthToken} from "Helpers/tokens";
import {isUserIntoStoreValid} from "Helpers/helpers";
import RequestGlobalLoader from "Components/RequestGlobalLoader";

//Auth0 Handle Authentication
const auth = new Auth();

const handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
};

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: AUTH.LOGIN,
                        state: { from: props.location }
                    }}
                />}
    />;

class App extends Component {
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

        return (
            <>
                {appLoading ? (
                    <RctPageLoader />
                ) : (
                    <RctThemeProvider>
                        <NotificationContainer />
                        <RequestGlobalLoader />
                        <>
                            {_isUserIntoStoreValid ? (
                                <Switch>
                                    <InitialPath
                                        path={`${match.url}app`}
                                        authUser={authUser.data}
                                        component={RctDefaultLayout}
                                    />
                                    {/*<Route path="/horizontal" component={HorizontalLayout} />
                                    <Route path="/agency" component={AgencyLayout} />
                                    <Route path="/boxed" component={RctBoxedLayout} />*/}
                                    <Route path="/dashboard" component={CRMLayout} />
                                    {/*<Route path="/session/login" component={AsyncSessionLoginComponent} />*/}
                                    {/*<Route path="/session/register" component={AsyncSessionRegisterComponent} />*/}
                                    <Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent} />
                                    <Route
                                        path="/session/forgot-password"
                                        component={AsyncSessionForgotPasswordComponent}
                                    />
                                    <Route path="/session/404" component={AsyncSessionPage404Component} />
                                    <Route path="/session/500" component={AsyncSessionPage500Component} />
                                    <Route path="/terms-condition" component={AsyncTermsConditionComponent} />
                                    <Route path="/callback" render={(props) => {
                                        handleAuthentication(props);
                                        return <Callback {...props} />
                                    }} />

                                    {/*<InitialPath
                                     path={'/'}
                                     authUser={authUser.data}
                                     component={RctDefaultLayout}
                                 />*/}

                                    {/*<Redirect from={HOME} to={'/app/dashboard/ecommerce'} />*/}

                                    <Redirect to={'/app/dashboard/ecommerce'} />
                                </Switch>
                            ) : (
                                <Switch>
                                    {/*<Route path={HOME} component={AppSignIn} />*/}
                                    <Route path={AUTH.LOGIN} component={AppSignIn} />
                                    <Route path={AUTH.REGISTER} component={AppSignUp} />
                                    <Route path={AUTH.RESET_PASSWORD} component={ResetPassword} />
                                    <Route path={AUTH.FORGOT_PASSWORD} component={SendResetPasswordLink} />

                                    <Redirect to={AUTH.LOGIN} />
                                </Switch>
                            )}
                        </>
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
