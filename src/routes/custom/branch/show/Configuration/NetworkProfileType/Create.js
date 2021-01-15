import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup } from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { getNetworkProfile, getAllNetworkProfile, setRequestGlobalAction, createNetworkProfile } from "Actions";
import { NotificationManager } from "react-notifications";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import QueueAnim from "rc-queue-anim";
import { connect } from "react-redux";
import { NETWORK } from "Url/frontendUrl";
import { getNetworkProfileTypes } from "Actions/GeneralActions";
import { getBranchProfile } from "Actions/independentActions";

const NetworkProfileCreate = props => {
    const { authUser, getNetworkProfileTypes, networkProfileTypes, loading, intl, onCancelClick, networkProfiles, getAllNetworkProfile, setRequestGlobalAction, history } = props;
    const [roles, setRoles] = useState('');
    const { register, errors, handleSubmit, setValue, watch, control } = useForm({
        defaultValues: {
            mandatoryAssistantMin: '0',
            mandatoryAssistantMax: '0',
            optionalAssistantMin: '0',
            optionalAssistantMax: '0',
        }
    });

    const hasMandatoryAssistantWatch = watch('hasMandatoryAssistant');
    const hasOptionalAssistantWatch = watch('hasOptionalAssistant');
    const dataWatch = watch();

    // const [loading, setLoading] = useState(false);
    const [networkProfileType, setNetworkProfileType] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getNetworkProfileType();
        getAllNetworkProfile();
        getRoles();
    }, []);

    const getRoles = () => {
        getBranchProfile(props.authUser.userType, props.authUser.user.branch.id)
        .then((data) => {
            setRoles(data);
        })
        .catch(() => NotificationManager.error("Aucun utilisateurs correspondant à cette reference. Veuillez re-essayer."))
        .finally(() => setRequestGlobalAction(false));
    }

    const _getNetworkProfileType = () => {
        if (!networkProfileTypes.data) {
            getNetworkProfileTypes(authUser.user.branch.id);
        }

    };

    const validate = (data) => {
        const _mandatoryAssistantMin = Number(data.mandatoryAssistantMin) || 0;
        const _mandatoryAssistantMax = Number(data.mandatoryAssistantMax) || 0;
        const _optionalAssistantMin = Number(data.optionalAssistantMin) || 0;
        const _optionalAssistantMax = Number(data.optionalAssistantMax) || 0;
        if (
            _mandatoryAssistantMin < 0 || _optionalAssistantMin < 0
        ) {
            NotificationManager.error(intl.formatMessage({ id: 'form.error.verify.min' }));
            return false;
        }

        if (
            _mandatoryAssistantMin > _mandatoryAssistantMax
            || _optionalAssistantMin > _optionalAssistantMax
        ) {
            NotificationManager.error(intl.formatMessage({ id: 'form.error.verify.minAndMax' }));
            return false;
        }

        return true;
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        if (validate(data)) {
            setRequestGlobalAction(true);
            const _data = { ...data };

            if (_data.parentProfile !== 'none') {
                _data.profileParent = Number(_data.parentProfile);
                delete _data.parentProfile;
            }

            _data.hasMandatoryAssistant = Boolean(_data.hasMandatoryAssistant);
            _data.hasOptionalAssistant = Boolean(_data.hasOptionalAssistant);

            _data.mandatoryAssistantMin = Number(_data.mandatoryAssistantMin) || 0;
            _data.mandatoryAssistantMax = Number(_data.mandatoryAssistantMax) || 0;
            _data.optionalAssistantMin = Number(_data.optionalAssistantMin) || 0;
            _data.optionalAssistantMax = Number(_data.optionalAssistantMax) || 0;
            _data.branchId = props.authUser.user.branch.id;

            createNetworkProfile(_data)
                .then(result => {
                    NotificationManager.success(intl.formatMessage({ id: 'branch.profile.create.successText' }));
                    history.push(NETWORK.CONFIGURATION.NETWORK_PROFILE.LIST);
                })
                .catch((error) => {
                    console.log("error => ", JSON.stringify(error));
                    NotificationManager.error(error.message);
                    // console.log("error => ", error.message);
                })
                .finally(() => setRequestGlobalAction(false));
        }
    };

    return (
        <RctCollapsibleCard>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <CustomAsyncComponent
                    loading={networkProfileTypes.loading}
                    data={networkProfileTypes.data}
                    onRetryClick={_getNetworkProfileType}
                    component={data => (
                        <div className="form-group text-left">
                            <FormControl fullWidth>
                                Profile réseau
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    name={'typeId'}
                                    defaultValue={data[0] ? data[0].id : undefined}
                                    as={<Select input={<Input name="type" id="type" />}>
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

                <CustomAsyncComponent
                    loading={networkProfileTypes.loading}
                    data={networkProfileTypes.data ? [{ id: -1, label: 'Exploitant réseau' }, ...networkProfileTypes.data] : networkProfileTypes.data}
                    onRetryClick={_getNetworkProfileType}
                    component={data => (
                        <div className="form-group text-left">
                            <FormControl fullWidth>
                                Profile parent
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    name={'parentId'}
                                    defaultValue={data[0] ? data[0].id : undefined}
                                    as={<Select input={<Input name="type" id="type" />}>
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

                <CustomAsyncComponent
                    data={roles}
                    onRetryClick={getRoles}
                    component={data => (
                        <div className="form-group text-left">
                            <FormControl fullWidth>
                                <InputLabel className="text-left" htmlFor="type">
                                    Role par defaut
                                </InputLabel>
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    name={'roleId'}
                                    defaultValue={'none'}
                                    as={<Select input={<Input name="type" id="type" />}>
                                        <MenuItem value={'none'} className="center-hor-ver">
                                            <IntlMessages id="general.none" />
                                        </MenuItem>
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

                <CustomAsyncComponent
                    data={[{id: 1, label: 'Partenanaire'}, {id: 2, label: 'Usager'}]}
                    component={data => (
                        <div className="form-group text-left">
                            <FormControl fullWidth>
                                <InputLabel className="text-left" htmlFor="type">
                                    Statut
                                </InputLabel>
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    name={'statut'}
                                    defaultValue={'none'}
                                    as={<Select input={<Input name="type" id="type" />}>
                                        <MenuItem value={'none'} className="center-hor-ver">
                                            <IntlMessages id="general.none" />
                                        </MenuItem>
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
                    <InputLabel className="text-left" htmlFor="designation"><IntlMessages id="branch.field.designation" /></InputLabel>
                    <InputComponent
                        id="link"
                        isRequired
                        errors={errors}
                        register={register}
                        name={'designation'}
                        className="input-lg"
                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                    />
                    <span className="has-icon"><i className="ti-pencil" /></span>
                </FormGroup>

                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    control={control}
                    register={register}
                    componentType="select"
                    id="hasMandatoryAssistant"
                    name={'hasMandatoryAssistant'}
                    // defaultValue={data[0]}
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={hasMandatoryAssistantWatch}
                            onChange={() => setValue('hasMandatoryAssistant', !hasMandatoryAssistantWatch)}
                        />
                    } label={intl.formatMessage({ id: 'branch.field.compulsoryAssistant' })}
                    />}
                />


                {hasMandatoryAssistantWatch && (
                    <QueueAnim type="bottom" duration={2000}>
                        <div className="row mx-4">
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="mandatoryAssistantMin"><IntlMessages id="form.min" /></InputLabel>
                                    <InputComponent
                                        type="number"
                                        errors={errors}
                                        register={register}
                                        className="input-lg"
                                        id="mandatoryAssistantMin"
                                        name={'mandatoryAssistantMin'}
                                        isRequired={hasMandatoryAssistantWatch}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="mandatoryAssistantMax"><IntlMessages id="form.max" /></InputLabel>
                                    <InputComponent
                                        type="number"
                                        errors={errors}
                                        register={register}
                                        className="input-lg"
                                        id="mandatoryAssistantMax"
                                        name={'mandatoryAssistantMax'}
                                        isRequired={hasMandatoryAssistantWatch}
                                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </QueueAnim>
                )}

                <br />

                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    control={control}
                    register={register}
                    componentType="select"
                    id="hasOptionalAssistant"
                    name={'hasOptionalAssistant'}
                    // defaultValue={data[0]}
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={hasOptionalAssistantWatch}
                            onChange={() => setValue('hasOptionalAssistant', !hasOptionalAssistantWatch)}
                        />
                    } label={intl.formatMessage({ id: 'branch.field.othersAssistant' })}
                    />}
                />


                {hasOptionalAssistantWatch && (
                    <QueueAnim type="bottom" duration={2000}>
                        <div className="row mx-4">
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="optionalAssistantMin"><IntlMessages id="form.min" /></InputLabel>
                                    <InputComponent
                                        type="number"
                                        errors={errors}
                                        register={register}
                                        className="input-lg"
                                        id="optionalAssistantMin"
                                        name={'optionalAssistantMin'}
                                        isRequired={hasOptionalAssistantWatch}
                                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="optionalAssistantMax"><IntlMessages id="form.max" /></InputLabel>
                                    <InputComponent
                                        type="number"
                                        errors={errors}
                                        register={register}
                                        className="input-lg"
                                        id="optionalAssistantMax"
                                        name={'optionalAssistantMax'}
                                        isRequired={hasOptionalAssistantWatch}
                                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </QueueAnim>
                )}

                <FormGroup className="mb-15">
                    <Button
                        // type="submit"
                        color="primary"
                        disabled={loading}
                        variant="contained"
                        className="text-white font-weight-bold mr-3"
                        onClick={handleSubmit(onSubmit)}
                    >
                        <IntlMessages id="button.submit" />
                    </Button>

                    <Button
                        color="primary"
                        disabled={loading}
                        variant="outlined"
                        className="font-weight-bold"
                        onClick={onCancelClick}
                    >
                        <IntlMessages id="button.cancel" />
                    </Button>
                </FormGroup>
            </Form>
        </RctCollapsibleCard>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, networkProfile, networkProfileType }) => {
    return {
        loading: requestGlobalLoader, authUser: authUser.data, networkProfiles: networkProfile, networkProfileTypes: networkProfileType
    };
};

export default connect(mapStateToProps, { getNetworkProfileTypes, getAllNetworkProfile, setRequestGlobalAction })(injectIntl(NetworkProfileCreate));
