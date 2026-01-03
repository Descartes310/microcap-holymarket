import React from 'react';
import List from './list';
import Details from './details';
import Accesses from './accesses';
import Profiles from './profiles';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { SUPERVISION } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const SupervisionUsers = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={SUPERVISION.USERS.LIST} />
                    <Route path={SUPERVISION.USERS.LIST} component={List} />
                    <Route path={SUPERVISION.USERS.PROFILES} component={Profiles} />
                    <Route path={SUPERVISION.USERS.ACCESSES} component={Accesses} />
                    <Route path={SUPERVISION.USERS.DETAILS} component={Details} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(SupervisionUsers)));