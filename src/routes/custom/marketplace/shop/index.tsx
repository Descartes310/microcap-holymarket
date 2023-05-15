import React, { Component, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RctCard } from 'Components/RctCard';
import { MARKETPLACE } from "Url/frontendUrl";
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import TabContent from "./shopTabContent";

const Shop = (props) => {

    const [activeTab, setActiveTab] = useState<Number>(0);

    useEffect(() => {
        const defaultState = (function (url) {
            if (url.includes(MARKETPLACE.SHOP.CLASSIC)) return 0;
            if (url.includes(MARKETPLACE.SHOP.PRIVATE)) return 1;
            if (url.includes(MARKETPLACE.SHOP.FINANCIAL)) return 2;
            else return 0;
        })(window.location.pathname);

        setActiveTab(defaultState);
    });

    const handleChange = (event, value) => {
        const oldActivateTab = activeTab;
        setActiveTab(value);
        if (oldActivateTab !== value) {
            switch (value) {
                case 0: return props.history.push(MARKETPLACE.SHOP.CLASSIC);
                case 1: return props.history.push(MARKETPLACE.SHOP.PRIVATE);
                case 2: return props.history.push(MARKETPLACE.SHOP.FINANCIAL);
                default: return props.history.push(MARKETPLACE.SHOP.CLASSIC);
            }
        }
    };

    return (
        <div className="userProfile-wrapper overflow-hidden">
            <PageTitleBar title={"Market Place"} match={props.match} enableBreadCrumb={false} />
            <RctCard>
                <div className="rct-tabs">
                    <AppBar position="static">
                        <div className="d-flex align-items-center">
                            <div className="w-100">
                                <Tabs
                                    value={activeTab}
                                    onChange={handleChange}
                                    scrollButtons="off"
                                    indicatorColor="primary"
                                    centered
                                >
                                    <Tab
                                        icon={<i className="zmdi zmdi-group-work" />}
                                        label={"Ventes classiques"}
                                    />
                                    <Tab
                                        icon={<i className="ti-world"></i>}
                                        label={"Solutions financières"}
                                    />
                                    <Tab
                                        icon={<i className="icon-shield"></i>}
                                        label={"Ventes privées"}
                                    />
                                </Tabs>
                            </div>
                        </div>
                    </AppBar>
                </div>
                <TabContent />
            </RctCard>
        </div>
    );
    
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Shop));