import React from 'react';
import List from './list';
import Create from './create';
import Folder from './folder';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const GroupAdministrationMember = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.MEMBER.LIST} />
                    <Route path={GROUP.ADMINISTRATION.MEMBER.LIST} component={List} />
                    <Route path={GROUP.ADMINISTRATION.MEMBER.CREATE} component={Create} />
                    <Route path={GROUP.ADMINISTRATION.MEMBER.FOLDER} component={Folder} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupAdministrationMember)));