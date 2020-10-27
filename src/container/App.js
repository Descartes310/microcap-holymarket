/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
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
    AsyncTermsConditionComponent,
    AsyncBranchList,
    AsyncBranchCreate, AsyncEcommerceDashboardComponent
} from 'Components/AsyncComponent/AsyncComponent';

//Auth0
import Auth from '../Auth/Auth';

// callback component
import Callback from "Components/Callback/Callback";
import {AUTH, HOME, NETWORK} from "../urls/frontendUrl";
import {setAuthUser, loginIntoStore, disableAppLoading} from 'Actions';
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {getAuthToken} from "Helpers/tokens";
import {isUserIntoStoreValid} from "Helpers/helpers";
import RequestGlobalLoader from "Components/RequestGlobalLoader";
import Branch from "Models/Branch";
import Can, {AbilityContext} from "Permissions/Can";
import Ecommerce from 'Routes/ecommerce';

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
        // console.log("match.url => ", match.url);

        return (
            <>
                {appLoading ? (
                    <RctPageLoader />
                ) : (
                    <RctThemeProvider>
                        <NotificationContainer />
                        <RequestGlobalLoader />
                        <Router>
                                {_isUserIntoStoreValid ? (
                                    <Switch>
                                        {/*<Route exact path={'/jun'} component={Ecommerce} />*/}


                                        {/*<Route exact path={HOME} render={() => <p>Home page</p>} />*/}
                                        <Route exact path={HOME} component={AsyncEcommerceDashboardComponent} />

                                        <Route exact path={NETWORK.CREATE} component={AsyncBranchCreate} />
                                        <Route exact path={NETWORK.LIST} component={AsyncBranchList} />
                                        {/*<Route path={'/'} render={() => <p>Home page</p>} />*/}
                                        <Redirect to={HOME} />
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
