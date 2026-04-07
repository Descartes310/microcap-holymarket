/**
 * App.js Layout Start Here
 */
import {
    AUTH,
    ROOT,
    CART,
    MARKETPLACE,
    MARKETS,
    PRODUCTS,
    MARKET_PRODUCT_MODELS,
    CHECKOUT
} from "../urls/frontendUrl";
import {connect} from 'react-redux';
import React, {Component} from 'react';
import { setCurrencies } from 'Actions';
import UnitService from "Services/units";
import {AbilityContext} from "Permissions/Can";
import RctThemeProvider from './RctThemeProvider';
import AppSignIn from './../routes/session/login';
import {loginIntoStore, setAuthUser} from 'Actions';
import AppSignUp from './../routes/session/register';
import {NotificationContainer} from 'react-notifications';
import Marketplace from './../routes/custom/marketplace';
import PermissionAlertBox from "Components/PermissionAlertBox";
import RequestGlobalLoader from "Components/RequestGlobalLoader";
import ResetPassword from './../routes/session/forgot-password/ResetPassword';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import SendResetPasswordLink from './../routes/session/forgot-password/SendResetPasswordLink';
import markets from "../routes/custom/marketplace/shop/markets";
import categories from "../routes/custom/marketplace/shop/categories";
import models from "../routes/custom/marketplace/shop/models";
import products from "../routes/custom/marketplace/shop/products";
import cart from "../routes/custom/marketplace/shop/cart";
import checkout from "../routes/custom/marketplace/shop/checkout";

class App extends Component {
    static contextType = AbilityContext;

    componentDidMount() {
        this.getCurrencies();
    }

    getCurrencies() {
        UnitService.getCurrencies()
        .then((response) => {
			this.props.setCurrencies(response);
		})
	}

    render() {

        return (
            <RctThemeProvider>
                <NotificationContainer />
                <RequestGlobalLoader />
                <PermissionAlertBox />
                <Router>
                    <Switch>
                        <Route path={CHECKOUT} component={checkout} />
                        <Route path={CART} component={cart} />
                        <Route path={PRODUCTS} component={products} />
                        <Route path={MARKET_PRODUCT_MODELS} component={models} />
                        <Route path={MARKETS} component={markets} />
                        <Route path={ROOT} component={categories} />
                        <Route path={AUTH.LOGIN} component={AppSignIn} />
                        <Route path={AUTH.REGISTER} component={AppSignUp} />
                        <Route path={AUTH.RESET_PASSWORD} component={ResetPassword} />
                        <Route path={AUTH.FORGOT_PASSWORD} component={SendResetPasswordLink} />
                        <Route path={MARKETPLACE.SHOP.SELF} component={Marketplace} />

                        <Redirect to={ROOT} />
                    </Switch>
                </Router>
            </RctThemeProvider>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser, tokens }) => {
    return { tokens, authUser };
};

export default connect(mapStateToProps, {setAuthUser, loginIntoStore, setCurrencies})(App);
