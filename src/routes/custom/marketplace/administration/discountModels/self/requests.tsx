import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from 'react-notifications';

const List = (props) => {

    const [discounts, setDiscounts] = useState([]);
    const [discount, setDiscount] = useState(null);
    const [approved, setApproved] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getDiscounts();
    }, []);

    const getDiscounts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getDiscountRequests()
            .then((response) => setDiscounts(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const approveDiscount = (reference) => {
        props.setRequestGlobalAction(true),
        ProductService.approvedDiscount(reference, {approved})
            .then(() => {
                getDiscounts();
                setShowConfirmBox(false);
                setApproved(false);
                NotificationManager.success("Le coupon a bien été traité")
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <CustomList
            list={discounts}
            loading={false}
            itemsFoundText={n => `${n} coupons trouvés`}
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
                                        <th className="fw-bold">Commerçant</th>
                                        <th className="fw-bold">Code</th>
                                        <th className="fw-bold">Réduction</th>
                                        <th className="fw-bold">Date de début</th>
                                        <th className="fw-bold">Date de fin</th>
                                        <th className="fw-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list && list.map((item, key) => (
                                        <tr key={key} className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{item.userName}</h4>
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
                                                    onClick={() => {
                                                        setDiscount(item);
                                                        setShowConfirmBox(true);
                                                        setApproved(true);
                                                    }}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Accepter
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => {
                                                        setDiscount(item);
                                                        setShowConfirmBox(true);
                                                        setApproved(false);
                                                    }}
                                                    className="btn-danger text-white font-weight-bold mr-3"
                                                >
                                                    Refuser
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
                                approveDiscount(discount.reference);
                            }}
                            leftButtonOnClick={() => {
                                setShowConfirmBox(false)
                            }}
                            message={approved ? 'Etes vous sure de vouloir accepter ce code de réduction ?' : 'Etes vous sure de vouloir refuser ce code de réduction ?'}
                        />
                    )}
                </>
            )}
        />
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));