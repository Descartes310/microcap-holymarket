import React from 'react';
import {connect} from "react-redux";
import ListItems from './items/list';
import {injectIntl} from "react-intl";
import ListTopics from './topics/list';
import { GROUP } from 'Url/frontendUrl';
import CreateTopic from './topics/create';
import CreateItem from './items/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Units = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.ARTICLE.ITEM.LIST} />
                <Route path={GROUP.ADMINISTRATION.ARTICLE.ITEM.LIST} component={ListItems} />
                <Route path={GROUP.ADMINISTRATION.ARTICLE.ITEM.CREATE} component={CreateItem} />
                <Route path={GROUP.ADMINISTRATION.ARTICLE.TOPIC.LIST} component={ListTopics} />
                <Route path={GROUP.ADMINISTRATION.ARTICLE.TOPIC.CREATE} component={CreateTopic} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Units)));