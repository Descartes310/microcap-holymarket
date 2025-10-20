import { connect } from 'react-redux';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import ResiliationModal from './resiliationModal';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showResiliationBox, setShowResiliationBox] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        props.setRequestGlobalAction(true);
        UserService.getResiliatedUsers()
            .then(response => {
                setUsers(response);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }
    
    const onSubmit = () => {

        if(!selectedUser) {
            return;
        }

        props.setRequestGlobalAction(true);

        UserService.restoreResiliateUser(selectedUser.reference, {}).then(() => {
            NotificationManager.success('L\'utilisateur a été restauré avec succès');
            getUsers();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            setSelectedUser(null);
            setShowConfirmBox(false);
        });
        
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des résiliations"}
            />
            <CustomList
                list={users}
                loading={false}
                itemsFoundText={n => `${n} utilisateurs trouvés`}
                addText={'Nouvelle résiliation'}
                onAddClick={() => {
                    setShowResiliationBox(true);
                }}
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
                                            <th className="fw-bold">Date de création</th>
                                            <th className="fw-bold">Raison</th>
                                            <th className="fw-bold">Date de résiliation</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0">{item.userName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0">{item.email}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.createdAt} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0">{item.resiliationReason}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.resiliatedAt} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {/* <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            setSelectedUser(item);
                                                            setShowConfirmBox(true);
                                                        }}
                                                    >
                                                        Restorer
                                                    </Button> */}
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
            <ResiliationModal
                show={showResiliationBox}
                onClose={(reload) => {
                    setShowResiliationBox(false);
                    if(reload) {
                        getUsers();
                    }
                }}
            />
            { showConfirmBox && selectedUser && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => onSubmit()}
                    leftButtonOnClick={() => {
                        setShowConfirmBox(false);
                        setSelectedUser(null);
                    }}
                    message={'Etes vous sure de vouloir restaurer cet utilisateur ?'}
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));