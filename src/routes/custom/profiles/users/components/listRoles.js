import UpdateRole from './updateRole';
import CreateRole from './createRole';
import { connect } from 'react-redux';
import RoleService from 'Services/roles';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import DialogComponent from "Components/dialog/DialogComponent";

const ListRoles = (props) => {

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [showCreateRoleBox, setShowCreateRoleBox] = useState(false);
    const [showUpdateRoleBox, setShowUpdateRoleBox] = useState(false);

    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = () => {
        props.setRequestGlobalAction(true),
        RoleService.getRoles({type: 'ACCESS'})
        .then(response => setRoles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={props.show}
            onClose={() => props.onClose()}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Mes roles internes
                </h3>
            )}
        >
            <RctCardContent>
                <CustomList
                    loading={false}
                    list={roles}
                    itemsFoundText={n => `${n} role.s trouvé.s`}
                    onAddClick={() => {
                        setShowCreateRoleBox(true);
                        setShowUpdateRoleBox(false);
                    }}
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
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setSelectedRole(item);
                                                                setShowUpdateRoleBox(true);
                                                                setShowCreateRoleBox(false);
                                                            }}
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
            </RctCardContent>
            <CreateRole 
                show={showCreateRoleBox} 
                onClose={() => {
                    setShowCreateRoleBox(false);
                    getRoles();
                }} 
            />  
            { selectedRole && (
                <UpdateRole 
                    role={selectedRole}
                    show={showUpdateRoleBox} 
                    onClose={() => {
                        setShowUpdateRoleBox(false);
                        getRoles();
                    }} 
                />
            )}
        </DialogComponent>
    )
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(ListRoles));