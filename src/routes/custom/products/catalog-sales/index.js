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
import CatalogList from "Routes/custom/products/catalog-sales/catalog";
import {CATALOG, PACKAGES} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import Packages from "Routes/custom/products/catalog-sales/packages";

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

        const defaultState = (function (url) {
            if (url.includes(CATALOG.SALE.SELF)) return 0;
            else if (url.includes(PACKAGES.SELF)) return 1;
            else return 0;
        })(window.location.pathname);

        this.state = {
            activeTab: defaultState,
        }
    }

    handleChange = (event, value) => {
        const oldActivateTab = this.state.activeTab;
        this.setState({ activeTab: value });
        if (oldActivateTab !== value) {
            let url;
            switch (value) {
                case 0:
                    url = CATALOG.SALE.SELF; break;
                case 1:
                    url = PACKAGES.SELF; break;
                default:
                    url = CATALOG.SALE.LIST; break;
            }

            this.props.history.push(url);
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div className="userProfile-wrapper">
                <PageTitleBar title="Catalogue Vente" match={this.props.match}  enableBreadCrumb={false}/>
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
                                    label={"Catalogue"}
                                />
                                <Tab
                                    icon={<i className="zmdi zmdi-view-web"></i>}
                                    label={"Paquetage"}
                                />
                            </Tabs>
                        </AppBar>
                        {/*<CatalogList />
                        <CategoryProducts />*/}
                        <TabContainer>
                            <Switch>
                                {/*<Redirect exact from={`${this.props.match.url}/`} to={CATALOG.PRODUCT.LIST} />*/}
                                <Route path={PACKAGES.SELF} component={Packages} />
                                <Route path={CATALOG.SALE.SELF} component={CatalogList} />
                            </Switch>
                        </TabContainer>
                    </div>
                </RctCard>
            </div>
        );
    }
}
