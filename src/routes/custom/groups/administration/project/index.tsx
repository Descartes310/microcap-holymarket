import React from 'react';
import List from './folders/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import configurations from './configurations';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Project = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.PROJECT.LIST} />
                    <Route path={GROUP.ADMINISTRATION.PROJECT.LIST} component={List} />
                    <Route path={GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.SELF} component={configurations} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Project)));