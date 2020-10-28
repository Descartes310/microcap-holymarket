
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
import {HOME, NETWORK} from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {NotificationManager} from "react-notifications";
import {objectToFormData, toSnakeCase} from "Helpers/helpers";
import {injectIntl} from "react-intl";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {createNetworkProfilePartnership} from "Actions/independentActions";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';

const steps = [1, 2];

const DeclareMentorshipWrapper = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <DeclareMentorship fullScreen={fullScreen} {...props} />
    );
};

class DeclareMentorship extends Component {
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
        _data.partnership_type = Number(this.props.partnershipSelected.id);
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
        // delete _data.legalRepresentatives;

        /*const _logo = _data.logo;
        delete _data.logo;
        _data = toSnakeCase(_data);
        _data = objectToFormData(_data);

        _data.append('logo', _logo);*/

        createNetworkProfilePartnership(_data, {fileData: ['logo'], multipart: true})
            .then(() => {
                NotificationManager.success(this.props.intl.formatMessage({id: "branch.partnership.create.successText"}));
                this.props.onClose();
            })
            .catch(error => {
                console.log("error => ", JSON.stringify(error));
                NotificationManager.error(this.props.intl.formatMessage({id: "error.500"}))
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    previousStep = () => this.setState({activeStep: this.state.activeStep - 1 < 0 ? 0 : this.state.activeStep - 1});
    nextStep = () => this.setState({activeStep: this.state.activeStep + 1 >= steps.length ? steps.length - 1 : this.state.activeStep + 1});

    render() {
        const { loading, history, fullScreen, match, show, onClose, partnershipSelected } = this.props;
        return (
            <>
                <Dialog
                    open={show}
                    onClose={onClose}
                    fullScreen={fullScreen}
                    aria-labelledby="responsive-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            <IntlMessages id={`branch.declareMentorship`} />
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={onClose}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
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
                                    fullScreen={fullScreen}
                                    setData={this._setData}
                                    nextStep={this.nextStep}
                                    partnershipSelected={partnershipSelected}
                                    defaultState={this.state.data}
                                    previousStep={this.previousStep}
                                />
                            ) : (<SecondStep
                                history={history}
                                loading={loading}
                                fullScreen={fullScreen}
                                setData={this._setData}
                                nextStep={this.nextStep}
                                defaultState={this.state.data}
                                previousStep={this.previousStep}
                            />)}
                        </RctCollapsibleCard>
                    </DialogContent>
                    {/*<DialogActions>
                        {footer()}
                    </DialogActions>*/}
                </Dialog>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(injectIntl(DeclareMentorshipWrapper));
