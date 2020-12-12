import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import _ from 'lodash';
import Button from "@material-ui/core/Button";
import {NotificationManager} from "react-notifications";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SweetAlert from 'react-bootstrap-sweetalert';
import Item from "./Item";
import {connect} from "react-redux";
import { getProjectWorks } from "Actions";

const StandardConfiguration = props => {
    const { loading, getProjectWorks, intl, authUser, projectWorks } = props;

    const { register, errors, handleSubmit, watch, control, getValues} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [legalRepresentativeCount, setLegalRepresentativeCount] = useState([1]);
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [stepToDelete, setStepToDelete] = useState(null);

    useEffect(() => {
        getProjectWorks();
    }, []);

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
        const result = {legalRepresentatives: Object.values(dataToSend), ...data};

        if (!result.legalRepresentatives.every(i => i.post && `${i.post}`.length > 0)) {
            NotificationManager.error("Veuillez selectionner un poste");
            return;
        }

        // Send data
        setData(result, 3);
        // Redirect to the next step
        // nextStep();
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
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Button
                variant="contained"
                className="mb-3 text-white bg-blue font-weight-bold"
                onClick={onAddClick}>
                <IntlMessages id="button.add" /> <i className="ml-2 font-lg zmdi zmdi-plus"/>
            </Button>
            {legalRepresentativeCount.map(step => (
                <Accordion key={step}>
                    <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"/>}>
                        <Typography>
                            Bloc {step}
                            {step > 1 && (
                                <IconButton
                                    aria-label="Delete"
                                    className="text-danger"
                                    onClick={(event) => onWantToDeleteClick(event, step)}
                                >
                                    <i className="zmdi zmdi-delete"/>
                                </IconButton>
                            )}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Item
                            intl={intl}
                            step={step}
                            errors={errors}
                            control={control}
                            register={register}
                            detailsLevel={detailsLevel}
                            choicedTitle={chosenTitle}
                            projectWorks={projectWorks}
                            getProjectWorks={getProjectWorks}
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
        </Form>
    );
};

StandardConfiguration.propTypes = {

};

const mapStateToProps = ({ requestGlobalLoader, projectWorks, authUser  }) => {
    return {
        projectWorks,
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { getProjectWorks })(injectIntl(StandardConfiguration));
