import React from 'react';
import Offers from './offers';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Operations from './operations';
import OperationTypes from './operation-types';
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Commercial = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.COMMERCIAL.OFFER.SELF} />
                    <Route path={MARKETPLACE.COMMERCIAL.OFFER.SELF} component={Offers} />
                    <Route path={MARKETPLACE.COMMERCIAL.OPERATION.SELF} component={Operations} />
                    <Route path={MARKETPLACE.COMMERCIAL.OPERATION_TYPE.SELF} component={OperationTypes} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Commercial)));