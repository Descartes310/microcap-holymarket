import React from 'react';
import List from './list';
import Items from './items';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { PROJECT } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Catalogs = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PROJECT.INITIALIZATION.LIST} />
                    <Route path={PROJECT.INITIALIZATION.LIST} component={List} />
                    <Route path={PROJECT.INITIALIZATION.ITEMS} component={Items} />
                    <Route path={PROJECT.INITIALIZATION.CREATE} component={Create} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Catalogs)));