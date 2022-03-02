import React from 'react';
import GetIn from './GetIn';
import Terms from './Terms';
import Events from './Events';
import Values from './Values';
import Blog from './blog/Blog';
import Home from './discover/home';
import {connect} from "react-redux";
import Solidarity from './Solidarity';
import {injectIntl} from "react-intl";
import CGU from './discover/pages/CGU';
import Discover from './discover/index';
import { LANDING } from 'Url/frontendUrl';
import LegalMention from './LegalMention';
import BlogDetails from './blog/BlogDetails';
import Agents from './discover/pages/Agents';
import Mission from './discover/pages/Mission';
import Service from './discover/pages/Service';
import Gallery from './discover/pages/Gallery';
import MoneyManagement from './MoneyManagement';
import Pioniers from './discover/pages/Pionier';
import PassDetails from './discover/pages/OfferDetails';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Landing = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={LANDING.HOME} />
                    <Route path={LANDING.HOME} component={Home} />
                    <Route exact path={LANDING.CGU} component={CGU} />
                    <Route exact path={LANDING.BLOG} component={Blog} />
                    <Route exact path={LANDING.GETIN} component={GetIn} />
                    <Route exact path={LANDING.TERMS} component={Terms} />
                    <Route exact path={LANDING.AGENTS} component={Agents} />
                    <Route exact path={LANDING.VALUES} component={Values} />
                    <Route exact path={LANDING.EVENTS} component={Events} />
                    <Route exact path={LANDING.MISSION} component={Mission} />
                    <Route exact path={LANDING.SERVICES} component={Service} />
                    <Route exact path={LANDING.DISCOVER} component={Discover} />
                    <Route exact path={LANDING.PIONIERS} component={Pioniers} />
                    <Route exact path={LANDING.SOLIDARITY} component={Solidarity} />
                    <Route exact path={LANDING.GALERY_PROJECT} component={Gallery} />
                    <Route exact path={LANDING.PASS_DETAILS} component={PassDetails} />
                    <Route exact path={LANDING.BLOG_DETAILS} component={BlogDetails} />
                    <Route exact path={LANDING.LEGAL_MENTION} component={LegalMention} />
                    <Route exact path={LANDING.MONEY_MANAGEMENT} component={MoneyManagement} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Landing)));