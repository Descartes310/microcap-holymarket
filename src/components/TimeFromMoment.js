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
const TimeFromMoment = ({time, showFullDate, style, format="LL"}) => {
    const _time = time ? moment(time) : moment();

    return (
        <Tooltip id="tooltip-createdAt" title={_time.format('LLL')}>
            <p className={"m-0 fw-bold text-dark"} style={style}>
                { (showFullDate || format) ? _time.format(format) :  _time.fromNow()}
            </p>
        </Tooltip>
    );
};

TimeFromMoment.propTypes = {
    time: PropTypes.string.isRequired,
};

export default TimeFromMoment;
