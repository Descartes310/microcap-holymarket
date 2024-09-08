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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const AddProductToDiscount = ({ show, products, onSave, onClose }) => {

    const theme = useTheme();
    const [product, setProduct] = useState(null);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { handleSubmit } = useForm();

    const onSubmit = () => {
        if (!product) {
            NotificationManager.error("Vous devez choisir un produit ou en créé un d'abord");
            return;
        }
        onSave(product);
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
                    Ajouter des produits
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
                                Produits
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                options={products}
                                value={product}
                                onChange={(__, item) => {
                                    setProduct(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </div>

                    <FormGroup className="mb-15">
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold mr-3"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Ajouter le produit
                        </Button>
                    </FormGroup>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductToDiscount;