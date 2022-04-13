import React from 'react';
import Goals from './goals';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MIPRO } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Admin = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MIPRO.ADMINISTRATION.SELF} />
                    <Route path={MIPRO.ADMINISTRATION.GOAL.SELF} component={Goals} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Admin)));