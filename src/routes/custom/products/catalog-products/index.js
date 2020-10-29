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

// For Tab Content
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export default class CatalogProducts extends Component {

    state = {
        activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
    }

    handleChange = (event, value) => {
        this.setState({ activeTab: value });
    }

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
                            </Tabs>
                        </AppBar>
                        {activeTab === 0 &&
                        <TabContainer>
                            <CatalogList />
                        </TabContainer>}
                        {activeTab === 1 &&
                        <TabContainer>
                            <p>Catalogue de produits</p>
                        </TabContainer>}
                    </div>
                </RctCard>
            </div>
        );
    }
}
