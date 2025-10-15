import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import ProductService from 'Services/products';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import UserAccountTypeService from 'Services/account-types';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const ChainProductModal = (props) => {

    const {show, onClose, chain} = props;
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getChainProducts = () => {
        props.setRequestGlobalAction(true);
        UserAccountTypeService.getChainProducts(chain.id).then((response) => {
            setSelectedProducts(response);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModelsByProfile({profile_reference: chain.next.reference}).then((response) => {
            setProducts(response);
        })
        .finally(() => {
            getChainProducts();
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {

        if(!selectedProducts) {
            return;
        }

        let data = {
            product_model_references: selectedProducts.map(p => p.reference).join(",")
        };

        props.setRequestGlobalAction(true);

        UserAccountTypeService.createChainProducts(chain.id, data).then(() => {
            NotificationManager.success('Les produits ont été enregistrés');
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            onClose();
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Produits par défaut de la chaine
                </h3>
            )}
        >
            <RctCardContent>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Produits par défaut
                    </InputLabel>
                    <Autocomplete
                        multiple
                        options={products}
                        value={selectedProducts}
                        id="combo-box-demo"
                        onChange={(__, items) => {
                            setSelectedProducts(items);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>

                <Button
                    color="primary"
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ChainProductModal));