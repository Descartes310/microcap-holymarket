import React from 'react';
import List from './list';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const GroupStructureTypes = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.STRUCTURE.ORGANE_TYPE.LIST} />
                <Route path={GROUP.STRUCTURE.ORGANE_TYPE.LIST} component={List} />
                <Route path={GROUP.STRUCTURE.ORGANE_TYPE.CREATE} component={Create} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupStructureTypes)));