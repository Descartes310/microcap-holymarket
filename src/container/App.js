/**
 * App.js Layout Start Here
 */
import {
    AUTH,
    LANDING,
    LANDING_PAGE_FLOW,
    PAYMENT,
    PME_PROJECT,
    PUBLIC
} from "../urls/frontendUrl";
import {connect} from 'react-redux';
import React, {Component} from 'react';
import { setCurrencies } from 'Actions';
import UnitService from "Services/units";
import {getAuthToken} from "Helpers/tokens";
import {AbilityContext} from "Permissions/Can";
import Dashboard from 'Routes/custom/dashboard';
import RctThemeProvider from './RctThemeProvider';
import AppSignIn from './../routes/session/login';
import Payment from './../routes/session/payment';
import AppSignUp from './../routes/session/register';
import {isUserIntoStoreValid} from "Helpers/helpers";
import {NotificationContainer} from 'react-notifications';
import LandingPageFlow from './../routes/session/pageFlows';
import PermissionAlertBox from "Components/PermissionAlertBox";
import RequestGlobalLoader from "Components/RequestGlobalLoader";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import ProspectusDetails from './../routes/session/public/prospectus';
import {disableAppLoading, loginIntoStore, setAuthUser} from 'Actions';
import ResetPassword from './../routes/session/forgot-password/ResetPassword';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {AsyncLanding, AsyncPmeProject} from "Components/AsyncComponent/AsyncComponent";
import SendResetPasswordLink from './../routes/session/forgot-password/SendResetPasswordLink';

class App extends Component {
    static contextType = AbilityContext;

    componentDidMount() {
        this.isNewUser();
        this.getCurrencies();
        // Pass true to skip error manager
        // Because this is a silent request
    }

    getCurrencies() {
        UnitService.getCurrencies()
        .then((response) => {
			this.props.setCurrencies(response);
		})
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
                                        <Route path={LANDING.SELF} component={AsyncLanding} />
                                        <Route path={PME_PROJECT.SELF} component={AsyncPmeProject} />
                                        <Route path={PAYMENT} component={Payment} />
                                        <Route path={'/'} component={Dashboard} />
                                    </Switch>
                                ) : (
                                    <Switch>
                                        <Route path={LANDING.SELF} component={AsyncLanding} />
                                        <Route path={AUTH.LOGIN} component={AppSignIn} />
                                        <Route path={AUTH.REGISTER} component={AppSignUp} />
                                        <Route path={AUTH.RESET_PASSWORD} component={ResetPassword} />
                                        <Route path={AUTH.FORGOT_PASSWORD} component={SendResetPasswordLink} />
                                        <Route path={LANDING_PAGE_FLOW} component={LandingPageFlow} />
                                        <Route path={PUBLIC.PROSPECTUS} component={ProspectusDetails} />
                                        <Route path={PAYMENT} component={Payment} />
                                        <Route path={PME_PROJECT.SELF} component={AsyncPmeProject} />

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

export default connect(mapStateToProps, {setAuthUser, disableAppLoading, loginIntoStore, setCurrencies})(App);
