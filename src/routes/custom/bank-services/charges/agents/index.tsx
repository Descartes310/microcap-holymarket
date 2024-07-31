import { connect } from "react-redux";
import TabContent from "./tabContent";
import { BANK } from "Url/frontendUrl";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class ChargeRequest extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(BANK.CHARGE.AGENT.REQUEST.SELF)) return 0;
            else if (url.includes(BANK.CHARGE.AGENT.TRANSFER.SELF)) return 1;
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
                case 0: return this.props.history.push(BANK.CHARGE.AGENT.REQUEST.SELF);
                case 1: return this.props.history.push(BANK.CHARGE.AGENT.TRANSFER.SELF);
                // case 2: return this.props.history.push(BANK.PARTY.COVERAGE.SELF);
                // case 3: return this.props.history.push(BANK.PARTY.PRESTATION.SELF);
                default: return this.props.history.push(BANK.CHARGE.AGENT.REQUEST.SELF);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Recharges"} match={this.props.match} />
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
                                            label={"Demande de recharge"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Mouvement interne"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(ChargeRequest));