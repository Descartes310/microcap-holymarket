import React, { Component } from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {STORE} from "Url/frontendUrl";
import CartView from "./CartView";
import Checkout from "./checkout";
import Order from "./BillingForm";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

class Store extends Component {
    render() {
        const { match } = this.props;
        console.log("Store");
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={STORE.CART} />
                        <Route path={STORE.CART} component={CartView} />
                        <Route path={STORE.CHECKOUT} component={Checkout} />
                        <Route path={STORE.ORDER} component={Order} />
                        {/*<Route path={CART.LIST} component={List} />*/}
                        {/*<CanRoute
                            path={PRODUCT.CREATE}
                            component={Create}
                            permissions={[Permission.users.createOne.name]}
                        />*/}
                    </Switch>
                </>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Store)));
