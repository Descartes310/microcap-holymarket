import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InvitationBox from "Routes/custom/groups//details/invitationBox";

const Members = (props) => {

    const [members, setMembers] = useState([]);
    const [showInvitationtionBox, setShowInvitationtionBox] = useState(false);

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupMembers()
        .then(response => setMembers(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        //props.history.push(GROUP.ADMINISTRATION.MEMBER.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des membres"}
            />
            <CustomList
                list={members}
                loading={false}
                addText="Envoyer une invitation"
                itemsFoundText={n => `${n} membre.s trouvé.s`}
                onAddClick={() => setShowInvitationtionBox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun membre.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nom du membre</th>
                                            <th className="fw-bold">Email</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Date d'ajout</th>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            />
            <InvitationBox
                show={showInvitationtionBox}
                onClose={() => setShowInvitationtionBox(!showInvitationtionBox)}
            />
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Members));