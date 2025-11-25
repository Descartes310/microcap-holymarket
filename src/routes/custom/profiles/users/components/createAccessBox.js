import { connect } from 'react-redux';
import UserService from 'Services/users';
import RoleService from 'Services/roles';
import { withRouter } from "react-router-dom";
import UserSelect from 'Components/UserSelect';
import ContractService from 'Services/contracts';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button } from 'reactstrap';

const CreateAccessBox = (props) => {

    const {show, onClose} = props;
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [contracts, setContracts] = useState([]);
    const [contract, setContract] = useState(null);
    const [derogation, setDerogation] = useState(false);

    useEffect(() => {
        getRoles();
        getContracts();
    }, []);

    const getRoles = () => {
        props.setRequestGlobalAction(true);

        let data = {
            type: 'ACCESS'
        }

        if(props.referralCode) {
            data.referralCode = props.referralCode
        }

        RoleService.getRoles(data)
        .then(response => setRoles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getContracts = () => {
        props.setRequestGlobalAction(true);
        let data = {}
        if(props.referralCode) {
            data.referralCode = props.referralCode
        } else {
            data.referralCode = props.authUser.referralId
        }
        ContractService.getActivableContracts(data)
        .then(response => setContracts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        let data = {};

        if(!derogation) {
            if(!contract) {
                NotificationManager.error("Le formulaire est mal renseigné 1");
                return;
            }
            data.contract_reference = contract.reference;
        } else {
            if(!role || !user) {
                NotificationManager.error("Le formulaire est mal renseigné 2");
                return;
            }
            data.reference = user.referralCode;
            data.role_reference = role.reference; 
        }

        if(props.referralCode) {
            data.referralCode = props.referralCode;
        }
        
        if(props.onSubmit) {
            props.onSubmit({...data, type: 'ACTIVATE_CONTRACT'});
        } else {
            props.setRequestGlobalAction(true);

            UserService.createUserAccess(data).then(() => {
                NotificationManager.success('Le nouvel accès a été enregistré');
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Une erreur s'est produite");
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
                onClose(true);
            });
        }
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
                { !props.referralCode && (
                    <FormGroup>
                        <Checkbox
                            color="primary"
                            checked={derogation}
                            onChange={(e) => setDerogation(!derogation)}
                        />
                        <label>Je veux donner une procuration</label>
                    </FormGroup>
                )}
                {
                    !derogation ? 
                    <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                        <InputLabel className="text-left">
                            Mes contrats
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={contract}
                            options={contracts}
                            onChange={(__, item) => {
                                setContract(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                :
                    <>
                        <UserSelect label={'Numéro utilisateur'} onChange={(_, response) => {
                            setUser(response);
                        }}/>
                        <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                            <InputLabel className="text-left">
                                Procurations
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

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(CreateAccessBox));