import React, { Component } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import { RctCard } from 'Components/RctCard';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

class OpportunityStock extends Component {

    static contextType = AbilityContext;

    state = {
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="userProfile-wrapper overflow-hidden">
                <PageTitleBar title={"Bourses des opportunités"} match={this.props.match} enableBreadCrumb={false} />
                <RctCard>
                    <h1>
                        A partir du 30 avril
                    </h1>
                </RctCard>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(OpportunityStock)));
