import { connect } from "react-redux";
import TabContent from "./tabContent";
import { GROUP } from "Url/frontendUrl";
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class FundingOptions extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(GROUP.FUNDING_OPTION.TYPE.LIST)) return 0;
            else if (url.includes(GROUP.FUNDING_OPTION.CATEGORY.LIST)) return 1;
            else if (url.includes(GROUP.FUNDING_OPTION.SUPPORT_TYPE.LIST)) return 2;
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
                case 0: return this.props.history.push(GROUP.FUNDING_OPTION.TYPE.LIST);
                case 1: return this.props.history.push(GROUP.FUNDING_OPTION.CATEGORY.LIST);
                case 2: return this.props.history.push(GROUP.FUNDING_OPTION.SUPPORT_TYPE.LIST);
                default: return this.props.history.push(GROUP.FUNDING_OPTION.TYPE.LIST);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Option de financement"} match={this.props.match} />
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
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Types option"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-cloud-outline-alt"></i>}
                                            label={"Catégories options"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-cloud-outline-alt"></i>}
                                            label={"Type de supports"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(FundingOptions));