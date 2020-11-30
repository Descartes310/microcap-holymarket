import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import _ from 'lodash';

import Button from "@material-ui/core/Button";
import {getGenericData} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import FouthStepInnerItem from "./fouthStepInnerItem";
import IconButton from '@material-ui/core/IconButton';
import SweetAlert from 'react-bootstrap-sweetalert';
import GenericObjectType from "Enums/GenericObjectType";
import {connect} from "react-redux";
import {getUsersAccounts} from "Actions/GeneralActions";

const fourthStepInner = props => {
    const { loading, nextStep, previousStep, intl, setData,  defaultState, authUser, usersAccounts, getUsersAccounts } = props;
    const { register, errors, handleSubmit, watch, control, setValue, getValues  } = props;

    /*const { register, errors, handleSubmit, watch, control, getValues} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });*/

    const [usersAccountCount, setUsersAccountCount] = useState([1]);
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [stepToDelete, setStepToDelete] = useState(null);

    /*const [profile, setProfile] = useState({
        loading: true,
        data: null
    });*/

    useEffect(() => {
        _getProfile();
    }, []);

    const _getProfile = () => {
        getUsersAccounts(authUser.branchId);
    };


    /**
     * On submit
     */
    const onSubmit = (data) => {
        let dataToSend = {};
        Object.entries(data).forEach(item => {
            const _step = Number(item[0][0]), _value = item[0].substring(1);
            dataToSend[_step] = dataToSend[_step]
                ? {...dataToSend[_step], [_value]: item[1]}
                : {[_value]: item[1]};
        });
        const result = {usersAccount: Object.values(dataToSend)};

        // Send data
        setData(result);
        // Redirect to the next step
        nextStep();
    };

    const onAddClick = event => {
        event.preventDefault();
        setUsersAccountCount([...usersAccountCount, usersAccountCount.length + 1]);
    };

    const onWantToDeleteClick = (event, step) => {
        event.preventDefault();
        setStepToDelete(step);
        setShowDeleteBox(true);
    };

    const onDeleteClick = (step) => {
        setShowDeleteBox(false);
        setUsersAccountCount(usersAccountCount.filter(item => item !== step));
    };

    const onCancelBox = () => {
        setStepToDelete(null);
        setShowDeleteBox(false);
    };

    return (
        <div className="my-30">
            <div className="d-flex justify-content-between">
                <h4 className="fw-bold ">Comptes utilisateurs</h4>
                <Button
                    variant="contained"
                    className="mb-3 text-white bg-blue font-weight-bold"
                    onClick={onAddClick}>
                    <IntlMessages id="button.add" /> <i className="ml-2 font-lg zmdi zmdi-plus"></i>
                </Button>
            </div>
            {usersAccountCount.map(step => (
                <Accordion key={step}>
                    <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                        <Typography>
                            Comptes utilisateur {step}
                            {step > 1 && (
                                <IconButton
                                    aria-label="Delete"
                                    className="text-danger"
                                    onClick={(event) => onWantToDeleteClick(event, step)}
                                >
                                    <i className="zmdi zmdi-delete"></i>
                                </IconButton>
                            )}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FouthStepInnerItem
                            intl={intl}
                            step={step}
                            watch={watch}
                            errors={errors}
                            control={control}
                            setValue={setValue}
                            profile={usersAccounts}
                            register={register}
                            _getProfile={_getProfile}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}

            <SweetAlert
                type="danger"
                show={showDeleteBox}
                showCancel
                showConfirm
                title={intl.formatMessage({id: "branch.alert.deleteTitle"})}
                customButtons={(
                    <>
                        <Button
                            color="blue"
                            variant="outlined"
                            onClick={() => onCancelBox()}
                            className="text-white bg-blue font-weight-bold mr-3"
                        >
                            <IntlMessages id="button.cancel" />
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            className="bg-danger text-white font-weight-bold"
                            onClick={() => onDeleteClick(stepToDelete)}
                        >
                            <IntlMessages id="button.delete" />
                        </Button>
                    </>
                )}
                onConfirm={() => onDeleteClick(stepToDelete)}
            >
                <IntlMessages id="branch.alert.deleteText" />
            </SweetAlert>
        </div>
    );
};

fourthStepInner.propTypes = {

};

export default connect(({usersAccounts, authUser}) => ({usersAccounts, authUser: authUser.data}), {getUsersAccounts})(injectIntl(fourthStepInner));
