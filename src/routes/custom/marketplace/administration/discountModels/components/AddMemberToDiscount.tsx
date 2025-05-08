import _ from 'lodash';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import UserSelect from 'Components/UserSelect';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const AddMemberToDiscount = (props) => {

    const theme = useTheme();
    const [member, setMember] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { handleSubmit } = useForm();

    const onSubmit = () => {
        if (!member || !quantity) {
            NotificationManager.error("Vous devez choisir un participant");
            return;
        }
        setMember(null);
        props.setRequestGlobalAction(true);
        ProductService.shareDiscountModel(props.reference, {referral_code: member.referralCode, quantity: quantity, usable: props.usable, is_seller: props.isSeller})
        .then(() => {
            props.onClose();
            NotificationManager.success("Le participant a été ajouté")
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Le participant n'est pas éligible a cette promo")
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    };

    return (
        <Dialog
            fullWidth
            open={props.show}
            maxWidth={'md'}
            onClose={props.onClose}
            disableBackdropClick
            disableEscapeKeyDown
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    Partager le coupon
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={props.onClose}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit}>
                    <div className="w-100">
                        <UserSelect label={'Numéro utilisateur'} onChange={(_, user) => {
                            setMember(user)
                        }}/>
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="quantity">
                            Nombre d'usage
                        </InputLabel>
                        <InputStrap
                            required
                            id="quantity"
                            type="number"
                            name='quantity'
                            className="input-lg"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="mb-15">
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold mr-3"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(AddMemberToDiscount);