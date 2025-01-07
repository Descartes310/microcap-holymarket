import UpdateRole from './updateRole';
import CreateRole from './createRole';
import { connect } from 'react-redux';
import UserService from 'Services/users';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import ConfirmBox from "Components/dialog/ConfirmBox";
import { NotificationManager } from 'react-notifications';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import DialogComponent from "Components/dialog/DialogComponent";

const ListRoles = (props) => {

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [showCreateRoleBox, setShowCreateRoleBox] = useState(false);
    const [showUpdateRoleBox, setShowUpdateRoleBox] = useState(false);

    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = () => {
        props.setRequestGlobalAction(true),
        UserService.getAccessProcurations()
        .then(response => setRoles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const deleteAccess = () => {
        if(!selectedRole) {
            NotificationManager.error("Sélectionner la procuration à supprimer");
            return
        }
        props.setRequestGlobalAction(true),
        UserService.deleteAccessProcurations(selectedRole.reference)
        .then(() => {
            getRoles();
            setShowDeleteBox(false);
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={props.show}
            onClose={() => props.onClose()}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Mes procurations
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
                                                <th className="fw-bold">Type</th>
                                                <th className="fw-bold">Login</th>
                                                <th className="fw-bold">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.userName}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">
                                                                    {item.type}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 text-dark">{item.login}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* <Button
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
                                                        </Button> */}

                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white btn-danger font-weight-bold"
                                                            onClick={() => {
                                                                setSelectedRole(item);
                                                                setShowDeleteBox(true);
                                                            }}
                                                        >
                                                            Delete
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
            { selectedRole && showUpdateRoleBox && (
                <UpdateRole 
                    role={selectedRole}
                    show={showUpdateRoleBox} 
                    onClose={() => {
                        setShowUpdateRoleBox(false);
                        getRoles();
                    }} 
                />
            )}
            { showDeleteBox && selectedRole && (
                <ConfirmBox
                    show={showDeleteBox}
                    rightButtonOnClick={() => deleteAccess()}
                    leftButtonOnClick={() => {
                        setSelectedRole(null);
                        setShowDeleteBox(false);
                    }}
                    message={'Etes vous sure de vouloir supprimer cette procuration ?'}
                />
            )}
        </DialogComponent>
    )
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(ListRoles));