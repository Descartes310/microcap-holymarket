import React from 'react';
import List from './list';
import update from './update';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { PROJECT } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Folders = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PROJECT.MINE.FOLDER.LIST} />
                    <Route path={PROJECT.MINE.FOLDER.LIST} component={List} />
                    <Route path={PROJECT.MINE.FOLDER.CREATE} component={Create} />
                    <Route path={PROJECT.MINE.FOLDER.UPDATE} component={update} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Folders)));