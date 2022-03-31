import React from 'react';
import PropTypes from 'prop-types';

const TitleHeader = ({title, subTitle}) => {
    return (
        <div className="title-header mt-70 py-30 my-50" >
            <div className="p-30 text-center">
                <h1 className="font-4x">
                    {title}
                </h1>
                {subTitle && (
                    <h2>
                        {subTitle}
                    </h2>
                )}
            </div>
        </div>
    );
};

TitleHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
};

export default TitleHeader;
