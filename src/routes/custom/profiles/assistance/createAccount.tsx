import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { PROFILE } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import SweetAlert from 'react-bootstrap-sweetalert';
import RegisterSteps from "Routes/session/register/steps";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const CreateAccount = (props) => {

    const [user, setUser] = useState(null);
    const [showSweetAlert, setShowSweetAlert] = useState(false);

    const confirmSweetAlert = () => {
        setShowSweetAlert(false);
        setUser(user);
        window.location.href = PROFILE.ASSISTANCE.CREATE_ACCOUNT;
     }

     useEffect(() => {
        if(user) {
            setShowSweetAlert(true);
        }
     }, [user])

    return (
        <RctCollapsibleCard>
            <RegisterSteps history={props.history} onSuccess={(response) => {
                setUser(response?.user);
                console.log(response.user);
            }} />
            <SweetAlert
               success
               btnSize="sm"
               show={showSweetAlert}
               title="Le compte a été crée !"
               onConfirm={() => confirmSweetAlert()}
            >
               <div className='flex pl-10 text-left pt-5'>
                  Le compte utilisateur a bien été créé, voici quelques informations importantes:
                  <ul className='ml-20 pt-10'>
                     <li><b>Numéro utilisateur:</b> {user?.referralId}</li>
                     <li><b>Login:</b> {user?.login}</li>
                     <li><b>Mot de passe:</b> <i>Saisi pendant l'inscription</i></li>
                  </ul>
                  Veuillez les noter, elles vous seront utiles plus tard.<br />
               </div>
            </SweetAlert>
        </RctCollapsibleCard>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(CreateAccount));