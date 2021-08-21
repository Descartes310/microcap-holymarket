import List from './List';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {PREVISIONS_ADMIN} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

class Goals extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={PREVISIONS_ADMIN.GOALS.LIST} />
                        <Route path={PREVISIONS_ADMIN.GOALS.LIST} component={List} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(Goals)));
