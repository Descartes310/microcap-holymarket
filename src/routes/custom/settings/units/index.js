/**
 * User Profile Page
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { RctCard } from 'Components/RctCard';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { SETTINGS } from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import UnitValue from "./values/List";
import UnitType from "./types/List";

// For Tab Content
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export default class NotificationsIndex extends Component {
    constructor(props) {
        super(props);

        const defaultState = (function (url) {
            if (url.includes(SETTINGS.UNITS.TYPE)) return 0;
            else if (url.includes(SETTINGS.UNITS.VALUE)) return 1;
            else return 0;
        })(window.location.pathname);

        this.state = {
            activeTab: defaultState,
        }
    }

    handleChange = (event, value) => {
        const oldActivateTab = this.state.activeTab;
        this.setState({ activeTab: value });
        if (oldActivateTab !== value) {
            let url;
            switch (value) {
                case 0:
                    url = SETTINGS.UNITS.TYPE; break;
                case 1:
                    url = SETTINGS.UNITS.VALUE; break;
                default:
                    url = SETTINGS.UNITS.TYPE; break;
            }
            this.props.history.push(url);
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div className="userProfile-wrapper">
                <PageTitleBar
                    title="Unités de decomptes"
                    match={this.props.match}
                    enableBreadCrumb={false}
                />
                <RctCard>
                    <div className="rct-tabs">
                        <AppBar position="static">
                            <Tabs
                                value={activeTab}
                                scrollButtons="off"
                                variant="scrollable"
                                indicatorColor="primary"
                                onChange={this.handleChange}
                            >
                                <Tab
                                    label={"Type d'unités"}
                                    icon={<i className="zmdi zmdi-library"></i>}
                                />
                                <Tab
                                    label={"Unités"}
                                    icon={<i className="zmdi zmdi-view-web"></i>}
                                />
                            </Tabs>
                        </AppBar>
                        <TabContainer>
                            <Switch>
                                <Route path={SETTINGS.UNITS.TYPE} component={UnitType} />
                                <Route path={SETTINGS.UNITS.VALUE} component={UnitValue} />
                                <Redirect exact from={`${this.props.match.url}/`} to={SETTINGS.UNITS.TYPE} />
                            </Switch>
                        </TabContainer>
                    </div>
                </RctCard>
            </div>
        );
    }
}
