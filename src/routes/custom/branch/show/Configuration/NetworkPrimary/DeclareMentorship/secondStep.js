import React, { useEffect, useState } from 'react';
import { Form, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import { emailValidatorObject } from "Helpers/validator";
import InputComponent from "Components/InputComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Button from "@material-ui/core/Button";
import {
    getOrganisationPosts,
    getIdentificationType,
    getOrganisationTypes,
    getRegistrationType,
    getResidenceCountries
} from "Actions/independentActions";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { NotificationManager } from "react-notifications";
import SweetAlert from 'react-bootstrap-sweetalert';
import FlagCountry from "Components/FlagCountry";
import CountryManager from "Helpers/CountryManager";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input/Input";

const countryWithNameAndFlag = CountryManager.countryWithNameAndFlag();
const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const SecondStep = props => {
    const { loading, fullScreen, previousStep, onClose, setData, intl, defaultState } = props;

    const { register, errors, handleSubmit, watch, control, getValues } = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [nonContractual, setNonContractual] = useState(false);

    const [organisationPosts, setOrganisationPosts] = useState({
        loading: true,
        data: null
    });

    const [identificationType, setIdentificationType] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getOrganisationPosts();
        _getRegistrationCountries();
        _getIdentificationType();
    }, []);

    const _getOrganisationPosts = () => {
        return new Promise((resolve, reject) => {
            setOrganisationPosts({ loading: true, data: null });
            getOrganisationPosts()
                .then(result => {
                    setOrganisationPosts({ loading: false, data: result });
                    resolve();
                })
                .catch(error => {
                    setOrganisationPosts({ loading: false, data: null });
                    NotificationManager.error("An error occur " + error);
                    setTimeout(() => reject(), 500);
                });
        });
    };

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

    const [logo, setLogo] = useState(null);

    const [registrationType, setRegistrationType] = useState({
        loading: true,
        data: null
    });

    const [registrationCountries, setRegistrationCountries] = useState({
        loading: true,
        data: null
    });

    const [organisationType, setOrganisationType] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getRegistrationType();
        _getOrganisationType();
    }, []);

    const _getOrganisationType = () => {
        return new Promise((resolve, reject) => {
            setOrganisationType({ loading: true, data: null });
            getOrganisationTypes()
                .then(result => {
                    setOrganisationType({ loading: false, data: result });
                    resolve();
                })
                .catch(error => {
                    setOrganisationType({ loading: false, data: null });
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
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

    /**
     * On submit
     */
    const onSubmit = (data) => {
        let dataToSend = {};
        console.log(data);
        Object.entries(data).forEach(item => {
            const _step = Number(item[0][0]), _value = item[0].substring(0);
            dataToSend[_step] = dataToSend[_step]
                ? { ...dataToSend[_step], [_value]: item[1] }
                : { [_value]: item[1] };
        });
        const result = { legalRepresentatives: Object.values(dataToSend) };

        // Send data
        setData(result, true);
        // Redirect to the next step
        // nextStep();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={!fullScreen ? 'center-holder' : ''}>
            <div className="w-100">
                <div className="row align-items-flex-end">
                    <CustomAsyncComponent
                        loading={organisationType.loading}
                        data={organisationType.data}
                        onRetryClick={_getOrganisationType}
                        component={data => (
                            <div className="col-md-12 col-sm-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="organisationType-helper"><IntlMessages id="common.organisationType" /></InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={'organisationType'}
                                        defaultValue={data[0]}
                                        as={<Select input={<Input name="organisationType" id="organisationType-helper" />}>
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

                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="socialReason"><IntlMessages id="common.socialReason" /></InputLabel>
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
                    <div className="col-md-6 col-sm-12">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="commercialName"><IntlMessages id="common.commercialName" /></InputLabel>
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

                <div className="row align-items-flex-end">
                    <CustomAsyncComponent
                        loading={registrationType.loading}
                        data={registrationType.data}
                        onRetryClick={_getRegistrationType}
                        component={data => (
                            <div className="col-md-6 col-sm-12 form-group text-left">
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
                            className="input-lg"
                        // placeholder={intl.formatMessage({id: "common.registrationType"})}
                        />
                        <span className="has-icon"><i className="zmdi zmdi-card"></i></span>
                    </FormGroup>
                </div>

                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="emailAddress">
                            Email de l'organisation
                        </InputLabel>
                        <InputComponent
                            type="text"
                            isRequired
                            errors={errors}
                            register={register}
                            id="emailAddress"
                            name={'emailAddress'}
                            className="input-lg"
                        // placeholder={intl.formatMessage({id: "common.registrationType"})}
                        />
                        <span className="has-icon"><i className="zmdi zmdi-card"></i></span>
                    </FormGroup>
                    <FormControl>
                        <InputLabel className="text-left pl-2" htmlFor="registrationCountry"><IntlMessages id="common.residenceCountry" /></InputLabel>
                        <InputComponent
                            isRequired
                            className="mt-0"
                            errors={errors}
                            control={control}
                            register={register}
                            componentType="select"
                            name={'registrationCountry'}
                            defaultValue={countryWithNameAndFlag[0].id}
                            as={<Select input={<Input name="registrationCountry" id="registrationCountry" />}>
                                {countryWithNameAndFlag.map(item => (
                                    <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                        <FlagCountry flag={item.flag} label={item.name} />
                                    </MenuItem>
                                ))}
                            </Select>}
                        />
                    </FormControl>
                </div>

                <FormGroup>
                    <InputComponent
                        isRequired
                        className="mt-0"
                        errors={errors}
                        control={control}
                        register={register}
                        id="nonContractual"
                        name={'nonContractual'}
                        // defaultValue={data[0]}
                        as={<FormControlLabel control={
                            <Checkbox
                                checked={nonContractual}
                                onChange={() => setNonContractual(!nonContractual)}
                                color="primary"
                            />
                        } label={"Non contractuel ?"}
                        />}
                    />
                </FormGroup>
            </div>


            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                <InputLabel className="text-left" htmlFor="contractNumber"><IntlMessages id="branch.field.contractNumber" /></InputLabel>
                <InputComponent
                    id="link"
                    isRequired
                    errors={errors}
                    register={register}
                    name={'contractNumber'}
                    className="input-lg"
                // placeholder={intl.formatMessage({id: "common.commercialName"})}
                />
                <span className="has-icon"><i className="ti-pencil"></i></span>
            </FormGroup>

            <FormGroup className="mb-15 mt-3">
                <Button
                    color="primary"
                    disabled={loading}
                    variant="outlined"
                    className="font-weight-bold mr-2"
                    onClick={onClose}
                >
                    Annuler
                </Button>

                <Button
                    type="submit"
                    color="primary"
                    disabled={loading}
                    variant="contained"
                    className="text-white font-weight-bold"
                    onClick={handleSubmit(onSubmit)}
                >
                    <IntlMessages id="button.submit" />
                </Button>
            </FormGroup>
        </Form>
    );
};

SecondStep.propTypes = {

};

export default injectIntl(SecondStep);
