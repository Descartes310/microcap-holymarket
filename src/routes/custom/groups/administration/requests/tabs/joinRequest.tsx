import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox"
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from "react-notifications";
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';

const JoinRequest = (props) => {

    const [members, setMembers] = useState([]);
    const [status, setStatus] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getMembers();
        setSelectedMember(null);
    }, []);

    const getMembers = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupMembers({ status: ['REQUEST']})
        .then(response => setMembers(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const sendResponse = () => {
        props.setRequestGlobalAction(true),
        GroupService.respondToGroupResquest(selectedMember.id, status)
        .then(() => {
            NotificationManager.success("L'opération s'est déroulée avec succès");
            setStatus(false);
            setSelectedMember(null);
            setShowConfirmBox(false);
            getMembers();
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite, veuillez contacter l'assistance");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <CustomList
                loading={false}
                list={members}
                itemsFoundText={n => `${n} requête.s trouvé.s`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun requête.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nom du membre</th>
                                            <th className="fw-bold">Email</th>
                                            <th className="fw-bold">Motivation</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Date d'ajout</th>
                                            <th className="fw-bold">Action</th>
                                            <th className="fw-bold">Dossier</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item?.groupPostMotivation?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{item.status}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">
                                                                <TimeFromMoment time={item.date} showFullDate />
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setStatus(false);
                                                                setSelectedMember(item);
                                                                setShowConfirmBox(true);
                                                            }}
                                                            className="btn-danger mr-5 mb-10 text-white"
                                                        >
                                                            Refuser
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setStatus(true);
                                                                setSelectedMember(item);
                                                                setShowConfirmBox(true);
                                                            }}
                                                            className="btn-primary mb-10 text-white"
                                                        >
                                                            Accepter
                                                        </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() => {
                                                                props.history.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.MEMBER.FOLDER, item.id));
                                                            }}
                                                            className="bg-blue mr-5 mb-10 text-white"
                                                        >
                                                            Dossiers
                                                        </Button>
                                                        </div>
                                                    </div>
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
                rightButtonOnClick={() => sendResponse()}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(JoinRequest));