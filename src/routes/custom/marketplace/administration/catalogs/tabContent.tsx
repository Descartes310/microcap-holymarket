import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ListSaleCatalogs from './sales/list';
import { MARKETPLACE } from 'Url/frontendUrl';
import CreateSaleCatalog from './sales/create';
import ListDistributionCatalogs from './distributions/list';
import CreateDistributionCatalog from './distributions/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Catalogs = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.CATAlOG.SALE.LIST} />
                    <Route path={MARKETPLACE.CATAlOG.SALE.LIST} component={ListSaleCatalogs} />
                    <Route path={MARKETPLACE.CATAlOG.SALE.CREATE} component={CreateSaleCatalog} />
                    <Route path={MARKETPLACE.CATAlOG.DISTRIBUTION.LIST} component={ListDistributionCatalogs} />
                    <Route path={MARKETPLACE.CATAlOG.DISTRIBUTION.CREATE} component={CreateDistributionCatalog} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Catalogs)));