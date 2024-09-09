import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import Cotations from './components/cotations';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import {NotificationManager} from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { joinUrlWithParams, MARKETPLACE } from 'Url/frontendUrl';
import ProductDetailsButton from 'Components/ProductDetailsButton';
import ProductPaymentIncorrect from '../components/productPaymentIncorrect';
import { getProductRangeLabel, getPriceWithCurrency } from 'Helpers/helpers';

const List = (props) => {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCotationBox, setShowCotationBox] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProducts()
            .then(response => setProducts(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const changeStatus = (product) => {
        props.setRequestGlobalAction(true),
        ProductService.changeProductStatus(product.id)
        .then(() => getProducts())
        .catch((err) => {
            setSelectedProduct(product);
            if(err?.response?.status == 412) {
                setShowPaymentModal(true);
            } else {
                NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
            }
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const configureProduct = (item) => {
        props.history.push(joinUrlWithParams(MARKETPLACE.STORE.PRODUCT.CONFIGURE, [{param: 'reference', value: item.reference}]));
    }

    const updateProduct = (item) => {
        props.history.push(joinUrlWithParams(MARKETPLACE.STORE.PRODUCT.UPDATE, [{param: 'reference', value: item.reference}]));
    }

    return (
        <>
            <PageTitleBar
                title={"Mes produits"}
            />
            <CustomList
                list={products}
                loading={false}
                itemsFoundText={n => `${n} produits trouvés`}
                onAddClick={() => props.history.push(MARKETPLACE.STORE.PRODUCT.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun produit trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Code</th>
                                            <th className="fw-bold">Prix</th>
                                            <th className="fw-bold">Portée</th>
                                            <th className="fw-bold">Disponible</th>
                                            <th className="fw-bold">Détails</th>
                                            <th className="fw-bold">Configuration</th>
                                            <th className="fw-bold">Cotation</th>
                                            <th className="fw-bold">Edition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.code}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.price, item.currency)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getProductRangeLabel(item.range)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.status}
                                                        onChange={() => { changeStatus(item) }}
                                                    />
                                                </td>
                                                <td>
                                                    <ProductDetailsButton reference={item.reference} />
                                                </td>
                                                <td>
                                                    { item.specialProduct == 'CODEV' && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => configureProduct(item)}
                                                            className="text-white font-weight-bold mr-3"
                                                        >
                                                            Configurations
                                                        </Button>
                                                    )}
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setSelectedProduct(item);
                                                            setShowCotationBox(true);
                                                        }}
                                                        className="text-white font-weight-bold mr-3"
                                                    >
                                                        Cotations
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            updateProduct(item);
                                                        }}
                                                        className="text-white font-weight-bold mr-3"
                                                    >
                                                        Edition
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
            { selectedProduct && (
                <Cotations
                    product={selectedProduct}
                    show={showCotationBox && selectedProduct} 
                    onClose={() => { setShowCotationBox(false); }} 
                />
            )}
            { selectedProduct && showPaymentModal && (
                <ProductPaymentIncorrect
                    product={selectedProduct}
                    show={showPaymentModal && selectedProduct} 
                    onClose={() => { setShowPaymentModal(false); }} 
                    onSuccess={() => props.history.push(MARKETPLACE.STORE.PAYMENT.CONFIGURATION.LIST)} 
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
