import Show from './Show';
import List from './List';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {PRODUCT_TYPE} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

class Mandate extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="mx-4">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={PRODUCT_TYPE.LIST} />
                        <Route path={PRODUCT_TYPE.SHOW} component={Show} />
                        <Route path={PRODUCT_TYPE.LIST} component={List} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(ProductType)));
