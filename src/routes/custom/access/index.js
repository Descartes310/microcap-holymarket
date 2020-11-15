import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { RctCard } from 'Components/RctCard';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import Access from "./self/";
import Mandate from "./mandate/self";
import ModelMandate from "./mandate/model";
import TypeMandate from "./mandate/type";

import {ACCESS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

// For Tab Content
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export default class CatalogProducts extends Component {
    constructor(props) {
        super(props);

        const defaultState = (function (url) {
            if (url.includes(ACCESS.MANDATE.TYPE.SELF)) return 0;
            else if (url.includes(ACCESS.MANDATE.MODEL.SELF)) return 1;
            else if (url.includes(ACCESS.MANDATE.SELF.SELF)) return 2;
            else if (url.includes(ACCESS.LIST)) return 3;
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
                case 3:
                    url = ACCESS.LIST; break;
                case 2:
                    url = ACCESS.MANDATE.SELF.SELF; break;
                case 1:
                    url = ACCESS.MANDATE.MODEL.SELF; break;
                case 0:
                    url = ACCESS.MANDATE.TYPE.SELF; break;
                default:
                    url = ACCESS.MANDATE.TYPE.SELF; break;
            }

            this.props.history.push(url);
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div className="userProfile-wrapper">
                <PageTitleBar title="Accès" match={this.props.match}  enableBreadCrumb={false}/>
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
                                    icon={<i className="zmdi zmdi-view-web"></i>}
                                    label={"Type de mandat"}
                                />
                                <Tab
                                    icon={<i className="zmdi zmdi-view-web"></i>}
                                    label={"Model de mandat"}
                                />
                                <Tab
                                    icon={<i className="zmdi zmdi-view-web"></i>}
                                    label={"Mandat"}
                                />
                                <Tab
                                    icon={<i className="zmdi zmdi-library"></i>}
                                    label={"Accès"}
                                />
                            </Tabs>
                        </AppBar>
                        <TabContainer>
                            <Switch>
                                <Route path={ACCESS.MANDATE.TYPE.SELF} component={TypeMandate} />
                                <Route path={ACCESS.MANDATE.MODEL.SELF} component={ModelMandate} />
                                <Route path={ACCESS.MANDATE.SELF.SELF} component={Mandate} />
                                <Route path={ACCESS.LIST} component={Access} />
                                <Redirect exact from={`${this.props.match.url}/`} to={ACCESS.MANDATE.TYPE.SELF} />
                            </Switch>
                        </TabContainer>
                    </div>
                </RctCard>
            </div>
        );
    }
}
