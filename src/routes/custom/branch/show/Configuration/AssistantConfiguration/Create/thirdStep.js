import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import _ from 'lodash';

import Button from "@material-ui/core/Button";
import {
    getOrganisationPosts,
    getIdentificationType
} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ThirdStepItem from "Routes/custom/branch/create/thirdStepItem";
import IconButton from '@material-ui/core/IconButton';
import SweetAlert from 'react-bootstrap-sweetalert';

const ThirdStep = props => {
    const { loading, fullScreen, previousStep, setData, intl, defaultState } = props;

    const { register, errors, handleSubmit, watch, control, getValues} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [legalRepresentativeCount, setLegalRepresentativeCount] = useState([1]);
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [stepToDelete, setStepToDelete] = useState(null);

    const [organisationPosts, setOrganisationPosts] = useState({
        loading: true,
        data: null
    });

    const [identificationType, setIdentificationType] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getOrganisationPosts();
        _getIdentificationType();
    }, []);

    const _getOrganisationPosts = () => {
        return new Promise((resolve, reject) => {
            setOrganisationPosts({loading: true, data: null});
            getOrganisationPosts()
                .then(result => {
                    setOrganisationPosts({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setOrganisationPosts({loading: false, data: null});
                    NotificationManager.error("An error occur " + error);
                    setTimeout(() => reject(), 500);
                });
        });
    };

    const _getIdentificationType = () => {
        return new Promise((resolve, reject) => {
            setIdentificationType({loading: true, data: null});
            getIdentificationType()
                .then(result => {
                    setIdentificationType({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setIdentificationType({loading: false, data: null});
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
        Object.entries(data).forEach(item => {
            const _step = Number(item[0][0]), _value = item[0].substring(1);
            dataToSend[_step] = dataToSend[_step]
                ? {...dataToSend[_step], [_value]: item[1]}
                : {[_value]: item[1]};
        });
        const result = {legalRepresentatives: Object.values(dataToSend)};

        // Send data
        setData(result, true);
        // Redirect to the next step
        // nextStep();
    };

    const onPreviousClicked = (event) => {
        event.preventDefault();
        const values = getValues();
        setData(values);
        previousStep();
    };

    const onAddClick = event => {
        event.preventDefault();
        setLegalRepresentativeCount([...legalRepresentativeCount, legalRepresentativeCount.length + 1]);
    };

    const onWantToDeleteClick = (event, step) => {
        event.preventDefault();
        setStepToDelete(step);
        setShowDeleteBox(true);
    };

    const onDeleteClick = (step) => {
        setShowDeleteBox(false);
        setLegalRepresentativeCount(legalRepresentativeCount.filter(item => item !== step));
    };

    const onCancelBox = () => {
        setStepToDelete(null);
        setShowDeleteBox(false);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={!fullScreen ? 'center-holder' : ''}>
            <Button
                disabled={loading}
                variant="contained"
                className="mb-3 text-white bg-blue font-weight-bold"
                onClick={onAddClick}>
                <IntlMessages id="button.add" /> <i className="ml-2 font-lg zmdi zmdi-plus"></i>
            </Button>
            {legalRepresentativeCount.map(step => (
                <Accordion key={step}>
                    <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                        <Typography>
                            <IntlMessages id="branch.step.3.labelCount" values={{count: step}} />
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
                        <ThirdStepItem
                            intl={intl}
                            step={step}
                            errors={errors}
                            control={control}
                            register={register}
                            organisationPosts={organisationPosts}
                            identificationType={identificationType}
                            _getOrganisationPosts={_getOrganisationPosts}
                            _getIdentificationType={_getIdentificationType}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}

            <FormGroup className="mb-15 mt-3">
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
                    type="submit"
                    color="primary"
                    disabled={loading}
                    variant="contained"
                    className="text-white font-weight-bold"
                    onClick={handleSubmit(onSubmit)}
                >
                    <IntlMessages id="button.submit" />
                </Button>
            </FormGroup>
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
                            color="secondary"
                            variant="contained"
                            className="text-white font-weight-bold"
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
        </Form>
    );
};

ThirdStep.propTypes = {

};

export default injectIntl(ThirdStep);
