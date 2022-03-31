import React from 'react';
import {withRouter} from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
// intl messages

const PageTitleBar = ({ title, match, history, titleClassName, style, showBackBtn, onBackClick }) => {
   return (
      <div className="page-title d-flex justify-content-between align-items-center" style={style}>
         {title &&
            <div className="page-title-wrap">
               {showBackBtn && (
                   <i
                       className="ti-angle-left mr-0 cursor-pointer icon-hover"
                       onClick={() => onBackClick ? onBackClick() : history ? history.goBack() : null}
                   />
               )}
               <h2 className={titleClassName}>{title}</h2>
            </div>
         }
      </div>
   )
};

PageTitleBar.propTypes = {
   title: PropTypes.string,
   showBackBtn: PropTypes.bool,
   enableBreadCrumb: PropTypes.bool,
   style: PropTypes.object,
   onBackClick: PropTypes.func,
   titleClassName: PropTypes.string,
};

// default props value
PageTitleBar.defaultProps = {
   enableBreadCrumb: false,
   style: {},
   showBackBtn: true,
   titleClassName: '',
};

export default withRouter(PageTitleBar);
