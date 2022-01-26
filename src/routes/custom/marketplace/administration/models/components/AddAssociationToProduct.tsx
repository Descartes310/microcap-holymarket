import _ from 'lodash';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useTheme } from "@material-ui/core";
import { Form, FormGroup } from 'reactstrap';
import Button from "@material-ui/core/Button";
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputComponent from "Components/InputComponent";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import ErrorInputComponent from "Components/ErrorInputComponent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const AddAssociationToProduct = ({ show, products, onSave, onClose }) => {

    const theme = useTheme();
    const [product, setProduct] = useState(null);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        if (product === null) {
            NotificationManager.error("Vous devez choisir un produit ou en créé un d'abord");
            return;
        }
        onSave(product, data.price, data.quantity);
        setProduct(null);
    };

    return (
        <Dialog
            fullWidth
            open={show}
            maxWidth={'md'}
            onClose={onClose}
            disableBackdropClick
            disableEscapeKeyDown
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    Ajouter un produit
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={onClose}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit}>
                    <div className="w-100">

                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Produit
                            </InputLabel>
                            <Autocomplete
                                value={product}
                                id="combo-box-demo"
                                options={products}
                                onChange={(__, item) => {
                                    setProduct(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="price">
                                Prix unitaire
                            </InputLabel>
                            <InputComponent
                                isRequired
                                type="number"
                                id="price"
                                errors={errors}
                                register={register}
                                className="input-lg"
                                name={'price'}
                                otherValidator={{ minLength: 1 }}
                            >
                                {errors.price?.type === 'pattern' && (
                                    <ErrorInputComponent text="Entrer un prix supérieur à 0" />
                                )}
                            </InputComponent>
                        </FormGroup>

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="quantity">
                                Quantité
                            </InputLabel>
                            <InputComponent
                                isRequired
                                type="number"
                                id="quantity"
                                errors={errors}
                                register={register}
                                className="input-lg"
                                name={'quantity'}
                                otherValidator={{ minLength: 1 }}
                            >
                                {errors.quantity?.type === 'pattern' && (
                                    <ErrorInputComponent text="Entrer une quantité supérieur à 0" />
                                )}
                            </InputComponent>
                        </FormGroup>
                    </div>

                    <FormGroup className="mb-15">
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold mr-3"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Ajouter le product
                        </Button>
                    </FormGroup>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddAssociationToProduct;