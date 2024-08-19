import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { joinUrlWithParamsId, MARKETPLACE } from 'Url/frontendUrl';

const List = (props) => {

    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        getDiscounts();
    }, []);

    const getDiscounts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getDiscounts()
            .then((response) => setDiscounts(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const deleteProduct = (reference) => {
        props.setRequestGlobalAction(true),
            ProductService.deleteDiscount(reference)
                .then(() => getDiscounts())
                .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <CustomList
            list={discounts}
            loading={false}
            itemsFoundText={n => `${n} coupons trouvés`}
            onAddClick={() => props.history.push(MARKETPLACE.STORE.DISCOUNT.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun coupon trouvé
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Désignation</th>
                                        <th className="fw-bold">Code</th>
                                        <th className="fw-bold">Réduction</th>
                                        <th className="fw-bold">Date de début</th>
                                        <th className="fw-bold">Date de fin</th>
                                        <th className="fw-bold">Produits</th>
                                        <th className="fw-bold">Actions</th>
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
                                                        <p className="m-0 text-dark">{item.percentage} %</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 text-dark"><TimeFromMoment time={item.startDate} showFullDate /></p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 text-dark"><TimeFromMoment time={item.endDate} showFullDate /></p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.STORE.DISCOUNT.PRODUCTS, item.reference))}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Produits
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.STORE.DISCOUNT.UPDATE, item.reference))}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Editer
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => {
                                                        deleteProduct(item.reference);
                                                    }}
                                                    className="btn-danger text-white font-weight-bold mr-3"
                                                >
                                                    Supprimer
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