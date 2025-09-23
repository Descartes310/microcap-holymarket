import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import { RctCardContent } from 'Components/RctCard';

const BookingRequestsList = (props) => {

    const { bookingReference, show, onClose } = props;
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (bookingReference) {
            getRequests();
        }
    }, [bookingReference]);

    const getRequests = () => {
        setLoading(true);
        ProductService.getBookingRequests(bookingReference)
            .then((response) => setRequests(response || []))
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Erreur lors du chargement des demandes");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const approveRequest = (reference) => {
        props.setRequestGlobalAction(true);
        ProductService.approveBookingRequest(bookingReference, reference, {})
            .then(() => {
                NotificationManager.success("Demande approuvée avec succès");
                getRequests();
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Erreur lors de l'approbation");
            })
            .finally(() => props.setRequestGlobalAction(false));
    };

    const rejectRequest = (reference) => {
        props.setRequestGlobalAction(true);
        ProductService.rejectBookingRequest(bookingReference, reference)
            .then(() => {
                NotificationManager.success("Demande rejetée avec succès");
                getRequests();
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Erreur lors du rejet");
            })
            .finally(() => props.setRequestGlobalAction(false));
    };

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="lg"
            title={
                <h3 className="fw-bold">
                    Demandes de réservation
                </h3>
            }
        >
            <RctCardContent>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center py-50">
                        <h4>Chargement...</h4>
                    </div>
                ) : requests && requests.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center py-50">
                        <h4>
                            Aucune demande trouvée
                        </h4>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover table-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="fw-bold">Utilisateur</th>
                                    <th className="fw-bold">Date de demande</th>
                                    <th className="fw-bold">Statut</th>
                                    <th className="fw-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests && requests.map((item, key) => (
                                    <tr key={key} className="cursor-pointer">
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <p className="m-0 text-dark">{item.requesterUserName || 'N/A'} ({item.requesterReferralCode})</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <p className="m-0 text-dark"><TimeFromMoment time={item.createdAt} showFullDate /></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <p className={`m-0 ${item.status === 'APPROVED' ? 'text-success' : item.status === 'REJECTED' ? 'text-danger' : 'text-warning'}`}>
                                                        {item.status === 'PENDING' ? 'En attente' : item.status === 'APPROVED' ? 'Approuvé' : item.status === 'REJECTED' ? 'Rejeté' : item.status}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.status === 'PENDING' && (
                                                <>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => approveRequest(item.reference)}
                                                        className="text-white font-weight-bold mr-2"
                                                        size="small"
                                                    >
                                                        Approuver
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => rejectRequest(item.reference)}
                                                        className="text-white btn-danger font-weight-bold"
                                                        size="small"
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
            </RctCardContent>
        </DialogComponent>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(BookingRequestsList));