import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RctCard } from 'Components/RctCard';
import {PROJECTS} from "Url/frontendUrl";
import {connect} from "react-redux";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import {withRouter} from "react-router-dom";
import TabContent from "./TabContent";
import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Hidden from '@material-ui/core/Hidden';

class ProjectEdition extends Component {
    constructor(props) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(PROJECTS.PROJECTS.EDITION.ARTICLE)) return 0;
            else if (url.includes(PROJECTS.PROJECTS.EDITION.ILLUSTRATION)) return 1;
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
                case 0: return this.props.history.push(PROJECTS.PROJECTS.EDITION.ARTICLE);
                case 1: return this.props.history.push(PROJECTS.PROJECTS.EDITION.ILLUSTRATION);
                default: return this.props.history.push(PROJECTS.PROJECTS.EDITION.ARTICLE);
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        const { match, currentForm } = this.props;

        return (
            <div className="userProfile-wrapper overflow-hidden">
                <PageTitleBar title={"Projets - Edition"} match={this.props.match} enableBreadCrumb={false} />
                <RctCard>
                    <div className="rct-tabs">
                        <AppBar position="static">
                        {/* <Hidden smDown>
                                    <div className="pl-3 page-title m-0">
                                        <h2 className="">Communauté - Membres</h2>
                                    </div>
                                </Hidden> */}
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
                                            icon={<i className="zmdi zmdi-group-work"/>}
                                            label={"Article"}
                                        />
                                        <Tab
                                            icon={<i className="ti-world"></i>}
                                            label={"Illustration"}
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

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(ProjectEdition));
