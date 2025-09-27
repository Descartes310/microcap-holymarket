import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import DeliveryService from 'Services/delivery';
import DeliveryZoneService from 'Services/delivery-zones';
import UnitSelect from 'Components/UnitSelect';
import { NotificationManager } from 'react-notifications';

interface CreateDeliveryModalProps {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateDeliveryModal: React.FC<CreateDeliveryModalProps> = ({
    show,
    onClose,
    onSuccess
}) => {
    const [deliveryZone, setDeliveryZone] = useState(null);
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState(null);
    const [deliveryZones, setDeliveryZones] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            // Load delivery zones when modal opens
            DeliveryZoneService.getDeliveryZones()
                .then(response => setDeliveryZones(response))
                .catch(() => NotificationManager.error("Erreur lors du chargement des zones de livraison"));
        } else {
            // Reset form when modal closes
            setDeliveryZone(null);
            setLabel('');
            setDescription('');
            setPrice('');
            setCurrency(null);
        }
    }, [show]);



    const handleSubmit = () => {
        if (!deliveryZone || !label || !price || !currency) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data = {
            delivery_zone_reference: deliveryZone.reference,
            price: parseFloat(price),
            label: label,
            description: description,
            currency: currency?.code
        };

        setLoading(true);
        DeliveryService.createDelivery(data)
            .then(() => {
                NotificationManager.success("La livraison a été créée avec succès");
                onSuccess();
                onClose();
            })
            .catch(() => {
                NotificationManager.error("Une erreur est survenue lors de la création de la livraison");
            })
            .finally(() => setLoading(false));
    };

    return (
        <Modal isOpen={show} toggle={onClose} size="lg">
            <ModalHeader toggle={onClose}>
                Créer une nouvelle livraison
            </ModalHeader>
            <ModalBody>
                <Form>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Désignation
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Zone de livraison
                        </InputLabel>
                        <Autocomplete
                            value={deliveryZone}
                            id="delivery-zone-select"
                            options={deliveryZones}
                            onChange={(__, item) => {
                                setDeliveryZone(item);
                            }}
                            getOptionLabel={(option) => `${option.label} (${option.price} ${option.currency})`}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className='row'>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="price">
                                Prix de livraison
                            </InputLabel>
                            <InputStrap
                                required
                                id="price"
                                type="number"
                                name='price'
                                value={price}
                                className="input-lg"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormGroup>
                        <UnitSelect className="col-md-6 col-sm-12 has-wrapper" label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    onClick={onClose}
                    disabled={loading}
                >
                    Annuler
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="text-white font-weight-bold"
                >
                    {loading ? 'Création...' : 'Créer'}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateDeliveryModal;