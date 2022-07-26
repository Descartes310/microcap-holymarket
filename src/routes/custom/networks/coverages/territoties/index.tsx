import React from 'react';
import List from './list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { NETWORK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import Children from './child';
import Create from './create';

const Territories = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE.TERRITORY.LIST} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.LIST} component={List} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.CREATE} component={Create} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.CHILD.SELF} component={Children} />

                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Territories)));