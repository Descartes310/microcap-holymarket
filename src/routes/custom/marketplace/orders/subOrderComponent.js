import { connect } from 'react-redux';
import PassDetails from './PassDetails';
import SetSellerModal from './SetSeller';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CodevParticipants from "./Participants";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getOrderStatusItem } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';
import { NotificationManager } from "react-notifications";
import CodevStep1 from 'Routes/custom/marketplace/shop/components/codev/step1';
import CodevStep2 from 'Routes/custom/marketplace/shop/components/codev/step2';
import CodevStep3 from 'Routes/custom/marketplace/shop/components/codev/step3';
import CodevStep4 from 'Routes/custom/marketplace/shop/components/codev/step4';

const List = (props) => {

    const {reference} = props;
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState(null);
    const [product, setProduct] = useState(null);
    const [codevData, setCodevData] = useState(null);
    const [showPassBox, setShowPassBox] = useState(false);
    const [showSellerBox, setShowSellerBox] = useState(false);
    const [showCodevStep1, setShowCodevStep1] = useState(false);
    const [showCodevStep2, setShowCodevStep2] = useState(false);
    const [showCodevStep3, setShowCodevStep3] = useState(false);
    const [showCodevStep4, setShowCodevStep4] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);

    useEffect(() => {
      getOrders();
    }, []);

    useEffect(() => {
        if(order && order.hasSeller) {
            getProduct();
        }
    }, [order]);

    const getOrders = () => {
        props.setRequestGlobalAction(true),
            OrderService.getSubOrders(reference)
                .then(response => setOrders(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    const getProduct = () => {
        props.setRequestGlobalAction(true),
        OrderService.getOrderProduct(order.reference)
            .then(response => setProduct(response))
            .catch(err => {
                setProduct(null);
                NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    const configureProduct = (formData) => {
    
        let data = {};
        data.tirageReference = formData.selectedDate.reference;
        data.subscriptionType = formData.subscriptionType.value;
                    
        if(formData.alias != null)
            data.alias = formData.alias.value;
            
        if(formData.indivision) {
            if(formData.tickets) {
                data.tickets = formData.tickets.join(',');
            } else {
                data.unit_amount = formData.indivision.unitAmount;
                data.distribution = formData.indivision.distribution;
                data.denomination = formData.indivision.denomination;
            }
        }

        props.setRequestGlobalAction(true),
        OrderService.configureOrderCodev(order.reference, data)
            .then(() => {
                setProduct(null);
                setShowCodevStep4(false)
                NotificationManager.success("La configuration a été effectuée");
                getOrders();
            })
            .catch(err => {
                setProduct(null);
                NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
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
                                            <th className="fw-bold">Payé ?</th>
                                            <th className="fw-bold">Détails</th>
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
                                                    {item.paymentStatus == 'PAID' && ['CONFIRMED', 'DELIVERED'].includes(item.status) && item?.details?.find(d => d.type == "CODEV_INDIVISION_DISTRIBUTION")?.value == "PRIVATE" && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setOrder(item);
                                                                setShowParticipants(true);
                                                            }}
                                                        >
                                                            Souscriptions
                                                        </Button>
                                                    )}
                                                    {item.paymentStatus == 'PAID' && ['CONFIRMED', 'DELIVERED'].includes(item.status) && item?.type == "PASS" && (
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
                                                    {!item.hasSeller && item.paymentStatus === 'PAID' && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setOrder(item);
                                                                setShowSellerBox(true);
                                                            }}
                                                        >
                                                            Commercant
                                                        </Button>
                                                    )}
                                                    {item.hasSeller && item.status === 'PENDING' && item.type == 'CODEV' && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setOrder(item);
                                                                setShowCodevStep1(true);
                                                            }}
                                                        >
                                                            Configurations
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
                    referralCode={order.referralCode}
                    type={order?.details?.find(d => d.type == "CODEV_SUBSCRIPTION_TYPE")?.value}
                    isPrivate={order?.details?.find(d => d.type == "CODEV_INDIVISION_DISTRIBUTION")?.value == 'PRIVATE'}
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

            { (order && showSellerBox) && (
                <SetSellerModal
                    order={order}
                    show={showSellerBox}
                    onClose={() => {
                        setOrder(null);
                        setShowSellerBox(false);
                        getOrders();
                    }}
                />
            )}

            { showCodevStep1 && product && (
                <CodevStep1 
                    product={product}
                    show={showCodevStep1}
                    onClose={() => setShowCodevStep1(false)}
                    onSubmit={(data) => {
                        if(data?.subscriptionType.value == 'INDIVISION') {
                            setCodevData(data);
                            setShowCodevStep1(false);
                            setShowCodevStep2(false);
                            setShowCodevStep3(data.indivision.reference ? true : false);
                            setShowCodevStep4(data.indivision.reference ? false : true);
                        } else {
                            setCodevData(data);
                            setShowCodevStep1(false);
                            setShowCodevStep2(false);
                            setShowCodevStep3(false);
                            setShowCodevStep4(true);
                        }
                    }}
                />
            )}
            { showCodevStep2 && product && (
                <CodevStep2 
                    data={codevData}
                    product={product}
                    show={showCodevStep2}
                    onClose={() => setShowCodevStep2(false)}						
                    onSubmit={(data) => {
                        setCodevData(data);
                        setShowCodevStep1(false);
                        setShowCodevStep2(false);
                        setShowCodevStep3(data.newIndivision);
                        setShowCodevStep4(!data.newIndivision);
                    }}
                />
            )}
            { showCodevStep3 && product && (
                <CodevStep3 
                    data={codevData}
                    product={product}
                    show={showCodevStep3}
                    onClose={() => setShowCodevStep3(false)}
                    onSubmit={(data) => {
                        setCodevData(data);
                        setShowCodevStep1(false);
                        setShowCodevStep2(false);
                        setShowCodevStep3(false);
                        setShowCodevStep4(true);
                    }}
                />
            )}
            { showCodevStep4 && product && (
                <CodevStep4
                    data={codevData}
                    product={product}
                    show={showCodevStep4}
                    referralCode={order.referralCode}
                    onClose={() => setShowCodevStep4(false)}
                    onSubmit={(data) => {
                        configureProduct(data);
                        setShowCodevStep1(false);
                        setShowCodevStep2(false);
                        setShowCodevStep3(false);
                        setShowCodevStep4(false);
                    }}
                />
            )}

        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));