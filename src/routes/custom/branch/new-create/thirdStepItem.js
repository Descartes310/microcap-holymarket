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
import Typography from "@material-ui/core/Typography";

const countryWithNameAndFlag = CountryManager.countryWithNameAndFlag();
const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const ThirdStepItem = props => {
    const {
        intl,
        identificationType,
        _getIdentificationType,
        institutionsWatch,
        organisationPosts,
        _getOrganisationPosts,
        position,
        _getPosition,
        register,
        errors,
        control,
        step,
        user_informations
    } = props;

    return (
        <div className="w-100">
            <div className="row align-items-flex-end">
                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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

            {/* representant legal*/}
            <div className="row">
                <div className="col-sm-12">
                    <CustomAsyncComponent
                        loading={false}
                        data={user_informations}
                        // onRetryClick={_getIdentificationType}
                        component={data => (
                            <div className="col-md-12 col-sm-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="institution-helper">
                                        Role du représentant legal
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={step + 'institution'}
                                        defaultValue={data[0] ? data[0].name : undefined}
                                        as={<Select input={<Input name="institution" id="institution-helper" />}>
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item.name} className="center-hor-ver">
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>}
                                    />
                                </FormControl>
                            </div>
                        )}
                    />
                </div>
            </div>

            
            <div className="row">
                <div className="col-sm-12">
                    <CustomAsyncComponent
                        loading={false}
                        data={institutionsWatch}
                        // onRetryClick={_getIdentificationType}
                        component={data => (
                            <div className="col-md-12 col-sm-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="institution-helper">
                                        Site d'implantation
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={step + 'institution'}
                                        defaultValue={data[0] ? data[0].name : undefined}
                                        as={<Select input={<Input name="institution" id="institution-helper" />}>
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item.name} className="center-hor-ver">
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>}
                                    />
                                </FormControl>
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="row">
                {errors.representativePhoneNumber?.type === 'required' && (
                    <div className="col-12">
                        <ErrorInputComponent text={intl.formatMessage({id: errors.representativePhoneNumber?.message})} />
                    </div>
                )}
                <FormGroup className="col-md-3 col-sm-4 has-wrapper">
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
                <FormGroup className="col-md-9 col-sm-8 has-wrapper">
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
                        <div className="col-md-6 col-sm-12 form-group text-left">
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
                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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

            {/*<CustomAsyncComponent
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
            />*/}

            <CustomAsyncAddBtn
                data={position.data}
                loading={position.loading}
                type={GenericObjectType.POSITION}
                onRetryClick={_getPosition}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="profile-helper">
                                Poste
                            </InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={step + 'post'}
                                defaultValue={data[0] ? data[0].name : undefined}
                                as={<Select input={<Input name="profile" id="profile-helper" />}>
                                    {data.map((item, index) => (
                                        <MenuItem key={index} value={item.name} className="center-hor-ver">
                                            {item.label}
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
