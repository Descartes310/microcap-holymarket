import { connect } from "react-redux";
import TabContent from "./tabContent";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { FUNDING } from "Url/frontendUrl";
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

class BourseOffers extends Component<any, any> {

    constructor(props: any) {
        super(props);
        const defaultState = (function (url) {
            if (url.includes(FUNDING.BOURSE.OFFER.MINE)) return 0;
            else if (url.includes(FUNDING.BOURSE.OFFER.LIST)) return 1;
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
                case 0: return this.props.history.push(FUNDING.BOURSE.OFFER.MINE);
                case 1: return this.props.history.push(FUNDING.BOURSE.OFFER.LIST);
                default: return this.props.history.push(FUNDING.BOURSE.OFFER.MINE);
            }
        }
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <PageTitleBar title={"Offres de financement"} match={this.props.match} />
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
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Mes offres"}
                                        />
                                        <Tab
                                            icon={<i className="zmdi zmdi-home" />}
                                            label={"Offres réseaux"}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(BourseOffers));