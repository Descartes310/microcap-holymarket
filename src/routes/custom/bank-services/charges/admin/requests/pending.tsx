import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from 'Components/TimeFromMoment';
import {NotificationManager} from 'react-notifications';


const List = (props) => {

    const [requests, setRequests] = useState([]);
    const [showRejectBox, setShowRejectBox] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = () => {
        props.setRequestGlobalAction(true),
        BankService.getAdminChargeRequestPending()
        .then(response => setRequests(response))
        .finally(() => props.setRequestGlobalAction(false))
    }    
    
    const respond = (id, status) => {
        props.setRequestGlobalAction(true),
        BankService.respondToChargeRequest(id, status)
        .then(() => {
            getRequests();
            NotificationManager.success("L'opération a été effectuée");
        })
        .catch((err) => {
            NotificationManager.error("Votre compte ne permet pas de traiter cette demande");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            setShowConfirmBox(false);
            setShowRejectBox(false);
        })
    }

    return (
        <>
            <CustomList
                loading={false}
                list={requests}
                itemsFoundText={n => `${n} requêtes trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune requête trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nature</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Banque</th>
                                            {/* <th className="fw-bold">Couverture</th>
                                            <th className="fw-bold">Reference couv.</th> */}
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.direction == 'CASH_IN' ? 'Recharge' : 'Décharge'}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.amount} {item.currency}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.bankCode}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.typeCoverage?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.coverageReference}</h4>
                                                        </div>
                                                    </div>
                                                </td> */}
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.paidAt} format='LLL' /></h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                         <div className="media-body pt-10 d-flex align-content-center align-items-center">
                                                                <div className={`user-status-pending-circle rct-notify`} style={{ background: item.status == 'APPROVED' ? 'green' : item.status == 'REJECTED' ? 'red' : 'orange' }} />
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark ml-15">{item.status}</h4>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    { item.status === 'PENDING' && (
                                                        <>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    setSelectedRequest(item);
                                                                    setShowConfirmBox(true);
                                                                }}
                                                                className="text-white font-weight-bold"
                                                            >
                                                                Valider
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    setSelectedRequest(item);
                                                                    setShowRejectBox(true);
                                                                }}
                                                                className="text-white font-weight-bold ml-4"
                                                            >
                                                                Rejeter
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
            { showConfirmBox && selectedRequest && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => respond(selectedRequest.id, true)}
                    leftButtonOnClick={() => {
                        setShowConfirmBox(false);
                        setSelectedRequest(null);
                    }}
                    message={'Etes vous sure de valider cette demande ?'}
                />
            )}
            { showRejectBox && selectedRequest && (
                <ConfirmBox
                    show={showRejectBox}
                    rightButtonOnClick={() => respond(selectedRequest.id, false)}
                    leftButtonOnClick={() => {
                        setShowRejectBox(false);
                        setSelectedRequest(null);
                    }}
                    message={'Etes vous sure de refuser cette demande ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
