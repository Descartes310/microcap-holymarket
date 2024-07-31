import { connect } from "react-redux";
import TabContent from "./tabContent";
import { MIPRO } from "Url/frontendUrl";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class Home extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(MIPRO.HOME.DASHBOARD)) return 0;
            if (url.includes(MIPRO.HOME.ACTIVITY)) return 1;
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
                case 0: return this.props.history.push(MIPRO.HOME.DASHBOARD);
                case 1: return this.props.history.push(MIPRO.HOME.ACTIVITY);
                default: return this.props.history.push(MIPRO.HOME.DASHBOARD);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Mon Microcap"} match={this.props.match} />
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
                                            label={"Mon plan"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Mes activités"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Home));