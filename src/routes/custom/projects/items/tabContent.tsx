import React from 'react';
import SimpleItems from './simple';
import {connect} from "react-redux";
import ComplexItems from './complex';
import {injectIntl} from "react-intl";
import { PROJECT } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Catalogs = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PROJECT.ITEM.SIMPLE.SELF} />
                    <Route path={PROJECT.ITEM.SIMPLE.SELF} component={SimpleItems} />
                    <Route path={PROJECT.ITEM.COMPLEX.SELF} component={ComplexItems} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Catalogs)));