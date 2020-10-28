/**
 * Email Listing Component
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

// helpers
import { getAppLayout } from 'Helpers/helpers';

// folders
import List from './List';
import Create from './Create';
// import BoundaryComponent from './../BoundaryComponent';
import {NETWORK} from "Url/frontendUrl";

class NetworkProfile extends Component {

    render() {
        const { match } = this.props;
        return (
            <div className="list-wrap">
                <Scrollbars
                    className="rct-scroll"
                    autoHide
                    style={{ height: 'calc(100vh - 128px)' }}
                >
                    <React.Fragment>
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={NETWORK.CONFIGURATION.NETWORK_PROFILE.LIST} />
                            {/*<Route path={NETWORK.CONFIGURATION.NETWORK_PROFILE.LIST} component={BoundaryComponent} />*/}
                            <Route path={NETWORK.CONFIGURATION.NETWORK_PROFILE.LIST} component={List} />
                            <Route path={NETWORK.CONFIGURATION.NETWORK_PROFILE.CREATE} component={Create} />
                        </Switch>
                    </React.Fragment>
                </Scrollbars>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ emailApp }) => {
    return emailApp;
};

export default withRouter(connect(mapStateToProps)(NetworkProfile));
