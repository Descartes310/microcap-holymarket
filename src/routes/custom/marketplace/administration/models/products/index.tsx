import React from 'react';
import List from './list';
import Create from './create';
import Configure from './configure';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Products = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.MODEL.PRODUCT.LIST} />
                    <Route path={MARKETPLACE.MODEL.PRODUCT.LIST} component={List} />
                    <Route path={MARKETPLACE.MODEL.PRODUCT.CREATE} component={Create} />
                    <Route path={MARKETPLACE.MODEL.PRODUCT.CONFIGURE} component={Configure} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Products)));