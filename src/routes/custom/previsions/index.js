import List from './List';
import Goals from './Goals';
import Create from './Create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ClientInfos from './ClientInfos';
import React, { Component } from 'react';
import {PREVISIONS} from "Url/frontendUrl";
import PeriodesList from './periodes/List';
import PeriodeDetails from './periodes/Show';
import PeriodesCreate from './periodes/Create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

class Products extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={PREVISIONS.LIST} />
                        <Route path={PREVISIONS.LIST} component={List} />
                        <Route path={PREVISIONS.GOALS} component={Goals} />
                        <Route path={PREVISIONS.CREATE} component={Create} />
                        <Route path={PREVISIONS.INFOS} component={ClientInfos} />
                        <Route path={PREVISIONS.PERIODES.LIST} component={PeriodesList} />
                        <Route path={PREVISIONS.PERIODES.CREATE} component={PeriodesCreate} />
                        <Route path={PREVISIONS.PERIODES.DETAILS} component={PeriodeDetails} />
                    </Switch>
                </>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Products)));
