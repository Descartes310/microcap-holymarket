import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import UserService from 'Services/users';
import RoleService from 'Services/roles';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { NotificationManager } from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [roles, setRoles] = useState([]);
    const [member, setMember] = useState(null);
    const [reference, setReference] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = () => {
        props.setRequestGlobalAction(true),
            RoleService.getRoles({ type: 'GROUP_MEMBER' })
                .then(response => setRoles(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    const findUserByReference = () => {
        if (!reference)
            return;
        props.setRequestGlobalAction(true),
            UserService.findUserByReference(reference)
                .then(response => setMember(response))
                .catch(err => {
                    console.log(err);
                    NotificationManager.error("Reference incorrecte");
                })
                .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        // if(!label || selectedPermissions.length <= 0)
        //     return

        // props.setRequestGlobalAction(true);

        // let data: any = {
        //     label: label,
        //     type: 'GROUP_TYPE',
        //     description: description,
        //     permissionIds: selectedPermissions.map(p => Number(p))
        // }

        // RoleService.createRole(data).then(() => {
        //     NotificationManager.success("Le role a été créé avec succès");
        //     props.history.push(GROUP.ROLE.LIST);
        // }).catch((err) => {
        //     console.log(err);
        //     NotificationManager.error("Une erreur est survenu lors de la création du role");
        // }).finally(() => {
        //     props.setRequestGlobalAction(false);
        // })
    }

    return (
        <>
            <PageTitleBar
                title={"Ajout de membre"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Reference utilisateur
                        </InputLabel>
                        <InputStrap
                            required
                            id="reference"
                            type="text"
                            name='reference'
                            className="input-lg"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </FormGroup>

                    {member && (
                        <FormGroup className="has-wrapper">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={member.userReference}
                            />
                        </FormGroup>
                    )}

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Roles du membre
                        </InputLabel>
                        <Autocomplete
                            multiple
                            options={roles}
                            id="combo-box-demo"
                            value={selectedRoles}
                            onChange={(__, items) => {
                                setSelectedRoles(items);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!reference}
                            onClick={() => findUserByReference()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Vérifier l'utilisateur
                        </Button>
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));