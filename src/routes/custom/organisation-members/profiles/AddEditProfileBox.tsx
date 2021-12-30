import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import ProfileService from 'Services/profileService';
import {setRequestGlobalAction} from 'Actions';
import {NotificationManager} from 'react-notifications';
import {useDispatch} from 'react-redux';
import {PROFILES} from 'Url/backendUrl'; 
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import useSWR from 'swr';
import { Permission, Profile } from 'Models';

type Props = {
    profile?: Profile
    show: boolean
    onClose: () => void
}

type TreeNode = {
    value: any;
    label: string;
    children?: TreeNode[]
}

const AddEditProfileBox = ({profile, show, onClose}: Props) => {

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    useEffect(() => {
        setLabel(profile ? profile.label : '');
        setDescription(profile ? profile.description : '');
        setChecked(profile ? profile.permissions.map(p => p.id) : []);
    }, [profile]);

    const dispatch = useDispatch();

    const {data: permissions} = useSWR<Permission[]>(PROFILES.permissions);

    const nodes: TreeNode[] = [];

    if (permissions) {
        permissions.forEach(p => {
            const childNode = {
                value: p.id,
                label: p.label
            };
            const i = nodes.findIndex(e => e.value === p.type);
            if (i >= 0) {
                nodes[i].children.push(childNode);
            } else {
                nodes.push({
                    value: p.type,
                    label: p.type,
                    children: [childNode]
                });
            }
        });
    }



    const onSubmit = async () => {
        dispatch(setRequestGlobalAction(true));
        const data = { label, description, permissions: checked };
        try {
            if (profile) {
                await ProfileService.putProfile(profile.id, data);
            } else {
                await ProfileService.postProfile(data);
            }
            NotificationManager.success(`Profile ${profile ? 'édité' : 'créé'} avec succès !`)
        } catch {
            NotificationManager.error("Une erreur est survenue lors de l'opération !");
        } finally {
            dispatch(setRequestGlobalAction(false))
            onClose();
        }
    }

    return (
        <Dialog
            open={show}
            onClose={() => onClose()}
            aria-labelledby="responsive-dialog-title"
            maxWidth={'md'}
            fullWidth
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    {profile ? 'Editer' : 'Ajouter'} un profile
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={() => onClose()}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="row">
                    <div className="col-md-12">
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
                                <InputLabel className="text-left" htmlFor="description">
                                    Description
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="textarea"
                                    id="description"
                                    name="description"
                                    className="input-lg"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="label">
                                    Choix des permissions du profile
                                </InputLabel>
                                {permissions ? <CheckboxTree
                                    nodes={nodes}
                                    checked={checked}
                                    expanded={expanded}
                                    onCheck={checked => setChecked(checked)}
                                    onExpand={expanded => setExpanded(expanded)}
                                    icons={{
                                        check: <span className="material-icons">check_box</span>,
                                        uncheck: <span className="material-icons">check_box_outline_blank</span>,
                                        halfCheck: <span className="material-icons">indeterminate_check_box</span>,
                                        expandClose: <span className="material-icons">keyboard_arrow_right</span>,
                                        expandOpen: <span className="material-icons">keyboard_arrow_down</span>,
                                        expandAll: <span className="material-icons">insert_emoticon</span>,
                                        collapseAll: <span className="material-icons">insert_emoticon</span>,
                                        parentClose: <span className="material-icons">folder</span>,
                                        parentOpen: <span className="material-icons">folder_open</span>,
                                        leaf: <span className="material-icons">insert_drive_file</span>,
                                    }}
                                /> : <h3>Chargement des permissions...</h3>}
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    color="primary"
                                    disabled={!label || !description || !checked.length}
                                    variant="contained"
                                    onClick={onSubmit}
                                    className="text-white font-weight-bold"
                                >
                                    {profile ? 'Editer' : 'Ajouter'}
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};


const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});


export default withStyles(styles, { withTheme: true }) (AddEditProfileBox);
