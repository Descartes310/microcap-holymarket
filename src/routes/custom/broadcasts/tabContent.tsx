import React from 'react';
import Mines from './mines';
import All from './all';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BROADCAST } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Broadcasts = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BROADCAST.MINE.SELF} />
                <Route path={BROADCAST.MINE.SELF} component={Mines} />
                {/* <Route path={BROADCAST.ALL.SELF} component={All} /> */}
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Broadcasts)));