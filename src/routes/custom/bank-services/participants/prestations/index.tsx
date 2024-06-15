import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankPartyPrestation = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={BANK.ADMIN.PRESTATION.LIST} />
                    <Route path={BANK.ADMIN.PRESTATION.LIST} component={List} />
                    <Route path={BANK.ADMIN.PRESTATION.CREATE} component={Create} />
                    <Route path={BANK.ADMIN.PRESTATION.UPDATE} component={Update} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankPartyPrestation)));