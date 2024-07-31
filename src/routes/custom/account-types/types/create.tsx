import { connect } from 'react-redux';
import RoleService from 'Services/roles';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import { referraTypes } from 'Helpers/helpers';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UserAccountTypeService from 'Services/account-types';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [referralType, setReferralType] = useState(null);

    useEffect(() => {
        getTypes();
        getRoles();
    }, []);

    const getTypes = () => {
        setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypeCategories()
        .then(response => setCategories(response))
        .finally(() => setRequestGlobalAction(false))
    }

    const getRoles = () => {
        props.setRequestGlobalAction(true),
        RoleService.getRoles({type: 'USER_ACCOUNT'})
        .then(response => setRoles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!category || !label || !role)
            return

        let data: any = {
            label: label,
            roleRef: role.reference,
            categoryId: category.id,
            description: description,
            referralType: referralType.value,
        }
            
        props.setRequestGlobalAction(true);
        UserAccountTypeService.createAccountType(data).then(() => {
            NotificationManager.success("Le type a été créée avec succès");
            props.history.push(USER_ACCOUNT_TYPE.TYPE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du type");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Création du type de compte"} onBackClick={() => props.history.push(USER_ACCOUNT_TYPE.TYPE.LIST)}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Cible
                        </InputLabel>
                        <Autocomplete
                            value={referralType}
                            id="combo-box-demo"
                            options={referraTypes()}
                            onChange={(__, item) => {
                                setReferralType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Catégorie de compte
                        </InputLabel>
                        <Autocomplete
                            value={category}
                            id="combo-box-demo"
                            options={categories}
                            onChange={(__, item) => {
                                setCategory(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Rôles par défaut
                        </InputLabel>
                        <Autocomplete
                            options={roles}
                            id="combo-box-demo"
                            value={role}
                            onChange={(__, item) => {
                                setRole(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));