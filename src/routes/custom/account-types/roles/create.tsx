import { connect } from 'react-redux';
import RoleService from 'Services/roles';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CheckboxTree from 'react-checkbox-tree';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import { getNodeFromPermissions } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

type TreeNode = {
    value: any;
    label: string;
    children?: TreeNode[]
}

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [expanded, setExpanded] = useState([]);
    const [nodes, setNodes] = useState<TreeNode[]>([]);
    const [setPermissions] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
        getPermissions();
    }, []);

    const getPermissions = () => {
        props.setRequestGlobalAction(true),
            RoleService.getPermissions()
                .then(response => {
                    let datas = getNodeFromPermissions(response);
                    setNodes(datas);
                })
                .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if (!label || selectedPermissions.length <= 0)
            return

        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            type: 'USER_ACCOUNT',
            description: description,
            permissionIds: selectedPermissions.map(p => Number(p))
        }

        RoleService.createRole(data).then(() => {
            NotificationManager.success("Le role a été créé avec succès");
            props.history.push(USER_ACCOUNT_TYPE.ROLE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du role");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création de role"}
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
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));