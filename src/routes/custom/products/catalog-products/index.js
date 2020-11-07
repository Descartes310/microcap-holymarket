/**
 * User Profile Page
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// rct card box
import { RctCard } from 'Components/RctCard';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import CatalogList from "Routes/custom/products/catalog-products/catalog";
import CategoryProducts from "Routes/custom/products/catalog-products/product-category";
import Packages from "Routes/custom/products/catalog-sales/packages";
import ProductType from "Routes/custom/products/catalog-products/product-type";
import {CATEGORY, CATALOG, PRODUCT_TYPE, PACKAGES, COMMUNITY} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

// For Tab Content
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export default class CatalogProducts extends Component {
    constructor(props) {
        super(props);
        // const defaultState = CATALOG.PRODUCT.SELF === this.props.match.url ?
        //     0 : CATEGORY.PRODUCT.SELF === this.props.match.url ? 1 : 2;

        const defaultState = (function (url) {
            if (url.includes(CATALOG.PRODUCT.SELF)) return 0;
            else if (url.includes(CATEGORY.PRODUCT.SELF)) return 1;
            else if (url.includes(PRODUCT_TYPE.SELF)) return 2;
            else return 0;
        })(window.location.pathname);

        this.state = {
            activeTab: defaultState,
            // activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
        }
    }

    handleChange = (event, value) => {
        const oldActivateTab = this.state.activeTab;
        this.setState({ activeTab: value });
        if (oldActivateTab !== value) {
            let url;
            switch (value) {
                case 0:
                    url = CATALOG.PRODUCT.SELF; break;
                case 1:
                    url = CATEGORY.PRODUCT.SELF; break;
                case 2:
                    url = PRODUCT_TYPE.SELF; break;
                default:
                    url = CATALOG.PRODUCT.LIST; break;
            }

            this.props.history.push(url);
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div className="userProfile-wrapper">
                <PageTitleBar title="Catalogue Produits" match={this.props.match}  enableBreadCrumb={false}/>
                <RctCard>
                    <div className="rct-tabs">
                        <AppBar position="static">
                            <Tabs
                                value={activeTab}
                                onChange={this.handleChange}
                                variant="scrollable"
                                scrollButtons="off"
                                indicatorColor="primary"
                            >
                                <Tab
                                    icon={<i className="zmdi zmdi-library"></i>}
                                    label={<IntlMessages id="sidebar.catalog" />}
                                />
                                <Tab
                                    icon={<i className="zmdi zmdi-widgets"></i>}
                                    label={<IntlMessages id="sidebar.productCategory" />}
                                />
                                <Tab
                                    icon={<i className="zmdi zmdi-view-web"></i>}
                                    label={"Type de produit"}
                                />
                            </Tabs>
                        </AppBar>
                        {/*<CatalogList />
                        <CategoryProducts />*/}
                        <TabContainer>
                            <Switch>
                                {/*<Redirect exact from={`${this.props.match.url}/`} to={CATALOG.PRODUCT.LIST} />*/}
                                <Route path={PRODUCT_TYPE.SELF} component={ProductType} />
                                <Route path={CATALOG.PRODUCT.SELF} component={CatalogList} />
                                <Route path={CATEGORY.SELF} component={CategoryProducts} />
                            </Switch>
                        </TabContainer>
                    </div>
                </RctCard>
            </div>
        );
    }
}
