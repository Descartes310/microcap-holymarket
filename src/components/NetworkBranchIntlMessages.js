import React from 'react';
import PropTypes from 'prop-types';
import IntlMessages from "Util/IntlMessages";

const NetworkBranchIntlMessages = ({profileName, id, ...restProps}) => {
    const newId =  /^branch\./.test(id)
        ? ((profileName === 'PROFILE_MANAGER' ? 'branch' : 'network') + id.replace(/^branch/, ''))
        : id;
    // const prefix = profileName === 'PROFILE_MANAGER' ? 'branch' : 'branch';

    return (<IntlMessages id={newId} {...restProps} />);
};

NetworkBranchIntlMessages.propTypes = {

};

export default NetworkBranchIntlMessages;
