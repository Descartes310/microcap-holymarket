import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { getOrderTypes } from 'Helpers/datas';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";

const OrderDetails = (props) => {

    const {show, onClose, reference} = props;

    const [order, setOrder] = useState(null);


    useEffect(() => {
        findOrder();
    }, [reference])

    const findOrder = () => {
        props.setRequestGlobalAction(true);
        OrderService.getFullDetails(reference).then(response => {
            setOrder(response);
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue");
            onClose();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    {order ? order.core.label : 'Détails de la commande'}
                </h3>
            )}
        >
            <RctCardContent>

                { order && (
                    <div className="table-responsive">
                        <h1>Détails</h1>
                        <table className="table table-hover table-middle mb-0">
                            <tbody>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Type</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{getOrderTypes().find(ot => ot.value == order.core.orderType)?.label}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Produit</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{order.items[0]?.name}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Description</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{order.items[0]?.description}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Acheteur</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{order.core.userName}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Prix de base</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{getPriceWithCurrency(order.core.amount, order.core.currency)}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Code de réduction</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{order.core.discountCode ? `${order.core.discountCode} (${order.core.discountPercentage}%)` : '-'}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Montant à payer</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{order.core.discountCode ? getPriceWithCurrency(order.core.amount - (order.core.amount * order.core.discountPercentage/100), order.core.currency) : getPriceWithCurrency(order.core.amount, order.core.currency)}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Code de reservation</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{order.core.reservationCode ? `${order.core.reservationCode}` : '-'}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <h1 className='mt-30'>Liste des paiements reçus</h1>
                <CustomList
                    list={order ? order.sales : []}
                    loading={false}
                    itemsFoundText={n => `${n} paiements`}
                    renderItem={list => (
                        <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun paiements
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                    <tr>
                                        <th className="fw-bold">#Reference</th>
                                        <th className="fw-bold">Montant</th>
                                        <th className="fw-bold">Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {list && list.map((item, key) => (
                                        <tr key={key} className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">
                                                        #{item.paymentReference.split('_').pop()}
                                                    </h4>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">
                                                        {getPriceWithCurrency(item.amount, item.currency)}
                                                    </h4>
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
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        </>
                    )}
                />
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(OrderDetails));