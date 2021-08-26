import {connect} from "react-redux";
import TabContent from "./TabContent";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import {withRouter} from "react-router-dom";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { MICROCAP360 } from '../../../urls/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";

class Microcap extends Component {
    constructor(props) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(MICROCAP360.MY.PROJECT)) return 0;
            if (url.includes(MICROCAP360.MY.PASS)) return 1;
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
                case 0: return this.props.history.push(MICROCAP360.MY.PROJECT);
                case 1: return this.props.history.push(MICROCAP360.MY.PASS);
                default: return this.props.history.push(MICROCAP360.MY.PROJECT);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div className="userProfile-wrapper overflow-hidden">
                <PageTitleBar title={"Mon Microcap"} match={this.props.match} enableBreadCrumb={false} />
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
                                            icon={<i className="zmdi zmdi-group-work"/>}
                                            label={"Mon projet Microcap"}
                                        />
                                        <Tab
                                            icon={<i className="icon-folder"/>}
                                            label={"Mon Pass"}
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
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(Microcap));
