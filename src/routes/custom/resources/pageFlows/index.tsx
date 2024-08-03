import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import {connect} from "react-redux";
import ChildList from './child/list';
import {injectIntl} from "react-intl";
import ChildCreate from './child/create';
import { RESOURCES } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const PageFLows = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={RESOURCES.PAGE_FLOWS.LIST} />
                    <Route path={RESOURCES.PAGE_FLOWS.UPDATE} component={Update} />
                    <Route path={RESOURCES.PAGE_FLOWS.LIST} component={List} />
                    <Route path={RESOURCES.PAGE_FLOWS.CREATE} component={Create} />
                    <Route path={RESOURCES.PAGE_FLOWS.CHILD.CREATE} component={ChildCreate} />
                    <Route path={RESOURCES.PAGE_FLOWS.CHILD.LIST} component={ChildList} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(PageFLows)));