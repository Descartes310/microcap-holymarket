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

class BankOperations extends Component<any, any> {
    
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(BANK.OPERATION.BANK.PENDING)) return 0;
            else if (url.includes(BANK.OPERATION.BANK.DRAFT)) return 1;
            else if (url.includes(BANK.OPERATION.BANK.LIQUIDATION)) return 2;
            else if (url.includes(BANK.OPERATION.BANK.LIST)) return 3;
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
                case 0: return this.props.history.push(BANK.OPERATION.BANK.PENDING);
                case 1: return this.props.history.push(BANK.OPERATION.BANK.DRAFT);
                case 2: return this.props.history.push(BANK.OPERATION.BANK.LIQUIDATION);
                case 3: return this.props.history.push(BANK.OPERATION.BANK.LIST);
                default: return this.props.history.push(BANK.OPERATION.BANK.PENDING);
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <PageTitleBar title={"Mes opérations"} match={this.props.match} />
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
                                            label={"Opérations"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Brouillards de bordereau"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Bordereau de liquidation"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Toutes les opérations"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(BankOperations));