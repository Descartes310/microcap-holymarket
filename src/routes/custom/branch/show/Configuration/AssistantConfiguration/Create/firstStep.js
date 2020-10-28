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
    getAllNetworkProfilePartnershipForOneBranch, getNetworkProfilePartnership,
    getOperators,
    getOrganisationTypes,
    getRegistrationType,
    getResidenceCountries
} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import CountryManager from "Helpers/CountryManager";

const SecondStep = props => {
    const { authUser, loading, nextStep, fullScreen, setData, intl, defaultState } = props;

    const { register, errors, handleSubmit, watch, control, getValues} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [networkProfilePartnership, setNetworkProfilePartnership] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getNetworkProfilePartnership();
    }, []);

    const _getNetworkProfilePartnership = () => {
        return new Promise((resolve, reject) => {
            setNetworkProfilePartnership({loading: true, data: null});
            getNetworkProfilePartnership(authUser.branch.id)
                .then(result => {
                    setNetworkProfilePartnership({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setNetworkProfilePartnership({loading: false, data: null});
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
        <Form onSubmit={handleSubmit(onSubmit)} className={!fullScreen ? "center-holder" : ''}>
            <CustomAsyncComponent
                loading={networkProfilePartnership.loading}
                data={networkProfilePartnership.data}
                onRetryClick={_getNetworkProfilePartnership}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="partnershipType">
                                <IntlMessages id="branch.field.partnership"/>
                            </InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={'partnershipType'}
                                defaultValue={data[0] ? data[0].id : undefined}
                                as={<Select input={<Input name="partnershipType" id="partnershipType" />}>
                                    {data.map((item, index) => (
                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>}
                            />
                        </FormControl>
                    </div>
                )}
            />

            <FormControl fullWidth>
                <InputLabel className="text-left" htmlFor="isMandatory-helper">
                    <IntlMessages id="branch.field.type"/>
                </InputLabel>
                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    control={control}
                    register={register}
                    componentType="select"
                    name={'isMandatory'}
                    defaultValue={'true'}
                    as={<Select input={<Input name="isMandatory" id="isMandatory-helper" />}>
                        <MenuItem value={'true'} className="center-hor-ver">
                            <IntlMessages id="branch.field.compulsoryAssistant"/>
                        </MenuItem>
                        <MenuItem value={'false'} className="center-hor-ver">
                            <IntlMessages id="branch.field.othersAssistant"/>
                        </MenuItem>
                    </Select>}
                />
            </FormControl>

            {/*<CustomAsyncComponent
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
            />*/}

            <FormGroup className="mb-15 mt-15">
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
