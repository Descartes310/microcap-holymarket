import React from 'react';
import Store from './store';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import Products from './administration/models';
import Catalogs from './administration/catalogs';
import Categories from './administration/categories';
import Commercial from './administration/commercials';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Marketplace = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.CATAlOG.SELF} />
                    <Route path={MARKETPLACE.STORE.SELF} component={Store} />
                    <Route path={MARKETPLACE.CATAlOG.SELF} component={Catalogs} />
                    <Route path={MARKETPLACE.MODEL.SELF} component={Products} />
                    <Route path={MARKETPLACE.CATEGORY.SELF} component={Categories} />
                    <Route path={MARKETPLACE.COMMERCIAL.SELF} component={Commercial} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Marketplace)));