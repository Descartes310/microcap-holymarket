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
import NotificationsModel from "./models";
import NotificationsService from "./services";

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
            if (url.includes(SETTINGS.NOTIFICATION.MODEL.SELF)) return 0;
            else if (url.includes(SETTINGS.NOTIFICATION.SERVICE.SELF)) return 1;
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
                    url = SETTINGS.NOTIFICATION.MODEL.SELF; break;
                case 1:
                    url = SETTINGS.NOTIFICATION.SERVICE.SELF; break;
                default:
                    url = SETTINGS.NOTIFICATION.MODEL.SELF; break;
            }

            this.props.history.push(url);
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div className="userProfile-wrapper">
                <PageTitleBar title="Notifications" match={this.props.match}  enableBreadCrumb={false}/>
                <RctCard>
                    <div className="rct-tabs">
                        <AppBar position="static">
                            <Tabs
                                value={activeTab}
                                onChange={this.handleChange}
                                variant="scrollable"
                                scrollButtons="off"
                                indicatorColor="primary"
                            >
                                <Tab
                                    icon={<i className="zmdi zmdi-library"></i>}
                                    label={"Modeles"}
                                />
                                <Tab
                                    icon={<i className="zmdi zmdi-view-web"></i>}
                                    label={"Notifications de Services"}
                                />
                            </Tabs>
                        </AppBar>
                        {/*<CatalogList />
                        <CategoryProducts />*/}
                        <TabContainer>
                            <Switch>
                                <Route path={SETTINGS.NOTIFICATION.SERVICE.SELF} component={NotificationsService} />
                                <Route path={SETTINGS.NOTIFICATION.MODEL.SELF} component={NotificationsModel} />
                                <Redirect exact from={`${this.props.match.url}/`} to={SETTINGS.NOTIFICATION.MODEL.SELF} />
                            </Switch>
                        </TabContainer>
                    </div>
                </RctCard>
            </div>
        );
    }
}
