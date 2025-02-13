import { connect } from "react-redux";
import TabContent from "./tabContent";
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import { GROUP } from "Url/frontendUrl";
import Tabs from '@material-ui/core/Tabs';
import Permissions from "Enums/Permissions";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class Subscriptions extends Component<any, any> {
    static contextType = AbilityContext;
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.LIST)) return 0;
            else if (url.includes(GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.ADMINISTRATION)) return 1;
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
                case 0: return this.props.history.push(GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.LIST);
                case 1: return this.props.history.push(GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.ADMINISTRATION);
                default: return this.props.history.push(GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.LIST);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Souscriptions"} match={this.props.match} />
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
                                            label={"Mes souscriptions"}
                                        />
                                        { this.context.can(Permissions.group.admin.setting.name, Permissions) && (
                                            <Tab
                                                icon={<i className="zmdi zmdi-home" />}
                                                label={"Administration"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Subscriptions));