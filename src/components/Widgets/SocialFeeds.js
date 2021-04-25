/**
 * Social Feeds Widget
 */
import React from 'react';

const SocialFeedsWidget = ({ type, icon, link }) => (
    // <div className="social-card">
    <span onClick={() => window.open(link, '_blank')} className={`rounded-circle social-icon ${type}`} style={{ cursor: 'pointer' }}><i className={`${type} ${icon}`}></i></span>
    // </div>
);

export default SocialFeedsWidget;
