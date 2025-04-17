import React from 'react';
import {connect} from "react-redux";
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import UserService from 'Services/users';
import {HOME, AUTH} from "Url/frontendUrl";
import AppConfig from 'Constants/AppConfig';
import { Form, FormGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import {setRequestGlobalAction} from "Actions";
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from "react-router-dom";
import InputComponent from "Components/InputComponent";
import {NotificationManager} from "react-notifications";

const SendResetPasswordLink = ({loading, setRequestGlobalAction, history}) => {
   const { register, errors, handleSubmit } = useForm();

   const onSubmit = ({username}) => {
      setRequestGlobalAction(true);

      let datas = {
         username,
         branchUrl: window.location.origin+AUTH.RESET_PASSWORD
      };

      UserService.sendPasswordLink(datas)
          .then(() => {
               NotificationManager.success("Nous venons de vous envoyez un message. Merci de bien vouloir le consulter.");
               // history.push(AUTH.RESET_PASSWORD);
          })
          .catch(() => {
               NotificationManager.error("Le numéro utilisateur ou l'adresse email fournie n'est pas reconnue.")
          })
          .finally(() =>  setRequestGlobalAction(false));
   };

   return (
       <QueueAnim type="bottom" duration={2000}>
          <div className="rct-session-wrapper" key="1">
             <AppBar position="static" className="session-header">
                <Toolbar>
                   <div className="container">
                      <div className="d-flex justify-content-between">
                         <div className="session-logo">
                            <Link to={HOME}>
                               <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                            </Link>
                         </div>
                      </div>
                   </div>
                </Toolbar>
             </AppBar>
             <div className="session-inner-wrapper p-4 h-100 p-md-0">
                <div className="row">
                   <div className="col-sm-8 col-lg-5 mx-auto">
                      <div className="session-body text-center">
                         <div className="session-head mb-30">
                            <h2>Réinitialisez votre mot de passe</h2>
                            <p className="mb-0">
                              Entrez votre email et nous vous enverrons un lien de réinitialisation de mot de passe
                            </p>
                         </div>
                         <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup className="has-wrapper">
                               <InputComponent
                                   id="username"
                                   type="text"
                                   isRequired
                                   name={'username'}
                                   errors={errors}
                                   register={register}
                                   className="has-input input-lg"
                                   placeholder={'Numéro utilisateur ou adresse email'} />
                               <span className="has-icon"><i className="ti-email"></i></span>
                            </FormGroup>
                            <FormGroup>
                               <Button
                                   type="submit"
                                   disabled={loading}
                                   variant="contained"
                                   className="btn-info text-white btn-block btn-large w-100"
                              >
                                 Réinitialiser le mot de passe
                              </Button>
                            </FormGroup>
                         </Form>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </QueueAnim>
   );
};

const mapStateToProps = ({ requestGlobalLoader }) => {
   return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(SendResetPasswordLink));

