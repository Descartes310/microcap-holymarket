import { connect } from 'react-redux';
import UserService from 'Services/users';
import RoleService from 'Services/roles';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const CreateAccessBox = (props) => {

    const {show, onClose} = props;
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [userReference, setUserReference] = useState(null);
    const [newSubscription, setNewSubscription] = useState(true);
    const [subscriptionReference, setSubscriptionReference] = useState(null);

    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = () => {
        props.setRequestGlobalAction(true),
        RoleService.getRoles({type: 'ACCESS'})
        .then(response => setRoles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const findUserByReference = () => {
        if (!userReference)
            return;
        props.setRequestGlobalAction(true),
        UserService.findUserByReference(userReference)
            .then(response => setUser(response))
            .catch((err) => {
                setUser(null);
                NotificationManager.error("Reference incorrecte");
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!user) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }
        
        let data = {
            reference: userReference
        };
        
        if(newSubscription) {
            data.subscription_reference = subscriptionReference;
        } else {
            if(!login || !password || !role) {
                NotificationManager.error("Le formulaire est mal renseigné");
                return;
            }
            data.login = login;
            data.password = password;
            data.role_reference = role.reference; 
        }
        
        props.setRequestGlobalAction(true);

        UserService.createUserAccess(data).then(() => {
            NotificationManager.success('Le nouvel accès a été enregistré');
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            setUser(null);
            setLogin(null);
            setPassword(null);
            setUserReference(null);
            setSubscriptionReference(null);
            props.setRequestGlobalAction(false);
            onClose(true);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer un nouvel accès
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="userReference">
                        Réference utilisateur
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="userReference"
                        name="userReference"
                        className="input-lg"
                        onChange={(e) => setUserReference(e.target.value)}
                    />
                </FormGroup>
                {user && (
                    <>
                        <FormGroup className="has-wrapper">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={user.userName}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={user.email}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={getReferralTypeLabel(user.referralType)}
                            />
                        </FormGroup>
                    </>
                )}
                <FormGroup>
                    <Checkbox
                        color="primary"
                        checked={newSubscription}
                        onChange={(e) => setNewSubscription(!newSubscription)}
                    />
                    <label>Nouvelle souscription</label>
                </FormGroup>
                {
                    newSubscription ? 
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="subscriptionReference">
                            Réference souscription
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            className="input-lg"
                            id="subscriptionReference"
                            name="subscriptionReference"
                            onChange={(e) => setSubscriptionReference(e.target.value)}
                        />
                    </FormGroup> 
                :
                    <>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="login">
                                Login
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="login"
                                name="login"
                                className="input-lg"
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="password">
                                Mot de passe
                            </InputLabel>
                            <InputStrap
                                required
                                id="password"
                                type="password"
                                name="password"
                                className="input-lg"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                            <InputLabel className="text-left">
                                Roles internes
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={role}
                                options={roles}
                                onChange={(__, item) => {
                                    setRole(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </>
                }
                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={!userReference}
                        onClick={() => findUserByReference()}
                        className="text-white font-weight-bold mr-20 bg-blue"
                    >
                        Vérifier l'utilisateur
                    </Button>
                    <Button
                        color="primary"
                        className="ml-0 text-white float-right"
                        onClick={() => onSubmit()}
                    >
                        Enregistrer
                    </Button>
                </FormGroup>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateAccessBox));