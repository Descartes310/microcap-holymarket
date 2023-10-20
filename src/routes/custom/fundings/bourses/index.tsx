import React from 'react';
import Offers from './offers';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Bourse = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={FUNDING.BOURSE.OFFER.SELF} />
                    <Route path={FUNDING.BOURSE.OFFER.SELF} component={Offers} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Bourse)));