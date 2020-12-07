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
    getGenericData,
    getRegistrationType,
} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import CountryManager from "Helpers/CountryManager";
import CustomAsyncAddBtn from "Components/CustomAsyncAddBtn";
import GenericObjectType from "Enums/GenericObjectType";

const countryWithNameAndFlag = CountryManager.countryWithNameAndFlag();
const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const FirstStep = props => {
    const { loading, nextStep, previousStep, setData, intl, defaultState, authUser } = props;

    const { register, errors, handleSubmit, watch, control, getValues} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [logo, setLogo] = useState(null);

    const [registrationType, setRegistrationType] = useState({
        loading: true,
        data: null
    });

    const [organisationType, setOrganisationType] = useState({
        loading: true,
        data: null
    });

    const [juridicForm, setJuridicForm] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getRegistrationType();
        _getOrganisationType();
        _getJuridicForm();
    }, []);

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

    const _getOrganisationType = () => {
        return new Promise((resolve, reject) => {
            setOrganisationType({loading: true, data: null});
            getGenericData(GenericObjectType.ORGANISATION, authUser.branchId)
                .then(result => {
                    setOrganisationType({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setOrganisationType({loading: false, data: null});
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
    };

    const _getJuridicForm = () => {
        return new Promise((resolve, reject) => {
            setJuridicForm({loading: true, data: null});
            getGenericData(GenericObjectType.JURIDIC_FORM, authUser.branchId)
                .then(result => {
                    setJuridicForm({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setJuridicForm({loading: false, data: null});
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        if (logo === null) {
            NotificationManager.error("Vous devez selectionner un logo");
            return;
        }

        if (data.organisationType === null) {
            NotificationManager.error("Vous devez un type d'organisation");
            return;
        }

        if (data.juridicForm === null) {
            NotificationManager.error("Vous devez une forme juridique");
            return;
        }

        // Send data
        setData({...data, logo,}, 1);
        // Redirect to the next step
        // nextStep();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <div className="row">
                <div className="col-6">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="socialReason"><IntlMessages id="common.socialReason"/></InputLabel>
                        <InputComponent
                            id="socialReason"
                            type="text"
                            isRequired
                            errors={errors}
                            register={register}
                            name={'socialReason'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.socialReason"})}
                        />
                        <span className="has-icon"><i className="ti-pencil"></i></span>
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="commercialName"><IntlMessages id="common.commercialName"/></InputLabel>
                        <InputComponent
                            isRequired
                            errors={errors}
                            id="commercialName"
                            register={register}
                            name={'commercialName'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                        <span className="has-icon"><i className="ti-pencil"></i></span>
                    </FormGroup>
                </div>
            </div>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="commercialName">
                    Sigle
                </InputLabel>
                <InputComponent
                    isRequired
                    errors={errors}
                    id="sigle"
                    register={register}
                    name={'sigle'}
                    className="input-lg"
                />
                <span className="has-icon"><i className="ti-pencil"></i></span>
            </FormGroup>

            <div className="row align-items-flex-end">
                <CustomAsyncComponent
                    loading={registrationType.loading}
                    data={registrationType.data}
                    onRetryClick={_getRegistrationType}
                    component={data => (
                        <div className="col-6 form-group text-left">
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
                <FormGroup className="col-6 has-wrapper">
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
                        className="input-lg"
                        // placeholder={intl.formatMessage({id: "common.registrationType"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-card"></i></span>
                </FormGroup>
            </div>

            <div className="form-group text-left">
                <FormControl fullWidth>
                    <InputLabel className="text-left pl-2" htmlFor="operatorNationality">
                        <IntlMessages id="common.residenceCountry"/>
                    </InputLabel>
                    <InputComponent
                        isRequired
                        className="mt-0"
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        name={'operatorNationality'}
                        defaultValue={countryWithNameAndFlag[0].id}
                        as={<Select input={<Input name="opnationality" id="operatorNationality" />}>
                            {countryWithNameAndFlag.map(item => (
                                <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                    <FlagCountry flag={item.flag} label={item.name} />
                                </MenuItem>
                            ))}
                        </Select>}
                    />
                </FormControl>
            </div>

            <div className="row">
                {errors.operatorPhoneNumber?.type === 'required' && (
                    <div className="col-12">
                        <ErrorInputComponent text={intl.formatMessage({id: errors.operatorPhoneNumber?.message})} />
                    </div>
                )}
                <FormGroup className="col-2 has-wrapper">
                    <InputComponent
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        name={'operatorPhoneNumberPrefix'}
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
                        id="operatorPhoneNumber"
                        register={register}
                        name={'operatorPhoneNumber'}
                        customRequiredDisplay={true}
                        className="input-lg"
                        placeholder={intl.formatMessage({id: "auth.phoneNumber"})}
                    />
                    <span className="has-icon"><i className="zmdi zmdi-phone"></i></span>
                </FormGroup>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <CustomAsyncAddBtn
                        type={GenericObjectType.ORGANISATION}
                        loading={organisationType.loading}
                        data={organisationType.data}
                        onRetryClick={_getOrganisationType}
                        component={data => (
                            <div className="form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="organisationType-helper"><IntlMessages id="common.organisationType"/></InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={'organisationType'}
                                        defaultValue={data[0] ? data[0].name : undefined}
                                        as={<Select input={<Input name="organisationType" id="organisationType-helper" />}>
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
                <div className="col-md-6 col-sm-12">
                    <CustomAsyncAddBtn
                        type={GenericObjectType.JURIDIC_FORM}
                        loading={juridicForm.loading}
                        data={juridicForm.data}
                        onRetryClick={_getJuridicForm}
                        component={data => (
                            <div className="form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="juridicForm-helper">
                                        Forme juridique
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={'juridicForm'}
                                        defaultValue={data[0] ? data[0].id : undefined}
                                        as={<Select input={<Input name="juridicForm" id="juridicForm-helper" />}>
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
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="town">
                            Ville
                        </InputLabel>
                        <InputComponent
                            id="town"
                            type="text"
                            isRequired
                            name={'town'}
                            errors={errors}
                            register={register}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.socialReason"})}
                        />
                        <span className="has-icon"><i className="ti-home"></i></span>
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="operatorEmail"><IntlMessages id="auth.email"/></InputLabel>
                        <InputComponent
                            id="operatorEmail"
                            type="mail"
                            isRequired
                            name={'operatorEmail'}
                            errors={errors}
                            register={register}
                            placeholder="info@gmail.com"
                            className="input-lg"
                            otherValidator={{pattern: emailValidatorObject.regex}}
                        >
                            {errors.operatorEmail?.type === 'pattern' && (
                                <ErrorInputComponent text={intl.formatMessage({id: emailValidatorObject.message})} />
                            )}
                        </InputComponent>
                        <span className="has-icon"><i className="zmdi zmdi-email"/></span>
                    </FormGroup>
                </div>
            </div>

            <FormGroup>
                <InputLabel className="text-left" htmlFor="operatorEmail">
                    <IntlMessages id="branch.field.logo"/>
                </InputLabel>
                <Input
                    id="File"
                    type="file"
                    name="file"
                    onChange={event => setLogo(event.target.files[0])}
                />
            </FormGroup>

            <FormGroup className="mb-15">
                <Button
                    // type="submit"
                    color="primary"
                    disabled={loading}
                    variant="contained"
                    className="text-white font-weight-bold"
                    onClick={handleSubmit(onSubmit)}
                >
                    <IntlMessages id="button.next" /> <i className="ti-arrow-right font-weight-bold ml-2"></i>
                </Button>
            </FormGroup>
        </Form>
    );
};

FirstStep.propTypes = {

};

export default injectIntl(FirstStep);
