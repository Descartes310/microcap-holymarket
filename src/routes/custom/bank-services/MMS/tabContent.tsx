import React from 'react';
import Cheques from './cheques';
import Settings from './settings';
import Transfers from './transfers';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const MMSMenu = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.MMS.CHEQUE.SELF} />
                <Route path={BANK.MMS.CHEQUE.SELF} component={Cheques} />
                <Route path={BANK.MMS.TRANSFER.SELF} component={Transfers} />
                <Route path={BANK.MMS.SETTINGS.SELF} component={Settings} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(MMSMenu)));