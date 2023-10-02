import React from 'react';
import {connect} from "react-redux";
import Attributes from './attributes';
import {injectIntl} from "react-intl";
import { PROJECT } from 'Url/frontendUrl';
import financements from './financements';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectConfig = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECT.CONFIGURATION.ATTRIBUTE.SELF} />
                <Route path={PROJECT.CONFIGURATION.ATTRIBUTE.SELF} component={Attributes} />
                <Route path={PROJECT.CONFIGURATION.FINANCEMENT.SELF} component={financements} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(ProjectConfig)));