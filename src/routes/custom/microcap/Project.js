import './style.css';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { PREVISIONS } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from "Actions";

class Project extends Component {

    state = {
    };

    render() {

        return (
            <div className="row">
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/goal.png')} className="img-fluid img" alt="Objectifs du plan" />
                    <p>Objectifs du plan</p>
                </div>
                <div className="col-sm-4 block" onClick={() => this.props.history.push(PREVISIONS.LIST)}>
                    <img src={require('Assets/img/plan.png')} className="img-fluid img" alt="Plan prévisionnel de participation" />
                    <p>Plan prévisionnel de participation</p>
                </div>
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/finance.png')} className="img-fluid img" alt="Ma capacité financière" />
                    <p>Ma capacité financière</p>
                </div>
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/network.png')} className="img-fluid img" alt="Ma position réseau" />
                    <p>Ma position réseau</p>
                </div>
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/infos.png')} className="img-fluid img" alt="Fiche d'information membre" />
                    <p>Fiche d'information membre</p>
                </div>
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/service.png')} className="img-fluid img" alt="Infos de service" />
                    <p>Infos de service</p>
                </div>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(Project)));
