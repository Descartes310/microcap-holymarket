import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, FormGroup} from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import FormControl from "@material-ui/core/FormControl";
import GenericObjectType from "Enums/GenericObjectType";
import CustomAsyncAddBtn from "Components/CustomAsyncAddBtn";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {createUsersAccounts} from "Actions/independentActions";

const ThirdStepItem = props => {
    const {
        intl,
        profile,
        _getProfile,
        register,
        errors,
        control,
        step,
        watch,
        setValue,
        getValues,
        setData,
    } = props;

    const bmaxNetworkWatch = watch(step + 'bmaxNetwork');
    const bminNetworkWatch = watch(step + 'bminNetwork');

    const bmaxPartnerWatch = watch(step + 'bmaxPartner');
    const bminPartnerWatch = watch(step + 'bminPartner');

    const bmaxOrgWatch = watch(step + 'bmaxOrg');
    const bminOrgWatch = watch(step + 'bminOrg');

    const bmaxPersonWatch = watch(step + 'bmaxPerson');
    const bminPersonWatch = watch(step + 'bminPerson');


    // const defaultNetwork = watch(step + 'defaultNetwork');
    // const defaultPartner = watch(step + 'defaultPartner');
    // const defaultOrg = watch(step + 'defaultOrg');
    // const defaultPerson = watch(step + 'defaultPerson');

    const onChangeDefaultEntity = (type, currentKey, oldValue) => {
        const values = getValues();
        Object.entries(values).forEach(value => {
            if (value[0].includes(type)) {
                if (oldValue) {
                    setValue(value[0], false);
                } else {
                    setValue(value[0], value[0] === currentKey);
                }
            }
        });
        setData(values);
    };

    return (
        <div className="w-100">

            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <FormControl fullWidth className="w-100 ml-15">
                        <InputComponent
                            isRequired
                            className="mt-0"
                            errors={errors}
                            control={control}
                            register={register}
                            componentType="select"
                            id="defaultNetwork"
                            name={step + 'defaultNetwork'}
                            as={<FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    // This is not a mistake
                                    checked={(() => (Boolean(watch(step + 'defaultNetwork'))))()}
                                    onChange={() => onChangeDefaultEntity('defaultNetwork', step + 'defaultNetwork', watch(step + 'defaultNetwork'))}
                                />
                            } label={"Réseau par default ?"}
                            />}
                        />
                    </FormControl>
                </div>

                <div className="col-md-6 col-sm-12">
                    <FormControl fullWidth className="w-100 ml-15">
                        <InputComponent
                            isRequired
                            className="mt-0"
                            errors={errors}
                            control={control}
                            register={register}
                            componentType="select"
                            id="defaultPartner"
                            name={step + 'defaultPartner'}
                            as={<FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    // This is not a mistake
                                    checked={(() => (Boolean(watch(step + 'defaultPartner'))))()}
                                    onChange={() => onChangeDefaultEntity('defaultPartner', step + 'defaultPartner', watch(step + 'defaultPartner'))}
                                />
                            } label={"Partenaire par default ?"}
                            />}
                        />
                    </FormControl>
                </div>

                <div className="col-md-6 col-sm-12">
                    <FormControl fullWidth className="w-100 ml-15">
                        <InputComponent
                            isRequired
                            className="mt-0"
                            errors={errors}
                            control={control}
                            register={register}
                            componentType="select"
                            id="defaultOrg"
                            name={step + 'defaultOrg'}
                            as={<FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    // This is not a mistake
                                    checked={(() => (Boolean(watch(step + 'defaultOrg'))))()}
                                    onChange={() => onChangeDefaultEntity('defaultOrg', step + 'defaultOrg', watch(step + 'defaultOrg'))}
                                />
                            } label={"Personne morale par default ?"}
                            />}
                        />
                    </FormControl>
                </div>

                <div className="col-md-6 col-sm-12">
                    <FormControl fullWidth className="w-100 ml-15">
                        <InputComponent
                            isRequired
                            className="mt-0"
                            errors={errors}
                            control={control}
                            register={register}
                            componentType="select"
                            id="defaultPerson"
                            name={step + 'defaultPerson'}
                            as={<FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    // This is not a mistake
                                    checked={(() => (Boolean(watch(step + 'defaultPerson'))))()}
                                    onChange={() => onChangeDefaultEntity('defaultPerson', step + 'defaultPerson', watch(step + 'defaultPerson'))}
                                />
                            } label={"Personne physique par default ?"}
                            />}
                        />
                    </FormControl>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Type de compte utilisateur
                        </InputLabel>
                        <InputComponent
                            id="name"
                            type="text"
                            isRequired
                            errors={errors}
                            register={register}
                            name={step + 'name'}
                            className="input-lg"
                        />
                        <span className="has-icon"><i className="ti-link"></i></span>
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 col-md-6 col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="">
                                Réseau
                            </h4>
                        </div>
                        <div className="col-sm-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <FormGroup className="has-wrapper w-100">
                                    <InputLabel className="text-left" htmlFor="max_network">
                                        Plafond
                                    </InputLabel>
                                    <InputComponent
                                        type="number"
                                        errors={errors}
                                        id="max_network"
                                        register={register}
                                        className="input-lg"
                                        name={step + 'max_network'}
                                        isRequired={false}
                                        // isRequired={bmaxNetworkWatch}
                                        disabled={!bmaxNetworkWatch}
                                    />
                                </FormGroup>
                                <FormControl fullWidth className="w-100 ml-15 w-10">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="bmaxNetwork"
                                        name={step + 'bmaxNetwork'}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={bmaxNetworkWatch}
                                                onChange={() => setValue(step + 'bmaxNetwork', !bmaxNetworkWatch)}
                                            />
                                        } label={""}
                                        />}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <FormGroup className="has-wrapper w-100">
                                    <InputLabel className="text-left" htmlFor="min_network">
                                        Plancher
                                    </InputLabel>
                                    <InputComponent
                                        type="number"
                                        errors={errors}
                                        id="min_network"
                                        register={register}
                                        // isRequired={bminNetworkWatch}
                                        isRequired={false}
                                        name={step + 'min_network'}
                                        className="input-lg"
                                        disabled={!bminNetworkWatch}
                                    />
                                </FormGroup>
                                <FormControl fullWidth className="w-100 ml-15 w-10">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="bminNetwork"
                                        name={step + 'bminNetwork'}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={bminNetworkWatch}
                                                onChange={() => setValue(step + 'bminNetwork', !bminNetworkWatch)}
                                            />
                                        } label={""}
                                        />}
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-md-6 col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="">
                                Partenaire
                            </h4>
                        </div>

                        <div className="col-sm-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <FormGroup className="has-wrapper w-100">
                                    <InputLabel className="text-left" htmlFor="max_partner">
                                        Plafond
                                    </InputLabel>
                                    <InputComponent
                                        isRequired={false}
                                        type="number"
                                        errors={errors}
                                        id="max_partner"
                                        register={register}
                                        name={step + 'max_partner'}
                                        className="input-lg"
                                        disabled={!bmaxPartnerWatch}
                                    />
                                </FormGroup>
                                <FormControl fullWidth className="w-100 ml-15 w-10">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="bmaxPartner"
                                        name={step + 'bmaxPartner'}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={bmaxPartnerWatch}
                                                onChange={() => setValue(step + 'bmaxPartner', !bmaxPartnerWatch)}
                                            />
                                        } label={""}
                                        />}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <FormGroup className="has-wrapper w-100">
                                    <InputLabel className="text-left" htmlFor="min_partner">
                                        Plancher
                                    </InputLabel>
                                    <InputComponent
                                        isRequired={false}
                                        type="number"
                                        errors={errors}
                                        id="min_partner"
                                        register={register}
                                        name={step + 'min_partner'}
                                        className="input-lg"
                                        disabled={!bminPartnerWatch}
                                    />
                                </FormGroup>
                                <FormControl fullWidth className="w-100 ml-15 w-10">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="bminPartner"
                                        name={step + 'bminPartner'}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={bminPartnerWatch}
                                                onChange={() => setValue(step + 'bminPartner', !bminPartnerWatch)}
                                            />
                                        } label={""}
                                        />}
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-md-6 col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="">
                                Utilisateur morales
                            </h4>
                        </div>

                        <div className="col-sm-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <FormGroup className="has-wrapper w-100">
                                    <InputLabel className="text-left" htmlFor="max_org">
                                        Plafond
                                    </InputLabel>
                                    <InputComponent
                                        isRequired={false}
                                        type="number"
                                        errors={errors}
                                        id="max_org"
                                        register={register}
                                        name={step + 'max_org'}
                                        className="input-lg"
                                        disabled={!bmaxOrgWatch}
                                    />
                                </FormGroup>
                                <FormControl fullWidth className="w-100 ml-15 w-10">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="bmaxOrg"
                                        name={step + 'bmaxOrg'}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={bmaxOrgWatch}
                                                onChange={() => setValue(step + 'bmaxOrg', !bmaxOrgWatch)}
                                            />
                                        } label={""}
                                        />}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <FormGroup className="has-wrapper w-100">
                                    <InputLabel className="text-left" htmlFor="min_org">
                                        Plancher
                                    </InputLabel>
                                    <InputComponent
                                        isRequired={false}
                                        type="number"
                                        id="min_org"
                                        errors={errors}
                                        register={register}
                                        className="input-lg"
                                        name={step + 'min_org'}
                                        disabled={!bminOrgWatch}
                                    />
                                </FormGroup>
                                <FormControl fullWidth className="w-100 ml-15 w-10">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="bminOrg"
                                        name={step + 'bminOrg'}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={bminOrgWatch}
                                                onChange={() => setValue(step + 'bminOrg', !bminOrgWatch)}
                                            />
                                        } label={""}
                                        />}
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-md-6 col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="">
                                Utilisateurs physique
                            </h4>
                        </div>

                        <div className="col-sm-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <FormGroup className="has-wrapper w-100">
                                    <InputLabel className="text-left" htmlFor="max_person">
                                        Plafond
                                    </InputLabel>
                                    <InputComponent
                                        isRequired={false}
                                        type="number"
                                        errors={errors}
                                        id="max_person"
                                        register={register}
                                        name={step + 'max_person'}
                                        className="input-lg"
                                        disabled={!bmaxPersonWatch}
                                    />
                                </FormGroup>
                                <FormControl fullWidth className="w-100 ml-15 w-10">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="bmaxPerson"
                                        name={step + 'bmaxPerson'}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={bmaxPersonWatch}
                                                onChange={() => setValue(step + 'bmaxPerson', !bmaxPersonWatch)}
                                            />
                                        } label={""}
                                        />}
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <FormGroup className="has-wrapper w-100">
                                    <InputLabel className="text-left" htmlFor="min_person">
                                        Plancher
                                    </InputLabel>
                                    <InputComponent
                                        isRequired={false}
                                        type="number"
                                        id="min_person"
                                        errors={errors}
                                        register={register}
                                        className="input-lg"
                                        name={step + 'min_person'}
                                        disabled={!bminPersonWatch}
                                    />
                                </FormGroup>
                                <FormControl fullWidth className="w-100 ml-15 w-10">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="bminPerson"
                                        name={step + 'bminPerson'}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={bminPersonWatch}
                                                onChange={() => setValue(step + 'bminPerson', !bminPersonWatch)}
                                            />
                                        } label={""}
                                        />}
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

ThirdStepItem.propTypes = {

};

export default injectIntl(ThirdStepItem);
