import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import DeliveryService from 'Services/delivery';
import CustomList from "Components/CustomList";
import TimeFromMoment from 'Components/TimeFromMoment';
import { NotificationManager } from 'react-notifications';

interface DeliveryParcelsModalProps {
    show: boolean;
    onClose: () => void;
    delivery: any;
}

const DeliveryParcelsModal: React.FC<DeliveryParcelsModalProps> = ({
    show,
    onClose,
    delivery
}) => {
    const [parcels, setParcels] = useState([]);
    const [availableParcels, setAvailableParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show && delivery) {
            loadDeliveryParcels();
            loadAvailableParcels();
        }
    }, [show, delivery]);

    const loadDeliveryParcels = () => {
        setLoading(true);
        DeliveryService.getDeliveryParcels(delivery.reference)
            .then(response => setParcels(response))
            .catch(() => NotificationManager.error("Erreur lors du chargement des colis"))
            .finally(() => setLoading(false));
    };

    const loadAvailableParcels = () => {
        DeliveryService.getParcels()
            .then(response => {
                // Filter only available parcels
                const available = response.filter(parcel => parcel.available === true);
                setAvailableParcels(available);
            })
            .catch(() => NotificationManager.error("Erreur lors du chargement des colis disponibles"));
    };

    const handleRemoveParcel = (parcelReference: string) => {
        DeliveryService.deleteDeliveryParcel(delivery.reference, {parcel_reference: parcelReference})
            .then(() => {
                NotificationManager.success("Colis retiré de la livraison");
                loadDeliveryParcels();
                loadAvailableParcels();
            })
            .catch(() => NotificationManager.error("Erreur lors de la suppression du colis"));
    };

    const handleParcelSelect = (event) => {
        const parcelReference = event.target.value;
        if (parcelReference) {
            DeliveryService.createDeliveryParcel({
                parcel_reference: parcelReference,
                delivery_reference: delivery.reference
            })
            .then(() => {
                NotificationManager.success("Colis ajouté à la livraison");
                setSelectedParcel(null);
                loadDeliveryParcels();
                loadAvailableParcels();
            })
            .catch(() => NotificationManager.error("Erreur lors de l'ajout du colis"));
        }
    };

    return (
        <Modal isOpen={show} toggle={onClose} size="lg">
            <ModalHeader toggle={onClose}>
                Colis de la livraison {delivery?.label}
            </ModalHeader>
            <ModalBody>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Ajouter un colis
                    </InputLabel>
                    <Autocomplete
                        id="parcel-select"
                        options={availableParcels}
                        value={selectedParcel}
                        onChange={(__, parcel) => {
                            setSelectedParcel(parcel);
                            if (parcel) {
                                handleParcelSelect({ target: { value: parcel.reference } });
                            }
                        }}
                        getOptionLabel={(option) => `${option.name} (${option.userName}: ${option.telephone})`}
                        renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Rechercher un colis..." />}
                    />
                </div>

                <CustomList
                    list={parcels}
                    loading={loading}
                    itemsFoundText={n => `${n} colis assigné.s`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun colis assigné
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Commande</th>
                                                <th className="fw-bold">Client</th>
                                                <th className="fw-bold">Téléphone</th>
                                                <th className="fw-bold">Adresse de livraison</th>
                                                <th className="fw-bold">Date de commande</th>
                                                <th className="fw-bold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((parcel, key) => (
                                                <tr key={key}>
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
                                                                <h4 className="m-0 fw-bold text-dark">{parcel.userName}</h4>
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
                                                                <h4 className="m-0 fw-bold text-dark">
                                                                    {parcel.shippingAddress}, {parcel.shippingZip} {parcel.shippingState}
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
                                                        <Button
                                                            color="secondary"
                                                            variant="contained"
                                                            size="small"
                                                            onClick={() => handleRemoveParcel(parcel.reference)}
                                                            className="text-white"
                                                        >
                                                            Retirer
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
            </ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    onClick={onClose}
                >
                    Fermer
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeliveryParcelsModal;