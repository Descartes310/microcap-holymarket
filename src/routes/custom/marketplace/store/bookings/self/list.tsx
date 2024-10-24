import ShareBooking from './share';
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

    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState(null);
    const [showShareBox, setShowShareBox] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        props.setRequestGlobalAction(true);
        ProductService.getBookings()
            .then((response) => setBookings(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const deleteBooking = (reference) => {
        props.setRequestGlobalAction(true),
        ProductService.deleteBooking(reference)
            .then(() => {
                getBookings();
                setShowConfirmBox(false);
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <CustomList
            list={bookings}
            loading={false}
            itemsFoundText={n => `${n} codes trouvés`}
            onAddClick={() => props.history.push(MARKETPLACE.STORE.BOOKING.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun code trouvé
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Désignation</th>
                                        <th className="fw-bold">Code</th>
                                        <th className="fw-bold">Limite d'utilisation</th>
                                        <th className="fw-bold">Date de début</th>
                                        <th className="fw-bold">Date de fin</th>
                                        <th className="fw-bold">Propriétaire</th>
                                        <th className="fw-bold">Actions</th>
                                        <th className="fw-bold">Supprimer</th>
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
                                                        <p className="m-0 fw-bold text-dark">{item.useLimit}</p>
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
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 fw-bold text-dark">{item.referralCode}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                { !item.parentReference && (
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.STORE.BOOKING.UPDATE, item.reference))}
                                                        className="text-white font-weight-bold mr-3"
                                                    >
                                                        Editer
                                                    </Button>
                                                )}
                                                { !item.usable && (
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setBooking(item);
                                                            setShowShareBox(true);
                                                        }}
                                                        className="text-white font-weight-bold mr-3"
                                                    >
                                                        Partager
                                                    </Button>
                                                )}
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
                                deleteBooking(booking.reference);
                            }}
                            leftButtonOnClick={() => {
                                setShowConfirmBox(false)
                            }}
                            message={'Etes vous sure de vouloir supprimer ce code de reservation ?'}
                        />
                    )}
                    { booking && showShareBox && (
                        <ShareBooking
                            booking={booking}
                            show={showShareBox}
                            title={'Partager '+booking.label}
                            onClose={() => {
                                setShowShareBox(false);
                                getBookings();
                            }}
                        />
                    )}
                </>
            )}
        />
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));