import React from 'react';
import Parties from './participants';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import Intermediary from './intermediary';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Bank = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.ADMIN.SELF} />
                <Route path={BANK.ADMIN.SELF} component={Parties} />
                <Route path={BANK.PARTY.SELF} component={Intermediary} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Bank)));