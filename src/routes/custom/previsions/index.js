import List from './List';
import Create from './Create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {PREVISIONS} from "Url/frontendUrl";
import React, { Component } from 'react';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

class Products extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={PREVISIONS.LIST} />
                        <Route path={PREVISIONS.LIST} component={List} />
                        <Route path={PREVISIONS.CREATE} component={Create} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(Products)));
