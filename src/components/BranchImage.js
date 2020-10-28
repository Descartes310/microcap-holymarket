import React from 'react';
import PropTypes from 'prop-types';

const BranchImage = ({logo, small, className, ...restProps}) => {
    const defaultImage = small ? require('Assets/identity/network_small2.png') : require('Assets/identity/network.jpg');
    const _className = className ? `${className} ${small ? 'bg-white' : ''}` : small ? 'bg-white' : '';
    return (
        <>
            {logo ? (
                <img
                    alt="..."
                    src={logo}
                    className={_className}
                    onError={(e)=>{console.log("inside onerror"); e.target.onerror = null; e.target.src=defaultImage}}
                    {...restProps}
                />
            ) : (
                <img
                    alt="..."
                    className={_className}
                    src={defaultImage}
                    {...restProps}
                />
            )}
        </>
    );
};

BranchImage.propTypes = {
    logo: PropTypes.string,
};

export default BranchImage;
