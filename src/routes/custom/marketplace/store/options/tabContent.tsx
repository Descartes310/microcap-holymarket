import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ListOptions from './items/list';
import ListTitles from './titles/list';
import CreateOption from './items/create';
import ListSupports from './supports/list';
import CreateTitle from './titles/create';
import { MARKETPLACE } from 'Url/frontendUrl';
import CreateSupport from './supports/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Units = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.STORE.OPTION.ITEM.LIST} />
                <Route path={MARKETPLACE.STORE.OPTION.ITEM.LIST} component={ListOptions} />
                <Route path={MARKETPLACE.STORE.OPTION.ITEM.CREATE} component={CreateOption} />
                <Route path={MARKETPLACE.STORE.OPTION.SUPPORT.LIST} component={ListSupports} />
                <Route path={MARKETPLACE.STORE.OPTION.SUPPORT.CREATE} component={CreateSupport} />
                <Route path={MARKETPLACE.STORE.OPTION.TITLE.LIST} component={ListTitles} />
                <Route path={MARKETPLACE.STORE.OPTION.TITLE.CREATE} component={CreateTitle} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Units)));