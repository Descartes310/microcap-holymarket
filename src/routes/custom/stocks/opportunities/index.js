import React, { Component } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

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
                <RctCollapsibleCard>
                    <div className="">
                        <h1 style={{
                            margin: '2%'
                        }}>
                            A partir du 15 decembre
                        </h1>
                        <p style={{
                            marginLeft: '2%'
                        }}>
                            Vous pourrez négocier ici vos offres et demandes de financement avec ou sans contre partie
                        </p>
                    </div>
                </RctCollapsibleCard>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(OpportunityStock)));
