import _ from 'lodash';
import * as moment from "moment";
import Select from "react-select";
import { injectIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import { Form, FormGroup } from "reactstrap";
import AppConfig from "Constants/AppConfig";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from 'react';
import FlagCountry from "Components/FlagCountry";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import CountryManager from 'Helpers/CountryManager';
import InputComponent from "Components/InputComponent";
import FormControl from '@material-ui/core/FormControl';
import { NotificationManager } from 'react-notifications';
import { Select as MaterialSelect } from "@material-ui/core";
import ErrorInputComponent from "Components/ErrorInputComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { getIdentificationType } from "Actions/independentActions";
import CustomAsyncComponent from "Components/CustomAsyncComponent";

const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const SecondStepForPerson = props => {
    const { loading, previousStep, setData, defaultState, intl } = props;
    const { register, errors, handleSubmit, watch, control, getValues } = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [errorMessages, setErrorMessages] = useState({
        startingDate: '',
        endingDate: '',
        birthDate: '',
    });

    const [identificationType, setIdentificationType] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getIdentificationType();
    }, []);

    const _getIdentificationType = () => {
        return new Promise((resolve, reject) => {
            setIdentificationType({ loading: true, data: null });
            getIdentificationType()
                .then(result => {
                    setIdentificationType({ loading: false, data: result });
                    resolve();
                })
                .catch(error => {
                    setIdentificationType({ loading: false, data: null });
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

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <div className="form-group text-left">

                <div className="row align-items-center">
                    {errors.phoneNumber?.type === 'required' && (
                        <div className="col-12">
                            <ErrorInputComponent text={intl.formatMessage({ id: errors.phoneNumber?.message })} />
                        </div>
                    )}
                    <FormGroup className="col-4 has-wrapper">
                        <InputLabel className="text-left pl-2" htmlFor="nationality">
                            Préfixe du numéro <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <InputComponent
                            errors={errors}
                            control={control}
                            register={register}
                            componentType="select"
                            name={'phoneNumberPrefix'}
                            as={(

                                <Select
                                    options={countryWithNumberAndFlag}
                                    filterOption={CountryManager.filterOptionsCodeAndFlag}
                                    getOptionLabel={item => <FlagCountry label={item.phonePrefixes[0]} flag={item.flag} />}
                                />
                            )}

                        />
                    </FormGroup>

                    <FormGroup className="col-8 has-wrapper">
                        <InputLabel className="text-left pl-2" htmlFor="nationality">
                            <IntlMessages id="auth.phoneNumber" /> <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <InputComponent
                            type="text"
                            isRequired
                            errors={errors}
                            id="phoneNumber"
                            register={register}
                            name={'phoneNumber'}
                            customRequiredDisplay={true}
                            className="has-input input-lg"
                            placeholder={intl.formatMessage({ id: "auth.phoneNumber" })}
                        />
                    </FormGroup>
                </div>


                <FormControl fullWidth>
                    <InputLabel className="text-left pl-2" htmlFor="nationality">
                        <IntlMessages id="common.nationality" />
                    </InputLabel>
                    <InputComponent
                        errors={errors}
                        id="nationality"
                        control={control}
                        isRequired={false}
                        register={register}
                        name={'nationality'}
                        componentType="select"
                        as={(
                            <Select
                                options={CountryManager.optionsNameAndFlag}
                                filterOption={CountryManager.filterOptionsNameAndFlag}
                                getOptionLabel={option => <FlagCountry label={option.name} flag={option.flag} />}
                            />
                        )}
                    />
                </FormControl>
            </div>

            <div className="form-group text-left">
                <FormControl fullWidth>
                    <InputLabel className="text-left pl-2" htmlFor="residenceCountries"><IntlMessages id="common.residenceCountry" /></InputLabel>
                    <InputComponent
                        errors={errors}
                        control={control}
                        isRequired={false}
                        register={register}
                        id="residenceCountry"
                        componentType="select"
                        name={'residenceCountry'}
                        as={(
                            <Select
                                options={CountryManager.optionsNameAndFlag}
                                filterOption={CountryManager.filterOptionsNameAndFlag}
                                getOptionLabel={option => <FlagCountry label={option.name} flag={option.flag} />}
                            />
                        )}
                    />
                </FormControl>
            </div>

            <div className="row align-items-flex-end">
                <CustomAsyncComponent
                    data={identificationType.data}
                    loading={identificationType.loading}
                    onRetryClick={_getIdentificationType}
                    component={data => {
                        return (
                            <div className="col-6 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="identificationType">
                                        <IntlMessages id="common.identificationType" />
                                    </InputLabel>
                                    <InputComponent
                                        errors={errors}
                                        control={control}
                                        isRequired={false}
                                        register={register}
                                        componentType="select"
                                        id="identificationType"
                                        name={'identificationType'}
                                        as={
                                            <MaterialSelect
                                                input={<Input name="identificationType"
                                                    id="identificationType-helper" />
                                                }>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))
                                                }
                                            </MaterialSelect>
                                        }
                                    />
                                </FormControl>
                            </div>
                        )
                    }}
                />
                <FormGroup className="col-6 has-wrapper">
                    <InputComponent
                        id="identificationNumber"
                        type="text"
                        isRequired={false}
                        name={'identificationNumber'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({ id: "common.identificationNumber" })}
                    />
                </FormGroup>
            </div>

            <div className="row align-items-flex-end">
                <FormGroup className="col-6 has-wrapper">
                    <InputLabel className="text-left" htmlFor="startingValidityDate">
                        <IntlMessages id="date.validity.start" />
                    </InputLabel>
                    <InputComponent
                        id="startingValidityDate"
                        type="date"
                        isRequired={false}
                        errors={errors}
                        register={register}
                        name={'startingValidityDate'}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({ id: "date.validity.start" })}
                    >
                        {errors.startingValidityDate && errors.startingValidityDate?.type !== 'required' && (
                            <ErrorInputComponent
                                text={intl.formatMessage(
                                    { id: errorMessages.startingDate.id },
                                    errorMessages.startingDate.value,
                                )}
                            />
                        )}
                    </InputComponent>
                </FormGroup>
                <FormGroup className="col-6 has-wrapper">
                    <InputLabel className="text-left" htmlFor="endingValidityDate">
                        <IntlMessages id="date.validity.end" />
                    </InputLabel>
                    <InputComponent
                        id="endingValidityDate"
                        type="date"
                        isRequired={false}
                        name={'endingValidityDate'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({ id: "date.validity.end" })}
                    >
                        {errors.endingValidityDate && errors.endingValidityDate?.type !== 'required' && (
                            <ErrorInputComponent
                                text={intl.formatMessage(
                                    { id: errorMessages.endingDate.id },
                                    errorMessages.endingDate.value,
                                )}
                            />
                        )}
                    </InputComponent>
                </FormGroup>
            </div>

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

SecondStepForPerson.propTypes = {

};

export default injectIntl(SecondStepForPerson);
