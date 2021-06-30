import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RctCard } from 'Components/RctCard';
import {connect} from "react-redux";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import {withRouter} from "react-router-dom";
import TabContent from "./TabContent";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RESSOURCE } from '../../../urls/frontendUrl';

class Ressource extends Component {
    constructor(props) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(RESSOURCE.VOUCHERS)) return 0;
            if (url.includes(RESSOURCE.PIECES)) return 1;
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
                case 0: return this.props.history.push(RESSOURCE.VOUCHERS);
                case 1: return this.props.history.push(RESSOURCE.PIECES);
                default: return this.props.history.push(RESSOURCE.VOUCHERS);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div className="userProfile-wrapper overflow-hidden">
                <PageTitleBar title={"Mes ressources"} match={this.props.match} enableBreadCrumb={false} />
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
                                            label={"Mes coupons"}
                                        />
                                        <Tab
                                            icon={<i className="icon-folder"/>}
                                            label={"Mes pièces"}
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

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(Ressource));
