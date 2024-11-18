import React from 'react';
import Users from './users';
import Votes from './votes';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Operations from './operations';
import { SUPERVISION } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Supervisions = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={SUPERVISION.USERS.SELF} />
                    <Route path={SUPERVISION.USERS.SELF} component={Users} />
                    <Route path={SUPERVISION.VOTES.SELF} component={Votes} />
                    <Route path={SUPERVISION.OPERATIONS.SELF} component={Operations} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Supervisions)));