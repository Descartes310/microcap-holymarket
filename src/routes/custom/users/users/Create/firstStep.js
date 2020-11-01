import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {injectIntl} from 'react-intl';
import _ from 'lodash';
import FormControl from "@material-ui/core/FormControl";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import {getOrganisationTypes} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import {connect} from "react-redux";
import {getUserProfiles} from "Actions/GeneralActions";
import {getAllNetworkProfile} from "Actions/NetworkProfileActions";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";

const FirstStep = props => {
    const { authUser, userProfiles, getUserProfiles, loading, nextStep, setData, intl, defaultState } = props;

    const { register, errors, handleSubmit, watch, control} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [organisationTypes, setOrganisationTypes] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getAllNetworkProfile();
        _getOrganisationType();
    }, []);

    const _getAllNetworkProfile = () => {
        if (!userProfiles.data) {
            getUserProfiles(authUser.user.branch.id, authUser.userType);
        }
    };

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

            <CustomAsyncComponent
                loading={userProfiles.loading}
                data={userProfiles.data}
                onRetryClick={_getAllNetworkProfile}
                component={data => (
                    <div className="form-group text-left">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="organisationTypes-helper">
                                Profile utilisateur
                            </InputLabel>
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={'profileId'}
                                defaultValue={data[0] ? data[0].id : undefined}
                                as={<Select input={<Input name="organisationTypes" id="organisationTypes-helper" />}>
                                    {data.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                {item.label}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>}
                            />
                        </FormControl>
                    </div>
                )}
            />

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
                    // placeholder={intl.formatMessage({id: "common.socialReason"})}
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
                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
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
                                defaultValue={data[0]}
                                as={<Select input={<Input name="organisationTypes" id="organisationTypes-helper" />}>
                                    {data.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item} className="center-hor-ver">
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

const mapStateToProps = ({ requestGlobalLoader, authUser, userProfile }) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, userProfiles: userProfile};
};

export default connect(mapStateToProps, { getUserProfiles, getAllNetworkProfile, setRequestGlobalAction })(injectIntl(FirstStep));

