import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import { joinUrlWithParamsId, MARKETPLACE } from 'Url/frontendUrl';

const List = (props) => {

    const [discounts, setDiscounts] = useState([]);
    const [discount, setDiscount] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getDiscounts();
    }, []);

    const getDiscounts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getDiscountModels()
            .then((response) => setDiscounts(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const deleteDiscount = (reference) => {
        props.setRequestGlobalAction(true),
        ProductService.deleteDiscount(reference)
            .then(() => {
                getDiscounts();
                setShowConfirmBox(false);
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <CustomList
            list={discounts}
            loading={false}
            itemsFoundText={n => `${n} coupons trouvés`}
            onAddClick={() => props.history.push(MARKETPLACE.DISCOUNT_MODELS.CREATE)}
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
                                                    onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.DISCOUNT_MODELS.PRODUCTS, item.reference))}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Produits
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.DISCOUNT_MODELS.MEMBERS, item.reference))}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Participants
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.DISCOUNT_MODELS.UPDATE, item.reference))}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Editer
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => {
                                                        setDiscount(item);
                                                        setShowConfirmBox(true);
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
                    { discount && showConfirmBox && (
                        <ConfirmBox
                            show={showConfirmBox}
                            rightButtonOnClick={() => {
                                deleteDiscount(discount.reference);
                            }}
                            leftButtonOnClick={() => {
                                setShowConfirmBox(false)
                            }}
                            message={'Etes vous sure de vouloir supprimer ce code de réduction ?'}
                        />
                    )}
                </>
            )}
        />
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));