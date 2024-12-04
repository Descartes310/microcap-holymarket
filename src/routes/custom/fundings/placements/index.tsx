import { connect } from "react-redux";
import TabContent from "./tabContent";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { FUNDING } from "Url/frontendUrl";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class Placements extends Component<any, any> {

    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(FUNDING.PLACEMENT.ITEM.LIST)) return 0;
            else if (url.includes(FUNDING.PLACEMENT.STRATEGY.LIST)) return 1;
            else if (url.includes(FUNDING.PLACEMENT.OPORTUNIY.LIST)) return 2;
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
                case 0: return this.props.history.push(FUNDING.PLACEMENT.ITEM.LIST);
                case 1: return this.props.history.push(FUNDING.PLACEMENT.STRATEGY.LIST);
                case 2: return this.props.history.push(FUNDING.PLACEMENT.OPORTUNIY.LIST);
                default: return this.props.history.push(FUNDING.PLACEMENT.ITEM.LIST);
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <PageTitleBar title={"Placements"} match={this.props.match} />
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
                                            label={"Placements"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Stratégies"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Opportunités"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Placements));