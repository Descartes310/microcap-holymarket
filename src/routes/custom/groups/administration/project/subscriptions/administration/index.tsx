import React from 'react';
import List from './list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import CanRoute from "Components/CanRoute";
import Permission from 'Enums/Permissions';
import {withRouter, Switch, Redirect} from "react-router-dom";

const MySubscriptions = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.ADMINISTRATION} />
                    <CanRoute permissions={[Permission.group.admin.setting.name]} path={GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.ADMINISTRATION} component={List} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(MySubscriptions)));