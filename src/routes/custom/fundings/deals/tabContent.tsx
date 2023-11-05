import React from 'react';
import Sent from './sent/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Received from './received/list';
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BourseOffer = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.BOURSE.DEALS.SENT} />
                <Route path={FUNDING.BOURSE.DEALS.SENT} component={Sent} />
                <Route path={FUNDING.BOURSE.DEALS.RECEIVED} component={Received} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BourseOffer)));