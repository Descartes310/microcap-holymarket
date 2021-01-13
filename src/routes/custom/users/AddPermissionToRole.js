import { Input } from "reactstrap";
import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import { NotificationManager } from "react-notifications";
import DialogComponent from "Components/DialogComponent";
import { addPermissionToProfile, getBranchProfile } from "Actions/independentActions";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const AddPermissionToRole = ({ show, profileId, setRequestGlobalAction, onClose, branch, type = 'network-profile' }) => {
    const [roles, setRoles] = useState('');

    const onSubmit = (id) => {
        setRequestGlobalAction(true);
        addPermissionToProfile(profileId, id)
            .then(() => {
                NotificationManager.success("Permission ajouté avec succès");
                onClose();
            })
            .catch(() => NotificationManager.error("Une erreur s'est produite. Veuillez re-essayer."))
            .finally(() => setRequestGlobalAction(false));
    };

    useEffect(() => {
        getBranchProfile(type, branch)
            .then((data) => {
                console.log('DATAS => ', data);
                setRoles(data);
            })
            .catch(() => NotificationManager.error("Aucun utilisateurs correspondant à cette reference. Veuillez re-essayer."))
            .finally(() => setRequestGlobalAction(false));
    }, []);

    return (
        <DialogComponent show={show} title={"Ajouter la permission dns le role"} onClose={onClose}>
            <RctCollapsibleCard>
                <div>
                    <CustomList
                        list={roles}
                        titleList={"Roles utilisateurs"}
                        onAddClick={() => { }}
                        addingButton={true}
                        itemsFoundText={n => `${n} roles trouvés`}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucun roles trouvés
                                    </h4>
                                    </div>
                                ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0 text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Nom</th>
                                                        <th>Description</th>
                                                        <th>Ajouter</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list && list.map((item, key) => (
                                                        <tr key={key} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    color="primary"
                                                                    // variant={"outlined"}
                                                                    className={`text-white font-weight-bold btn-primary btn-xs mr-2`}
                                                                    onClick={() => onSubmit(item.id)}
                                                                >
                                                                    Ajouter
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
                </div>
            </RctCollapsibleCard>
        </DialogComponent>
    );
};

AddPermissionToRole.propTypes = {

};

export default AddPermissionToRole;
