import React from 'react';
import types from './types';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import categories from './categories';
import Options from './fundingOptions';
import { GROUP } from 'Url/frontendUrl';
import support_types from './support_types';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FundingOptions = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.FUNDING_OPTION.OPTION.SELF} />
                <Route path={GROUP.FUNDING_OPTION.OPTION.SELF} component={Options} />
                <Route path={GROUP.FUNDING_OPTION.CATEGORY.SELF} component={categories} />
                <Route path={GROUP.FUNDING_OPTION.TYPE.SELF} component={types} />
                <Route path={GROUP.FUNDING_OPTION.SUPPORT_TYPE.SELF} component={support_types} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FundingOptions)));