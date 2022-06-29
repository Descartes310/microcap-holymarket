import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getOrderStatusItem } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment'
import IconButton from '@material-ui/core/IconButton';
import AccountInformationModal from './accountInformations';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { MARKETPLACE, joinUrlWithParamsId } from 'Url/frontendUrl';

const List = (props) => {

    const [purchases, setPurchases] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showAccountInfoModal, setShowAccountInfoModal] = useState(false);

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
        setSelectedOrder(order);
        if(order.mirrorAccount && status) {
            setShowAccountInfoModal(true);
        } else {
            props.setRequestGlobalAction(true);
            OrderService.approvedOrder(order.id, { status })
            .then(() => getPurchases())
            .finally(() => props.setRequestGlobalAction(false))
        }
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
                                            <th className="fw-bold">#Reference</th>
                                            <th className="fw-bold">Client</th>
                                            <th className="fw-bold">Telephone</th>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Status</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">#{item.reference.split('_').pop().toUpperCase()}</h4>
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
                                                <IconButton className="text-success" aria-label="Accepter" onClick={() => approvedOrder(item, true)}>
                                                    <i className="zmdi zmdi-check"></i>
                                                </IconButton>
                                                <IconButton className="text-danger" aria-label="Refuser" onClick={() => approvedOrder(item, false)}>
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
            { showAccountInfoModal && (
                <AccountInformationModal
                    order={selectedOrder}
                    show={showAccountInfoModal}
                    onClose={() => {
                        setShowAccountInfoModal(false);
                    }}
                    title={"Informations du compte"}
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));