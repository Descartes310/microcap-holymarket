import React from 'react';
import products from './products';
import settings from './settings';
import {connect} from "react-redux";
import Attributes from './attributes';
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import financements from './financements';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectConfig = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.ATTRIBUTE.SELF} />
                <Route path={GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.ATTRIBUTE.SELF} component={Attributes} />
                <Route path={GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.PRODUCT.SELF} component={products} />
                {/* <Route path={GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.FINANCEMENT.SELF} component={financements} /> */}
                <Route path={GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.SETTING.SELF} component={settings} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(ProjectConfig)));