import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import TreatRequest from "./treatRequest";
import SystemService from 'Services/systems';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const ContactRequests = (props) => {

    const [datas, setDatas] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showTreatRequest, setShowTreatRequest] = useState(false);

    useEffect(() => {
        getContactRequests();
    }, []);

    const getContactRequests = () => {
        props.setRequestGlobalAction(true);
        SystemService.getContactRequests()
            .then(response => {
                setDatas(response);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des demandes d'assistance"}
            />
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} demandes trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune demandes trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Demandeur</th>
                                            <th className="fw-bold">Contact</th>
                                            <th className="fw-bold">Traitant</th>
                                            <th className="fw-bold">Date traitement</th>
                                            <th className="fw-bold">Commentaire</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.createdAt} showFullDate format='LLL' /></h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.userName ? item.userName + " ("+item.referralCode+")" :  "Visiteur"}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.contact}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.agentReferralCode ? (item.agentName ? item.agentName + " ("+item.agentReferralCode+")" :  item.agentReferralCode) : ''}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.treatedAt && <TimeFromMoment time={item.treatedAt} showFullDate format='LLL' />}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.comment}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {!item.status && (
                                                        <Button
                                                            color="primary"
                                                            className="ml-0 text-white float-right"
                                                            onClick={() => {
                                                                setSelectedRequest(item);
                                                                setShowTreatRequest(true);
                                                            }}
                                                        >
                                                            Traiter
                                                        </Button>
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
            { (selectedRequest && showTreatRequest) && (
                <TreatRequest
                    show={showTreatRequest}
                    onClose={() => {
                        setSelectedRequest(null);
                        setShowTreatRequest(false)
                    }}
                    reference={selectedRequest.reference}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ContactRequests));