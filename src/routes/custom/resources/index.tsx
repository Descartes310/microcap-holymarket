import React from 'react';
import PageFlows from './pageFlows';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { RESOURCES } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Resource = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={RESOURCES.PAGE_FLOWS.SELF} />
                    <Route path={RESOURCES.PAGE_FLOWS.SELF} component={PageFlows} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Resource)));