import React from 'react';
import moment from "moment";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * Display time and tooltip
 * @param time
 * @returns {*}
 * @constructor
 */
const TimeFromMoment = ({time, showFullDate}) => {
    const _time = moment(time);

    return (
        <Tooltip id="tooltip-createdAt" title={_time.format('LLL')}>
            <h4 className={"m-0 fw-bold text-dark"}>
                { showFullDate ? _time.format('LL') :  _time.fromNow()}
            </h4>
        </Tooltip>
    );
};

TimeFromMoment.propTypes = {
    time: PropTypes.string.isRequired,
};

export default TimeFromMoment;
