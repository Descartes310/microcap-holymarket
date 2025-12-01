import { connect } from "react-redux";
import TabContent from "./tabContent";
import { BANK } from "Url/frontendUrl";
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class OperationAssistance extends Component<any, any> {
    static contextType = AbilityContext;
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(BANK.OPERATION.CREATE.STANDARD)) return 0;
            else if (url.includes(BANK.OPERATION.CREATE.REGULARISATION)) return 1;
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
                case 0: return this.props.history.push(BANK.OPERATION.CREATE.STANDARD);
                case 1: return this.props.history.push(BANK.OPERATION.CREATE.REGULARISATION);
                default: return this.props.history.push(BANK.OPERATION.CREATE.STANDARD);
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <PageTitleBar title={"Créer une opération"} match={this.props.match} />
                <RctCard>
                    <div className="rct-tabs">
                        <AppBar position="static">
                            <div className="d-flex align-content-center">
                                <div className="w-100">
                                    <Tabs
                                        value={activeTab}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        variant="scrollable"
                                        centered
                                    >
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Opération"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Régularisation"}
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

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(OperationAssistance));