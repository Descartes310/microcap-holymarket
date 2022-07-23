import React from 'react';
import List from './list/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { NETWORK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import ListChildren from "./list/list";
import Setting from './setting/setting';
// import Create from '../create';

const Children = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE.TERRITORY.CHILD.LIST} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.LIST} component={List} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.CHILD.LIST} component={ListChildren} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.CHILD.SETTING} component={Setting} />
                    {/* <Route path={NETWORK.COVERAGE.TERRITORY.CREATE} component={Create} /> */}
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Children)));