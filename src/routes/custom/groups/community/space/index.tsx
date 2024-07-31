import { connect } from "react-redux";
import TabContent from "./tabContent";
import { GROUP } from "Url/frontendUrl";
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class Requests extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(GROUP.COMMUNITY.SPACE.MINE)) return 0;
            else if (url.includes(GROUP.COMMUNITY.SPACE.ALL)) return 1;
            else if (url.includes(GROUP.COMMUNITY.SPACE.MEMBER)) return 2;
            else if (url.includes(GROUP.COMMUNITY.SPACE.REQUEST)) return 3;
            else if (url.includes(GROUP.COMMUNITY.SPACE.MESSAGE)) return 4;
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
                case 0: return this.props.history.push(GROUP.COMMUNITY.SPACE.MINE);
                case 1: return this.props.history.push(GROUP.COMMUNITY.SPACE.ALL);
                case 2: return this.props.history.push(GROUP.COMMUNITY.SPACE.MEMBER);
                case 3: return this.props.history.push(GROUP.COMMUNITY.SPACE.REQUEST);
                case 4: return this.props.history.push(GROUP.COMMUNITY.SPACE.MESSAGE);
                default: return this.props.history.push(GROUP.COMMUNITY.SPACE.MINE);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Communautés"} match={this.props.match} />
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
                                            label={"Mon réseau"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-cloud-outline-alt"></i>}
                                            label={"Communautés"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-cloud-outline-alt"></i>}
                                            label={"Membres"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-time-restore"></i>}
                                            label={"Invitations"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-comment-outline"></i>}
                                            label={"Messagerie"}
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
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Requests));