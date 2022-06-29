import React from 'react';
import Mandates from './mandates';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Prestations from './prestations';
import { BANK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankParty = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.ADMIN.MANDATE.SELF} />
                <Route path={BANK.ADMIN.MANDATE.SELF} component={Mandates} />
                <Route path={BANK.ADMIN.PRESTATION.SELF} component={Prestations} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankParty)));