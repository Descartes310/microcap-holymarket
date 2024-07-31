import { connect } from "react-redux";
import TabContent from "./tabContent";
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import { NETWORK } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class Partnerships extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(NETWORK.COVERAGE.PARTNERSHIP.COMMUNITY)) return 0;
            else if (url.includes(NETWORK.COVERAGE.PARTNERSHIP.OPERATOR)) return 1;
            else if (url.includes(NETWORK.COVERAGE.PARTNERSHIP.BROKER)) return 2;
            else if (url.includes(NETWORK.COVERAGE.PARTNERSHIP.COMPLEMENTARY)) return 3;
            else return 0;
        })(window.location.pathname);

        this.state = {
            activeTab: defaultState,
        }
    }

    handleChange = (__, value) => {
        const oldActivateTab: any = this.state.activeTab;
        this.setState({ activeTab: value });
        if (oldActivateTab !== value) {
            switch (value) {
                case 0: return this.props.history.push(NETWORK.COVERAGE.PARTNERSHIP.COMMUNITY);
                case 1: return this.props.history.push(NETWORK.COVERAGE.PARTNERSHIP.OPERATOR);
                case 2: return this.props.history.push(NETWORK.COVERAGE.PARTNERSHIP.BROKER);
                case 3: return this.props.history.push(NETWORK.COVERAGE.PARTNERSHIP.COMPLEMENTARY);
                default: return this.props.history.push(NETWORK.COVERAGE.PARTNERSHIP.COMMUNITY);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Partenariats"} match={this.props.match} />
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
                                        variant="scrollable"
                                        centered
                                    >
                                        <Tab
                                            label={"Communautés"}
                                        />
                                        <Tab
                                            label={"Opérateurs"}
                                        />
                                        <Tab
                                            label={"Brokers"}
                                        />
                                        <Tab
                                            label={"Prestataires"}
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
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Partnerships));