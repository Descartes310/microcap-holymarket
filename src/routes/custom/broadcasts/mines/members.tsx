import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import MessageService from 'Services/messages';
import { getStatusLabel } from '../../../../data';
import React, { useEffect, useState } from 'react';
import AddMemberModal from '../components/addMember';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from 'Components/TimeFromMoment';
import { NotificationManager } from "react-notifications";

const List = (props) => {

    const [datas, setDatas] = useState([]);
    const [showAddMember, setShowAddMember] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        MessageService.getBroadcastMembers(props.match.params.id)
        .then(response => setDatas(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const deleteMember = () => {
        props.setRequestGlobalAction(true),
        MessageService.deleteBroadcastMember(selectedMember.id)
        .then(() => {
            setSelectedMember(null);
            setShowConfirmBox(false);
            getDatas();
        })
        .catch(() => {
            NotificationManager.error("Une erreur s'est produite, veuillez réessayer plus tard");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} membres trouvés`}
                onAddClick={() => {
                    setShowAddMember(true)
                }}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune membre trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Numéro</th>
                                            <th className="fw-bold">Nom</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Date d'ajout</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.referralCode}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                        <p className="m-0 text-dark">{getStatusLabel(item?.status)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.createdAt} showFullDate />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            setSelectedMember(item);
                                                            setShowConfirmBox(true);
                                                        }}
                                                    >
                                                        Rétirer
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
            { showAddMember && (
                <AddMemberModal
                    show={showAddMember}
                    onClose={() => {
                        setShowAddMember(false);
                        getDatas();
                    }}
                />
            )}

            <ConfirmBox
                show={showConfirmBox && selectedMember != null}
                rightButtonOnClick={() => deleteMember()}
                leftButtonOnClick={() => {
                    setSelectedMember(null);
                    setShowConfirmBox(false);
                }}
                message={'Etes vous sure de vouloir rétirer ce membre?'}
            />
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
