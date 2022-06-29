import React from 'react';
import Show from './show';
import Update from './update';
import Gallery from './gallery';
import Activity from './activities';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { PROJECT } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Details = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PROJECT.DETAILS.SHOW} />
                    <Route path={PROJECT.DETAILS.SHOW} component={Show} />
                    <Route path={PROJECT.DETAILS.GALLERY} component={Gallery} />
                    <Route path={PROJECT.DETAILS.UPDATE} component={Update} />
                    <Route path={PROJECT.DETAILS.ACTIVITY.SELF} component={Activity} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Details)));