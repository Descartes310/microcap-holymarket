import React, {Component} from 'react';
import { connect } from 'react-redux';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import {createUsers, getUsers} from "Actions";
import {NotificationManager} from "react-notifications";
import Stepper from "@material-ui/core/Stepper/Stepper";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import {USERS} from "Url/frontendUrl";

const steps = [1, 2];

class CreateUser extends Component {
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

        //
        _data.organisationId = this.props.authUser.id;

        delete _data.phoneNumberPrefix;
        delete _data.residenceCountry;
        delete _data.identificationNumber;
        delete _data.startingValidityDate;
        delete _data.endingValidityDate;
        delete _data.operator;
        delete _data.passwordConfirmation;

        this.props.setRequestGlobalAction(true);
        createUsers(_data, this.props.authUser.user.branch.id)
            .then(() => {
                this.props.getUsers(this.props.authUser.user.branch.id, this.props.authUser.userType);
                this.props.history.push(USERS.USERS.LIST);
            })
            .catch(() => {
                NotificationManager.error("Une erreur est survenue")
            })
            .finally(() => this.props.setRequestGlobalAction(false));
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
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { loading: requestGlobalLoader, authUser: authUser.data }
};

export default connect(mapStateToProps, {getUsers, setRequestGlobalAction})(CreateUser);
