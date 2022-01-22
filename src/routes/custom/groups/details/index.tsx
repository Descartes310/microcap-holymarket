import React from 'react';
import View from './view';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const GroupDetails = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.DETAILS.VIEW} />
                    <Route path={GROUP.DETAILS.VIEW} component={View} />
                    <Route path={GROUP.DETAILS.VIEW_SELF} component={View} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupDetails)));