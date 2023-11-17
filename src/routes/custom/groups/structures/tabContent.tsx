import React from 'react';
import types from './types';
import missions from './missions';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import post_types from './post_types';
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const GroupStructure = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.STRUCTURE.ORGANE_TYPE.SELF} />
                <Route path={GROUP.STRUCTURE.ORGANE_TYPE.SELF} component={types} />
                <Route path={GROUP.STRUCTURE.MISSION.SELF} component={missions} />
                <Route path={GROUP.STRUCTURE.POST_TYPE.SELF} component={post_types} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupStructure)));