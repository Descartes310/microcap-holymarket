import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import Configure from './configure';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Product = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.STORE.PRODUCT.LIST} />
                    <Route path={MARKETPLACE.STORE.PRODUCT.LIST} component={List} />
                    <Route path={MARKETPLACE.STORE.PRODUCT.CREATE} component={Create} />
                    <Route path={MARKETPLACE.STORE.PRODUCT.UPDATE} component={Update} />
                    <Route path={MARKETPLACE.STORE.PRODUCT.CONFIGURE} component={Configure} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Product)));