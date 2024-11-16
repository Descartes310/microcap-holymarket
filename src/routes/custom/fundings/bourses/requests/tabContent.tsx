import React from 'react';
import Mines from './mines/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Networks from './networks/list';
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BourseRequest = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.BOURSE.REQUEST.MINE} />
                <Route path={FUNDING.BOURSE.REQUEST.MINE} component={Mines} />
                <Route path={FUNDING.BOURSE.REQUEST.LIST} component={Networks} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BourseRequest)));