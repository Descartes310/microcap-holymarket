/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {COMMERCIAL_MANAGEMENT} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './List';
import Create from './Create';

class Offer extends Component {
    render() {
        const { match } = this.props;
        console.log('Je suis dans le match ', match)
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.LIST} />
                        <Route path={COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.CREATE} component={Create} />
                        <Route path={COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.LIST} component={List} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(Offer)));
