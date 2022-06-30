import { connect } from "react-redux";
import TabContent from "./tabContent";
import { PROFILE } from "Url/frontendUrl";
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class Users extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(PROFILE.USER.PERSONAL)) return 0;
            else if (url.includes(PROFILE.USER.CARD)) return 1;
            else if (url.includes(PROFILE.USER.ACCESS)) return 2;
            else if (url.includes(PROFILE.USER.INSTITUTION) && props.authUser.referralTypes.includes('OPERATOR')) return 3;
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
                case 0: return this.props.history.push(PROFILE.USER.PERSONAL);
                case 1: return this.props.history.push(PROFILE.USER.CARD);
                case 2: return this.props.history.push(PROFILE.USER.ACCESS);
                case 3: return this.props.history.push(PROFILE.USER.INSTITUTION);
                default: return this.props.history.push(PROFILE.USER.PERSONAL);
            }
        }
    };

    render() {
        const { authUser } = this.props;
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Mon profile"} match={this.props.match} />
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
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Information personnelles"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Ma fiche client"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Mes accès"}
                                        />
                                        { authUser.referralTypes.includes('OPERATOR') && (
                                            <Tab
                                                icon={<i className="zmdi zmdi-account" />}
                                                label={"Mes Agences"}
                                            />
                                        )}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Users));