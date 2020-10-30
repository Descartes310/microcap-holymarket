/**
 * User Profile Page
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Helmet } from "react-helmet";

// rct card box
import { RctCard } from 'Components/RctCard';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import CatalogList from "Routes/custom/products/catalog-products/catalog";
import CategoryProducts from "Routes/custom/products/catalog-products/product-category";
import ProductType from "Routes/custom/products/catalog-products/product-type";
import {CATEGORY, CATALOG, PRODUCT_TYPE} from "Url/frontendUrl";

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
        const defaultState = CATALOG.PRODUCT.SELF === this.props.match.url ?
            0 : CATEGORY.PRODUCT.SELF === this.props.match.url ? 1 : 2;

        this.state = {
            activeTab: defaultState,
            // activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
        }
    }

    handleChange = (event, value) => {
        const oldActivateTab = this.state.activeTab;
        this.setState({ activeTab: value });
        if (oldActivateTab !== value) {
            this.props.history.push(value === 0
                ? CATALOG.PRODUCT.LIST
                : value === 1 ? CATEGORY.PRODUCT.SELF : PRODUCT_TYPE.SELF);
        }
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div className="userProfile-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.catalogProducts" />} match={this.props.match} />
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
                        {activeTab === 0 &&
                        <TabContainer>
                            <CatalogList />
                        </TabContainer>}
                        {activeTab === 1 &&
                        <TabContainer>
                            <CategoryProducts />
                        </TabContainer>}
                        {activeTab === 2 &&
                        <TabContainer>
                            <ProductType />
                        </TabContainer>}
                    </div>
                </RctCard>
            </div>
        );
    }
}
