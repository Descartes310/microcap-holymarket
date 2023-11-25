import React from 'react';
import List from './list';
import create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import CampaignList from './campaigns/list';
import CampaignCreate from './campaigns/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FinancialStructure = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.LIST} />
                    <Route path={GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.LIST} component={List} />
                    <Route path={GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CREATE} component={create} />
                    <Route path={GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CAMPAIGN_LIST} component={CampaignList} />
                    <Route path={GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CAMPAIGN_CREATE} component={CampaignCreate} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FinancialStructure)));