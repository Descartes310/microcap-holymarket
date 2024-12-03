import React from 'react';
import Units from './units';
import Events from './events';
import Agents from './agents';
import PmeVote from './100pme';
import Articles from './articles';
import UserFiles from './user-files';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Investments from './investments';
import { SETTING } from 'Url/frontendUrl';
import Immatriculations from './immatriculations';
import MessagesTemplates from './messagesTemplates';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Setting = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={SETTING.UNIT.SELF} />
                <Route path={SETTING.UNIT.SELF} component={Units} />
                <Route path={SETTING.EVENT.SELF} component={Events} />
                <Route path={SETTING.AGENT.SELF} component={Agents} />
                <Route path={SETTING.PIONIER.SELF} component={Agents} />
                <Route path={SETTING.ARTICLE.SELF} component={Articles} />
                <Route path={SETTING.USER_FILE.SELF} component={UserFiles} />
                <Route path={SETTING.IMMATRICULATION.SELF} component={Immatriculations} />
                <Route path={SETTING.MESSAGE_TEMPLATE.SELF} component={MessagesTemplates} />
                <Route path={SETTING.PME_VOTE.SELF} component={PmeVote} />
                <Route path={SETTING.INVESTMENT.SELF} component={Investments} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Setting)));