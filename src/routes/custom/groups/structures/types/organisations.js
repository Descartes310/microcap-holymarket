import { connect } from 'react-redux';
import {Form, FormGroup} from 'reactstrap';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const GroupOptionTypes = (props) => {

    const {show, onClose, reference} = props;
    
    const [groupType, setGroupType] = useState(null);
    const [groupTypes, setGroupTypes] = useState([]);
    const [addGroupType, setAddGroupType] = useState(false);
    const [groupStructureTypes, setGroupStructureTypes] = useState([]);

    useEffect(() => {
        getGroupTypes();
        getGroupStructureTypes();
    }, []);

    const getGroupTypes = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupTypes({})
        .then(response => setGroupTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getGroupStructureTypes = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupStructureTypes(reference)
        .then(response => setGroupStructureTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {        
        if(!groupType) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }
        
        let data = {
            group_type_reference: groupType.reference
        }
        
        props.setRequestGlobalAction(true);
        GroupService.createGroupStructureTypes(reference, data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            getGroupStructureTypes();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de l'item");
        }).finally(() => {
            setAddGroupType(false);
            setGroupType(null);
            props.setRequestGlobalAction(false);
        })
    }

    const onDelete = (item) => {
        
        let data = {
            group_type_reference: item?.groupType.reference
        }
        
        props.setRequestGlobalAction(true);
        GroupService.deleteGroupStructureTypes(reference, data).then(() => {
            NotificationManager.success("L'item a été supprimé avec succès");
            getGroupStructureTypes();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de la suppression de l'item");
        }).finally(() => {
            setAddGroupType(false);
            setGroupType(null);
            props.setRequestGlobalAction(false);
        })
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Gestion des types organisations
                </h3>
            )}
        >
            {
                (addGroupType) ? (
                    <Form onSubmit={onSubmit}>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Types organisations
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={groupType}
                                options={groupTypes}
                                onChange={(__, item) => {
                                    setGroupType(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>

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
                ) :
                <CustomList
                    list={groupStructureTypes}
                    loading={false}
                    onAddClick={() => setAddGroupType(true)}
                    itemsFoundText={n => `${n} types trouvés`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun type trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Description</th>
                                                <th className="fw-bold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item?.groupType?.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item?.groupType?.description}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                onDelete(item);
                                                            }}
                                                            className="text-white font-weight-bold mr-3"
                                                        >
                                                            Supprimer
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />
            }
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(GroupOptionTypes));