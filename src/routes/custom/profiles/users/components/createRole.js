import { connect } from 'react-redux';
import RoleService from 'Services/roles';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CheckboxTree from 'react-checkbox-tree';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import { getNodeFromPermissions } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateRole = (props) => {

    const [label, setLabel] = useState('');
    const [nodes, setNodes] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
        getPermissions();
    }, []);

    const getPermissions = () => {
        props.setRequestGlobalAction(true),
        RoleService.getPermissions()
        .then(response => {
            setNodes(getNodeFromPermissions(response));
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!label || selectedPermissions.length <= 0)
            return

        props.setRequestGlobalAction(true);

        let data = {
            label: label,
            type: 'ACCESS',
            description: description,
            permissionIds: selectedPermissions.map(p => Number(p))
        }

        RoleService.createRole(data).then(() => {
            NotificationManager.success("Le role a été créé avec succès");
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du role");
        }).finally(() => {
            props.onClose();
            props.setRequestGlobalAction(false);
        })
    }
    
    return (
        <DialogComponent
            show={props.show}
            onClose={() => props.onClose()}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer une procuration
                </h3>
            )}
        >
            <RctCardContent>
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

                    <FormGroup className="col-sm-12 has-wrapper">
                        <InputLabel className="text-left mb-20" htmlFor="description">
                            Choix des permissions
                        </InputLabel>
                        <CheckboxTree
                            nodes={nodes}
                            expanded={expanded}
                            checked={selectedPermissions}
                            onExpand={expanded => setExpanded(expanded)}
                            onCheck={checked => setSelectedPermissions(checked)}
                        />
                    </FormGroup>
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
            </RctCardContent>
        </DialogComponent>
    )
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(CreateRole));