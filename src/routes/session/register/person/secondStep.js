import _ from 'lodash';
import * as moment from "moment";
import {injectIntl} from 'react-intl';
import {useForm} from "react-hook-form";
import {Form, FormGroup} from "reactstrap";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from 'react';
import FlagCountry from "Components/FlagCountry";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import CountryManager from 'Helpers/CountryManager';
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import FormControl from '@material-ui/core/FormControl';
import { NotificationManager } from 'react-notifications';
import {getResidenceCountries, getOperators} from "Actions";
import ErrorInputComponent from "Components/ErrorInputComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import {getIdentificationType} from "Actions/independentActions";

const countryWithNameAndFlag = CountryManager.countryWithNameAndFlag();
const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const SecondStep = props => {
    const { loading, nextStep, previousStep, setData, defaultState, intl } = props;
    const { register, errors, handleSubmit, watch, control, getValues} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const formStateWatch = watch();

    const [oldFormState, setOldFormState] = useState({});
    const [errorMessages, setErrorMessages] = useState({
        startingDate: '',
        endingDate: '',
        birthDate: '',
    });

    const [residenceCountries, setResidenceCountries] = useState({
        loading: true,
        data: null
    });

    const [operator, setOperator] = useState({
        loading: true,
        data: null
    });

    const [identificationType, setIdentificationType] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getResidenceCountry().then(() => _getIdentificationType());
    }, []);

    const _getResidenceCountry = () => {
        return new Promise((resolve, reject) => {
            setResidenceCountries({loading: true, data: null});
            getResidenceCountries()
                .then(result => {
                    setResidenceCountries({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setResidenceCountries({loading: false, data: null});
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
    };

    const _getOperator = (residenceCountry) => {
        setOperator({loading: true, data: null});
        getOperators(residenceCountry)
            .then(result => {
                setOperator({loading: false, data: result});
            })
            .catch(error => {
                setOperator({loading: false, data: null});
                NotificationManager.error("An error occur " + error);
            });
    };

    const _getIdentificationType = () => {
        return new Promise((resolve, reject) => {
            setIdentificationType({loading: true, data: null});
            getIdentificationType()
                .then(result => {
                    setIdentificationType({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setIdentificationType({loading: false, data: null});
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setData(data, true);
    };

    const onPreviousClicked = (event) => {
        event.preventDefault();
        const values = getValues();
        setData(values);
        previousStep();
    };

    const validateStartingValidityDate = value => {
        const startingDate = moment(value);
        const now = moment();

        if (!startingDate.isValid()) {
            setErrorMessages({
                ...errorMessages,
                startingDate: {
                    id: 'form.error.date.valid',
                    value: {
                        date: intl.formatMessage({id: 'date.validity.start'}),
                    }
                }
            });
            return false;
        }

        if (now.diff(startingDate) < 0) {
            setErrorMessages({
                ...errorMessages,
                startingDate: {
                    id: 'form.error.date.maximumDate',
                    value: {
                        currentDate: intl.formatMessage({id: 'date.validity.start'}),
                        maximumDate: _.lowerCase(intl.formatMessage({id: 'date.today'})),
                    }
                }
            });
            return false;
        }

        return true;
    };

    const validateEndingValidityDate = (endingDate, startingDate) => {
        const _endingDate = moment(endingDate);
        const _startingDate = moment(startingDate);

        if (!_startingDate.isValid()) {
            return true;
        }

        if (_endingDate.diff(_startingDate) < 0) {
            setErrorMessages({
                ...errorMessages,
                endingDate: {
                    id: 'form.error.date.maximumDate',
                    value: {
                        currentDate: intl.formatMessage({id: 'date.validity.start'}),
                        maximumDate: _.lowerCase(intl.formatMessage({id: 'date.validity.end'})),
                    }
                }
            });
            return false;
        }

        return true;
    };

    const validateBirthDate = value => {
        const birthDate = moment(value);
        const now = moment();

        if (!birthDate.isValid()) {
            setErrorMessages({
                ...errorMessages,
                birthDate: {
                    id: 'form.error.date.valid',
                    value: {
                        date: intl.formatMessage({id: 'date.birth'}),
                    }
                }
            });
            return false;
        }

        if (now.diff(birthDate, 'years') <= AppConfig.minYearOld) {
            setErrorMessages({
                ...errorMessages,
                birthDate: {
                    id: 'form.error.date.min',
                    value: {
                        minAge: AppConfig.minYearOld
                    }
                }
            });
            return false;
        }

        if (now.diff(birthDate) < 0) {
            setErrorMessages({
                ...errorMessages,
                birthDate: {
                    id: 'form.error.date.maximumDate',
                    value: {
                        currentDate: intl.formatMessage({id: 'date.birth'}),
                        maximumDate: _.lowerCase(intl.formatMessage({id: 'date.today'})),
                    }
                }
            });
            return false;
        }

        return true;
    };

    if (!_.isEqual(formStateWatch, oldFormState)) {
        if (formStateWatch.residenceCountry !== oldFormState.residenceCountry) {
            _getOperator(formStateWatch.residenceCountry);
        }
        setOldFormState(formStateWatch);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <div className="form-group text-left">
                <FormControl fullWidth>
                    <InputLabel className="text-left pl-2" htmlFor="nationality-helper"><IntlMessages id="common.nationality"/></InputLabel>
                    <InputComponent
                        isRequired
                        className="mt-0"
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        name={'nationality'}
                        defaultValue={countryWithNameAndFlag[0].id}
                        as={<Select input={<Input name="nationality" id="nationality-helper" />}>
                            {countryWithNameAndFlag.map(item => (
                                <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                    <FlagCountry flag={item.flag} label={item.name} />
                                </MenuItem>
                            ))}
                        </Select>}
                    />
                </FormControl>
            </div>

            <div className="form-group text-left">
                <FormControl fullWidth>
                    <InputLabel className="text-left pl-2" htmlFor="residenceCountries-helper"><IntlMessages id="common.residenceCountry"/></InputLabel>
                    <InputComponent
                        isRequired
                        className="mt-0"
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        name={'residenceCountry'}
                        defaultValue={countryWithNameAndFlag[0].id}
                        as={<Select input={<Input name="residenceCountry" id="residenceCountries-helper" />}>
                            {countryWithNameAndFlag.map(item => (
                                <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                    <FlagCountry flag={item.flag} label={item.name} />
                                </MenuItem>
                            ))}
                        </Select>}
                    />
                </FormControl>
            </div>

            <div className="row align-items-flex-end">
                <CustomAsyncComponent
                    loading={identificationType.loading}
                    data={identificationType.data}
                    onRetryClick={_getIdentificationType}
                    component={data => (
                        <div className="col-6 form-group text-left">
                            <FormControl fullWidth>
                                <InputLabel className="text-left" htmlFor="identificationType-helper"><IntlMessages id="common.identificationType"/></InputLabel>
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    name={'identificationType'}
                                    defaultValue={data[0]}
                                    as={<Select input={<Input name="identificationType" id="identificationType-helper" />}>
                                        {data.map((item, index) => (
                                            <MenuItem key={index} value={item} className="center-hor-ver">
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>}
                                />
                            </FormControl>
                        </div>
                    )}
                />
                <FormGroup className="col-6 has-wrapper">
                    <InputComponent
                        id="identificationNumber"
                        type="text"
                        isRequired
                        name={'identificationNumber'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({id: "common.identificationNumber"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-card"></i></span>
                </FormGroup>
            </div>

            <div className="row align-items-flex-end">
                <FormGroup className="col-6 has-wrapper">
                    <InputLabel className="text-left" htmlFor="startingValidityDate">
                        <IntlMessages id="date.validity.start"/>
                    </InputLabel>
                    <InputComponent
                        id="startingValidityDate"
                        type="date"
                        isRequired
                        errors={errors}
                        register={register}
                        name={'startingValidityDate'}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({id: "components.lastName"})}
                        otherValidator={{validate: value => validateStartingValidityDate(value)}}
                    >
                        {errors.startingValidityDate && errors.startingValidityDate?.type !== 'required' && (
                            <ErrorInputComponent
                                text={intl.formatMessage(
                                    {id: errorMessages.startingDate.id},
                                    errorMessages.startingDate.value,
                                )}
                            />
                        )}
                    </InputComponent>
                </FormGroup>
                <FormGroup className="col-6 has-wrapper">
                    <InputLabel className="text-left" htmlFor="endingValidityDate">
                        <IntlMessages id="date.validity.end"/>
                    </InputLabel>
                    <InputComponent
                        id="endingValidityDate"
                        type="date"
                        isRequired
                        name={'endingValidityDate'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({id: "date.validity.end"})}
                        otherValidator={{validate: value => validateEndingValidityDate(value, watch('startingValidityDate'))}}
                    >
                        {errors.endingValidityDate && errors.endingValidityDate?.type !== 'required' && (
                            <ErrorInputComponent
                                text={intl.formatMessage(
                                    {id: errorMessages.endingDate.id},
                                    errorMessages.endingDate.value,
                                )}
                            />
                        )}
                    </InputComponent>
                </FormGroup>
            </div>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="birthDate-helper">
                    <IntlMessages id="date.birth"/></InputLabel>
                <InputComponent
                    type="date"
                    id="birthDate-helper"
                    isRequired
                    name={'birthDate'}
                    errors={errors}
                    register={register}
                    className="has-input input-lg"
                    placeholder={intl.formatMessage({id: "date.birth"})}
                    otherValidator={{validate: value => validateBirthDate(value)}}
                >
                    {errors.birthDate && errors.birthDate?.type !== 'required' && (
                        <ErrorInputComponent
                            text={intl.formatMessage(
                                {id: errorMessages.birthDate.id},
                                errorMessages.birthDate.value,
                            )}
                        />
                    )}
                </InputComponent>
            </FormGroup>

            <FormGroup className="mb-15">
                <Button
                    color="primary"
                    disabled={loading}
                    variant="outlined"
                    className="font-weight-bold mr-2"
                    onClick={onPreviousClicked}
                >
                    <i className="ti-arrow-left font-weight-bold mr-2"></i> <IntlMessages id="button.previous" />
                </Button>

                <Button
                    type="submit"
                    color="primary"
                    disabled={loading}
                    variant="contained"
                    className="text-white font-weight-bold"
                >
                    <IntlMessages id="auth.signup" />
                </Button>
            </FormGroup>
        </Form>
    );
};

SecondStep.propTypes = {

};

export default injectIntl(SecondStep);
