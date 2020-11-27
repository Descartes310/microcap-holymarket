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
import {getGenericData, getOrganisationTypes} from "Actions";
import {NotificationManager} from "react-notifications";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import GenericObjectType from "Enums/GenericObjectType";
import CustomAsyncAddBtn from "Components/CustomAsyncAddBtn";

const FourthStep = props => {
    const { loading, nextStep, previousStep, setData, intl, defaultState, authUser } = props;

    const { register, errors, handleSubmit, watch, control, getValues} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [profile, setProfile] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getProfile();
    }, []);

    const _getProfile = () => {
        return new Promise((resolve, reject) => {
            setProfile({loading: true, data: null});
            getGenericData(GenericObjectType.PROFILE, authUser.branchId)
                .then(result => {
                    setProfile({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setProfile({loading: false, data: null});
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
        setData(data, true);
        // Redirect to the next step
    };

    const onPreviousClicked = (event) => {
        event.preventDefault();
        const values = getValues();
        setData(values);
        previousStep();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Nom de la branche
                        </InputLabel>
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
                <div className="col-md-6 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="license">
                            License d'exploitation
                        </InputLabel>
                        <InputComponent
                            id="license"
                            isRequired
                            name={'licence'}
                            errors={errors}
                            register={register}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                        <span className="has-icon"><i className="ti-pencil"></i></span>
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="url">
                            Lien d'accès
                        </InputLabel>
                        <InputComponent
                            id="url"
                            type="text"
                            isRequired
                            errors={errors}
                            register={register}
                            name={'url'}
                            className="input-lg"
                        />
                        <span className="has-icon"><i className="ti-link"></i></span>
                    </FormGroup>
                </div>
                <div className="col-md-6 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="downloadLink">
                            Lien de téléchargement
                        </InputLabel>
                        <InputComponent
                            id="downloadLink"
                            type="text"
                            isRequired
                            errors={errors}
                            register={register}
                            name={'downloadLink'}
                            className="input-lg"
                        />
                        <span className="has-icon"><i className="ti-link"></i></span>
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="pfmshipLimit">
                            <IntlMessages id="branch.field.pfmshipLimit"/>
                        </InputLabel>
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
                <div className="col-md-3 col-sm-12">
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
                <div className="col-md-3 col-sm-12">
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
                <div className="col-md-3 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="maxAdmins">
                            Nombre limit d'administrateur
                        </InputLabel>
                        <InputComponent
                            isRequired
                            type="number"
                            errors={errors}
                            id="maxAdmins"
                            register={register}
                            name={'maxAdmins'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                    </FormGroup>
                </div>
            </div>

            <CustomAsyncAddBtn
                data={profile.data}
                loading={profile.loading}
                type={GenericObjectType.PROFILE}
                onRetryClick={_getProfile}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="profile-helper">
                                Type de profile
                            </InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={'profile'}
                                defaultValue={data[0] ? data[0].id : undefined}
                                as={<Select input={<Input name="profile" id="profile-helper" />}>
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

            {/*<div className="row">
                <div className="col-md-3 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="maxNetwork">
                            Effectif plafond réseau
                        </InputLabel>
                        <InputComponent
                            isRequired
                            type="number"
                            errors={errors}
                            id="maxNetwork"
                            register={register}
                            name={'maxNetwork'}
                            className="input-lg"
                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                        />
                    </FormGroup>
                </div>

                <div className="col-md-3 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="minNetwork">
                            Effectif planche réseau
                        </InputLabel>
                        <InputComponent
                            isRequired
                            type="number"
                            errors={errors}
                            id="minNetwork"
                            register={register}
                            name={'minNetwork'}
                            className="input-lg"
                        />
                    </FormGroup>
                </div>

                <div className="col-md-3 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="maxMember">
                            Effectif Plafond par membre
                        </InputLabel>
                        <InputComponent
                            isRequired
                            type="number"
                            errors={errors}
                            register={register}
                            id="maxMember"
                            name={'maxMember'}
                            className="input-lg"
                        />
                    </FormGroup>
                </div>

                <div className="col-md-3 col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="minMember">
                            Effectif Planche par membre
                        </InputLabel>
                        <InputComponent
                            isRequired
                            type="number"
                            errors={errors}
                            register={register}
                            id="minMember"
                            name={'minMember'}
                            className="input-lg"
                        />
                    </FormGroup>
                </div>
            </div>*/}

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
                    <IntlMessages id="button.submit" />
                </Button>
            </FormGroup>
        </Form>
    );
};

FourthStep.propTypes = {

};

export default injectIntl(FourthStep);
