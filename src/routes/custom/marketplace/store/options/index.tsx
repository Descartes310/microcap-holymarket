import { connect } from "react-redux";
import TabContent from "./tabContent";
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { MARKETPLACE, SETTING } from "Url/frontendUrl";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class Options extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(MARKETPLACE.STORE.OPTION.ITEM.LIST)) return 0;
            else if (url.includes(MARKETPLACE.STORE.OPTION.TITLE.LIST)) return 1;
            else if (url.includes(MARKETPLACE.STORE.OPTION.SUPPORT.LIST)) return 2;
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
                case 0: return this.props.history.push(MARKETPLACE.STORE.OPTION.ITEM.LIST);
                case 1: return this.props.history.push(MARKETPLACE.STORE.OPTION.TITLE.LIST);
                case 2: return this.props.history.push(MARKETPLACE.STORE.OPTION.SUPPORT.LIST);
                default: return this.props.history.push(MARKETPLACE.STORE.OPTION.ITEM.LIST);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Options produit"} match={this.props.match} />
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
                                            label={"Options"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home"></i>}
                                            label={"Titre d'option"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home"></i>}
                                            label={"Support d'option"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Options));