
import React, { Component } from 'react';
import { connect } from 'react-redux';

// redux action
import { loginUserWithEmailAndPassword, registerOrganisation } from 'Actions';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Stepper from "@material-ui/core/Stepper/Stepper";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import { HOME } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";

const steps = [1, 2, 3];

class OrganisationRegister extends Component {
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
        _data.nationality = _data.registrationCountry;
        _data.hostCountry = _data.registrationCountry;
        _data.immatriculationType = _data.registrationType;
        _data.immatriculationValue = _data.registrationNumber;
        _data.legalForm = _data.organisationType;
        _data.corporateName = _data.socialReason;
        _data.login = _data.acceptLogin ? _data.login : _data.email;
        // _data.microcapOperator = _data.operator;
        if (this.token)
            _data.token = this.token

        delete _data.registrationCountry;
        delete _data.registrationType;
        delete _data.registrationNumber;
        delete _data.organisationType;
        delete _data.socialReason;
        delete _data.operator;
        delete _data.passwordConfirmation;
        delete _data.hasAcceptedTermsOfServices;
        delete _data.registrationBeginningDate;

        this.props
            .registerOrganisation(_data)
            .then(() => {
                this.props
                    .loginUserWithEmailAndPassword({ login: _data.login, password: _data.password })
                    .then(() => this.props.history.push(HOME));
            });
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
                ) : (this.state.activeStep === 1 ? (
                    <SecondStep
                        history={history}
                        loading={loading}
                        setData={this._setData}
                        nextStep={this.nextStep}
                        defaultState={this.state.data}
                        previousStep={this.previousStep}
                    />
                ) : (
                        <ThirdStep
                            history={history}
                            loading={loading}
                            setData={this._setData}
                            nextStep={this.nextStep}
                            defaultState={this.state.data}
                            previousStep={this.previousStep}
                        />
                    )
                    )}
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { registerOrganisation, loginUserWithEmailAndPassword })(withRouter(OrganisationRegister));
