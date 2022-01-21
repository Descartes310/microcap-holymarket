import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import RoleService from 'Services/roles';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
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
                                            <th className="fw-bold">Label</th>
                                            <th className="fw-bold">Permissions</th>
                                            <th className="fw-bold">Description</th>
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
                                                    -
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