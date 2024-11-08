import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import OrderService from "Services/orders";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import { imageFileTypes } from 'Helpers/datas';
import { RctCardContent } from 'Components/RctCard';
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';

const OrderPaymentProofModal = (props) => {

    const {show, onClose, order, sale, currency} = props;
    const [file, setFile] = useState(null);
    const [amount, setAmount] = useState(props.amount);

    useEffect(() => {
        setAmount(props.amount);
    }, [props.amount])

    const onSubmit = () => {

        if(sale) {
            if(!amount) {
                NotificationManager.error("Toutes les informations sont obligatoires");
                return;
            }

            props.setRequestGlobalAction(true);

            let data = {
                approved: true, amount
            }

            OrderService.approveSale(sale.reference, data).then(() => {
                NotificationManager.success("Le payment a bien été traité");
                setFile(null);
                setAmount(null);
                props.onClose();
            }).catch((err) => {
                console.log(err);
                NotificationManager.error("Une erreur est survenue");
            }).finally(() => {
                props.setRequestGlobalAction(false);
            })
        } else {
            if(!file || !amount) {
                NotificationManager.error("Toutes les informations sont obligatoires");
                return;
            }

            props.setRequestGlobalAction(true);

            let data = {
                file, amount
            }

            OrderService.paySaleByTransfer(order.reference, data, { fileData: ['file'], multipart: true }).then(() => {
                NotificationManager.success("La preuve a bien été envoyé");
                setFile(null);
                setAmount(null);
                props.onClose();
            }).catch((err) => {
                console.log(err);
                NotificationManager.error("Une erreur est survenue");
            }).finally(() => {
                props.setRequestGlobalAction(false);
            })
        }
    }

    return (
        <DialogComponent
            show={show}
            onClose={() => {
                onClose();
            }}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Renseigner la preuve de virement
                </h3>
            )}
        >
            <RctCardContent>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="amount">
                            Montant du virement
                        </InputLabel>
                        <InputStrap
                            required
                            id="amount"
                            type="number"
                            name='amount'
                            className="input-lg"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </FormGroup><FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="currency">
                            Devise
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="currency"
                            disabled={true}
                            name='currency'
                            className="input-lg"
                            value={currency}
                        />
                    </FormGroup>
                    { order && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Preuve du virement
                            </InputLabel>
                            <FileUploader
                                classes="mw-100"
                                label={props.file?.label}
                                handleChange={(file) => {
                                    setFile(file);
                                }} name="file" types={imageFileTypes} />
                        </FormGroup>
                    )}

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(OrderPaymentProofModal));