import Standard from "./standard";
import {connect} from "react-redux";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Presentation from "./presentation";
import {PROJECTS} from "Url/frontendUrl";
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

class InitialisationOptions extends Component {
    constructor(props) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.SELF)) return 1;
            else if (url.includes(PROJECTS.CONFIGURATION.STANDARD.SELF)) return 0;
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
                case 1: return this.props.history.push(PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.SELF);
                case 0: return this.props.history.push(PROJECTS.CONFIGURATION.STANDARD.SELF);
                default: return this.props.history.push(PROJECTS.CONFIGURATION.STANDARD.SELF);
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        const { match, currentForm } = this.props;

        return (
            <div className="userProfile-wrapper overflow-hidden">
                {/*<PageTitleBar title={"Communauté"} match={this.props.match} enableBreadCrumb={false} />*/}
                <RctCard>
                    <div className="rct-tabs">
                        <AppBar position="static">
                            <div className="d-flex align-items-center">
                                <Hidden smDown>
                                    <div className="pl-3 page-title m-0">
                                        <h2 className="">
                                            Standard Présentation
                                        </h2>
                                    </div>
                                </Hidden>
                                <div className="">
                                    <Tabs
                                        centered
                                        value={activeTab}
                                        scrollButtons="off"
                                        indicatorColor="primary"
                                        onChange={this.handleChange}
                                    >
                                        <Tab
                                            icon={<i className="zmdi zmdi-group-work"/>}
                                            label={"Standard"}
                                        />
                                        <Tab
                                            icon={<i className="ti-world"></i>}
                                            label={"Présentation"}
                                        />
                                    </Tabs>
                                </div>
                            </div>
                        </AppBar>
                    </div>
                    <div className="vh-100">
                        <Switch>
                            <Route path={PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.SELF} component={Presentation} />
                            <Route path={PROJECTS.CONFIGURATION.STANDARD.SELF} component={Standard} />
                            <Redirect to={PROJECTS.CONFIGURATION.STANDARD.SELF} />
                        </Switch>
                    </div>
                </RctCard>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(InitialisationOptions));
