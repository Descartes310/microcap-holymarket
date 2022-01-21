import React from 'react';
import Types from './types';
import Roles from './roles';
import {connect} from "react-redux";
import Categories from './categories';
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Groups = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.TYPE.SELF} />
                    <Route path={GROUP.TYPE.SELF} component={Types} />
                    <Route path={GROUP.ROLE.SELF} component={Roles} />
                    <Route path={GROUP.CATEGORY.SELF} component={Categories} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Groups)));