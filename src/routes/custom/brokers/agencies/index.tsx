import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BROKER } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Agencies = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={BROKER.AGENCY.LIST} />
                    <Route path={BROKER.AGENCY.LIST} component={List} />
                    <Route path={BROKER.AGENCY.CREATE} component={Create} />
                    <Route path={BROKER.AGENCY.UPDATE} component={Update} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Agencies)));