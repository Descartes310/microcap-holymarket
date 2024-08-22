import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

const RegistrationSuccess = (props) => {

   return (
        <SweetAlert
            success
            btnSize="sm"
            show={props.show}
            title="Votre compte a été crée !"
            onConfirm={() => props.onConfirm()}
        >
            <div className='flex pl-10 text-left pt-5'>
                Votre compte utilisateur a bien été créé, voici quelques informations importantes:
                <ul className='ml-20 pt-10'>
                    <li><b>Numéro utilisateur:</b> {props.user?.referralId}</li>
                    <li><b>Login:</b> {props.user?.login}</li>
                    <li><b>Mot de passe:</b> <i>Saisi pendant l'inscription</i></li>
                </ul>
                Veuillez les noter, elles vous seront utiles plus tard.<br />
                Cliquez sur le bouton ci-dessous pour vous connecter et valider votre compte.
            </div>
        </SweetAlert>
   );
};

export default RegistrationSuccess;
