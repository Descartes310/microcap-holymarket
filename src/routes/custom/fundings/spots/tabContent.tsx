import React from 'react';
import Sent from './sent/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Received from './received/list';
import Requests from './requests/list';
import Offers from './offers/list';
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BourseSpots = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.BOURSE.SPOTS.SENT} />
                <Route path={FUNDING.BOURSE.SPOTS.SENT} component={Sent} />
                <Route path={FUNDING.BOURSE.SPOTS.RECEIVED} component={Received} />
                <Route path={FUNDING.BOURSE.SPOTS.REQUEST} component={Requests} />
                <Route path={FUNDING.BOURSE.SPOTS.OFFER} component={Offers} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BourseSpots)));