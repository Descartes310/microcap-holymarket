import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, Form, FormGroup} from "reactstrap";
import FormControl from '@material-ui/core/FormControl';
import InputComponent from "Components/InputComponent";
import ErrorInputComponent from "Components/ErrorInputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {injectIntl} from 'react-intl';
import CountryManager from 'Helpers/CountryManager';
import FlagCountry from "Components/FlagCountry";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import { NotificationManager } from 'react-notifications';
import * as moment from "moment";
import _ from 'lodash';
import {getOperators, getRegistrationType, getResidenceCountries} from "Actions/independentActions";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const ThirdStep = props => {
    const { loading, nextStep, previousStep, setData, defaultState, intl } = props;
    const { register, errors, handleSubmit, watch, control, getValues, setValue} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const formStateWatch = watch();
    const hasAcceptedTermsOfServicesWatch = watch('hasAcceptedTermsOfServices');

    const [oldFormState, setOldFormState] = useState({});
    const [errorMessages, setErrorMessages] = useState({
        startingDate: '',
        endingDate: '',
        birthDate: '',
    });

    const [registrationCountries, setRegistrationCountries] = useState({
        loading: true,
        data: null
    });

    const [operator, setOperator] = useState({
        loading: true,
        data: null
    });

    const [registrationType, setRegistrationType] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getRegistrationCountries();
        _getRegistrationType();
    }, []);

    const _getRegistrationCountries = () => {
        return new Promise((resolve, reject) => {
            setRegistrationCountries({loading: true, data: null});
            getResidenceCountries()
                .then(result => {
                    setRegistrationCountries({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setRegistrationCountries({loading: false, data: null});
                    NotificationManager.error("An error occur " + error);
                    setTimeout(() => reject(), 500);
                });
        });
    };

    const _getOperator = (registrationCountry) => {
        setOperator({loading: true, data: null});
        getOperators(registrationCountry)
            .then(result => {
                setOperator({loading: false, data: result});
            })
            .catch(error => {
                setOperator({loading: false, data: null});
                NotificationManager.error("An error occur " + error);
            });
    };

    const _getRegistrationType = () => {
        return new Promise((resolve, reject) => {
            setRegistrationType({loading: true, data: null});
            getRegistrationType()
                .then(result => {
                    setRegistrationType({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setRegistrationType({loading: false, data: null});
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        // Send data
        if (hasAcceptedTermsOfServicesWatch) {
            setData(data, true);
        } else {
            NotificationManager.warning(intl.formatMessage({id: 'common.acceptTermsAndConditions'}));
        }
    };

    const onPreviousClicked = (event) => {
        event.preventDefault();
        const values = getValues();
        setData(values);
        previousStep();
    };

    const validateRegistrationBeginningDate = value => {
        const startingDate = moment(value);
        const now = moment();

        if (!startingDate.isValid()) {
            // setErrorMessages({...errorMessages, startingDate: "Start date should be a valid one"});
            setErrorMessages({
                ...errorMessages,
                startingDate: {
                    id: 'form.error.date.valid',
                    value: {
                        date: intl.formatMessage({id: 'common.registrationBeginningDate'}),
                    }
                }
            });
            return false;
        }

        if (now.diff(startingDate) < 0) {
            // setErrorMessages({...errorMessages, startingDate: "Start date must not be upper than today date"});
            setErrorMessages({
                ...errorMessages,
                startingDate: {
                    id: 'form.error.date.maximumDate',
                    value: {
                        currentDate: intl.formatMessage({id: 'common.registrationBeginningDate'}),
                        maximumDate: _.lowerCase(intl.formatMessage({id: 'date.today'})),
                    }
                }
            });
            return false;
        }

        return true;
    };

    if (!_.isEqual(formStateWatch, oldFormState)) {
        // console.log("formStateWatch => ", formStateWatch);
        // console.log("oldFormState => ", oldFormState);
        // console.log("formStateWatch.registrationCountry !== oldFormState.registrationCountry => ", formStateWatch.registrationCountry !== oldFormState.registrationCountry);
        if (formStateWatch.registrationCountry !== oldFormState.registrationCountry) {
            _getOperator(formStateWatch.registrationCountry);
        }
        setOldFormState(formStateWatch);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <CustomAsyncComponent
                loading={registrationCountries.loading}
                data={registrationCountries.data}
                onRetryClick={_getRegistrationCountries}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="registrationCountry"><IntlMessages id="common.registrationCountry"/></InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={'registrationCountry'}
                                defaultValue={data[0]}
                                as={<Select input={<Input name="registrationCountry" id="registrationCountry" />}>
                                    {data.map((item, index) => {
                                        const countrySpec = CountryManager.getCountryWithNameAndFlagFromId(item);
                                        return (
                                            <MenuItem key={index} value={item} className="center-hor-ver">
                                                <FlagCountry flag={countrySpec.flag} label={countrySpec.name} />
                                            </MenuItem>
                                        )
                                    })}
                                </Select>}
                            />
                        </FormControl>
                    </div>
                )}
            />

            {oldFormState && oldFormState.registrationCountry && (
                <CustomAsyncComponent
                    loading={operator.loading}
                    data={operator.data}
                    onRetryClick={() => _getOperator(oldFormState.registrationCountry)}
                    component={data => (
                        <div className="form-group text-left">
                            <FormControl fullWidth>
                                <InputLabel className="text-left" htmlFor="operator-helper"><IntlMessages id="common.operator"/></InputLabel>
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    name={'operator'}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    defaultValue={data[0] ? data[0].id : undefined }
                                    as={<Select input={<Input name="operator" id="operator-helper" />}>
                                        {data.map((item, index) => (
                                            <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                {item.commercialName}
                                            </MenuItem>
                                        ))}
                                    </Select>}
                                />
                            </FormControl>
                        </div>
                    )}
                />
            )}

            <CustomAsyncComponent
                loading={registrationType.loading}
                data={registrationType.data}
                onRetryClick={_getRegistrationType}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="registrationType-helper"><IntlMessages id="common.registrationType"/></InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={'registrationType'}
                                defaultValue={data[0]}
                                as={<Select input={<Input name="registrationType" id="registrationType-helper" />}>
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

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="registrationNumber">
                    <IntlMessages id="common.registrationNumber"/>
                </InputLabel>
                <InputComponent
                    type="text"
                    isRequired
                    errors={errors}
                    register={register}
                    id="registrationNumber"
                    name={'registrationNumber'}
                    className="has-input input-lg"
                    // placeholder={intl.formatMessage({id: "common.registrationType"})}
                />
                <span className="has-icon"><i className="zmdi zmdi-card"></i></span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="registrationBeginningDate">
                    <IntlMessages id="common.registrationBeginningDate"/></InputLabel>
                <InputComponent
                    type="date"
                    isRequired
                    errors={errors}
                    register={register}
                    className="has-input input-lg"
                    id="registrationBeginningDate"
                    name={'registrationBeginningDate'}
                    // placeholder={intl.formatMessage({id: "date.birth"})}
                    otherValidator={{validate: value => validateRegistrationBeginningDate(value)}}
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


            <FormControl fullWidth>
                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    control={control}
                    register={register}
                    componentType="select"
                    id="hasAcceptedTermsOfServices"
                    name={'hasAcceptedTermsOfServices'}
                    // defaultValue={data[0]}
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={hasAcceptedTermsOfServicesWatch}
                            onChange={() => setValue('hasAcceptedTermsOfServices', !hasAcceptedTermsOfServicesWatch)}
                        />
                    } label={intl.formatMessage({id: 'common.agreeTermsConditions'})}
                    />}
                />
            </FormControl>

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

ThirdStep.propTypes = {

};

export default injectIntl(ThirdStep);
