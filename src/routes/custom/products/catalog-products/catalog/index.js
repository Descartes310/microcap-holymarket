import Show from './Show';
import List from './List';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {CATALOG} from "Url/frontendUrl";
import React, { Component } from 'react';
import ProductCatalog from './ProductCatalog';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";


class CatalogIndex extends Component {

    render() {
        const { match } = this.props;
        return (
            <div className="mx-4">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={CATALOG.PRODUCT.LIST} />
                        <Route path={CATALOG.PRODUCT.PRODUCTS} component={ProductCatalog} />
                        <Route path={CATALOG.PRODUCT.SHOW} component={Show} />
                        <Route path={CATALOG.PRODUCT.LIST} component={List} />
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
