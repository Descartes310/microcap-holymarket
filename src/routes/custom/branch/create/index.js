
import React, {Component} from 'react';
import { connect } from 'react-redux';

import RctAppLayout from 'Components/RctAppLayout';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// redux action
import {createBranch, setRequestGlobalAction} from 'Actions';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Stepper from "@material-ui/core/Stepper/Stepper";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import {HOME, NETWORK} from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {NotificationManager} from "react-notifications";
import {objectToFormData, toSnakeCase} from "Helpers/helpers";
import {injectIntl} from "react-intl";

const steps = [1, 2, 3];

class CreateBranch extends Component {
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
        _data.url = _data.link;
        _data.licence = _data.licenseNumber;
        _data.maxPfmNumber = _data.pfmshipLimit;
        _data.maxMemberNumber = _data.membershipLimit;
        _data.maxPartnerNumber = _data.partnershipLimit;

        delete _data.link;
        delete _data.licenseNumber;
        delete _data.pfmshipLimit;
        delete _data.membershipLimit;
        delete _data.partnershipLimit;

        // Operator fields
        _data.emailExploitant = _data.operatorEmail;
        _data.legalForm = _data.organisationType;
        _data.immatriculationType = _data.registrationType;
        _data.immatriculationValue = _data.registrationNumber;
        _data.hostCountry = _data.operatorNationality;
        _data.city = _data.town;
        _data.telephoneExploitant = _data.operatorPhoneNumberPrefix + _data.operatorPhoneNumber;
        _data.corporateName = _data.socialReason;

        delete _data.operatorEmail;
        delete _data.organisationType;
        delete _data.registrationType;
        delete _data.registrationType;
        delete _data.operatorNationality;
        delete _data.town;
        delete _data.operatorPhoneNumberPrefix;
        delete _data.operatorPhoneNumber;
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
        // delete _data.legalRepresentatives;

        /*const _logo = _data.logo;
        delete _data.logo;
        _data = toSnakeCase(_data);
        _data = objectToFormData(_data);

        _data.append('logo', _logo);*/

        createBranch(_data, {fileData: ['logo'], multipart: true})
            .then(() => {
                NotificationManager.success(this.props.intl.formatMessage({id: "branch.form.successCreation"}));
                this.props.history.push(NETWORK.LIST);
            })
            .catch(error => {
                NotificationManager.error(this.props.intl.formatMessage({id: "error.500"}))
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    previousStep = () => this.setState({activeStep: this.state.activeStep - 1 < 0 ? 0 : this.state.activeStep - 1});
    nextStep = () => this.setState({activeStep: this.state.activeStep + 1 >= steps.length ? steps.length - 1 : this.state.activeStep + 1});

    render() {
        const { loading, history, match } = this.props;
        return (
            <>
                <PageTitleBar title={<IntlMessages id="branch.createText" />} match={match} />
                <RctCollapsibleCard>
                <Stepper activeStep={this.state.activeStep} alternativeLabel className="stepper-rtl">
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel className="text-white">
                                    <IntlMessages id={`branch.step.${label}.label`} />
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
                </RctCollapsibleCard>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(injectIntl(CreateBranch));
