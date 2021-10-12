import _ from 'lodash';
import {injectIntl} from 'react-intl';
import {useForm} from "react-hook-form";
import {Form, FormGroup} from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from 'react';
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import {NotificationManager} from "react-notifications";
import FormControl from "@material-ui/core/FormControl";
import {getOrganisationTypes} from "Actions/independentActions";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";

const FirstStep = props => {
    const { loading, nextStep, setData, defaultState } = props;

    const { register, errors, handleSubmit, control} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [organisationTypes, setOrganisationTypes] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getOrganisationType();
    }, []);

    const _getOrganisationType = () => {
        return new Promise((resolve, reject) => {
            setOrganisationTypes({loading: true, data: null});
            getOrganisationTypes()
                .then(result => {
                    setOrganisationTypes({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setOrganisationTypes({loading: false, data: null});
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
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="socialReason"><IntlMessages id="common.socialReason"/></InputLabel>
                <InputComponent
                    id="socialReason"
                    type="text"
                    isRequired
                    errors={errors}
                    register={register}
                    name={'socialReason'}
                    className="has-input input-lg"
                />
                <span className="has-icon"><i className="ti-pencil"></i></span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="commercialName"><IntlMessages id="common.commercialName"/></InputLabel>
                <InputComponent
                    isRequired
                    errors={errors}
                    id="commercialName"
                    register={register}
                    name={'commercialName'}
                    className="has-input input-lg"
                />
                <span className="has-icon"><i className="ti-user"></i></span>
            </FormGroup>

            <CustomAsyncComponent
                loading={organisationTypes.loading}
                data={organisationTypes.data}
                onRetryClick={_getOrganisationType}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="organisationTypes-helper"><IntlMessages id="common.organisationType"/></InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={'organisationType'}
                                as={<Select input={<Input name="organisationTypes" id="organisationTypes-helper" />}>
                                    {data.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>}
                            />
                        </FormControl>
                    </div>
                )}
            />

            <FormGroup className="mb-15">
                <Button
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
