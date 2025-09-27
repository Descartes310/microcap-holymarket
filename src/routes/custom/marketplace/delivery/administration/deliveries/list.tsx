import React, { useState, useEffect } from 'react';
import DeliveryService from 'Services/delivery';
import { setRequestGlobalAction } from 'Actions';
import { connect } from 'react-redux';
import CustomList from "Components/CustomList";
import TimeFromMoment from 'Components/TimeFromMoment';
import Button from '@material-ui/core/Button';
import DeliveryParcelsModal from '../components/deliveryParcelsModal';
import CreateDeliveryModal from '../components/createDeliveryModal';
import EditDeliveryModal from '../components/editDeliveryModal';

const DeliveriesList = (props) => {
    const [deliveries, setDeliveries] = useState([]);
    const [showParcelsModal, setShowParcelsModal] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDeliveryForEdit, setSelectedDeliveryForEdit] = useState(null);

    useEffect(() => {
        getDeliveries();
    }, []);

    const getDeliveries = () => {
        props.setRequestGlobalAction(true);
        DeliveryService.getDeliveries()
            .then(response => setDeliveries(response))
            .finally(() => props.setRequestGlobalAction(false));
    };

    const openParcelsModal = (delivery) => {
        setSelectedDelivery(delivery);
        setShowParcelsModal(true);
    };

    const closeParcelsModal = () => {
        setShowParcelsModal(false);
        setSelectedDelivery(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return '#ffa726';
            case 'ONGOING': return '#42a5f5';
            case 'DELIVERED': return '#66bb6a';
            default: return '#999';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'PENDING': return 'En attente';
            case 'ONGOING': return 'En cours';
            case 'DELIVERED': return 'Livrée';
            default: return status;
        }
    };

    return (
        <>
            <CustomList
                list={deliveries}
                loading={false}
                itemsFoundText={n => `${n} livraison.s trouvée.s`}
                onAddClick={() => setShowCreateModal(true)}
                addText={'Nouvelle livraison'}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune livraison trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Zone de livraison</th>
                                            <th className="fw-bold">Label</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Prix</th>
                                            <th className="fw-bold">Statut</th>
                                            <th className="fw-bold">Date de création</th>
                                            <th className="fw-bold">Date de livraison</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((delivery, key) => (
                                            <tr key={key}>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{delivery.deliveryZone?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{delivery.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{delivery.description}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{delivery.price} {delivery.currency}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <span style={{
                                                                backgroundColor: getStatusColor(delivery.status),
                                                                border: 5,
                                                                padding: 5,
                                                                borderRadius: 5,
                                                                color: 'white'
                                                            }}>
                                                                {getStatusLabel(delivery.status)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                <TimeFromMoment time={delivery.createdAt} showFullDate />
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {delivery.deliveryDate ? <TimeFromMoment time={delivery.deliveryDate} showFullDate /> : '-'}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        {(delivery.status === 'PENDING' || delivery.status === 'ONGOING') && (
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                size="small"
                                                                className="text-white font-weight-bold"
                                                                onClick={() => {
                                                                    setSelectedDeliveryForEdit(delivery);
                                                                    setShowEditModal(true);
                                                                }}
                                                            >
                                                                Éditer
                                                            </Button>
                                                        )}
                                                        {delivery.status === 'PENDING' && (
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                size="small"
                                                                className="text-white font-weight-bold ml-10"
                                                                onClick={() => openParcelsModal(delivery)}
                                                            >
                                                                Colis
                                                            </Button>
                                                        )}
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
            {showParcelsModal && selectedDelivery && (
                <DeliveryParcelsModal
                    show={showParcelsModal}
                    onClose={closeParcelsModal}
                    delivery={selectedDelivery}
                />
            )}
            {showCreateModal && (
                <CreateDeliveryModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={getDeliveries}
                />
            )}
            {showEditModal && selectedDeliveryForEdit && (
                <EditDeliveryModal
                    show={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedDeliveryForEdit(null);
                    }}
                    delivery={selectedDeliveryForEdit}
                    onSuccess={getDeliveries}
                />
            )}
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(DeliveriesList);