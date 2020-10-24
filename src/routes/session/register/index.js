/**
 * Register Page
 */

import React, {useState} from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// components
import { SessionSlider } from 'Components/Widgets';
import PersonRegister from './person';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {loginUserWithEmailAndPassword} from 'Actions';
import {AUTH, HOME} from "../../../services/frontendRoute";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import IntlMessages from 'Util/IntlMessages';
import LanguageProvider from "Components/Header/LanguageProvider";
import SwipeableViews from "react-swipeable-views";
import OrganisationRegister from "Routes/session/register/organisation";

const Signup = (props) => {
   const { loading } = props;
   const [activeIndex, setActiveIndex] = useState(0);

   // const watch

   /**
    * On User Sing up
    */
   const onSubmit = (data) => {
      props.loginUserWithEmailAndPassword(data, props.history)
          .then(() => props.history.push(HOME));
   };

   /**
    * On User Log in
    */
   const onUserLogin = () => {
      props.history.push(AUTH.LOGIN);
   };

   return (
       <QueueAnim type="bottom" duration={2000}>
          <div className="rct-session-wrapper">
             <AppBar position="static" className="session-header">
                <Toolbar>
                   <div className="container">
                      <div className="d-flex justify-content-between">
                         <div className="session-logo">
                            <Link to="/">
                               <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                            </Link>
                         </div>
                         <div className="center-hor-ver">
                            <a className="mr-15 text-white" onClick={onUserLogin}>
                               <IntlMessages id="auth.haveAccount" />
                            </a>
                            <Button variant="contained" className="btn-light mr-2" onClick={onUserLogin}>
                               <IntlMessages id="auth.signin" />
                            </Button>
                            <LanguageProvider />
                         </div>
                      </div>
                   </div>
                </Toolbar>
             </AppBar>
             <div className="session-inner-wrapper">
                <div className="container">
                   <div className="row align-items-center">
                      <div className="col-sm-7 col-md-7 col-lg-8">
                         <div className="session-body text-center p-0">
                            <div className="">
                               <Tabs
                                   value={activeIndex}
                                   onChange={(e, value) => setActiveIndex(value)}
                                   variant="fullWidth"
                                   textColor="primary"
                                   indicatorColor="primary">
                                  <Tab
                                      className="font-size-medium"
                                      label={<IntlMessages id="auth.person" />}
                                      icon={<i className="zmdi-hc-lg zmdi zmdi-account"></i>}
                                  />
                                  <Tab className="font-size-medium" icon={<i className="zmdi-hc-lg zmdi zmdi-balance"></i>} label={<IntlMessages id="auth.organisation" />} />
                               </Tabs>
                               <SwipeableViews
                                   axis={'x'}
                                   index={activeIndex}
                                   onChangeIndex={(index) => setActiveIndex(index)}>
                                  <PersonRegister history={props.history} />
                                  <OrganisationRegister history={props.history} />
                               </SwipeableViews>
                            </div>
                         </div>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-4">
                         <SessionSlider />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </QueueAnim>
   );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
   return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {
   loginUserWithEmailAndPassword
})(Signup);
