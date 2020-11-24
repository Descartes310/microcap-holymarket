import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input as InputStrap} from "reactstrap";
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
import {getAllNetworkProfileWithBranch, createNotificationsService, setRequestGlobalAction} from "Actions";
import {connect} from "react-redux";
import ErrorInputComponent from "Components/ErrorInputComponent";
import moment from "moment";
import {ERROR_500} from "Constants/errors";
import {SETTINGS} from "Url/frontendUrl";
import {withRouter} from "react-router-dom";

const Create = props => {
    const { loading, nextStep, setData, intl, history, defaultState, authUser, networkProfile, setRequestGlobalAction, getAllNetworkProfileWithBranch } = props;

    const { register, errors, handleSubmit, watch, control} = useForm();

    const [networkProfileSelected, setNetworkProfileSelected] = useState([]);
    const [errorMessages, setErrorMessages] = useState({
        startingDate: '',
        endingDate: '',
        birthDate: '',
    });

    useEffect(() => {
        getAllNetworkProfileWithBranch(authUser.branchId);
    }, []);

    const validateRegistrationBeginningDate = value => {
        const startingDate = moment(value);
        const now = moment();

        if (!startingDate.isValid()) {
            // setErrorMessages({...errorMessages, startingDate: "Start date should be a valid one"});
            setErrorMessages({
                ...errorMessages,
                startingDate: "Veuillez entrer une date valide"
            });
            return false;
        }

        if (now.diff(startingDate) > 0) {
            // setErrorMessages({...errorMessages, startingDate: "Start date must not be upper than today date"});
            setErrorMessages({
                ...errorMessages,
                startingDate: "La date de fin doit être supérieur à celle d'aujoud'hui"
            });
            return false;
        }

        return true;
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        if (networkProfileSelected.length === 0) {
            NotificationManager.error('Vous selectionner au moins un destinataire')
        }
        setRequestGlobalAction(true);
        const _data = {...data, networksProfiles: JSON.stringify(networkProfileSelected)};
        createNotificationsService(authUser.branchId, _data)
            .then(() => {
                NotificationManager.success("Notification de service envoyé avec succès");
                history.push(SETTINGS.NOTIFICATION.SERVICE.LIST);
            })
            .catch((error) => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => setRequestGlobalAction(false));
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <FormGroup className="has-wrapper">
                Titre
                <InputComponent
                    id="title"
                    type="text"
                    isRequired
                    errors={errors}
                    register={register}
                    name={'title'}
                    className="has-input input-lg"
                    // placeholder={intl.formatMessage({id: "common.socialReason"})}
                />
                <span className="has-icon"><i className="ti-pencil"/></span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                Message
                <InputComponent
                    isRequired
                    errors={errors}
                    type={"textarea"}
                    id="message"
                    register={register}
                    name={'message'}
                    className="has-input input-lg"
                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                />
                <span className="has-icon"><i className="ti-pencil"/></span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="registrationBeginningDate">
                    Date de fin
                </InputLabel>
                <InputComponent
                    type="date"
                    isRequired
                    errors={errors}
                    register={register}
                    className="has-input input-lg"
                    id="registrationBeginningDate"
                    name={'expireAt'}
                    // placeholder={intl.formatMessage({id: "date.birth"})}
                    otherValidator={{validate: value => validateRegistrationBeginningDate(value)}}
                >
                    {errors.expireAt && errors.expireAt?.type !== 'required' && (
                        <ErrorInputComponent
                            text={errorMessages.startingDate}
                        />
                    )}
                </InputComponent>
            </FormGroup>

            <CustomAsyncComponent
                data={networkProfile.data}
                loading={networkProfile.loading}
                component={data => (
                    <div className="form-group text-left mb-3">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="networkProfile">
                                Destinataire
                            </InputLabel>
                            <InputStrap
                                type="select"
                                name="selectMulti"
                                id="SelectMulti"
                                onChange={event => setNetworkProfileSelected(Array.from(event.target.selectedOptions, option => option.value))}
                                multiple>
                                <option value={-1}>
                                    Tout le monde
                                </option>
                                {data.map(p => (
                                    <option key={p.id} value={p.id}>{p.label}</option>
                                ))}
                            </InputStrap>
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
                    <IntlMessages id="button.submit" />
                </Button>
            </FormGroup>
        </Form>
    );
};

Create.propTypes = {

};

export default connect(
    ({networkProfile, authUser}) => ({networkProfile, authUser: authUser.data}),
    {setRequestGlobalAction, getAllNetworkProfileWithBranch})
(withRouter(injectIntl(Create)));
