
import React, {Component} from 'react';
import { connect } from 'react-redux';

import RctAppLayout from 'Components/RctAppLayout';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// redux action
import {createAssistantConfiguration, setRequestGlobalAction} from 'Actions';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Stepper from "@material-ui/core/Stepper/Stepper";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import {NotificationManager} from "react-notifications";
import {objectToFormData, toSnakeCase} from "Helpers/helpers";
import {injectIntl} from "react-intl";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NetworkBranchIntlMessages from "Components/NetworkBranchIntlMessages";

const steps = [1, 2, 3];

const AssistantConfigurationCreateWrapper = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AssistantConfigurationCreate fullScreen={fullScreen} {...props} />
    );
};

class AssistantConfigurationCreate extends Component {
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
        this.props.setRequestGlobalAction(true);
        let _data = {...data};

        // Step 1
        _data.isMandatory = _data.isMandatory === 'true';


        // Step 2
        // _data.partnership_type = Number(this.props.partnershipSelected.id);
        _data.legalForm = _data.organisationType;
        _data.immatriculationType = _data.registrationType;
        _data.immatriculationValue = _data.registrationNumber;
        _data.corporateName = _data.socialReason;

        delete _data.organisationType;
        delete _data.registrationType;
        delete _data.registrationType;
        delete _data.socialReason;

        // Legal representative fields
        const representants = _data.legalRepresentatives.map(item => {
            const result = {...item};
            result.emailRepresentant = item.representativeEmail;
            result.post = item.representativePosition;
            result.telephoneRepresentant = item.representativePhoneNumberPrefix + item.representativePhoneNumber;
            result.identificationValue = item.identificationNumber;
            result.hostCountryRepresentant = item.representativeNationality;

            delete result.representativeEmail;
            delete result.representativePosition;
            delete result.representativePhoneNumberPrefix;
            delete result.representativePhoneNumber;
            delete result.identificationNumber;
            delete result.representativeNationality;

            return result;
        });
        _data.representants = JSON.stringify(toSnakeCase(representants));

        createAssistantConfiguration(_data, {fileData: ['logo'], multipart: true})
            .then(() => {
                NotificationManager.success(this.props.intl.formatMessage({id: "network.assistantConfiguration.create.successText"}));
                this.props.onClose();
            })
            .catch(error => {
                NotificationManager.error(this.props.intl.formatMessage({id: "error.500"}))
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    previousStep = () => this.setState({activeStep: this.state.activeStep - 1 < 0 ? 0 : this.state.activeStep - 1});
    nextStep = () => this.setState({activeStep: this.state.activeStep + 1 >= steps.length ? steps.length - 1 : this.state.activeStep + 1});

    render() {
        const { authUser, loading, fullScreen, history, match, show, onClose } = this.props;
        return (
            <>
                <RctCollapsibleCard>
                    <Stepper activeStep={this.state.activeStep} alternativeLabel className="stepper-rtl">
                        {steps.map(label => {
                            return (
                                <Step key={label}>
                                    <StepLabel className="text-white">
                                        <NetworkBranchIntlMessages id={`branch.step.${label}.label`} />
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {this.state.activeStep === 0 ? (
                        <FirstStep
                            history={history}
                            loading={loading}
                            fullScreen={fullScreen}
                            setData={this._setData}
                            nextStep={this.nextStep}
                            defaultState={this.state.data}
                            previousStep={this.previousStep}
                            authUser={authUser}
                        />
                    ) : (this.state.activeStep === 1 ? (
                        <SecondStep
                            history={history}
                            loading={loading}
                            fullScreen={fullScreen}
                            setData={this._setData}
                            nextStep={this.nextStep}
                            defaultState={this.state.data}
                            previousStep={this.previousStep}
                        />
                    ) : (
                        <ThirdStep
                            history={history}
                            loading={loading}
                            fullScreen={fullScreen}
                            setData={this._setData}
                            nextStep={this.nextStep}
                            defaultState={this.state.data}
                            previousStep={this.previousStep}
                        />
                    ))}
                </RctCollapsibleCard>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { loading: requestGlobalLoader, authUser: authUser.data }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(injectIntl(AssistantConfigurationCreateWrapper));
