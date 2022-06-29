import React from 'react';
import List from './list';
import Child from './child';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { NETWORK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Territories = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE.TERRITORY.LIST} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.LIST} component={List} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.CHILD} component={Child} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.CREATE} component={Create} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Territories)));