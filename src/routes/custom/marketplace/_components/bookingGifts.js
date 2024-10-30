import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import CreateBookingGift from "./createBookingGift";
import ConfirmBox from "Components/dialog/ConfirmBox";
import { getPriceWithCurrency } from 'Helpers/helpers';
import DialogComponent from "Components/dialog/DialogComponent";
import { getBookingAdvantageLabel, getBookingAdvantageTargetLabel } from 'Helpers/datas';

const List = (props) => {

    const {show, onClose} = props;

    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState(null);
    const [showCreateBox, setShowCreateBox] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getBookingGifts();
    }, []);

    const getBookingGifts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getBookingGifts(props.booking.reference)
            .then((response) => setBookings(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const deleteBookingGift = (reference) => {
        props.setRequestGlobalAction(true),
        ProductService.deleteBookingGift(reference)
            .then(() => {
                getBookings();
                setShowConfirmBox(false);
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="lg"
            title={(
                <h3 className="fw-bold">
                    Liste des avantages
                </h3>
            )}
        >
            <CustomList
                list={bookings}
                loading={false}
                itemsFoundText={n => `${n} avantages trouvés`}
                onAddClick={() => setShowCreateBox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun avantage trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Type d'avantage</th>
                                            <th className="fw-bold">Bénéficiaire</th>
                                            <th className="fw-bold">Valeur</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getBookingAdvantageLabel(item.type)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 fw-bold text-dark">{getBookingAdvantageTargetLabel(item.target)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.type == 'DISCOUNT' ? `Réduction de ${item.discount?.percentage} %` : getPriceWithCurrency(item.amountUnit, item.amountCurrency)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setBooking(item);
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
                        { booking && showConfirmBox && (
                            <ConfirmBox
                                show={showConfirmBox}
                                rightButtonOnClick={() => {
                                    deleteBookingGift(booking.reference);
                                }}
                                leftButtonOnClick={() => {
                                    setShowConfirmBox(false)
                                }}
                                message={'Etes vous sure de vouloir supprimer cet avantage ?'}
                            />
                        )}
                        { props.booking && showCreateBox && (
                            <CreateBookingGift
                                booking={props.booking}
                                show={showCreateBox}
                                onClose={() => {
                                    setShowCreateBox(false);
                                    getBookingGifts();
                                }}
                            />
                        )}
                    </>
                )}
            />
        </DialogComponent>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));