/**
 * Social Feeds Widget
 */
import React from 'react';

const SocialFeedsWidget = ({ type, icon, link, className = '', wrapClassName = '' }) => (
    <span
        style={{ cursor: 'pointer' }}
        onClick={() => window.open(link, '_blank')}
        className={`rounded-circle social-icon ${type} ${wrapClassName}`}
    >
        <i className={`${type} ${icon} ${className}`} />
    </span>
);

export default SocialFeedsWidget;
