import React from 'react';
import List from './list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import CheckBooks from './chequeBook/list';
import CreateCheckBook from './chequeBook/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Clients = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={BANK.CLIENT.LIST} />
                    <Route path={BANK.CLIENT.LIST} component={List} />
                    <Route path={BANK.CLIENT.CHECKBOOK.CREATE} component={CreateCheckBook} />
                    <Route path={BANK.CLIENT.CHECKBOOK.LIST} component={CheckBooks} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Clients)));