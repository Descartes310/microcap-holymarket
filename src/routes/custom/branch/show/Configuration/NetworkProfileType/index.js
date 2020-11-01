import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import List from './List';
import Create from './Create';
import {NETWORK} from "Url/frontendUrl";

class NetworkProfileType extends Component {
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
                            <Redirect exact from={`${match.url}/`} to={NETWORK.CONFIGURATION.NETWORK_PROFILE_TYPE.LIST} />
                            <Route path={NETWORK.CONFIGURATION.NETWORK_PROFILE_TYPE.LIST} component={List} />
                            <Route path={NETWORK.CONFIGURATION.NETWORK_PROFILE_TYPE.CREATE} component={Create} />
                        </Switch>
                    </React.Fragment>
                </Scrollbars>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({  }) => {
    return {};
};

export default withRouter(connect(mapStateToProps)(NetworkProfileType));
