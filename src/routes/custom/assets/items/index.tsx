import React from 'react';
import List from './list';
import Mine from './mine';
import Create from './create';
import {connect} from "react-redux";
import childList from './childList';
import {injectIntl} from "react-intl";
import { ASSETS } from 'Url/frontendUrl';
import mineChildList from './mineChildList';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const AssetItems = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={ASSETS.ITEM.LIST} />
                    <Route path={ASSETS.ITEM.LIST} component={List} />
                    <Route path={ASSETS.ITEM.CREATE} component={Create} />
                    <Route path={ASSETS.ITEM.MINE_CHILD} exact component={mineChildList} />
                    <Route path={ASSETS.ITEM.MINE_SUB_CHILD} exact component={mineChildList} />
                    <Route path={ASSETS.ITEM.MINE} component={Mine} />
                    <Route path={ASSETS.ITEM.CHILD} exact component={childList} />
                    <Route path={ASSETS.ITEM.SUB_CHILD} exact component={childList} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(AssetItems)));