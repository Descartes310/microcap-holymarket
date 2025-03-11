import React from 'react';
import Sent from './sent/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Received from './received/list';
import { FUNDING } from 'Url/frontendUrl';
import Requests from './requests/list';
import Offers from './offers/list';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BourseBigdeals = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.BOURSE.BIGDEALS.SENT} />
                <Route path={FUNDING.BOURSE.BIGDEALS.SENT} component={Sent} />
                <Route path={FUNDING.BOURSE.BIGDEALS.RECEIVED} component={Received} />
                <Route path={FUNDING.BOURSE.BIGDEALS.REQUEST} component={Requests} />
                <Route path={FUNDING.BOURSE.BIGDEALS.OFFER} component={Offers} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BourseBigdeals)));