import React, { useState, useEffect } from 'react';
import DeliveryService from 'Services/delivery';
import { setRequestGlobalAction } from 'Actions';
import { connect } from 'react-redux';
import CustomList from "Components/CustomList";
import TimeFromMoment from 'Components/TimeFromMoment';

const ParcelsList = (props) => {
    const [parcels, setParcels] = useState([]);

    useEffect(() => {
        getParcels();
    }, []);

    const getParcels = () => {
        props.setRequestGlobalAction(true);
        DeliveryService.getParcels()
            .then(response => setParcels(response))
            .finally(() => props.setRequestGlobalAction(false));
    };

    return (
        <CustomList
            list={parcels}
            loading={false}
            itemsFoundText={n => `${n} colis trouvé.s`}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun colis trouvé
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Référence</th>
                                        <th className="fw-bold">Commande</th>
                                        <th className="fw-bold">Client</th>
                                        <th className="fw-bold">Téléphone</th>
                                        <th className="fw-bold">Email</th>
                                        <th className="fw-bold">Adresse de livraison</th>
                                        <th className="fw-bold">Date de commande</th>
                                        <th className="fw-bold">Date de création</th>
                                        <th className="fw-bold">Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list && list.map((parcel, key) => (
                                        <tr key={key}>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{parcel.reference}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{parcel.orderReference}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{parcel.name}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{parcel.telephone}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{parcel.email}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">
                                                            {parcel.shippingAddress}, {parcel.shippingZip} {parcel.shippingState}, {parcel.shippingCountry}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">
                                                            <TimeFromMoment time={parcel.orderedAt} showFullDate />
                                                        </h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">
                                                            <TimeFromMoment time={parcel.createdAt} showFullDate />
                                                        </h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <span style={{
                                                            backgroundColor: parcel.available ? '#66bb6a' : '#ff9800',
                                                            border: 5,
                                                            padding: 5,
                                                            borderRadius: 5,
                                                            color: 'white'
                                                        }}>
                                                            {parcel.available ? 'Disponible' : 'Assigné'}
                                                        </span>
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
    );
};

export default connect(() => {}, { setRequestGlobalAction })(ParcelsList);