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
import { SET_AUTH_USER } from "Actions/types";

class Catalogues extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(BANK.PARTY.AGENT.SELF)) return 0;
            else if (url.includes(BANK.PARTY.COUNTER.SELF)) return 1;
            else if (url.includes(BANK.PARTY.COVERAGE.SELF)) return 2;
            else if (url.includes(BANK.PARTY.PRESTATION.SELF)) return 3;
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
                case 0: return this.props.history.push(BANK.PARTY.AGENT.SELF);
                case 1: return this.props.history.push(BANK.PARTY.COUNTER.SELF);
                case 2: return this.props.history.push(BANK.PARTY.COVERAGE.SELF);
                case 3: return this.props.history.push(BANK.PARTY.PRESTATION.SELF);
                default: return this.props.history.push(BANK.PARTY.AGENT.SELF);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Intermédiaires bancaire"} match={this.props.match} />
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
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Agents"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Guichets"}
                                        />
                                        { this.props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY') && (
                                            <Tab
                                                icon={<i className="zmdi zmdi-home" />}
                                                label={"Couvertures"}
                                            />
                                        )}
                                        { this.props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY') && (
                                            <Tab
                                                icon={<i className="zmdi zmdi-home" />}
                                                label={"Prestations"}
                                            />
                                        )}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Catalogues));