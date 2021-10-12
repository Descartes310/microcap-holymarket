import _ from 'lodash';
import * as moment from "moment";
import { injectIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import { Form, FormGroup } from "reactstrap";
import Button from "@material-ui/core/Button";
import FlagCountry from "Components/FlagCountry";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from 'react';
import CountryManager from 'Helpers/CountryManager';
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import FormControl from '@material-ui/core/FormControl';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ErrorInputComponent from "Components/ErrorInputComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { getOperators, getRegistrationType, getResidenceCountries, getAllSettingsByNameAndUrl } from "Actions/independentActions";


const countryWithNameAndFlag = CountryManager.countryWithNameAndFlag();

const ThirdStep = props => {
    const { loading, previousStep, setData, defaultState, intl } = props;
    const { register, errors, handleSubmit, watch, control, getValues, setValue } = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const formStateWatch = watch();
    const hasAcceptedTermsOfServicesWatch = watch('hasAcceptedTermsOfServices');

    const [oldFormState, setOldFormState] = useState({});
    const [cgu, setCgu] = useState('');
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
        getCGU();
    }, []);

    const _getRegistrationCountries = () => {
        return new Promise((resolve, reject) => {
            setRegistrationCountries({ loading: true, data: null });
            getResidenceCountries()
                .then(result => {
                    setRegistrationCountries({ loading: false, data: result });
                    resolve();
                })
                .catch(error => {
                    setRegistrationCountries({ loading: false, data: null });
                    NotificationManager.error("An error occur " + error);
                    setTimeout(() => reject(), 500);
                });
        });
    };

    const _getOperator = (registrationCountry) => {
        setOperator({ loading: true, data: null });
        getOperators(registrationCountry)
            .then(result => {
                setOperator({ loading: false, data: result });
            })
            .catch(error => {
                setOperator({ loading: false, data: null });
                NotificationManager.error("An error occur " + error);
            });
    };

    const getCGU = () => {
        getAllSettingsByNameAndUrl(window.location.host, 'CGU').then(data => {
            setCgu(data[0]);
        })
    };

    const _getRegistrationType = () => {
        return new Promise((resolve, reject) => {
            setRegistrationType({ loading: true, data: null });
            getRegistrationType()
                .then(result => {
                    setRegistrationType({ loading: false, data: result });
                    resolve();
                })
                .catch(error => {
                    setRegistrationType({ loading: false, data: null });
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
            NotificationManager.warning(intl.formatMessage({ id: 'common.acceptTermsAndConditions' }));
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
            setErrorMessages({
                ...errorMessages,
                startingDate: {
                    id: 'form.error.date.valid',
                    value: {
                        date: intl.formatMessage({ id: 'common.registrationBeginningDate' }),
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
                        currentDate: intl.formatMessage({ id: 'common.registrationBeginningDate' }),
                        maximumDate: _.lowerCase(intl.formatMessage({ id: 'date.today' })),
                    }
                }
            });
            return false;
        }

        return true;
    };

    if (!_.isEqual(formStateWatch, oldFormState)) {
        if (formStateWatch.registrationCountry !== oldFormState.registrationCountry) {
            _getOperator(formStateWatch.registrationCountry);
        }
        setOldFormState(formStateWatch);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>

            <div className="form-group text-left">
                <FormControl fullWidth>
                    <InputLabel className="text-left pl-2" htmlFor="registrationCountry-helper"><IntlMessages id="common.registrationCountry" /></InputLabel>
                    <InputComponent
                        isRequired
                        className="mt-0"
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        name={'registrationCountry'}
                        defaultValue={countryWithNameAndFlag[0].id}
                        as={<Select input={<Input name="registrationCountry" id="registrationCountry-helper" />}>
                            {countryWithNameAndFlag.map(item => (
                                <MenuItem key={item.id} value={item.id}>
                                    <FlagCountry flag={item.flag} label={item.name} />
                                </MenuItem>
                            ))}
                        </Select>}
                    />
                </FormControl>
            </div>

            <CustomAsyncComponent
                loading={registrationType.loading}
                data={registrationType.data}
                onRetryClick={_getRegistrationType}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="registrationType-helper"><IntlMessages id="common.registrationType" /></InputLabel>
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
                                        <MenuItem key={index} value={item}>
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
                    <IntlMessages id="common.registrationNumber" />
                </InputLabel>
                <InputComponent
                    type="text"
                    isRequired
                    errors={errors}
                    register={register}
                    id="registrationNumber"
                    name={'registrationNumber'}
                    className="has-input input-lg"
                />
                <span className="has-icon"><i className="zmdi zmdi-card"></i></span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="registrationBeginningDate">
                    <IntlMessages id="common.registrationBeginningDate" /></InputLabel>
                <InputComponent
                    type="date"
                    isRequired
                    errors={errors}
                    register={register}
                    className="has-input input-lg"
                    id="registrationBeginningDate"
                    name={'registrationBeginningDate'}
                    otherValidator={{ validate: value => validateRegistrationBeginningDate(value) }}
                >
                    {errors.birthDate && errors.birthDate?.type !== 'required' && (
                        <ErrorInputComponent
                            text={intl.formatMessage(
                                { id: errorMessages.birthDate.id },
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
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={hasAcceptedTermsOfServicesWatch}
                            onChange={() => setValue('hasAcceptedTermsOfServices', !hasAcceptedTermsOfServicesWatch)}
                        />
                    } label={
                        <>
                            J'accepte les <a href={cgu ? AppConfig.api.baseUrl+cgu.value : '/home'} target='_blank' >conditions générales d'utilisation</a>
                        </>
                    }
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
