/**
 * Register Page
 */

import RegisterSteps from './steps';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "Helpers/helpers";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from 'Util/IntlMessages';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import SweetAlert from 'react-bootstrap-sweetalert';
import { SessionSlider } from 'Components/Widgets';
import { LANDING, AUTH, HOME } from "Url/frontendUrl";
import { loginUserWithEmailAndPassword } from 'Actions';

const Signup = (props) => {

   const query = useQuery(useLocation);
   const [user, setUser] = useState(null);
   const [showSweetAlert, setShowSweetAlert] = useState(false);
   
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

   const confirmSweetAlert = () => {
      setShowSweetAlert(false);
      setUser(user);
      props.history.push(AUTH.LOGIN);
   }

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
                              <RegisterSteps history={props.history} onSuccess={(response) => {
                                 setShowSweetAlert(true);
                                 setUser(response);
                              }} />
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-5 col-md-5 col-lg-4">
                        <SessionSlider />
                     </div>
                  </div>
               </div>
            </div>

            <SweetAlert
               success
               btnSize="sm"
               show={showSweetAlert}
               title="Votre compte a été crée !"
               onConfirm={() => confirmSweetAlert()}
            >
               <div className='flex pl-10 text-left pt-5'>
                  Votre compte utilisateur a bien été créé, voici quelques informations importantes:
                  <ul className='ml-20 pt-10'>
                     <li><b>Numéro utilisateur:</b> {user?.referralId}</li>
                     <li><b>Login:</b> {user?.login}</li>
                     <li><b>Mot de passe:</b> <i>Saisi pendant l'inscription</i></li>
                  </ul>
                  Veuillez les noter, elles vous seront utiles plus tard.<br />
                  Cliquez sur le bouton ci-dessous pour vous connecter et valider votre compte.
               </div>
            </SweetAlert>
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
