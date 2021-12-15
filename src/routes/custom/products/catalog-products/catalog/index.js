import { connect } from "react-redux";
import Product from "Enums/Product";
import { injectIntl } from "react-intl";
import { CATALOG } from "Url/frontendUrl";
import React, { Component } from 'react';
import CatalogList from '../../CatalogList';
import CatalogShow from '../../CatalogShow';
import ProductCatalog from '../../ProductCatalog';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";


class CatalogIndex extends Component {

    render() {
        const { match } = this.props;
        return (
            <div className="mx-4">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={CATALOG.PRODUCT.LIST} />
                        <Route path={CATALOG.PRODUCT.PRODUCTS} render={(props) => <ProductCatalog baseUrl={CATALOG.PRODUCT} {...props} />} />
                        <Route path={CATALOG.PRODUCT.SHOW} render={(props) => <CatalogShow baseUrl={CATALOG.PRODUCT} {...props} />} />
                        <Route path={CATALOG.PRODUCT.LIST} render={(props) =>
                            <CatalogList
                                baseUrl={CATALOG.PRODUCT}
                                catalogType={Product.PRODUCT}
                                catalogLabel={'Catalogue produit'}
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
