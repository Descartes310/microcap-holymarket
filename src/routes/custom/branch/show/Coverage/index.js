import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RctCard } from 'Components/RctCard';
import { NETWORK } from "Url/frontendUrl";
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import TabContent from "./TabContent";

class Coverage extends Component {
    constructor(props) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(NETWORK.COVERAGE_TABS.PARTNER)) return 0;
            // else if (url.includes(NETWORK.COVERAGE_TABS.AREA)) return 1;
            // else if (url.includes(NETWORK.COVERAGE_TABS.AREA_TYPE)) return 2;
            else return 0;
        })(window.location.pathname);

        this.state = {
            activeTab: defaultState,
            // activeTab: 0,
        }
    }

    handleChange = (event, value) => {
        const oldActivateTab = this.state.activeTab;
        this.setState({ activeTab: value });
        if (oldActivateTab !== value) {
            switch (value) {
                case 0: return this.props.history.push(NETWORK.COVERAGE_TABS.PARTNER);
                // case 1: return this.props.history.push(NETWORK.COVERAGE_TABS.AREA);
                // case 2: return this.props.history.push(NETWORK.COVERAGE_TABS.AREA_TYPE);
                default: return this.props.history.push(NETWORK.COVERAGE_TABS.PARTNER);
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        const { match, currentForm } = this.props;

        return (
            <div className="userProfile-wrapper overflow-hidden">
                <PageTitleBar title={"Couverture réseau"} match={this.props.match} enableBreadCrumb={false} />
                <RctCard>
                    <div className="rct-tabs">
                        <AppBar position="static">
                            <div className="d-flex align-items-center">
                                <div className="w-100">
                                    <Tabs
                                        value={activeTab}
                                        onChange={this.handleChange}
                                        scrollButtons="off"
                                        indicatorColor="primary"
                                        centered
                                    >
                                        <Tab
                                            icon={<i className="zmdi zmdi-group-work" />}
                                            label={"Partenaires"}
                                        />
                                        {/* <Tab
                                            icon={<i className="ti-world"></i>}
                                            label={"Térritoires"}
                                        />
                                        <Tab
                                            icon={<i className="icon-shield"></i>}
                                            label={"Type de térritoires"}
                                        /> */}
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
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, userForms, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Coverage));
