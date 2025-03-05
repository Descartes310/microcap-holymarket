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

class Investments extends Component<any, any> {

    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(FUNDING.INVESTMENT.PROSPECTUS.SELF)) return 0;
            else if (url.includes(FUNDING.INVESTMENT.PROGRAM.SELF)) return 1;
            else if (url.includes(FUNDING.INVESTMENT.POLITIC.SELF)) return 2;
            else if (url.includes(FUNDING.INVESTMENT.STRATEGY.SELF)) return 3;
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
                case 0: return this.props.history.push(FUNDING.INVESTMENT.PROSPECTUS.SELF);
                case 1: return this.props.history.push(FUNDING.INVESTMENT.PROGRAM.SELF);
                case 2: return this.props.history.push(FUNDING.INVESTMENT.POLITIC.SELF);
                case 3: return this.props.history.push(FUNDING.INVESTMENT.STRATEGY.SELF);
                default: return this.props.history.push(FUNDING.INVESTMENT.PROSPECTUS.SELF);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Prospectus"} match={this.props.match} />
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
                                            label={"Prospectus"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Programme"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Politique"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Stratégie"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Investments));