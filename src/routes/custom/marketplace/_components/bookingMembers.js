import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import DialogComponent from "Components/dialog/DialogComponent";

const List = (props) => {

    const {show, onClose} = props;

    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        props.setRequestGlobalAction(true);
        ProductService.getBookingMembers(props.booking.reference)
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
        <DialogComponent
            show={show}
            onClose={onClose}
            size="lg"
            title={(
                <h3 className="fw-bold">
                    Liste des distributeurs
                </h3>
            )}
        >
            <CustomList
                list={bookings}
                loading={false}
                itemsFoundText={n => `${n} codes trouvés`}
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
                                            <th className="fw-bold">Distributeurs</th>
                                            <th className="fw-bold">Reference utilisateur</th>
                                            <th className="fw-bold">Code</th>
                                            <th className="fw-bold">Limite d'utilisation</th>
                                            <th className="fw-bold">Actif</th>
                                            {/* <th className="fw-bold">Actions</th> */}
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
                                                            <p className="m-0 fw-bold text-dark">{item.referralCode}</p>
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
                                                        <div className="user-status-pending d-flex flex-row align-items-center" style={{ position: 'relative' }}>
                                                            <div className={`user-status-pending-circle rct-notify mr-10`} style={{
                                                                background: item.status ? 'green' : 'red'
                                                            }} />
                                                            {item.status ? 'Actif' : 'Utilisé'}
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td>
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
                                                </td> */}
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
                    </>
                )}
            />
        </DialogComponent>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));