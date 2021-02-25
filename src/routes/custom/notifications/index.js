import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RctCard } from 'Components/RctCard';
import { NOTIFICATIONS } from "Url/frontendUrl";
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import TabContent from "./TabContent";

class Notifications extends Component {
    constructor(props) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(NOTIFICATIONS.LIST)) return 0;
            else if (url.includes(NOTIFICATIONS.READ)) return 1;
            else if (url.includes(NOTIFICATIONS.TREATED)) return 2;
            else return 0;
        })(window.location.pathname);

        this.state = {
            activeTab: defaultState,
            // activeTab: 0,
        }
    }

    handleChange = (event, value) => {
        const oldActivateTab = this.state.activeTab;
        this.setState({ activeTab: value });
        if (oldActivateTab !== value) {
            switch (value) {
                case 0: return this.props.history.push(NOTIFICATIONS.LIST);
                case 1: return this.props.history.push(NOTIFICATIONS.READ);
                case 2: return this.props.history.push(NOTIFICATIONS.TREATED);
                default: return this.props.history.push(NOTIFICATIONS.LIST);
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        const { match, currentForm } = this.props;

        return (
            <div className="userProfile-wrapper overflow-hidden">
                <PageTitleBar title={"Notifications"} match={this.props.match} enableBreadCrumb={false} />
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
                                            icon={<i className="zmdi zmdi-group-work" />}
                                            label={"Non lues"}
                                        />
                                        <Tab
                                            icon={<i className="ti-world"></i>}
                                            label={"Lues"}
                                        />
                                        <Tab
                                            icon={<i className="icon-shield"></i>}
                                            label={"Traitées"}
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
const mapStateToProps = ({ requestGlobalLoader, userForms, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Notifications));
