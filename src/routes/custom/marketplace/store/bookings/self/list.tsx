import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import ShareBooking from '../../../_components/shareBooking';
import BookingMembers from '../../../_components/bookingMembers';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const List = (props) => {

    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showShareBox, setShowShareBox] = useState(false);
    const [showMemberBox, setShowMemberBox] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showClientShareBox, setShowClientShareBox] = useState(false);

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        props.setRequestGlobalAction(true);
        ProductService.getBookings({isModel: false})
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

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

    return (
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
                                        <th className="fw-bold">Désignation</th>
                                        <th className="fw-bold">Code</th>
                                        <th className="fw-bold">Limite d'utilisation</th>
                                        <th className="fw-bold">Date de début</th>
                                        <th className="fw-bold">Date de fin</th>
                                        <th className="fw-bold">Propriétaire</th>
                                        <th className="fw-bold">Actions</th>
                                        {/* <th className="fw-bold">Supprimer</th> */}
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
                                                { !item.usable && (
                                                    <>
                                                        <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3">
                                                            <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '1rem' }}>
                                                                Partager
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                    <DropdownItem style={{ color: 'black' }}
                                                                        onClick={() => {
                                                                            setBooking(item);
                                                                            setShowShareBox(true);
                                                                        }}
                                                                    >
                                                                        A un distributeur
                                                                    </DropdownItem>
                                                                    <DropdownItem style={{ color: 'black' }}
                                                                        onClick={() => {
                                                                            setBooking(item);
                                                                            setShowClientShareBox(true);
                                                                        }}
                                                                    >
                                                                        A un client
                                                                    </DropdownItem>
                                                            </DropdownMenu>
                                                        </ButtonDropdown>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setBooking(item);
                                                                setShowMemberBox(true);
                                                            }}
                                                            className="text-white font-weight-bold mr-3"
                                                        >
                                                            Utilisateurs
                                                        </Button>
                                                    </>
                                                )}
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
                    { booking && (showShareBox || showClientShareBox) && (
                        <ShareBooking
                            booking={booking}
                            show={showShareBox || showClientShareBox}
                            uniqueUsage={false}
                            usable={showClientShareBox}
                            title={'Partager '+booking.label}
                            onClose={() => {
                                setShowShareBox(false);
                                setShowClientShareBox(false);
                                getBookings();
                            }}
                        />
                    )}

                    { booking && showMemberBox && (
                        <BookingMembers
                            booking={booking}
                            show={showMemberBox}
                            onClose={() => {
                                setShowMemberBox(false);
                                setBooking(null);
                            }}
                        />
                    )}
                </>
            )}
        />
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));