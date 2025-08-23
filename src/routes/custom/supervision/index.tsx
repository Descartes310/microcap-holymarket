import React from 'react';
import Users from './users';
import Votes from './votes';
import Audits from './audits';
import Partners from './partners';
import Projects from './projects';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Operations from './operations';
import { SUPERVISION } from 'Url/frontendUrl';
import ContactRequests from './contactRequests';
import FundingCampaigns from './fundingCampaigns';
import FinancialStructures from './financialStructures';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Supervisions = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={SUPERVISION.USERS.SELF} />
                    <Route path={SUPERVISION.USERS.SELF} component={Users} />
                    <Route path={SUPERVISION.PARTNERS.SELF} component={Partners} />
                    <Route path={SUPERVISION.VOTES.SELF} component={Votes} />
                    <Route path={SUPERVISION.OPERATIONS.SELF} component={Operations} />
                    <Route path={SUPERVISION.AUDIT.SELF} component={Audits} />
                    <Route path={SUPERVISION.PROJECTS.SELF} component={Projects} />
                    <Route path={SUPERVISION.FINANCIAL_STRUCTURE.SELF} component={FinancialStructures} />
                    <Route path={SUPERVISION.FUNDING_CAMPAIGN.SELF} component={FundingCampaigns} />
                    <Route path={SUPERVISION.CONTACT_REQUEST.SELF} component={ContactRequests} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Supervisions)));