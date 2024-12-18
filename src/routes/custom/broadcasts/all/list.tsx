import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import MessageService from 'Services/messages';
import { getStatusLabel } from '../../../../data';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from 'Components/TimeFromMoment';
import { NotificationManager } from "react-notifications";
import ConfirmBroadcastMember from '../components/confirmMember';

const List = (props) => {

    const [datas, setDatas] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showConfirmMember, setShowConfirmMember] = useState(false);
    const [action, setAction] = useState<null | 'accept' | 'reject' | 'delete'>(null);
    
    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        MessageService.getMyBroadcasts()
        .then(response => setDatas(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const treatItem = () => {
        if(!action || !selectedMember) {
            NotificationManager.error("Une erreur s'est produite, veuillez réessayer plus tard");
            return;
        }
        if(selectedMember.status === 'PENDING') {
            props.setRequestGlobalAction(true);
            MessageService.confirmBroadcastMember(selectedMember.id, {status: false})
            .then(() => {
                setSelectedMember(null);
                setShowConfirmBox(false);
                getDatas();
            })
            .catch(() => {
                NotificationManager.error("Une erreur s'est produite, veuillez réessayer plus tard");
            })
            .finally(() => props.setRequestGlobalAction(false))
        } else {
            props.setRequestGlobalAction(true);
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
    }

    return (
        <>
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} liste trouvée`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune liste trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Intitulé</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Contact</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Date de création</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.broadcast.title}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.broadcast.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.status === 'PENDING' ? '-' : item.contact.oldType+': '+item.contact.value}</p>
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
                                                    { item.status === 'PENDING' && (
                                                        <>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold"
                                                                onClick={() => {
                                                                    setShowConfirmMember(true);
                                                                    setSelectedMember(item);
                                                                }}
                                                            >
                                                                Accepter
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold ml-5"
                                                                onClick={() => {
                                                                    setAction('reject');
                                                                    setShowConfirmBox(true);
                                                                    setSelectedMember(item);
                                                                }}
                                                            >
                                                                Sortir
                                                            </Button>
                                                        </>
                                                    )}
                                                    { item.status === 'APPROVED' && (
                                                        <>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold ml-5"
                                                                onClick={() => {
                                                                    setAction('delete');
                                                                    setShowConfirmBox(true);
                                                                    setSelectedMember(item);
                                                                }}
                                                            >
                                                                Sortir
                                                            </Button>
                                                        </>
                                                    )}
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
                show={showConfirmBox && selectedMember != null}
                rightButtonOnClick={() => treatItem()}
                leftButtonOnClick={() => {
                    setAction(null);
                    setSelectedMember(null);
                    setShowConfirmBox(false);
                }}
                message={'Etes vous sure de vouloir quitter cette liste ?'}
            />
            { showConfirmMember && (
                <ConfirmBroadcastMember
                    show={showConfirmMember}
                    member={selectedMember}
                    onClose={() => {
                        setShowConfirmMember(false);
                        getDatas();
                    }}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
