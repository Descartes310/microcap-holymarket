import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import RoleService from 'Services/roles';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const [label, setLabel] = useState('');
    const [groupPost, setGroupPost] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getRoles();
        findGroupPost();
    }, []);

    useEffect(() => {
        if(roles.length > 0 && groupPost != null) {
            setRole(roles.find(r => r.label == groupPost.roleName));
        }
    }, [roles, groupPost]);

    const getRoles = () => {
        props.setRequestGlobalAction(true),
        RoleService.getRoles({type: 'GROUP_MEMBER'})
        .then(response => setRoles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const findGroupPost = () => {
        props.setRequestGlobalAction(true),
        GroupService.findGroupPost(props.match.params.id)
        .then(response => {
            setGroupPost(response);
            setLabel(response.label);
            setDescription(response.description);
        }).catch(() => {
            NotificationManager.error("Poste introuvable");
            props.history.push(GROUP.ADMINISTRATION.POST.LIST)
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!role || !label) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            role_reference: role.reference,
        }

        if(description) {
            data.description = description;
        }

        GroupService.updateGroupPost(props.match.params.id, data).then(() => {
            NotificationManager.success("Le poste a été édité avec succès");
            props.history.push(GROUP.ADMINISTRATION.POST.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'édition du poste");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Edition de poste"}
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
                            Rôle
                        </InputLabel>
                        <Autocomplete
                            value={role}
                            options={roles}
                            id="combo-box-demo"
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
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));