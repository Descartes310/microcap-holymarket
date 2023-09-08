import React from 'react';
import Items from './items';
import Series from './series';
import Profiles from './profiles';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { ASSETS } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const AssetIndex = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={ASSETS.ITEM.SELF} />
                    <Route path={ASSETS.ITEM.SELF} component={Items} />
                    <Route path={ASSETS.SERIES.SELF} component={Series} />
                    <Route path={ASSETS.PROFILE.SELF} component={Profiles} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(AssetIndex)));