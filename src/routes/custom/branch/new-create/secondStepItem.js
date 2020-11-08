import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import {emailValidatorObject} from "Helpers/validator";
import ErrorInputComponent from "Components/ErrorInputComponent";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControl from "@material-ui/core/FormControl";

import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FlagCountry from "Components/FlagCountry";
import CountryManager from "Helpers/CountryManager";
import GenericObjectType from "Enums/GenericObjectType";
import CustomAsyncAddBtn from "Components/CustomAsyncAddBtn";

const countryWithNameAndFlag = CountryManager.countryWithNameAndFlag();
const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const ThirdStepItem = props => {
    const {
        intl,
        institutionType,
        _getInstitutionType,
        register,
        errors,
        control,
        step
    } = props;

    return (
        <div className="w-100">
            <CustomAsyncAddBtn
                data={institutionType.data}
                loading={institutionType.loading}
                onRetryClick={_getInstitutionType}
                type={GenericObjectType.INSTITUTION_TYPE}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="institutionType-helper">
                                Type d'etablissement
                            </InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={step + 'typeId'}
                                defaultValue={data[0] ? data[0].id : undefined}
                                as={<Select input={<Input name="institutionType" id="institutionType-helper" />}>
                                    {data.map((item, index) => (
                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>}
                            />
                        </FormControl>
                    </div>
                )}
            />

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="commercialName-helper">
                    Nom commercial
                </InputLabel>
                <InputComponent
                    id="commercialName"
                    type="text"
                    isRequired
                    name={step + 'name'}
                    errors={errors}
                    register={register}
                    className="input-lg"
                />
                <span className="has-icon"><i className="zmdi zmdi-pencil"></i></span>
            </FormGroup>

            <div className="row align-items-flex-end">
                <div className="col-12 mt-3">
                    <InputLabel className="text-left fw-bold">
                        Adresse d'implantation
                    </InputLabel>
                </div>
                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" id="number-h">
                        N°
                    </InputLabel>
                    <InputComponent
                        type="text"
                        isRequired
                        id="number-h"
                        name={step + 'identification'}
                        errors={errors}
                        register={register}
                        className="input-lg"
                    />
                    <span className="has-icon"><i className="zmdi zmdi-pencil"></i></span>
                </FormGroup>
                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" id="voiceType-h">
                        Type de voie
                    </InputLabel>
                    <InputComponent
                        type="text"
                        isRequired
                        id="voiceType-h"
                        name={step + 'type_voie'}
                        errors={errors}
                        register={register}
                        className="input-lg"
                    />
                    <span className="has-icon"><i className="zmdi zmdi-pencil"></i></span>
                </FormGroup>
                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" id="voice-h">
                        voie
                    </InputLabel>
                    <InputComponent
                        type="text"
                        isRequired
                        id="voice-h"
                        name={step + 'voie'}
                        errors={errors}
                        register={register}
                        className="input-lg"
                    />
                    <span className="has-icon"><i className="zmdi zmdi-pencil"></i></span>
                </FormGroup>

                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" id="complement-h">
                        Complément
                    </InputLabel>
                    <InputComponent
                        type="text"
                        isRequired
                        id="complement-h"
                        name={step + 'complement'}
                        errors={errors}
                        register={register}
                        className="input-lg"
                    />
                    <span className="has-icon"><i className="zmdi zmdi-pencil"></i></span>
                </FormGroup>

                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" id="postalCode-h">
                        Code Postal
                    </InputLabel>
                    <InputComponent
                        type="text"
                        isRequired
                        id="postalCode-h"
                        name={step + 'postalCode'}
                        errors={errors}
                        register={register}
                        className="input-lg"
                    />
                    <span className="has-icon"><i className="zmdi zmdi-pencil"></i></span>
                </FormGroup>

                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" id="city-h">
                        Ville
                    </InputLabel>
                    <InputComponent
                        type="text"
                        isRequired
                        id="city-h"
                        name={step + 'city'}
                        errors={errors}
                        register={register}
                        className="input-lg"
                    />
                    <span className="has-icon"><i className="zmdi zmdi-pencil"></i></span>
                </FormGroup>

                <div className="col-md-4 col-sm-12">
                    <FormControl fullWidth>
                        <InputLabel className="text-left pl-2" htmlFor="country">
                            Pays
                        </InputLabel>
                        <InputComponent
                            isRequired
                            className="mt-0"
                            errors={errors}
                            control={control}
                            register={register}
                            componentType="select"
                            name={step + 'country'}
                            defaultValue={countryWithNameAndFlag[0].id}
                            as={<Select input={<Input name="country" id="country" />}>
                                {countryWithNameAndFlag.map(item => (
                                    <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                        <FlagCountry flag={item.flag} label={item.name} />
                                    </MenuItem>
                                ))}
                            </Select>}
                        />
                    </FormControl>
                </div>
            </div>

            <div className="row">
                <div className="col-12 mt-3">
                    <InputLabel className="text-left fw-bold">
                        Contact
                    </InputLabel>
                </div>
                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="email"><IntlMessages id="auth.email"/></InputLabel>
                    <InputComponent
                        type="mail"
                        isRequired
                        errors={errors}
                        register={register}
                        className="input-lg"
                        id="email"
                        name={step + 'email'}
                        placeholder="info@gmail.com"
                        otherValidator={{pattern: emailValidatorObject.regex}}
                    >
                        {errors.email?.type === 'pattern' && (
                            <ErrorInputComponent text={intl.formatMessage({id: emailValidatorObject.message})} />
                        )}
                    </InputComponent>
                    <span className="has-icon"><i className="zmdi zmdi-email"></i></span>
                </FormGroup>
                <div className="col-md-6 col-sm-12">
                    <div className="row">
                        {errors.phone?.type === 'required' && (
                            <div className="col-12">
                                <ErrorInputComponent text={intl.formatMessage({id: errors.phone?.message})} />
                            </div>
                        )}
                        <FormGroup className="col-md-3 col-sm-4 has-wrapper">
                            <InputComponent
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={step + 'phonePrefix'}
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
                        <FormGroup className="col-md-9 col-sm-8 has-wrapper">
                            <InputLabel className="text-left" id="city-h">
                                Téléphone
                            </InputLabel>
                            <InputComponent
                                type="text"
                                isRequired
                                id="phone"
                                errors={errors}
                                register={register}
                                className="input-lg"
                                name={step + 'phone'}
                                customRequiredDisplay={true}
                            />
                            <span className="has-icon"><i className="zmdi zmdi-phone"></i></span>
                        </FormGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

ThirdStepItem.propTypes = {

};

export default injectIntl(ThirdStepItem);
