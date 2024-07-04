import { connect } from "react-redux";
import TabContent from "./tabContent";
import { PROFILE } from "Url/frontendUrl";
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Permissions from "Enums/Permissions";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class Users extends Component<any, any> {
    static contextType = AbilityContext;
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(PROFILE.USER.PERSONAL)) return 0;
            else if (url.includes(PROFILE.USER.ACCOUNTS)) return 1;
            else if (url.includes(PROFILE.USER.CARD)) return 2;
            else if (url.includes(PROFILE.USER.ACCESS)) return 3;
            else if (url.includes(PROFILE.USER.CONTACT)) return 4;
            else if (url.includes(PROFILE.USER.BLOG)) return 5;
            else if (url.includes(PROFILE.USER.INSTITUTION)) return 6;
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
                case 1: return this.props.history.push(PROFILE.USER.ACCOUNTS);
                case 2: return this.props.history.push(PROFILE.USER.CARD);
                case 3: return this.props.history.push(PROFILE.USER.ACCESS);
                case 4: return this.props.history.push(PROFILE.USER.CONTACT);
                case 5: return this.props.history.push(PROFILE.USER.BLOG);
                case 6: return this.props.history.push(PROFILE.USER.INSTITUTION);
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
                                        scrollButtons="auto"
                                        indicatorColor="primary"
                                        variant="scrollable"
                                        centered
                                    >
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Information personnelles"}
                                            disabled={!this.context.can(Permissions.accountType.profile.name, Permissions)}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Comptes externes"}
                                            disabled={!this.context.can(Permissions.accountType.profile.name, Permissions)}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Ma fiche client"}
                                            disabled={!this.context.can(Permissions.accountType.fiche.name, Permissions)}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Mes accès"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Mes contacts"}
                                            disabled={!this.context.can(Permissions.accountType.contact.name, Permissions)}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Fil d'actualité"}
                                            disabled={!this.context.can(Permissions.accountType.blog.name, Permissions)}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-account" />}
                                            label={"Mes Etablissements"}
                                            disabled={!this.context.can(Permissions.accountType.agency.name, Permissions)}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Users));