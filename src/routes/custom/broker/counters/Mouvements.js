import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { useParams, withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import { BROKER, joinUrlWithParamsId } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getAgencyCounter, setRequestGlobalAction } from "Actions";
import AccountMouvements from "Components/AsyncComponent/AccountMouvements";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        counter: {},
    };

    componentDidMount() {
        this.counterId = this.props.match.params.id;
        this.loadData();
    }

    loadData() {
        this.props.setRequestGlobalAction(true)
        getAgencyCounter(this.counterId).then(counter =>
            this.setState({ counter })
        ).catch(err => this.setState({ counter: {} }))
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            })
    }

    render() {
        const { counter } = this.state;
        return (
            <>
                <PageTitleBar title={"Relevé de " + counter.label} match={this.props.match} enableBreadCrumb={false} />
                {counter.account && (
                    <AccountMouvements account={counter.account} />
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
