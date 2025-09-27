import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import DeliveryService from 'Services/delivery';
import { NotificationManager } from 'react-notifications';

interface EditDeliveryModalProps {
    show: boolean;
    onClose: () => void;
    delivery: any;
    onSuccess: () => void;
}

const EditDeliveryModal: React.FC<EditDeliveryModalProps> = ({
    show,
    onClose,
    delivery,
    onSuccess
}) => {
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show && delivery) {
            setDate('');
            setComment('');
        }
    }, [show, delivery]);

    const handleSubmit = () => {
        if (!date.trim() || !comment.trim()) {
            NotificationManager.error("Veuillez remplir tous les champs obligatoires");
            return;
        }

        const data = {
            date,
            comment: comment.trim()
        };

        setLoading(true);
        DeliveryService.updateDeliveryStatus(delivery.reference, data)
            .then(() => {
                NotificationManager.success("Statut de livraison mis à jour avec succès");
                onSuccess();
                onClose();
            })
            .catch(() => {
                NotificationManager.error("Une erreur est survenue lors de la mise à jour");
            })
            .finally(() => setLoading(false));
    };

    const getModalTitle = () => {
        if (delivery?.status === 'PENDING') {
            return "Marquer comme en cours d'expédition";
        } else if (delivery?.status === 'ONGOING') {
            return "Marquer comme livrée";
        }
        return "Modifier la livraison";
    };

    const getDateLabel = () => {
        if (delivery?.status === 'PENDING') {
            return "Date d'expédition";
        } else if (delivery?.status === 'ONGOING') {
            return "Date de livraison";
        }
        return "Date";
    };

    if (!delivery) return null;

    return (
        <Modal isOpen={show} toggle={onClose} size="md">
            <ModalHeader toggle={onClose}>
                {getModalTitle()}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            {getDateLabel()}
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            type="date"
                            variant="outlined"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="comment">
                            Commentaire
                        </InputLabel>
                        <InputStrap
                            required
                            id="comment"
                            type="text"
                            name='comment'
                            className="input-lg"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Entrez un commentaire..."
                        />
                    </FormGroup>
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
                    {loading ? 'Mise à jour...' : 'Mettre à jour'}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditDeliveryModal;