
import { connect } from 'react-redux';
import React, {Component} from 'react';

// redux action
import {HOME} from "Url/frontendUrl";
import IntlMessages from "Util/IntlMessages";
import { withRouter } from "react-router-dom";
import Step from "@material-ui/core/Step/Step";
import Stepper from "@material-ui/core/Stepper/Stepper";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import FirstStep from "Routes/session/register/person/firstStep";
import SecondStep from "Routes/session/register/person/secondStep";
import {registerPersonUser, loginUserWithEmailAndPassword} from 'Actions';

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
            {data: {...this.state.data, ...newData}},
            () => isEnd ? this.onSubmit(this.state.data) : null
        );
    };

    onSubmit = (data) => {
        const _data = {...data};
        _data.phoneNumber = _data.phoneNumberPrefix + _data.phoneNumber;
        _data.hostCountry = _data.residenceCountry.id;
        _data.nationality = _data.nationality.id;
        _data.identificationValue = _data.identificationNumber;
        _data.startPieceValidity = _data.startingValidityDate;
        _data.endPieceValidity = _data.endingValidityDate;
        // _data.identificationType = _data.identificationType.value;
        // _data.identificationType = _data.identificationType.value;
        _data.login = _data.acceptLogin ? _data.login : _data.email;

        if(this.token)
            _data.token = this.token;
        delete _data.phoneNumberPrefix;
        delete _data.residenceCountry;
        delete _data.identificationNumber;
        delete _data.startingValidityDate;
        delete _data.endingValidityDate;
        delete _data.operator;
        delete _data.passwordConfirmation;

        this.props
            .registerPersonUser(_data)
            .then(() => {
                this.props
                    .loginUserWithEmailAndPassword({login: _data.login, password: _data.password})
                    .then(() => this.props.history.push(HOME));
            });
    };

    previousStep = () => this.setState({activeStep: this.state.activeStep - 1 < 0 ? 0 : this.state.activeStep - 1});
    nextStep = () => this.setState({activeStep: this.state.activeStep + 1 >= steps.length ? steps.length - 1 : this.state.activeStep + 1});

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
                    <SecondStep
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

export default connect(mapStateToProps, {registerPersonUser, loginUserWithEmailAndPassword})(withRouter(PersonRegister));
