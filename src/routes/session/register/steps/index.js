
import { connect } from 'react-redux';
import { AUTH } from "Url/frontendUrl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import IntlMessages from "Util/IntlMessages";
import TerritoryType from "Enums/Territories";
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import Step from "@material-ui/core/Step/Step";
import Stepper from "@material-ui/core/Stepper/Stepper";
import { NotificationManager } from 'react-notifications';
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import FirstStep from "Routes/session/register/steps/firstStep";
import SecondStepForGroup from "Routes/session/register/steps/secondStepForGroup";
import SecondStepForPerson from "Routes/session/register/steps/secondStepForPerson";

const steps = [1, 2];

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

        if (_data.residenceCountry)
            _data.residenceCountry = _data.residenceCountry.id;

        if (_data.nationality)
            _data.nationality = _data.nationality.id;

        _data.identificationValue = _data.identificationNumber;
        _data.identificationType = _data.identificationType;

        if (_data.startingValidityDate)
            _data.identificationStartDate = _data.startingValidityDate;

        if (_data.endingValidityDate)
            _data.identificationEndDate = _data.endingValidityDate;

        _data.isOrganisation = _data.isOrganisation ? _data.isOrganisation : false;

        if(!_data.isOrganisation) {
            _data.telephone = '+' + _data.phoneNumberPrefix.details.find(d => d.code === TerritoryType.PHONE_INDICATOR)?.value + ' ' + _data.phoneNumber;
        }

        if(!_data.useEmailAsLogin)
            _data.login = _data.login; 
        else
            delete _data.login;

        if (this.token)
            _data.token = this.token;
        
        if (this.useMicrocapEmail)
            delete _data.email;

        delete _data.operator;
        delete _data.phoneNumberPrefix;
        delete _data.identificationNumber;
        delete _data.startingValidityDate;
        delete _data.endingValidityDate;
        delete _data.passwordConfirmation;

        if (!_data.useMicrocapEmail && !_data.email)
            return;
        if (!_data.useEmailAsLogin && !_data.login)
            return;

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

    previousStep = () => this.setState({ activeStep: this.state.activeStep - 1 < 0 ? 0 : this.state.activeStep - 1 });
    nextStep = () => this.setState({ activeStep: this.state.activeStep + 1 >= steps.length ? steps.length - 1 : this.state.activeStep + 1 });

    render() {

        const { loading, history } = this.props;

        return (
            <>
                <Stepper activeStep={this.state.activeStep} alternativeLabel className="stepper-rtl">
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel className="text-white">
                                    <IntlMessages id={`step.step${label}`} />
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {this.state.activeStep === 0 ? (
                    <FirstStep
                        history={history}
                        loading={loading}
                        setData={this._setData}
                        nextStep={this.nextStep}
                        defaultState={this.state.data}
                        previousStep={this.previousStep}
                    />
                ) : (
                    !this.state.data.isOrganisation ?
                        <SecondStepForPerson
                            history={history}
                            loading={loading}
                            setData={this._setData}
                            nextStep={this.nextStep}
                            defaultState={this.state.data}
                            previousStep={this.previousStep}
                        /> :
                        <SecondStepForGroup
                            history={history}
                            loading={loading}
                            setData={this._setData}
                            nextStep={this.nextStep}
                            defaultState={this.state.data}
                            previousStep={this.previousStep}
                        />
                )}
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(PersonRegister));
