import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import properties from './properties';
import { PROJECT } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Attribute = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PROJECT.CONFIGURATION.ATTRIBUTE.LIST} />
                    <Route path={PROJECT.CONFIGURATION.ATTRIBUTE.LIST} component={List} />
                    <Route path={PROJECT.CONFIGURATION.ATTRIBUTE.CREATE} component={Create} />
                    <Route path={PROJECT.CONFIGURATION.ATTRIBUTE.UPDATE} component={Update} />
                    <Route path={PROJECT.CONFIGURATION.ATTRIBUTE.PROPERTIES} component={properties} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Attribute)));