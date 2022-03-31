import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CatalogService from 'Services/catalogs';
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import AddProductToCatalog from './AddProductToCatalog';

const List = (props) => {

    const [products, setProducts] = useState([]);
    const [catalogProducts, setCatalogProducts] = useState([]);
    const [showAddProductbox, setShowAddProductbox] = useState(false);

    useEffect(() => {
        getProducts();
        getCatalogProducts();
    }, []);

    const getCatalogProducts = () => {
        props.setRequestGlobalAction(true);
        CatalogService.getCatalogProducts(props.match.params.id)
            .then((response) => setCatalogProducts(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({ types: ['PRODUCT', 'PACKAGE'] })
            .then(response => setProducts(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const addCatalogProducts = (products) => {
        props.setRequestGlobalAction(true);
        CatalogService.addCatalogProducts(props.match.params.id, {productIds: products.map(p => p.id) })
            .then(() => getCatalogProducts())
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
                setShowAddProductbox(false);
            })
    }

    const deleteProduct = (product) => {
        props.setRequestGlobalAction(true),
            CatalogService.deleteCatalogProduct(props.match.params.id, { product_id: product.id })
                .then(() => getCatalogProducts())
                .finally(() => props.setRequestGlobalAction(false))
    }

    const getAvailableProducts = () => {
        return products.filter(p => !catalogProducts.map(cp => cp.id).includes(p.id));
    }

    return (
        <>
            <CustomList
                loading={false}
                list={catalogProducts}
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
            <AddProductToCatalog
                show={showAddProductbox}
                onSave={addCatalogProducts}
                products={getAvailableProducts()}
                onClose={() => setShowAddProductbox(false)}
            />
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));