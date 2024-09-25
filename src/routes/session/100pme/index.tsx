import React from 'react';
import Vote from './vote';
import auth from './auth';
import {connect} from "react-redux";
import voteRecap from './voteRecap';
import {injectIntl} from "react-intl";
import voteOptions from './voteOptions';
import { PME_PROJECT } from 'Url/frontendUrl';
import voteProduct from './voteOptionProducts';
import voteReserveRecap from './voteReserveRecap';
import voteSubscriptions from './voteSubscriptions';
import voteProductEnd from './voteOptionProductsEnd';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const PmeProject = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PME_PROJECT.VOTE} />
                    <Route path={PME_PROJECT.VOTE_PRODUCT_END} component={voteProductEnd} />
                    <Route path={PME_PROJECT.VOTE_PRODUCT} component={voteProduct} />
                    <Route path={PME_PROJECT.SUBSCRIBE_ACCOUNT} component={voteSubscriptions} />
                    <Route path={PME_PROJECT.VOTE_OPTION} component={voteOptions} />
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