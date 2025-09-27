import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import DeliveryZoneService from 'Services/delivery-zones';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { MARKETPLACE } from 'Url/frontendUrl';
import { getDeliveryZoneTypeLabel } from 'Helpers/helpers';

const DeliveryZonesList = (props) => {

    const [deliveryZones, setDeliveryZones] = useState([]);

    useEffect(() => {
        getDeliveryZones();
    }, []);

    const getDeliveryZones = () => {
        props.setRequestGlobalAction(true);
        DeliveryZoneService.getDeliveryZones()
        .then(response => setDeliveryZones(response))
        .finally(() => props.setRequestGlobalAction(false));
    }

    const goToCreate = () => {
        props.history.push(MARKETPLACE.DELIVERY.ZONE.CREATE);
    }

    const goToUpdate = (reference) => {
        props.history.push(MARKETPLACE.DELIVERY.ZONE.UPDATE.replace(':reference', reference));
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des zones de livraison"}
            />
            <CustomList
                loading={false}
                list={deliveryZones}
                itemsFoundText={n => `${n} zone.s trouvé.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune zone trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Type</th>
                                            <th className="fw-bold">Label</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Prix</th>
                                            <th className="fw-bold">Devise</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getDeliveryZoneTypeLabel(item.type)}</h4>
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
                                                            <h4 className="m-0 text-dark">{item.description}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{item.price}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{item.currency}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => goToUpdate(item.reference)}
                                                    >
                                                        Editer
                                                    </Button>
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
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(DeliveryZonesList));