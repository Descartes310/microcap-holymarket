import React from 'react';
import List from './list';
import update from './update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { PROJECT } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Financement = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PROJECT.CONFIGURATION.FINANCEMENT.LIST} />
                    <Route path={PROJECT.CONFIGURATION.FINANCEMENT.LIST} component={List} />
                    <Route path={PROJECT.CONFIGURATION.FINANCEMENT.UPDATE} component={update} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Financement)));