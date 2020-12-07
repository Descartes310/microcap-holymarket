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
import FourthStepInner from "./fourthStepInner";
import SecondStepItem from "Routes/custom/branch/new-create/secondStepItem";

const FourthStep = props => {
    const { loading, nextStep, previousStep, setData, intl, defaultState, authUser } = props;

    const { register, errors, handleSubmit, watch, control, setValue, getValues} = useForm({
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
        let dataToSend = {};
        const dataToWorkOn = Object.entries(data).filter(i => /[0-9]/.test(i[0][0]));

        dataToWorkOn.forEach(item => {
            const _step = Number(item[0][0]), _value = item[0].substring(1);
            dataToSend[_step] = dataToSend[_step]
                ? {...dataToSend[_step], [_value]: item[1]}
                : {[_value]: item[1]};
        });
        let accounts = Object.values(dataToSend).map(elt => {
            return Object
                .entries(elt)
                .map(_elt => {
                    // console.log("_elt => ", _elt);
                    const __elt = [..._elt];

                    if (['defaultNetwork', 'defaultPartner', 'defaultOrg', 'defaultPerson'].includes(__elt[0])) {
                        return __elt;
                    } else if (__elt[1] === undefined) {
                        __elt[1] = -1;
                    } else {
                        if (__elt[0] === "name") {
                            return __elt;
                        } else {
                            const n = Number(__elt[1]);
                            __elt[1] = isNaN(n) ? -1 : n;
                        }
                    }

                    return __elt;
                });
        });

        accounts = accounts.map(item => item.reduce((acc, b) => ({...acc, [b[0]]: b[1]}), {}));

        if (validateAccounts(accounts)) {
            // Send data
            data.defaultNetwork = accounts.find(account => account.defaultNetwork).name;
            data.defaultPartner = accounts.find(account => account.defaultPartner).name;
            data.defaultOrg = accounts.find(account => account.defaultOrg).name;
            data.defaultPerson = accounts.find(account => account.defaultPerson).name;

            const result = {accounts: accounts, ...data};

            setData(result, 4, true);
        }
        // Redirect to the next step
    };

    const validateAccounts = (accounts) => {
        let countDefaultNetwork = 0, countDefaultPartner = 0, countDefaultOrg = 0, countDefaultPerson = 0;
        accounts.forEach(account => {
            if (account.defaultNetwork) countDefaultNetwork++;
            if (account.defaultPartner) countDefaultPartner++;
            if (account.defaultOrg) countDefaultOrg++;
            if (account.defaultPerson) countDefaultPerson++;
        });
        if (countDefaultNetwork === 0) {
            NotificationManager.error("Vous devez selectionner un compte réseau par defaut");
            return false;
        } else if (countDefaultNetwork !== 1) {
            NotificationManager.error("Vous devez selectionner exactement un compte réseau par defaut");
            return false;
        }

        if (countDefaultPartner === 0) {
            NotificationManager.error("Vous devez selectionner un compte partenaire par defaut");
            return false;
        } else if (countDefaultPartner !== 1) {
            NotificationManager.error("Vous devez selectionner exactement un compte partenaire par defaut");
            return false;
        }

        if (countDefaultOrg === 0) {
            NotificationManager.error("Vous devez selectionner un compte personne morale par defaut");
            return false;
        } else if (countDefaultOrg !== 1) {
            NotificationManager.error("Vous devez selectionner exactement un compte personne morale par defaut");
            return false;
        }

        if (countDefaultPerson === 0) {
            NotificationManager.error("Vous devez selectionner un compte personne physique par defaut");
            return false;
        } else if (countDefaultPerson !== 1) {
            NotificationManager.error("Vous devez selectionner exactement un compte personne physique par defaut");
            return false;
        }

        return true;
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
                <div className="col-md-4 col-sm-12">
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
                <div className="col-md-4 col-sm-12">
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
                <div className="col-md-4 col-sm-12">
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

            <FourthStepInner
                // intl={intl}
                // step={step}
                watch={watch}
                errors={errors}
                control={control}
                register={register}
                setData={setData}
                setValue={setValue}
                getValues={getValues}
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
