
import React, {Component} from 'react';
import { connect } from 'react-redux';

// redux action
import {registerPersonUser, loginUserWithEmailAndPassword} from 'Actions';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Stepper from "@material-ui/core/Stepper/Stepper";
import FirstStep from "Routes/session/register/person/firstStep";
import SecondStep from "Routes/session/register/person/secondStep";
import {objectToFormData, toSnakeCase} from "Helpers/helpers";
import {HOME} from "../../../../services/frontendRoute";

const steps = [1, 2];

class PersonRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            data: {}
        }
    }

    _setData = (newData, isEnd = false) => {
        this.setState(
            {data: {...this.state.data, ...newData}},
            () => isEnd ? this.onSubmit(this.state.data) : null
        );
    };

    onSubmit = (data) => {
        const _data = {...data};
        _data.phoneNumber = _data.phoneNumberPrefix + _data.phoneNumber;
        _data.hostCountry = _data.residenceCountry;
        _data.identificationValue = _data.identificationNumber;
        _data.startPieceValidity = _data.startingValidityDate;
        _data.endPieceValidity = _data.endingValidityDate;
        _data.microcapOperator = _data.operator;

        delete _data.phoneNumberPrefix;
        delete _data.residenceCountry;
        delete _data.identificationNumber;
        delete _data.startingValidityDate;
        delete _data.endingValidityDate;
        delete _data.operator;
        delete _data.passwordConfirmation;

        this.props
            .registerPersonUser(objectToFormData(toSnakeCase(_data)))
            .then(() => {
                this.props
                    .loginUserWithEmailAndPassword({email: _data.email, password: _data.password})
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
const mapStateToProps = ({ authUser, tokens }) => {
    return { loading: authUser.loading || tokens.loading };
};

export default connect(mapStateToProps, {registerPersonUser, loginUserWithEmailAndPassword})(PersonRegister);
