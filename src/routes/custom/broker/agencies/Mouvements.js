import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { BROKER } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getBrokerAgency, setRequestGlobalAction } from "Actions";
import AccountMouvements from "Components/AsyncComponent/AccountMouvements";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        agency: {},
    };

    componentDidMount() {
        this.agencyId = this.props.match.params.id;
        this.loadData();
    }

    loadData() {
        this.props.setRequestGlobalAction(true)
        getBrokerAgency(this.agencyId).then(agency =>
            this.setState({ agency })
        ).catch(err => this.props.history.push(BROKER.AGENCIES.LIST))
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            })
    }

    render() {
        const { agency } = this.state;
        return (
            <>
                <PageTitleBar title={"Relevé de " + agency.label} match={this.props.match} enableBreadCrumb={false} />
                {agency.account && (
                    <AccountMouvements account={agency.account} />
                )}
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(List)));
