import React from 'react';
import Posts from './posts';
import Mines from './mines';
import Items from './items';
import Details from './details';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { PROJECT } from 'Url/frontendUrl';
import Configurations from './configurations';
import Initializations from './initializations';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Projects = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PROJECT.MINE.SELF} />
                    <Route path={PROJECT.POST.SELF} component={Posts} />
                    <Route path={PROJECT.ITEM.SELF} component={Items} />
                    <Route path={PROJECT.MINE.SELF} component={Mines} />
                    <Route path={PROJECT.DETAILS.SELF} component={Details} />
                    <Route path={PROJECT.INITIALIZATION.SELF} component={Initializations} />
                    <Route path={PROJECT.CONFIGURATION.SELF} component={Configurations} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Projects)));