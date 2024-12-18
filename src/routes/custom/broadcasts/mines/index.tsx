import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import Members from './members';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BROADCAST } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const MyBroadcasts = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BROADCAST.MINE.LIST} />
                <Route path={BROADCAST.MINE.CREATE} component={Create} />
                <Route path={BROADCAST.MINE.UPDATE} component={Update} />
                <Route path={BROADCAST.MINE.MEMBERS} component={Members} />
                <Route path={BROADCAST.MINE.LIST} component={List} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(MyBroadcasts)));