import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {NOTIFICATIONS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './List';
// import Show from './Show';

class Notifications extends Component {
    componentDidMount() {
        // this.props.history.push(CATEGORY.PRODUCT.LIST);
    }

    render() {
        const { match } = this.props;
        return (
            <div className="mx-4">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={NOTIFICATIONS.LIST} />
                        {/*<Route path={PRODUCT_TYPE.SHOW} component={Show} />*/}
                        <Route path={NOTIFICATIONS.LIST} component={List} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(Notifications)));
