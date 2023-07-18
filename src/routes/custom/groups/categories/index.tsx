import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const GroupCategories = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.CATEGORY.LIST} />
                    <Route path={GROUP.CATEGORY.LIST} component={List} />
                    <Route path={GROUP.CATEGORY.CREATE} component={Create} />
                    <Route path={GROUP.CATEGORY.UPDATE} component={Update} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupCategories)));