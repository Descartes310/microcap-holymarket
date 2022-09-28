import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import GenerateTirage from './components/tirages';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getProductRangeLabel } from 'Helpers/helpers';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { joinUrlWithParams, MARKETPLACE } from 'Url/frontendUrl';
import ProductDetailsButton from 'Components/ProductDetailsButton';

const List = (props) => {

    const [products, setProducts] = useState([]);
    const [showOptionsBox, setShowOptionsBox] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
        .finally(() => props.setRequestGlobalAction(false))
    }

    const configureProduct = (item) => {
        props.history.push(joinUrlWithParams(MARKETPLACE.STORE.PRODUCT.CONFIGURE, [{param: 'reference', value: item.reference}]));
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
                                            <th className="fw-bold">Tirage</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">€{item.price}</h4>
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
                                                    { item.specialProduct && (
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
                                                    { item.specialProduct && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setSelectedProduct(item);
                                                                setShowOptionsBox(true);
                                                            }}
                                                            className="text-white font-weight-bold mr-3"
                                                        >
                                                            Tirages
                                                        </Button>
                                                    )}
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
                <GenerateTirage
                    product={selectedProduct}
                    show={showOptionsBox && selectedProduct} 
                    onClose={() => { setShowOptionsBox(false); }} 
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));