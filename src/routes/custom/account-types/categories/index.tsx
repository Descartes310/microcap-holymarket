import React from 'react';
import List from './list';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const UserAccountTypeCategories = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={USER_ACCOUNT_TYPE.CATEGORY.LIST} />
                    <Route path={USER_ACCOUNT_TYPE.CATEGORY.LIST} component={List} />
                    <Route path={USER_ACCOUNT_TYPE.CATEGORY.CREATE} component={Create} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(UserAccountTypeCategories)));