import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import {emailValidatorObject, minMaxValidatorObject, passwordValidatorObject} from "Helpers/validator";
import ErrorInputComponent from "Components/ErrorInputComponent";
import AppConfig from "Constants/AppConfig";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import _ from 'lodash';

import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControl from "@material-ui/core/FormControl";

import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FlagCountry from "Components/FlagCountry";
import {
    getOperators,
    getRegistrationType,
    getOrganisationPosts,
    getIdentificationType
} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import CountryManager from "Helpers/CountryManager";
import AccordionDetails from "@material-ui/core/AccordionDetails/AccordionDetails";

const countryWithNameAndFlag = CountryManager.countryWithNameAndFlag();
const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const ThirdStepItem = props => {
    const {
        intl,
        identificationType,
        _getIdentificationType,
        organisationPosts,
        _getOrganisationPosts,
        register,
        errors,
        control,
        step
    } = props;

    return (
        <div className="w-100">
            <div className="row align-items-flex-end">
                <FormGroup className="col-4 has-wrapper">
                    <InputComponent
                        id="firstName"
                        type="text"
                        isRequired
                        name={step + 'firstName'}
                        errors={errors}
                        register={register}
                        className="input-lg"
                        placeholder={intl.formatMessage({id: "components.firstName"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                </FormGroup>
                <FormGroup className="col-4 has-wrapper">
                    <InputComponent
                        id="firstName"
                        type="text"
                        isRequired
                        name={step + 'lastName'}
                        errors={errors}
                        register={register}
                        className="input-lg"
                        placeholder={intl.formatMessage({id: "components.lastName"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                </FormGroup>
                <FormGroup className="col-4 has-wrapper">
                    <InputLabel className="text-left" htmlFor="representativeEmail"><IntlMessages id="auth.email"/></InputLabel>
                    <InputComponent
                        type="mail"
                        isRequired
                        errors={errors}
                        register={register}
                        className="input-lg"
                        id="representativeEmail"
                        name={step + 'representativeEmail'}
                        placeholder="info@gmail.com"
                        otherValidator={{pattern: emailValidatorObject.regex}}
                    >
                        {errors.representativeEmail?.type === 'pattern' && (
                            <ErrorInputComponent text={intl.formatMessage({id: emailValidatorObject.message})} />
                        )}
                    </InputComponent>
                    <span className="has-icon"><i className="zmdi zmdi-email"></i></span>
                </FormGroup>
            </div>

            <div className="row">
                {errors.representativePhoneNumber?.type === 'required' && (
                    <div className="col-12">
                        <ErrorInputComponent text={intl.formatMessage({id: errors.representativePhoneNumber?.message})} />
                    </div>
                )}
                <FormGroup className="col-2 has-wrapper">
                    <InputComponent
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        name={step + 'representativePhoneNumberPrefix'}
                        defaultValue={countryWithNumberAndFlag[0].phonePrefixes[0]}
                        as={<Select>
                            {countryWithNumberAndFlag.map(item => (
                                <MenuItem key={item.id} value={item.phonePrefixes[0]} className="center-hor-ver">
                                    <FlagCountry flag={item.flag} label={item.phonePrefixes[0]} />
                                </MenuItem>
                            ))}
                        </Select>}
                    />
                </FormGroup>
                <FormGroup className="col-10 has-wrapper">
                    <InputComponent
                        type="text"
                        isRequired
                        errors={errors}
                        register={register}
                        customRequiredDisplay={true}
                        className="input-lg"
                        id="representativePhoneNumber"
                        name={step + 'representativePhoneNumber'}
                        placeholder={intl.formatMessage({id: "auth.phoneNumber"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-phone"></i></span>
                </FormGroup>
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
                                    name={step + 'identificationType'}
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
                        type="text"
                        isRequired
                        errors={errors}
                        register={register}
                        id="identificationNumber"
                        name={step + 'identificationNumber'}
                        className="input-lg"
                        placeholder={intl.formatMessage({id: "common.identificationNumber"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-card"></i></span>
                </FormGroup>
            </div>

            <div className="form-group text-left">
                <FormControl fullWidth>
                    <InputLabel className="text-left pl-2" htmlFor="representativeNationality"><IntlMessages id="common.residenceCountry"/></InputLabel>
                    <InputComponent
                        isRequired
                        className="mt-0"
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        name={step + 'representativeNationality'}
                        defaultValue={countryWithNameAndFlag[0].id}
                        as={<Select input={<Input name="representativeNationality" id="representativeNationality" />}>
                            {countryWithNameAndFlag.map(item => (
                                <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                    <FlagCountry flag={item.flag} label={item.name} />
                                </MenuItem>
                            ))}
                        </Select>}
                    />
                </FormControl>
            </div>

            <CustomAsyncComponent
                loading={organisationPosts.loading}
                data={organisationPosts.data}
                onRetryClick={_getOrganisationPosts}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="representativePosition">
                                <IntlMessages id="branch.field.representativePosition"/>
                            </InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={step + 'representativePosition'}
                                defaultValue={data[0]}
                                as={<Select input={<Input name="representativePosition" id="representativePosition" />}>
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
        </div>
    );
};

ThirdStepItem.propTypes = {

};

export default injectIntl(ThirdStepItem);
