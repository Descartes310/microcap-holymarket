import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import _ from 'lodash';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import {getOrganisationTypes} from "Actions";
import {NotificationManager} from "react-notifications";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";

const FirstStep = props => {
    const { loading, nextStep, setData, intl, defaultState } = props;

    const { register, errors, handleSubmit, watch, control} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [organisationType, setOrganisationType] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
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

    /**
     * On submit
     */
    const onSubmit = (data) => {
        // Send data
        setData(data);
        // Redirect to the next step
        nextStep();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-6">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name"><IntlMessages id="branch.field.name"/></InputLabel>
                        <InputComponent
                            id="name"
                            type="text"
                            isRequired
                            name={'name'}
                            errors={errors}
                            register={register}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.socialReason"})}
                        />
                        <span className="has-icon"><i className="ti-user"></i></span>
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="link"><IntlMessages id="branch.field.link"/></InputLabel>
                        <InputComponent
                            id="link"
                            isRequired
                            name={'link'}
                            errors={errors}
                            register={register}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                        <span className="has-icon"><i className="ti-link"></i></span>
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <CustomAsyncComponent
                    loading={organisationType.loading}
                    data={organisationType.data}
                    onRetryClick={_getOrganisationType}
                    component={data => (
                        <div className="col-6 form-group text-left">
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
                <FormGroup className="col-6 has-wrapper">
                    <InputLabel className="text-left" htmlFor="licenseNumber"><IntlMessages id="branch.field.licenseNumber"/></InputLabel>
                    <InputComponent
                        id="link"
                        isRequired
                        errors={errors}
                        register={register}
                        name={'licenseNumber'}
                        className="input-lg"
                        // placeholder={intl.formatMessage({id: "common.commercialName"})}
                    />
                    <span className="has-icon"><i className="ti-pencil"></i></span>
                </FormGroup>
            </div>

            <div className="row">
                <div className="col-4">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="pfmshipLimit"><IntlMessages id="branch.field.pfmshipLimit"/></InputLabel>
                        <InputComponent
                            isRequired
                            type="number"
                            errors={errors}
                            id="pfmshipLimit"
                            register={register}
                            name={'pfmshipLimit'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="membershipLimit"><IntlMessages id="branch.field.membershipLimit"/></InputLabel>
                        <InputComponent
                            isRequired
                            type="number"
                            errors={errors}
                            register={register}
                            id="membershipLimit"
                            name={'membershipLimit'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="partnershipLimit"><IntlMessages id="branch.field.partnershipLimit"/></InputLabel>
                        <InputComponent
                            isRequired
                            type="number"
                            errors={errors}
                            register={register}
                            id="partnershipLimit"
                            name={'partnershipLimit'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="signature"><IntlMessages id="branch.field.signature" values={{number: 1}}/></InputLabel>
                        <InputComponent
                            isRequired
                            errors={errors}
                            id="signature1"
                            register={register}
                            name={'signature1'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                        <span className="has-icon"><i className="ti-pencil"></i></span>
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="signature"><IntlMessages id="branch.field.signature" values={{number: 2}}/></InputLabel>
                        <InputComponent
                            isRequired
                            errors={errors}
                            id="signature2"
                            register={register}
                            name={'signature2'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                        <span className="has-icon"><i className="ti-pencil"></i></span>
                    </FormGroup>
                </div>
                <div className="col-4">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="signature"><IntlMessages id="branch.field.signature" values={{number: 3}}/></InputLabel>
                        <InputComponent
                            isRequired
                            errors={errors}
                            id="signature3"
                            register={register}
                            name={'signature3'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                        <span className="has-icon"><i className="ti-pencil"></i></span>
                    </FormGroup>
                </div>
            </div>

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
