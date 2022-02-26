import React from 'react';
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import "Routes/custom/dashboard/landing/discover/discover.scss";
import DiscoverMenu from "Routes/custom/dashboard/landing/discover/components/DiscoverMenu";
import DiscoverFooter from "Routes/custom/dashboard/landing/discover/components/DiscoverFooter";

const DiscoverLayout = (props) => {
    return (
        <div id="discover-page" style={props.style}>
            <Helmet>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Helmet>
            <DiscoverMenu />
            {props.children}
            <DiscoverFooter />
        </div>
    );
};

DiscoverLayout.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

DiscoverLayout.defaultProps = {
    title: 'Microcap',
    description: 'Microcap'
};

export default DiscoverLayout;
