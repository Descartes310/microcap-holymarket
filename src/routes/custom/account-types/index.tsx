import React from 'react';
import Types from './types';
import Roles from './roles';
import Categories from './categories';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const UserAccountTypes = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={USER_ACCOUNT_TYPE.TYPE.SELF} />
                    <Route path={USER_ACCOUNT_TYPE.TYPE.SELF} component={Types} />
                    <Route path={USER_ACCOUNT_TYPE.ROLE.SELF} component={Roles} />
                    <Route path={USER_ACCOUNT_TYPE.CATEGORY.SELF} component={Categories} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(UserAccountTypes)));