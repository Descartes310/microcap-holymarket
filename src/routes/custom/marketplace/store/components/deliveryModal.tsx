import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProductService from 'Services/products';
import OrderService from 'Services/orders';
import {NotificationManager} from 'react-notifications';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {FormGroup} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import TextField from '@material-ui/core/TextField';

const DeliveryModal = (props) => {
    const [deliverers, setDeliverers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectedDeliverer, setSelectedDeliverer] = useState<any>(null);

    useEffect(() => {
        if (props.show) {
            setLoading(true);
            setSelectedDeliverer(null);
            ProductService.getAvailableDeliverers()
                .then((response: any[]) => {
                    setDeliverers(response);
                })
                .catch(() => {
                    NotificationManager.error("Erreur lors du chargement des livreurs");
                })
                .finally(() => setLoading(false));
        }
    }, [props.show]);

    const handleSave = () => {
        if (!selectedDeliverer) {
            NotificationManager.error("Veuillez sélectionner un livreur");
            return;
        }
        setSaving(true);
        OrderService.assignDeliverer({
            order_reference: props.orderReference,
            deliver_reference: selectedDeliverer.referralCode
        })
        .then(() => {
            NotificationManager.success("Commande envoyée en livraison avec succès");
            props.onClose();
            props.onSuccess();
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue lors de l'envoi en livraison");
        })
        .finally(() => setSaving(false));
    };
    return (
        <Modal isOpen={props.show} toggle={props.onClose} size="md">
            <ModalHeader toggle={props.onClose}>
                Sélectionner un livreur
            </ModalHeader>
            <ModalBody>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Chargement...</span>
                        </div>
                        <p>Chargement des livreurs...</p>
                    </div>
                ) : (
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="price">
                            Sélectionnez un livreur
                        </InputLabel>
                        <Autocomplete
                            value={selectedDeliverer}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setSelectedDeliverer(item)
                            }}
                            options={deliverers}
                            getOptionLabel={(option) => option.userName}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                )}
            </ModalBody>
            <ModalFooter>
                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                        onClick={props.onClose}
                    >
                        Annuler
                    </Button>
                </FormGroup>
                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                        onClick={handleSave}
                    >
                        {saving ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </FormGroup>
            </ModalFooter>
        </Modal>
    );
};

export default DeliveryModal;