import React from 'react';
import List from './list';
import Create from './create';
import Update from './update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import MotivationList from './motivations/list';
import MotivationCreate from './motivations/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const GroupPost = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.POST.LIST} />
                    <Route path={GROUP.ADMINISTRATION.POST.LIST} component={List} />
                    <Route path={GROUP.ADMINISTRATION.POST.CREATE} component={Create} />
                    <Route path={GROUP.ADMINISTRATION.POST.UPDATE} component={Update} />
                    <Route path={GROUP.ADMINISTRATION.POST.MOTIVATION.LIST} component={MotivationList} />
                    <Route path={GROUP.ADMINISTRATION.POST.MOTIVATION.CREATE} component={MotivationCreate} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupPost)));