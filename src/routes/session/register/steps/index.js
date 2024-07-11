
import { connect } from 'react-redux';
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import { NotificationManager } from 'react-notifications';
import FirstStep from "Routes/session/register/steps/firstStep";

class PersonRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            data: {}
        }
    }

    token = new URLSearchParams(this.props.location.search).get("token");

    _setData = (newData, isEnd = false) => {
        this.setState(
            { data: { ...this.state.data, ...newData } },
            () => isEnd ? this.onSubmit(this.state.data) : null
        );
    };

    onSubmit = (data) => {
        const _data = { ...data };

        _data.isOrganisation = _data.isOrganisation ? _data.isOrganisation : false;

        if(!_data.useEmailAsLogin)
            _data.login = _data.login; 
        else
            delete _data.login;

        if (this.token)
            _data.token = this.token;
        
        if (this.useMicrocapEmail)
            delete _data.email;

        delete _data.login;
        delete _data.passwordConfirmation;
        
        if (!_data.useMicrocapEmail && !_data.email)
            return;

        delete _data.useMicrocapEmail;

        this.props.setRequestGlobalAction(true);
        UserService.registerUser(_data)
        .then((response) => {
            this.props.onSuccess(response);
        }).catch(() => {
            NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard.");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    };

    render() {

        const { loading, history } = this.props;

        return (
            <FirstStep
                history={history}
                loading={loading}
                setData={this.onSubmit}
                defaultState={this.state.data}
            />
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(PersonRegister));
