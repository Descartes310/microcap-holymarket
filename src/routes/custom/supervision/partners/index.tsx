import React from 'react';
import List from './list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { SUPERVISION } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const SupervisionPartners = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={SUPERVISION.PARTNERS.LIST} />
                    <Route path={SUPERVISION.PARTNERS.LIST} component={List} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(SupervisionPartners)));