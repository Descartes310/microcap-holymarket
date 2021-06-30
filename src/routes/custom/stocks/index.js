import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {STOCK} from "Url/frontendUrl";
import {connect} from "react-redux";
import Financial from "./financials";
import Oppotunity from "./opportunities";
import ProjectShow from "../projects/folders/Show";

const StockIndex = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={STOCK.FINANCIAL.SELF} />
                <Route path={STOCK.OPPORTUITY.SELF} component={Oppotunity} />
                <Route path={STOCK.FINANCIAL.SELF} component={Financial} />
                <Route path={STOCK.FINANCIAL.PROJECT_SHOW} component={ProjectShow} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(StockIndex));