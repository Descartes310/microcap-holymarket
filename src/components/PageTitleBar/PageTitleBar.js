/**
 * Page Title Bar Component
 * Used To Display Page Title & Breadcrumbs
 */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
// intl messages
import IntlMessages from 'Util/IntlMessages';

// get display string
const getDisplayString = (sub) => {
   const arr = sub.split("-");
   if (arr.length > 1) {
      return arr[0].charAt(0) + arr[0].slice(1) + arr[1].charAt(0).toUpperCase() + arr[1].slice(1)
      // return <IntlMessages id={`sidebar.${arr[0].charAt(0) + arr[0].slice(1) + arr[1].charAt(0).toUpperCase() + arr[1].slice(1)}`} />
   } else if (arr[0] !== "") {
      return sub.charAt(0) + sub.slice(1)
      // return <IntlMessages id={`sidebar.${sub.charAt(0) + sub.slice(1)}`} />
   } else {
      return <></>;
   }
};

// get url string
const getUrlString = (path, sub, index) => {
   if (index === 0) {
      return '/';
   } else {
      return '/' + path.split(sub)[0] + sub;
   }
};

const PageTitleBar = ({ title, match, history, enableBreadCrumb, titleClassName, style, showBackBtn, onBackClick }) => {
   const path = match.url.substr(1);
   const subPath = path.split('/');
   return (
      <div className="page-title d-flex justify-content-between align-items-center" style={style}>
         {title &&
            <div className="page-title-wrap">
               {/* <i onClick={() => null} className="ti-angle-left cursor-pointer mr-2 icon-hover"/> */}
               {showBackBtn && (
                   <i
                       className="ti-angle-left mr-0 cursor-pointer icon-hover"
                       onClick={() => onBackClick ? onBackClick() : history ? history.goBack() : null}
                   />
               )}
               <h2 className={titleClassName}>{title}</h2>
            </div>
         }

            {/*<Breadcrumb className="mb-0 tour-step-7" tag="nav">
               {subPath.map((sub, index) => {
                  return <BreadcrumbItem active={subPath.length === index + 1}
                     tag={subPath.length === index + 1 ? "span" : Link} key={index}
                     to={getUrlString(path, sub, index)}>{getDisplayString(sub)}</BreadcrumbItem>
               }
               )}
            </Breadcrumb>*/}

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
