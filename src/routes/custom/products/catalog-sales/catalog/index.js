/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { CATALOG } from "Url/frontendUrl";

import Product from "Enums/Product";
import { withRouter, Switch, Redirect, Route } from "react-router-dom";
import List from './List';
import Show from './Show';
import CatalogList from '../../CatalogList';
import CatalogShow from '../../CatalogShow';
import ProductCatalog from '../../ProductCatalog';

class CatalogIndex extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="mx-4">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={CATALOG.SALE.LIST} />
                        <Route path={CATALOG.SALE.PRODUCTS} render={(props) => <ProductCatalog baseUrl={CATALOG.SALE} {...props} />} />
                        <Route path={CATALOG.SALE.SHOW} render={(props) => <CatalogShow baseUrl={CATALOG.SALE} {...props} />} />
                        <Route path={CATALOG.SALE.LIST} render={(props) =>
                            <CatalogList
                                baseUrl={CATALOG.SALE}
                                catalogType={Product.SALE}
                                catalogLabel={'Catalogue de vente'}
                                {...props} />}
                        />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(CatalogIndex)));
