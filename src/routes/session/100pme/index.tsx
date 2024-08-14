import React from 'react';
import Vote from './vote';
import {connect} from "react-redux";
import voteRecap from './voteRecap';
import {injectIntl} from "react-intl";
import voteOptionEnd from './voteOptionEnd';
import { PME_PROJECT } from 'Url/frontendUrl';
import voteReserveRecap from './voteReserveRecap';
import voteOptionReserve from './voteOptionReserve';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import auth from './auth';

const PmeProject = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PME_PROJECT.VOTE} />
                    <Route path={PME_PROJECT.VOTE_OPTION} component={voteOptionReserve} />
                    <Route path={PME_PROJECT.VOTE_OPTION_2} component={voteOptionEnd} />
                    <Route path={PME_PROJECT.VOTE_RECAP} component={voteRecap} />
                    <Route path={PME_PROJECT.VOTE_RESERVE_RECAP} component={voteReserveRecap} />
                    <Route path={PME_PROJECT.VOTE} component={Vote} />
                    <Route path={PME_PROJECT.LOGIN} component={auth} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(PmeProject)));