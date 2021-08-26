import {connect} from "react-redux";
import TabContent from "./TabContent";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import {withRouter} from "react-router-dom";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import {COMMUNITY, joinUrlWithParamsId} from "Url/frontendUrl";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";

class Members extends Component {
    constructor(props) {
        super(props);
        this.communitySpaceId = props.match.params.id;
        const defaultState = (function (url, id) {
            if (url.includes(joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, id))) return 0;
            // else if (url.includes(COMMUNITY.MEMBERS.INVITATION)) return 1;
            else return 0;
        })(window.location.pathname, this.communitySpaceId);

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
                case 0: return this.props.history.push(joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, this.communitySpaceId));
                // case 1: return this.props.history.push(COMMUNITY.MEMBERS.INVITATION);
                default: return this.props.history.push(joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, this.communitySpaceId));
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        const { match, currentForm } = this.props;

        return (
            <div className="mx-sm-4">
                <div className="userProfile-wrapper overflow-hidden">
                {/* <PageTitleBar title={"Communauté - Membres"} match={this.props.match} enableBreadCrumb={false} /> */}
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
                                            label={"Liste des membres"}
                                        />
                                        {/* <Tab
                                            icon={<i className="ti-world"></i>}
                                            label={"Invitation"}
                                        /> */}
                                    </Tabs>
                                </div>
                            </div>
                        </AppBar>
                    </div>
                </RctCard>
                    <TabContent />
                </div>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, userForms, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(Members));
