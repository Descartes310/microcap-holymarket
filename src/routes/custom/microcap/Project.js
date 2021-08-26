import './style.css';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import styled from 'styled-components';
import React, { Component } from 'react';
import { PREVISIONS } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from "Actions";

const P = styled.p`
font-size: 20px !important;
font-weight: bold;
margin-top: 10px !important;
`;

class Project extends Component {

    state = {
    };

    render() {

        return (
            <div className="row">
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/goal.png')} className="img-fluid img" alt="Objectifs du plan" />
                    <P>Objectifs du plan</P>
                </div>
                <div className="col-sm-4 block" onClick={() => this.props.history.push(PREVISIONS.LIST)}>
                    <img src={require('Assets/img/plan.png')} className="img-fluid img" alt="Plan prévisionnel de participation" />
                    <P>Plan prévisionnel de participation</P>
                </div>
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/finance.png')} className="img-fluid img" alt="Ma capacité financière" />
                    <P>Ma capacité financière</P>
                </div>
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/network.png')} className="img-fluid img" alt="Ma position réseau" />
                    <P>Ma position réseau</P>
                </div>
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/infos.png')} className="img-fluid img" alt="Fiche d'information membre" />
                    <P>Fiche d'information membre</P>
                </div>
                <div className="col-sm-4 block">
                    <img src={require('Assets/img/service.png')} className="img-fluid img" alt="Infos de service" />
                    <P>Infos de service</P>
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
