import React from 'react';
import Products from './products';
import Packages from './packages';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Model = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.MODEL.PRODUCT.SELF} />
                    <Route path={MARKETPLACE.MODEL.PRODUCT.SELF} component={Products} />
                    <Route path={MARKETPLACE.MODEL.PACKAGE.SELF} component={Packages} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Model)));