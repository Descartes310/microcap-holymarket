import React from 'react';
import PropTypes from 'prop-types';

const FlagCountry = ({label, flag}) => {
    return (
        <div className="text-left">
            <img className="mr-2 w-auto" src={flag} alt="..." height="15"/>
            {label}
        </div>
    );
};

FlagCountry.propTypes = {
    flag: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default FlagCountry;
