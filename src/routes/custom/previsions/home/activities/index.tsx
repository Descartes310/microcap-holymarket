import './style.css';
import { connect } from "react-redux";
import styled from 'styled-components';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from "Actions";
import { FUNDING, MIPRO, PROJECT } from 'Url/frontendUrl';

const P = styled.p`
font-size: 20px !important;
font-weight: bold;
margin-top: 10px !important;
`;

class Activities extends Component<any, any> {

    render() {

        return (
            <div className="row">
                <div className="col-sm-4 block" onClick={() => this.props.history.push(PROJECT.MINE.SELF)}>
                    <img src={require('Assets/img/service.png')} className="img-fluid img" alt="Mes projets" />
                    <P>Projets</P>
                </div>
                <div className="col-sm-4 block" onClick={() => this.props.history.push(FUNDING.BOURSE.DEALS.SENT)}>
                    <img src={require('Assets/img/finance.png')} className="img-fluid img" alt="Mes deals" />
                    <P>Deals</P>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(Activities)));