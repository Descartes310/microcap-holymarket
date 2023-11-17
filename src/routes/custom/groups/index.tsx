import React from 'react';
import Types from './types';
import Roles from './roles';
import Details from './details';
import {connect} from "react-redux";
import Communities from './community';
import Categories from './categories';
import {injectIntl} from "react-intl";
import structures from './structures';
import { GROUP } from 'Url/frontendUrl';
import fundingOptions from './fundingOptions';
import Administration from './administration';
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
                    <Route path={GROUP.ROLE.SELF} component={Roles} />
                    <Route path={GROUP.DETAILS.SELF} component={Details} />
                    <Route path={GROUP.CATEGORY.SELF} component={Categories} />
                    <Route path={GROUP.COMMUNITY.SELF} component={Communities} />
                    <Route path={GROUP.ADMINISTRATION.SELF} component={Administration} />
                    <Route path={GROUP.FUNDING_OPTION.SELF} component={fundingOptions} />
                    <Route path={GROUP.STRUCTURE.SELF} component={structures} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Groups)));