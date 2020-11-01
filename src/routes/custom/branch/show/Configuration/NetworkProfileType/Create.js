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
import {getNetworkProfileTypes, setRequestGlobalAction, createNetworkProfileType} from "Actions";
import {NotificationManager} from "react-notifications";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import QueueAnim from "rc-queue-anim";
import {connect} from "react-redux";
import {NETWORK} from "Url/frontendUrl";

const NetworkProfileCreate = props => {
    const { authUser, loading, intl, onCancelClick, networkProfiles, getAllNetworkProfile, setRequestGlobalAction, history } = props;

    const { register, errors, handleSubmit, setValue, watch, control} = useForm();

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        const _data = {...data};
        _data.branchId = authUser.user.branch.id;

        createNetworkProfileType(_data)
            .then(result => {
                NotificationManager.success("Le type de profile a été créé avec success");
                history.push(NETWORK.CONFIGURATION.NETWORK_PROFILE_TYPE.LIST);
            })
            .catch((error) => {
                console.log("error => ", JSON.stringify(error));
                NotificationManager.error(error.message);
                // console.log("error => ", error.message);
            })
            .finally(() => setRequestGlobalAction(false));
    };

    return (
        <RctCollapsibleCard>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="designation">
                        Désignation
                    </InputLabel>
                    <InputComponent
                        id="link"
                        isRequired
                        errors={errors}
                        register={register}
                        name={'designation'}
                        className="input-lg"
                        // placeholder={intl.formatMessage({id: "common.commercialName"})}
                    />
                    <span className="has-icon"><i className="ti-pencil"/></span>
                </FormGroup>

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="description">
                        Description
                    </InputLabel>
                    <InputComponent
                        id="link"
                        isRequired
                        errors={errors}
                        register={register}
                        name={'description'}
                        className="input-lg"
                        // placeholder={intl.formatMessage({id: "common.commercialName"})}
                    />
                    <span className="has-icon"><i className="ti-pencil"/></span>
                </FormGroup>

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
                        onClick={() => history.goBack() }
                    >
                        <IntlMessages id="button.cancel" />
                    </Button>
                </FormGroup>
            </Form>
        </RctCollapsibleCard>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, networkProfile }) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, networkProfiles: networkProfile};
};

export default connect(mapStateToProps, { getNetworkProfileTypes, setRequestGlobalAction })(injectIntl(NetworkProfileCreate));
