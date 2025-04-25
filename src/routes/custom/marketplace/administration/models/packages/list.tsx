import { connect } from 'react-redux';
import { MARKETPLACE, joinUrlWithParams } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency, getProductNatureLabel, getProductRangeLabel } from 'Helpers/helpers';

const List = (props) => {

    const [packages, setPackages] = useState([]);

    useEffect(() => {
        getPackages();
    }, []);

    const getPackages = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({types: ['PACKAGE']})
            .then(response => setPackages(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const updateProduct = (item) => {
        props.history.push(joinUrlWithParams(MARKETPLACE.MODEL.PACKAGE.UPDATE, [{param: 'reference', value: item.reference}]));
    }

    return (
        <CustomList
            list={packages}
            loading={false}
            itemsFoundText={n => `${n} packages trouvés`}
            onAddClick={() => props.history.push(MARKETPLACE.MODEL.PACKAGE.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun packages trouvés
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
                                        <th className="fw-bold">Nature</th>
                                        <th className="fw-bold">Portée</th>
                                        <th className="fw-bold">Catégorie</th>
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
                                                        <h4 className="m-0 fw-bold text-dark">{getProductNatureLabel(item.nature)}</h4>
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
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{item.categoryProduct.label}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => updateProduct(item)}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Editer
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
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));