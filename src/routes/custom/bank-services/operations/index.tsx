import List from './list';
import React from 'react';
import AdminList from './bank';
import PSGAVList from './psgav';
import Create from './assistances';
import Cashdesk from './cashdesks';
import {connect} from "react-redux";
import Assitance from './assistance';
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankOperation = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={BANK.OPERATION.CREATE.SELF} />
                    <Route path={BANK.OPERATION.CREATE.SELF} component={Create} />
                    <Route path={BANK.OPERATION.ASSISTANCE} component={Assitance} />
                    <Route path={BANK.OPERATION.LIST} component={List} />
                    <Route path={BANK.OPERATION.BANK.SELF} component={AdminList} />
                    <Route path={BANK.OPERATION.PSGAV.SELF} component={PSGAVList} />
                    <Route path={BANK.OPERATION.CASHDESK.SELF} component={Cashdesk} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankOperation)));