import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ListUnits from './items/list';
import CreateUnit from './items/create';
import ListUnitTypes from './types/list';
import { SETTING } from 'Url/frontendUrl';
import CreateUnitType from './types/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Units = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={SETTING.UNIT.LIST} />
                <Route path={SETTING.UNIT.LIST} component={ListUnits} />
                <Route path={SETTING.UNIT.CREATE} component={CreateUnit} />
                <Route path={SETTING.UNIT.TYPE.LIST} component={ListUnitTypes} />
                <Route path={SETTING.UNIT.TYPE.CREATE} component={CreateUnitType} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Units)));