import React, {Component} from 'react';
import { connect } from 'react-redux';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// redux action
import {createBranch, setRequestGlobalAction, getUserProfiles} from 'Actions';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Stepper from "@material-ui/core/Stepper/Stepper";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
import FourthStep from "./fourthStep";
import {HOME, NETWORK} from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {NotificationManager} from "react-notifications";
import {objectToFormData, toSnakeCase} from "Helpers/helpers";
import {injectIntl} from "react-intl";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {getOneSampleBranch, saveSampleBranchStep} from "Actions/independentActions";
import CountryManager from "Helpers/CountryManager";

const steps = [1, 2, 3, 4];

class CreateBranch extends Component {
    constructor(props) {
        super(props);

        this.sampleBranchId = new URLSearchParams(this.props.location.search).get("q");
        // this.sampleBranchId = this.props.location.state ? this.props.location.state.sampleBranchId : undefined;
        console.log("this.sampleBranchId => ", this.sampleBranchId);

        this.state = {
            activeStep: 0,
            data: {
                stepUpdate: []
            },
            loading: true,
        }
    }

    componentDidMount() {
        this.loadData();
        this.props.getUserProfiles(this.props.authUser.user.branch.id, this.props.authUser.userType);    
    }

    mapDataToFormData = (data) => {
        const _data = {};
        _data.stepUpdate = [];
        _data.branchId = this.sampleBranchId ? this.sampleBranchId : '';

        // Step 1
        _data.stepUpdate[0] = true;
        _data.socialReason = data.exploitant.corporateName;
        _data.commercialName = data.exploitant.commercialName;
        _data.sigle = data.exploitant.sigle;
        _data.registrationType = data.exploitant.immatriculationType;
        _data.registrationNumber = data.exploitant.immatriculationValue;
        _data.operatorNationality = data.exploitant.user.hostCountry;

        // Get prefix
        const _country = CountryManager.getCountryFromId(data.exploitant.user.hostCountry);
        if (_country) {
            const [_prefix, _phone] = data.exploitant.user.phone.split(_country.phonePrefixes[0]);

            _data.operatorPhoneNumberPrefix = _prefix;
            _data.operatorPhoneNumber = _phone;
        }

        _data.organisationType = data.exploitant.legalForm;
        _data.juridicForm = data.exploitant.juridicForm.id;
        _data.town = data.exploitant.user.city;
        _data.operatorEmail = data.exploitant.user.email;

        // Step 2
        _data.stepUpdate[1] = data.institutions.length > 0;
        data.institutions.forEach((institution, index) => {
            const _index = index + 1;
            _data[`${_index}typeId`] = institution.institutionType.id;
            _data[`${_index}name`] = institution.name;
            _data[`${_index}identification`] = institution.idetification;
            _data[`${_index}type_voie`] = institution.voieType;
            _data[`${_index}voie`] = institution.voie;
            _data[`${_index}complement`] = institution.complement;
            _data[`${_index}postalCode`] = institution.postalCode;
            _data[`${_index}email`] = institution.email;
            _data[`${_index}country`] = institution.country;

            const __country = CountryManager.getCountryFromId(institution.country);
            if (__country) {
                const [__prefix, __phone] = data.exploitant.user.phone.split(__country.phonePrefixes[0]);

                _data[`${_index}phonePrefix`] = __prefix;
                _data[`${_index}phone`] = __phone;
            }

            _data[`${_index}city`] = institution.idetification;
            _data[`${_index}town`] = institution.city;
        });

        // Step 3
        _data.stepUpdate[2] = data.representants.length > 0;
        data.representants.forEach((representant, index) => {
            const _index = index + 1;
            _data[`${_index}firstName`] = representant.firstName;
            _data[`${_index}lastName`] = representant.lastName;
            _data[`${_index}representativeEmail`] = representant.user.email;
            _data[`${_index}institution`] = representant.user.institution;
            _data[`${_index}representativeNationality`] = representant.hostCountry;

            const ___country = CountryManager.getCountryFromId(representant.user.hostCountry);
            if (___country) {
                const [___prefix, ___phone] = representant.user.phone.split(___country.phonePrefixes[0]);

                _data[`${_index}representativePhoneNumberPrefix`] = ___prefix;
                _data[`${_index}representativePhoneNumber`] = ___phone;
            }

            _data[`${_index}identificationType`] = representant.identificationType;
            _data[`${_index}identificationNumber`] = representant.identificationValue;
            _data[`${_index}post`] = representant.post;
        });

        return _data;
    };

    loadData = () => {
        this.setState({ loading: true });
        if (this.sampleBranchId !== undefined) {
            const id = this.sampleBranchId;
            getOneSampleBranch(id)
                .then(result => {
                    const _data = this.mapDataToFormData(result);
                    this.setState(prevState => ({
                        data: {
                            ...prevState.data,
                            ..._data
                        }
                    }));
                })
                .catch((err) => {
                    console.log(err)
                    NotificationManager.error("La branches ayant pour identifiant " + id + " n'a pas pu être trouvé");
                    this.setState({ data: {stepUpdate : []} });
                })
                .finally(() => this.setState({ loading: false }));
        } else {
            this.setState({ loading: false, data: {stepUpdate : []} });
        }
    };

    _setData = (newData, step, isEnd = false) => {
        this.setState(
            {data: {...this.state.data, ...newData}},
            () => {
                const objectData = this.getFormData(this.state.data);
                if (!this.state.data.stepUpdate[step - 1]) {
                    if (step < 5) {
                        this.saveStepData(step, objectData);
                    }
                } else {
                    this.nextStep();
                }
                // isEnd ? this.onSubmit(this.state.data) : null
            }
        );
    };

    getFormData = (data) => {
        let _data = {...data};
        // _data.url = _data.link;
        // _data.licence = _data.licenseNumber;
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

        _data.maxAdmins = Number(_data.maxAdmins);

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
        const representants = _data.legalRepresentatives && _data.legalRepresentatives.map(item => {
            const result = {...item};
            result.emailRepresentant = item.representativeEmail;
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
        _data.institutions = JSON.stringify(toSnakeCase(_data.institutions));
        _data.accounts = JSON.stringify(toSnakeCase(_data.accounts));

        // delete _data.legalRepresentatives;

        /*const _logo = _data.logo;
        delete _data.logo;
        _data = toSnakeCase(_data);
        _data = objectToFormData(_data);

        _data.append('logo', _logo);*/

        return {
            _data,
            config: {fileData: ['logo'], multipart: true},
        }
    };

    saveStepData = (step, objectData) => {
        const { _data, config } = objectData;
        this.props.setRequestGlobalAction(true);
        saveSampleBranchStep(step, _data, config)
            .then((result) => {
                if (step === 4) {
                    NotificationManager.success(this.props.intl.formatMessage({id: "branch.form.successCreation"}));
                    this.props.history.push(NETWORK.LIST);
                    return;
                } else {
                    NotificationManager.success("Données sauvegarder avec succès");
                }

                this.nextStep();

                if (step === 1) {
                    this.setState(prevState => ({ data: {...prevState.data, branchId: result.id} }));
                }
            })
            .catch(() => {
                NotificationManager.error("Erreur lors de la sauvegarde des données");
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onSubmit = (objectData) => {
        this.props.setRequestGlobalAction(true);
        const { _data, config } = objectData;

        createBranch(_data, config)
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
        const { requestGlobalLoader, history, match, authUser, userInfos} = this.props;
        const { data, activeStep, loading } = this.state;
        console.log('userInfos', userInfos);
        console.log('userInfosProps', this.props);

        if (loading) {
            return (<RctSectionLoader/>);
        }

        return (
            <>
                <PageTitleBar title={<IntlMessages id="branch.createText" />} match={match} />
                <RctCollapsibleCard>
                <Stepper activeStep={activeStep} alternativeLabel className="stepper-rtl">
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
                {activeStep === 0 ? (
                    <FirstStep
                        history={history}
                        authUser={authUser}
                        defaultState={data}
                        setData={this._setData}
                        nextStep={this.nextStep}
                        loading={requestGlobalLoader}
                        previousStep={this.previousStep}
                    />
                ) : (activeStep === 1 ? (
                        <SecondStep
                            history={history}
                            authUser={authUser}
                            defaultState={data}
                            setData={this._setData}
                            nextStep={this.nextStep}
                            loading={requestGlobalLoader}
                            previousStep={this.previousStep}
                        />
                    ) : (activeStep === 2 ? (
                            <ThirdStep
                                history={history}
                                authUser={authUser}
                                defaultState={data}
                                setData={this._setData}
                                nextStep={this.nextStep}
                                loading={requestGlobalLoader}
                                previousStep={this.previousStep}
                                userInfomations={userInfos}
                            />
                        ) : (
                            <FourthStep
                                history={history}
                                defaultState={data}
                                authUser={authUser}
                                setData={this._setData}
                                nextStep={this.nextStep}
                                loading={requestGlobalLoader}
                                previousStep={this.previousStep}
                            />
                        )
                    )
                )}
                </RctCollapsibleCard>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, userProfile}) => {
    return { requestGlobalLoader, 
             authUser: authUser.data,
             userInfos: userProfile.data
            }
};

export default connect(mapStateToProps, {getUserProfiles, setRequestGlobalAction})(injectIntl(CreateBranch));
