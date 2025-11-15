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

class BankService extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            // if (url.includes(BANK.PARTY.CASHDESK.SELF)) return 0;
            if (url.includes(BANK.PARTY.COUNTER.SELF)) return 0;
            else if (url.includes(BANK.PARTY.AGENT.SELF)) return 1;
            else if (url.includes(BANK.PARTY.SUPER_AGENT.SELF)) return 2;
            else if (url.includes(BANK.PARTY.MANDATE.SELF)) return 3;
            else if (url.includes(BANK.PARTY.COVERAGE.SELF)) return 4;
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
                // case 0: return this.props.history.push(BANK.PARTY.CASHDESK.SELF);
                case 0: return this.props.history.push(BANK.PARTY.COUNTER.SELF);
                case 1: return this.props.history.push(BANK.PARTY.AGENT.SELF);
                case 2: return this.props.history.push(BANK.PARTY.SUPER_AGENT.SELF);
                case 3: return this.props.history.push(BANK.PARTY.MANDATE.SELF);
                case 4: return this.props.history.push(BANK.PARTY.COVERAGE.SELF);
                default: return this.props.history.push(BANK.PARTY.COUNTER.SELF);
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
                                        variant="scrollable"
                                        centered
                                    >
                                        <Tab
                                            disabled={!this.props.authUser.referralTypes.includes('AGENT')}
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Guichets"}
                                        />
                                        <Tab
                                            disabled={!this.props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY') && !this.props.authUser.referralTypes.includes('PROVIDER_SUPER_AGENT')}
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Mon réseau d'agence"}
                                        />
                                        <Tab
                                            disabled={!this.props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY') && !this.props.authUser.referralTypes.includes('PROVIDER_SUPER_AGENT')}
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Mes agents"}
                                        />
                                        <Tab
                                            disabled={!this.props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY') && !this.props.authUser.referralTypes.includes('PROVIDER_AGENT') && !this.props.authUser.referralTypes.includes('PROVIDER_SUPER_AGENT')}
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Mes mandats"}
                                        />
                                        <Tab
                                            disabled={!this.props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY')}
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Mes couvertures"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(BankService));