import React from 'react';
import List from './list';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { SETTING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const InvestmentItems = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={SETTING.INVESTMENT.LIST} />
                    <Route path={SETTING.INVESTMENT.LIST} component={List} />
                    <Route path={SETTING.INVESTMENT.CREATE} component={Create} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(InvestmentItems)));