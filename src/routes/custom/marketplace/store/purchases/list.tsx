import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getOrderStatusItem } from 'Helpers/helpers';
import IconButton from '@material-ui/core/IconButton';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from 'Components/TimeFromMoment';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { MARKETPLACE, joinUrlWithParamsId } from 'Url/frontendUrl';

const List = (props) => {

    const [purchases, setPurchases] = useState([]);
    const [purchase, setPurchase] = useState(null);
    const [showAcceptPurchase, setShowAcceptPurchase] = useState(false);
    const [showRejectPurchase, setShowRejectPurchase] = useState(false);

    useEffect(() => {
        getPurchases();
    }, []);

    const getPurchases = () => {
        props.setRequestGlobalAction(true);
        OrderService.getPurchases({ status: ['PENDING'] })
        .then(response => setPurchases(response))
        .finally(() => props.setRequestGlobalAction(false));
    }

    const approvedOrder = (order, status) => {
        props.setRequestGlobalAction(true);
        OrderService.approvedOrder(order.id, { status })
        .then(() => {
            NotificationManager.success('La commande a été traitée avec succès');
            getPurchases();
        })
        .catch(err => {
            if(err?.response?.status == 412) {
                NotificationManager.error('La commande n\'est pas encore configuré');
            } else {
                NotificationManager.error('Une erreur est survenue, veuillez reessayer');
            }
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar title={'Mes demandes d\'achats'} />
            <CustomList
                list={purchases}
                loading={false}
                itemsFoundText={n => `${n} demandes trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun demandes trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Client</th>
                                            <th className="fw-bold">Telephone</th>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Payé ?</th>
                                            <th className="fw-bold">Dossier</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.telephone}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                <TimeFromMoment time={item.createdAt} showFullDate />
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center'
                                                }}>
                                                    <div className="media">
                                                        {getOrderStatusItem(item.status) ?
                                                            <span style={{ backgroundColor: `${getOrderStatusItem(item.status).color}`, border: 5, padding: 10, borderRadius: 5, color: 'white' }}>
                                                                { getOrderStatusItem(item.status).label }
                                                            </span>
                                                            : '-'
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="user-status-pending d-flex flex-row align-items-center" style={{ position: 'relative' }}>
                                                            <div className={`user-status-pending-circle rct-notify mr-10`} style={{
                                                                background: item?.paymentStatus == 'PAID' ? 'green' : item?.paymentStatus == 'PAYING' ? 'orange' : 'red'
                                                            }} />
                                                            {item?.paymentStatus == 'PAID' ? 'Payé' : item?.paymentStatus == 'PAYING' ? 'En cours' : 'Non payé'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.STORE.PURCHASE.FOLDER, item.id))}
                                                    >
                                                        Dossiers
                                                    </Button>
                                                </td>
                                                <td>
                                                <IconButton className="text-success" aria-label="Accepter" onClick={() => {
                                                    setPurchase(item);
                                                    setShowAcceptPurchase(true);
                                                }}>
                                                    <i className="zmdi zmdi-check"></i>
                                                </IconButton>
                                                <IconButton className="text-danger" aria-label="Refuser" onClick={() => {
                                                    setPurchase(item);
                                                    setShowRejectPurchase(true);
                                                }}>
                                                    <i className="zmdi zmdi-delete"></i>
                                                </IconButton>
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
            { purchase && showAcceptPurchase && (
                <ConfirmBox
                    show={showAcceptPurchase}
                    rightButtonOnClick={() => {
                        setShowAcceptPurchase(false);
                        approvedOrder(purchase, true);
                    }}
                    leftButtonOnClick={() => {
                        setPurchase(null);
                        setShowAcceptPurchase(false);
                    }}
                    message={'Etes-vous sure de vouloir accepter cette demande d\'achat ?'}
                />
            )}
            { purchase && showRejectPurchase && (
                <ConfirmBox
                    show={showRejectPurchase}
                    rightButtonOnClick={() => {
                        setShowRejectPurchase(false);
                        approvedOrder(purchase, false);
                    }}
                    leftButtonOnClick={() => {
                        setPurchase(null);
                        setShowRejectPurchase(false);
                    }}
                    message={'Etes-vous sure de vouloir rejetter cette demande d\'achat ?'}
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));