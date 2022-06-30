import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import UserService from 'Services/users';
import { Badge, Switch } from '@material-ui/core';
import ConfirmBox from "Components/dialog/ConfirmBox"
import { NotificationManager } from "react-notifications";

const List = (props) => {

    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        props.setRequestGlobalAction(true);
        UserService.getBranchUsers()
            .then(response => {
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                setUsers(response);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }


    const activateOrBlock = () => {
        props.setRequestGlobalAction(true)
        UserService.activateOrBlockAccess(selectedMember.referralCode)
            .then(() => {
                NotificationManager.success("L'opération s'est déroulée avec succès");
                setStatus(false);
                setSelectedMember(null);
                setShowConfirmBox(false);
                getUsers();
            })
            .catch(err => {
                console.log(err);
                NotificationManager.error("Une erreur s'est produite, veuillez contacter l'assistance")
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }


    return (
        <>
            <PageTitleBar
                title={"Liste des utilisateurs"}
            />
            <CustomList
                list={users}
                loading={false}
                itemsFoundText={n => `${n} utilisateurs trouvés`}
                // onAddClick={() => props.history.push(NETWORK.COVERAGE.TERRITORY.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun utilisateur trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nom</th>
                                            <th className="fw-bold">Email</th>
                                            <th className="fw-bold">Numéro utilisateur</th>
                                            <th className="fw-bold">Compte activé</th>
                                            <th className="fw-bold">Actions</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.email}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 fw-bold text-dark">{item.referralCode}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="d-flex align-items-center pt-25 pl-10">
                                                    <div className="media">
                                                        <div className="user-status-pending" style={{ position: 'relative' }}>
                                                            <div className={`user-status-pending-circle rct-notify`} style={{
                                                                background: item.active ? 'green' : 'red'
                                                            }} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.active}
                                                        onChange={() => {
                                                            setStatus(false);
                                                            setSelectedMember(item);
                                                            setShowConfirmBox(true);
                                                        }}
                                                    />
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

            <ConfirmBox
                show={showConfirmBox}
                rightButtonOnClick={() => activateOrBlock()}
                leftButtonOnClick={() => {
                    setStatus(false);
                    setSelectedMember(null);
                    setShowConfirmBox(false);
                }}
                message={'Etes vous sure de vouloir approuver votre choix ?'}
            />
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));