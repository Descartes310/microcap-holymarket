import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RctCard } from 'Components/RctCard';
import { PRODUCT } from "Url/frontendUrl";
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import TabContent from "./TabContent";

class List extends Component {
    constructor(props) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(PRODUCT.CLASSIC_SALES)) return 0;
            else if (url.includes(PRODUCT.FINANCIAL_SALES)) return 1;
            else if (url.includes(PRODUCT.PRIVATE_SALES)) return 2;
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
                case 0: return this.props.history.push(PRODUCT.CLASSIC_SALES);
                case 1: return this.props.history.push(PRODUCT.FINANCIAL_SALES);
                case 2: return this.props.history.push(PRODUCT.PRIVATE_SALES);
                default: return this.props.history.push(PRODUCT.CLASSIC_SALES);
            }
        }
    };

    render() {
        const { activeTab } = this.state;
        const { match, currentForm } = this.props;

        return (
            <div className="userProfile-wrapper overflow-hidden">
                <PageTitleBar title={"Market Place"} match={this.props.match} enableBreadCrumb={false} />
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
                                            icon={<i className="zmdi zmdi-group-work" />}
                                            label={"Ventes classiques"}
                                        />
                                        <Tab
                                            icon={<i className="ti-world"></i>}
                                            label={"Solutions financières"}
                                        />
                                        <Tab
                                            icon={<i className="icon-shield"></i>}
                                            label={"Ventes privées"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(List));
