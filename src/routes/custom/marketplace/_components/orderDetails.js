import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { getOrderTypes } from 'Helpers/datas';
import { getFilePath } from "Helpers/helpers";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { RctCardContent } from 'Components/RctCard';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import OrderPaymentProofModal from "Routes/custom/marketplace/orders/sales/components/OrderPaymentProof"

const OrderDetails = (props) => {

    const {show, onClose, reference} = props;

    const [sale, setSale] = useState(null);
    const [order, setOrder] = useState(null);
    const [showAcceptBox, setShowAcceptBox] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);


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

    const onSubmit = () => {

        props.setRequestGlobalAction(true);

        let data = {
            approved: false
        }

        OrderService.approveSale(sale.reference, data).then(() => {
            NotificationManager.success("Le payment a bien été traité");
            setSale(null);
            setShowConfirmBox(false);
            props.onClose();
        }).catch((err) => {
            console.log(err);
            setShowConfirmBox(false);
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="lg"
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
                                                <h4 className="m-0 text-dark">{getPriceWithCurrency(order.core.amount + order.core.complementaryPayment, order.core.currency)}</h4>
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
                                                <h4 className="m-0 text-dark">{order.core.discountCode ? getPriceWithCurrency(order.core.amount + order.core.complementaryPayment - (order.core.amount * order.core.discountPercentage/100), order.core.currency) : getPriceWithCurrency(order.core.amount + order.core.complementaryPayment, order.core.currency)}</h4>
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
                                        <th className="fw-bold">Status</th>
                                        <th className="fw-bold">Preuve</th>
                                        <th className="fw-bold">Date</th>
                                        <th className="fw-bold">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {list && list.map((item, key) => (
                                        <tr key={key} className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">
                                                            #{item.reference}
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
                                                    <div className="user-status-pending d-flex flex-row align-items-center" style={{ position: 'relative' }}>
                                                        <div className={`user-status-pending-circle rct-notify mr-10`} style={{
                                                                background: item?.status == 'APPROVED' ? 'green' : item?.status == 'PENDING' ? 'orange' : 'red'
                                                        }} />
                                                        {item?.status == 'APPROVED' ? 'Validé' : item?.status == 'PENDING' ? 'En attente' : 'Rejeté'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        { item.proof && (
                                                            <span onClick={() => window.open(getFilePath(item.proof), 'blank')} className="cursor-pointer text-black">
                                                                Voir la preuve
                                                            </span>
                                                        )}
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
                                            <td>
                                                { item.status == 'PENDING' && (
                                                    <div className="media">
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setSale(item);
                                                                setShowAcceptBox(true)
                                                            }}
                                                        >
                                                            Accepter
                                                        </Button>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white btn-danger font-weight-bold ml-5"
                                                            onClick={() => {
                                                                setSale(item);
                                                                setShowConfirmBox(true)
                                                            }}
                                                        >
                                                            Rejeter
                                                        </Button>
                                                    </div>
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
                { sale && showConfirmBox && (
                    <ConfirmBox
                        show={showConfirmBox}
                        rightButtonOnClick={() => onSubmit()}
                        leftButtonOnClick={() => {
                            setSale(null);
                            setShowConfirmBox(false);
                        }}
                        message={'Etes vous sure de vouloir rejeter ce virement ?'}
                    />
                )}

                { sale && showAcceptBox && (
                    <OrderPaymentProofModal
                        show={showAcceptBox}
                        onClose={() => {
                            setSale(null);
                            setShowAcceptBox(false);
                            findOrder();
                        }}
                        sale={sale}
                        amount={sale.amount}
                        currency={sale.currency}
                />
                )}
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(OrderDetails));