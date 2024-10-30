import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import AddProductToDiscount from './AddProductToDiscount';
import { NotificationManager } from 'react-notifications';

const List = (props) => {

    const [products, setProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);
    const [showAddProductbox, setShowAddProductbox] = useState(false);

    useEffect(() => {
        getProducts();
        getDiscountProducts();
    }, []);

    const getDiscountProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getDiscountModelProducts(props.match.params.id)
            .then((response) => setDiscountProducts(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({types: ['PRODUCT', 'PACKAGE']})
            .then(response => setProducts(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const addDiscountProducts = (product) => {
        props.setRequestGlobalAction(true);
        ProductService.createDiscountModelProduct(props.match.params.id, {product_reference: product.reference })
            .then(() => {
                getDiscountProducts();
                NotificationManager.success("Le produit a été ajouté")
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Une erreur est survenue, veuillez réessayer plus tard")
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
                setShowAddProductbox(false);
            })
    }

    const deleteProduct = (product) => {
        props.setRequestGlobalAction(true),
            ProductService.deleteDiscountModelProduct(props.match.params.id, { product_reference: product.reference })
                .then(() => {
                    getDiscountProducts();
                    NotificationManager.success("Le produit a été ajouté")
                })
                .finally(() => props.setRequestGlobalAction(false))
    }

    const getAvailableProducts = () => {
        return products.filter(p => !discountProducts.map(cp => cp.id).includes(p.id));
    }

    return (
        <>
            <CustomList
                loading={false}
                list={discountProducts}
                itemsFoundText={n => `${n} produits trouvés`}
                onAddClick={() => setShowAddProductbox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun produits trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Code</th>
                                            <th className="fw-bold">Action</th>
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
                                                            <p className="m-0 text-dark">{item.code}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td onClick={() => deleteProduct(item)}>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold" style={{ color: 'red' }}>Rétirer</h4>
                                                        </div>
                                                    </div>
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
            <AddProductToDiscount
                show={showAddProductbox}
                onSave={addDiscountProducts}
                products={getAvailableProducts()}
                onClose={() => setShowAddProductbox(false)}
            />
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));