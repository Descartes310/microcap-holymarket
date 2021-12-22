import List from './List';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import { ORGANISATIONS } from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

class OrganisationMembers extends Component {
    render() {
        const { match } = this.props;
        console.log("Je suis au moins là !");
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={ORGANISATIONS.USERS.LIST} />
                        <Route path={ORGANISATIONS.USERS.LIST} component={List} />
                    </Switch>
                </>
            </div>
        );
    }
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(OrganisationMembers)));
