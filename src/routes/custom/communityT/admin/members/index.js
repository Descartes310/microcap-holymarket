import {connect} from "react-redux";
import TabContent from "./TabContent";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import {COMMUNITY_ADMIN, joinUrlWithParamsId} from "Url/frontendUrl";

class Members extends Component {
    constructor(props) {
        super(props);

        this.communitySpaceId = props.match.params.id;

        const defaultState = (function (url, id) {
            if (url.includes(joinUrlWithParamsId(COMMUNITY_ADMIN.MEMBERS.LIST, id))) return 0;
            else if (url.includes(joinUrlWithParamsId(COMMUNITY_ADMIN.INVITATIONS.SELF, id))) return 1;
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
                case 0: return this.props.history.push(joinUrlWithParamsId(COMMUNITY_ADMIN.MEMBERS.LIST, this.communitySpaceId));
                case 1: return this.props.history.push(joinUrlWithParamsId(COMMUNITY_ADMIN.INVITATIONS.LIST.RECEIVED, this.communitySpaceId));
                default: return this.props.history.push(joinUrlWithParamsId(COMMUNITY_ADMIN.MEMBERS.LIST, this.communitySpaceId));
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        const { match, currentForm } = this.props;

        return (
            <div className="mx-sm-0 mx-4">
                <div className="userProfile-wrapper">
                    <RctCard customClasses="pt-70">
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
                                                label={"Liste des membres"}
                                            />
                                            <Tab
                                                icon={<i className="ti-world"></i>}
                                                label={"Liste des requêtes"}
                                            />
                                        </Tabs>
                                    </div>
                                </div>
                            </AppBar>
                        </div>
                        <TabContent />
                    </RctCard>
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
