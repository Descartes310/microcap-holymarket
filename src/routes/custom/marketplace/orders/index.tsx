import { connect } from 'react-redux';
import PassDetails from './PassDetails';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CodevParticipants from "./Participants";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getOrderStatusItem } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';
import AddFileToOrderModal from './addFileToOrderModal';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { joinUrlWithParamsId, MARKETPLACE } from 'Url/frontendUrl';

const List = (props) => {

    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState(null);
    const [showPassBox, setShowPassBox] = useState(false);
    const [showAddFileBox, setShowAddFileBox] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);

    useEffect(() => {
      getOrders();
    }, []);

    const getOrders = () => {
        props.setRequestGlobalAction(true),
            OrderService.getOrders()
                .then(response => setOrders(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar title={'Mes commandes'} />
            <CustomList
                list={orders}
                loading={false}
                itemsFoundText={n => `${n} commandes`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun commandes
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">#Reference</th>
                                            <th className="fw-bold">Label</th>
                                            <th className="fw-bold">Vendeur</th>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Détails</th>
                                            <th className="fw-bold">Paiements</th>
                                            <th className="fw-bold">Dossiers</th>
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
                                                    {item.status == 'PAID' && item?.details?.find(d => d.type == "CODEV_INDIVISION_DISTRIBUTION")?.value == "PRIVATE" && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setOrder(item);
                                                                setShowParticipants(true);
                                                            }}
                                                        >
                                                            Souscripteurs
                                                        </Button>
                                                    )}
                                                    {item.status == 'PAID' && item?.type == "PASS" && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setOrder(item);
                                                                setShowPassBox(true);
                                                            }}
                                                        >
                                                            Pass
                                                        </Button>
                                                    )}
                                                </td>
                                                <td>
                                                    { 
                                                        (item.status !== 'PENDING' && item.status !== 'REJECTED')  ?
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.SALES, item.id))}
                                                        >
                                                            Payements
                                                        </Button>
                                                        : 
                                                        <p>En attente...</p>
                                                    }
                                                </td>
                                                <td>
                                                    { (item.status === 'PENDING') && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setOrder(item);
                                                                setShowAddFileBox(true);
                                                            }}
                                                        >
                                                            Dossiers
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

            { (order  && showParticipants) && (
                <CodevParticipants
                    order={order}
                    show={showParticipants}
                    onClose={() => {
                        setOrder(null);
                        setShowParticipants(false);
                    }}
                    codevLine={order?.details?.find(d => d.type == "CODEV_LINE_REF")?.value}
                />
            )}

            { (order && showPassBox) && (
                <PassDetails
                    order={order}
                    show={showPassBox}
                    onClose={() => {
                        setOrder(null);
                        setShowPassBox(false);
                    }}
                />
            )}

            { (order && showAddFileBox) && (
                <AddFileToOrderModal
                    order={order}
                    title={'Renseigner le dossier commande'} 
                    show={showAddFileBox && order}
                    onClose={() => {
                        setOrder(null);
                        setShowAddFileBox(false);
                        getOrders();
                    }}
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));