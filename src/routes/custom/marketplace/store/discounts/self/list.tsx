import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import DiscountMembers from "../components/discountMembers";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AddMemberToDiscount from 'Routes/custom/marketplace/administration/discountModels/components/AddMemberToDiscount';

const List = (props) => {

    const [discounts, setDiscounts] = useState([]);
    const [discount, setDiscount] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    const [showAddMemberbox, setShowAddMemberbox] = useState(false);
    const [showClientMemberBox, setShowClientMemberBox] = useState(false);

    useEffect(() => {
        getDiscounts();
    }, []);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

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
            // onAddClick={() => props.history.push(MARKETPLACE.STORE.DISCOUNT.CREATE)}
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
                                        <th className="fw-bold">Limite d'usage</th>
                                        <th className="fw-bold">Usage restant</th>
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
                                                        <h4 className="m-0 fw-bold text-dark">{item.quantity}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{item.remaining}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => {
                                                        setDiscount(item);
                                                        setShowParticipants(true);
                                                    }}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Participants
                                                </Button>
                                                <ButtonDropdown isOpen={dropdownOpen[1]} toggle={() => onToggleButton(1)} className="mr-3">
                                                    <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '1rem' }}>
                                                        Partager
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                            <DropdownItem style={{ color: 'black' }}
                                                                onClick={() => {
                                                                    setDiscount(item);
                                                                    setShowAddMemberbox(true);
                                                                }}
                                                            >
                                                                A un distributeur
                                                            </DropdownItem>
                                                            <DropdownItem style={{ color: 'black' }}
                                                                onClick={() => {
                                                                    setDiscount(item);
                                                                    setShowClientMemberBox(true);
                                                                }}
                                                            >
                                                                A un client
                                                            </DropdownItem>
                                                    </DropdownMenu>
                                                </ButtonDropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    { (showAddMemberbox || showClientMemberBox) && discount && (
                        <AddMemberToDiscount
                            show={showAddMemberbox || showClientMemberBox}
                            usable={showClientMemberBox}
                            reference={discount.reference}
                            isSeller={false}
                            onClose={() => {
                                setShowAddMemberbox(false);
                                setShowClientMemberBox(false);
                                getDiscounts();
                            }}
                        />
                    )}
                    { showParticipants && discount && (
                        <DiscountMembers
                            show={showParticipants}
                            reference={discount.reference}
                            onClose={() => {
                                setShowParticipants(false)
                                setDiscount(null);
                            }}
                        />
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