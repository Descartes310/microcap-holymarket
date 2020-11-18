import _ from 'lodash';
import * as moment from "moment";
import PropTypes from 'prop-types';
import {FormGroup} from "reactstrap";
import React, {useState} from 'react';
import IntlMessages from "Util/IntlMessages";
import InputComponent from "Components/InputComponent";
import ErrorInputComponent from "Components/ErrorInputComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {injectIntl} from "react-intl";

/**
 * Display start date and end date input
 * @param props
 * @returns {*}
 * @constructor
 */
const RangeDate = props => {
    const { startDateLabel, endDateLabel, startDateName, endDateName, errors, register, watch, intl } = props;

    const [errorMessages, setErrorMessages] = useState({
        startingDate: {},
        endingDate: {},
        birthDate: {},
    });

    const validateStartingValidityDate = value => {
        const startingDate = moment(value);
        const now = moment();

        if (!startingDate.isValid()) {
            // setErrorMessages({...errorMessages, startingDate: "Start date should be a valid one"});
            setErrorMessages({
                ...errorMessages,
                startingDate: {
                    id: 'form.error.date.valid',
                    value: {
                        date: intl.formatMessage({id: 'date.validity.start'}),
                    }
                }
            });
            return false;
        }

        if (now.diff(startingDate) < 0) {
            // setErrorMessages({...errorMessages, startingDate: "Start date must not be upper than today date"});
            setErrorMessages({
                ...errorMessages,
                startingDate: {
                    id: 'form.error.date.maximumDate',
                    value: {
                        currentDate: intl.formatMessage({id: 'date.validity.start'}),
                        maximumDate: _.lowerCase(intl.formatMessage({id: 'date.today'})),
                    }
                }
            });
            return false;
        }

        return true;
    };

    const validateEndingValidityDate = (endingDate, startingDate) => {
        const _endingDate = moment(endingDate);
        const _startingDate = moment(startingDate);

        if (!_startingDate.isValid()) {
            setErrorMessages({
                ...errorMessages,
                startingDate: {
                    id: 'form.error.date.valid',
                    value: {
                        date: intl.formatMessage({id: 'date.validity.start'}),
                    }
                }
            });
            return false;
        }

        if (_endingDate.diff(_startingDate) < 0) {
            // setErrorMessages({...errorMessages, endingDate: "Start date must not be upper than ending date"});
            setErrorMessages({
                ...errorMessages,
                endingDate: {
                    id: 'form.error.date.maximumDate',
                    value: {
                        currentDate: intl.formatMessage({id: 'date.validity.start'}),
                        maximumDate: _.lowerCase(intl.formatMessage({id: 'date.validity.end'})),
                    }
                }
            });
            return false;
        }

        return true;
    };

    return (
        <div className="row align-items-flex-end">
            <FormGroup className="col-6 has-wrapper">
                <InputLabel className="text-left" htmlFor="startingValidityDate">
                    {startDateLabel}
                </InputLabel>
                <InputComponent
                    type="date"
                    isRequired
                    errors={errors}
                    register={register}
                    name={startDateName}
                    id="startingValidityDate"
                    className="has-input input-lg"
                    otherValidator={{validate: value => validateStartingValidityDate(value)}}
                >
                    {errors[startDateName] && errors[startDateName]?.type !== 'required' && (
                        <ErrorInputComponent
                            text={intl.formatMessage(
                                {id: errorMessages.startingDate.id},
                                errorMessages.startingDate.value,
                            )}
                        />
                    )}
                </InputComponent>
            </FormGroup>
            <FormGroup className="col-6 has-wrapper">
                <InputLabel className="text-left" htmlFor="endingValidityDate">
                    {endDateLabel}
                </InputLabel>
                <InputComponent
                    type="date"
                    isRequired
                    errors={errors}
                    name={endDateName}
                    register={register}
                    id="endingValidityDate"
                    className="has-input input-lg"
                    otherValidator={{validate: value => validateEndingValidityDate(value, watch('startingValidityDate'))}}
                >
                    {errors[endDateName] && errors[endDateName]?.type !== 'required' && (
                        <ErrorInputComponent
                            text={intl.formatMessage(
                                {id: errorMessages.endingDate.id},
                                errorMessages.endingDate.value,
                            )}
                        />
                    )}
                </InputComponent>
            </FormGroup>
        </div>
    );
};

RangeDate.propTypes = {
    startDateLabel: PropTypes.any.isRequired,
    endDateLabel: PropTypes.any.isRequired,
    startDateName: PropTypes.string.isRequired,
    endDateName: PropTypes.string.isRequired,
};

RangeDate.defaultProps = {
    startDateLabel: <IntlMessages id="date.validity.start"/>,
    endDateLabel: <IntlMessages id="date.validity.end"/>,
};

export default injectIntl(RangeDate);
