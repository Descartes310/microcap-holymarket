import React from 'react';
import List from './list';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const GroupFundingOptions = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.FUNDING_OPTION.OPTION.LIST} />
                <Route path={GROUP.FUNDING_OPTION.OPTION.LIST} component={List} />
                <Route path={GROUP.FUNDING_OPTION.OPTION.CREATE} component={Create} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupFundingOptions)));