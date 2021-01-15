import React, {useEffect, useState} from 'react';
import {Form, FormGroup,  Input as InputStrap} from "reactstrap";
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
import {
    getOperators,
    getOrganisationTypes,
    getRegistrationType,
    getResidenceCountries
} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import CountryManager from "Helpers/CountryManager";
import NetworkBranchIntlMessages from "Components/NetworkBranchIntlMessages";

const SecondStep = props => {
    const { previousStep, loading, nextStep, fullScreen, setData, intl, defaultState } = props;

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

    useEffect(() => {
        _getRegistrationType();
        _getOrganisationType();
    }, []);

    const _getOrganisationType = () => {
        return new Promise((resolve, reject) => {
            setOrganisationType({loading: true, data: null});
            getOrganisationTypes()
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
        // if (logo === null) {
        //     NotificationManager.error('You should select a logo');
        //     return;
        // }
        // Send data
        setData({...data, logo,});
        // Redirect to the next step
        nextStep();
    };

    const onPreviousClicked = (event) => {
        event.preventDefault();
        const values = getValues();
        setData(values);
        previousStep();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={!fullScreen ? "center-holder" : ''}>
            <div className="row">
                <CustomAsyncComponent
                    loading={organisationType.loading}
                    data={organisationType.data}
                    onRetryClick={_getOrganisationType}
                    component={data => (
                        <div className="col-md-6 col-sm-12 form-group text-left">
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
                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="contractNumber"><NetworkBranchIntlMessages id="branch.field.contractNumber"/></InputLabel>
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
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12">
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
                <div className="col-md-6 col-sm-12">
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

            <div className="row align-items-flex-end">
                <CustomAsyncComponent
                    loading={registrationType.loading}
                    data={registrationType.data}
                    onRetryClick={_getRegistrationType}
                    component={data => (
                        <div className="col-md-6 col-sm-12 form-group text-left">
                            <FormControl fullWidth>
                                <InputLabel className="text-left" htmlFor="registrationType-helper">
                                    <IntlMessages id="common.registrationType"/>
                                </InputLabel>
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

            {/* <FormGroup>
                <InputLabel className="text-left">
                    <IntlMessages id="branch.field.logo"/>
                </InputLabel>
                <Input
                    id="File"
                    type="file"
                    name="file"
                    onChange={event => setLogo(event.target.files[0])}
                />
            </FormGroup> */}

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

SecondStep.propTypes = {

};

export default injectIntl(SecondStep);
