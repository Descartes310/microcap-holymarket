/**
 * Register Page
 */

import RegisterSteps from './steps';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LANDING } from "Url/frontendUrl";
import { useQuery } from "Helpers/helpers";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from 'Util/IntlMessages';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import { SessionSlider } from 'Components/Widgets';
import { AUTH, HOME } from "../../../urls/frontendUrl";
import { loginUserWithEmailAndPassword } from 'Actions';

const Signup = (props) => {

   const query = useQuery(useLocation);
   
   /**
    * On User Sing up
    */
   const onSubmit = (data) => {
      props.loginUserWithEmailAndPassword(data, props.history)
         .then(() => props.history.push(HOME))
         .catch();
   };

   /**
    * On User Log in
    */
   const onUserLogin = () => {
      props.history.push(AUTH.LOGIN);
   };

   /**
    * On navigate to Discover Microcap
    */
   const onDiscoverClick = () => {
      props.history.push(LANDING.HOME);
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
                        <div className="center-hor-ver" style={{ marginRight: '10%' }}>
                           <Button variant="contained" className="btn-light mr-2 p-10" onClick={onUserLogin}>
                              <IntlMessages id="auth.signin" />
                           </Button>
                           <Button variant="contained" className="btn-primary mr-2 text-white p-10" onClick={onDiscoverClick}>
                              Tout Microcap
                           </Button>
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
                           <h1 className="p-20">Créer mon compte en 2 étapes</h1>
                           <div className="">
                              <RegisterSteps history={props.history} />
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
