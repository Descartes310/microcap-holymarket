/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {PRODUCT} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './List';
import ProductItemAvailable from './ProductItemAvailable';
import Permission from "Enums/Permissions";
import CanRoute from "Components/CanRoute";

class Products extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={PRODUCT.LIST} />
                        {/*<Route path={USERS.USERS_PROFILE.} component={Show} />*/}
                        <Route path={PRODUCT.SHOW} component={ProductItemAvailable} />
                        <Route path={PRODUCT.LIST} component={List} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(Products)));
