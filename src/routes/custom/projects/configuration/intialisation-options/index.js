import Idea from "./idea";
import Program from "./program";
import {connect} from "react-redux";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import {PROJECTS} from "Url/frontendUrl";
import Tabs from '@material-ui/core/Tabs';
import ProjectsCall from "./projects-call";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

class InitialisationOptions extends Component {
    constructor(props) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(PROJECTS.CONFIGURATION.INITIALISATION.IDEA.SELF)) return 0;
            else if (url.includes(PROJECTS.CONFIGURATION.INITIALISATION.PROJECTS_CALL.SELF)) return 1;
            else if (url.includes(PROJECTS.CONFIGURATION.INITIALISATION.PROGRAM.SELF)) return 2;
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
                case 0: return this.props.history.push(PROJECTS.CONFIGURATION.INITIALISATION.IDEA.SELF);
                case 1: return this.props.history.push(PROJECTS.CONFIGURATION.INITIALISATION.PROJECTS_CALL.SELF);
                case 2: return this.props.history.push(PROJECTS.CONFIGURATION.INITIALISATION.PROGRAM.SELF);
                default: return this.props.history.push(PROJECTS.CONFIGURATION.INITIALISATION.IDEA.SELF);
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
                                        <h2 className="">Options d'initialisation</h2>
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
                                            label={"Idée"}
                                        />
                                        <Tab
                                            icon={<i className="ti-world"></i>}
                                            label={"Appel à projet"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-inbox"></i>}
                                            label={"Programme"}
                                        />
                                    </Tabs>
                                </div>
                            </div>
                        </AppBar>
                    </div>
                    <div className="vh-100">
                        <Switch>
                            <Route path={PROJECTS.CONFIGURATION.INITIALISATION.IDEA.SELF} component={Idea} />
                            <Route path={PROJECTS.CONFIGURATION.INITIALISATION.PROJECTS_CALL.SELF} component={ProjectsCall} />
                            <Route path={PROJECTS.CONFIGURATION.INITIALISATION.PROGRAM.SELF} component={Program} />
                            <Redirect to={PROJECTS.CONFIGURATION.INITIALISATION.IDEA.SELF} />
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
