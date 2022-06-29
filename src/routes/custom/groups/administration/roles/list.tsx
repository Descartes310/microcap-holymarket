import { connect } from 'react-redux';
import RoleService from 'Services/roles';
import { withRouter } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import CustomList from "Components/CustomList";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { NotificationManager } from "react-notifications";
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Roles = (props) => {

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = () => {
        props.setRequestGlobalAction(true),
        RoleService.getRoles({type: 'GROUP_MEMBER'})
        .then(response => setRoles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeRoleStatus = (role, status) => {
        props.setRequestGlobalAction(true),
        RoleService.changeRoleStatus(role.id, {status, type: 'GROUP_MEMBER'})
        .then(() => {
            getRoles();
            NotificationManager.success("L'opération s'est déroulée avec succès");
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite, veuillez contacter l'assistance");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(GROUP.ADMINISTRATION.ROLE.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des roles"}
            />
            <CustomList
                loading={false}
                list={roles}
                itemsFoundText={n => `${n} role.s trouvé.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun role.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Permissions</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Rôle par défaut</th>
                                            <th className="fw-bold">Action</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.permissions.length} permission.s</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{item.description}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.default}
                                                        onChange={() => { changeRoleStatus(item, !item.default) }}
                                                    />
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.ROLE.UPDATE, item.id))}
                                                    >
                                                        Editer
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
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Roles));