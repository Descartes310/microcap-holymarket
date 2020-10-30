/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {CATEGORY} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './List';
import Show from './Show';

class CategoryProducts extends Component {

    componentDidMount() {
        // this.props.history.push(CATEGORY.PRODUCT.LIST);
    }

    render() {
        const { match } = this.props;
        return (
            <div className="mx-4">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={CATEGORY.PRODUCT.LIST} />
                        <Route path={CATEGORY.PRODUCT.SHOW} component={Show} />
                        <Route path={CATEGORY.PRODUCT.LIST} component={List} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(CategoryProducts)));
