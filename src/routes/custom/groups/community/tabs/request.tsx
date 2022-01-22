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

const Request = (props) => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = () => {
        props.setRequestGlobalAction(true),
        GroupService.getCommunityDatas({ belongs: false, status: ['REQUEST', 'INVITATION']})
        .then(response => setMembers(response))
        .finally(() => props.setRequestGlobalAction(false))
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
                                            <th className="fw-bold">Nom</th>
                                            <th className="fw-bold">Status</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.status ? item.status : 'NON MEMBRE'}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            { item.status === 'INVITATION' && (
                                                                <>
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained"
                                                                        className="btn-danger mr-5 mb-10 text-white"
                                                                    >
                                                                        Refuser
                                                                    </Button>
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained"
                                                                        className="btn-primary mb-10 text-white"
                                                                    >
                                                                        Accepter
                                                                    </Button>
                                                                </>
                                                            )}
                                                            { item.status === 'REQUEST' && (
                                                                <Button
                                                                    size="small"
                                                                    variant="contained"
                                                                    className="btn-danger mr-5 mb-10 text-white"
                                                                >
                                                                    Annuler
                                                                </Button>
                                                            )}
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
            {/* <ConfirmBox
                show={showConfirmBox}
                rightButtonOnClick={() => sendResponse()}
                leftButtonOnClick={() => {
                    setStatus(false);
                    setSelectedMember(null);
                    setShowConfirmBox(false);
                }}
                message={'Etes vous sure de vouloir approuver votre choix ?'}
            /> */}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Request));