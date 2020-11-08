import React, { Component } from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {STORE} from "Url/frontendUrl";
import CartView from "./CartView";
import Checkout from "./checkout";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import {NotificationContainer} from "react-notifications";
import RequestGlobalLoader from "Components/RequestGlobalLoader";
import PermissionAlertBox from "Components/PermissionAlertBox";
import RctThemeProvider from "../../../container/RctThemeProvider";
import RctAppLayout from "Components/RctAppLayout";

class Store extends Component {
    render() {
        const { match } = this.props;

        return (
            <RctAppLayout>
                <div className="dashboard-wrapper">
                    <div className="full-height">
                        <>
                            <Switch>
                                <Redirect exact from={`${match.url}/`} to={STORE.CART} />
                                <Route path={STORE.CART} component={CartView} />
                                <Route path={STORE.CHECKOUT} component={Checkout} />
                            </Switch>
                        </>
                    </div>
                </div>
            </RctAppLayout>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Store)));
