import List from './List';
import Goals from './goals';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {PREVISIONS_ADMIN} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

class PrevisionAdmin extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={PREVISIONS_ADMIN.LIST} />
                        <Route path={PREVISIONS_ADMIN.LIST} component={List} />
                        <Route path={PREVISIONS_ADMIN.GOALS.SELF} component={Goals} />
                    </Switch>
                </>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(PrevisionAdmin)));
