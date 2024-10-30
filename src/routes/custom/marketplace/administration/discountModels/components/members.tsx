import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import AddMemberToDiscount from './AddMemberToDiscount';
import { NotificationManager } from 'react-notifications';

const List = (props) => {

    const [members, setMembers] = useState([]);
    const [discount, setDiscount] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showAddMemberbox, setShowAddMemberbox] = useState(false);

    useEffect(() => {
        getDiscountMembers();
    }, []);

    const getDiscountMembers = () => {
        props.setRequestGlobalAction(true);
        ProductService.getDiscountMembers(props.match.params.id)
            .then((response) => {
                setMembers(response);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const addDiscountMember = (member) => {
        props.setRequestGlobalAction(true);
        ProductService.shareDiscountModel(props.match.params.id, {referral_code: member.referralCode })
            .then(() => {
                getDiscountMembers();
                setShowAddMemberbox(false);
                NotificationManager.success("Le participant a été ajouté")
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Le participant n'est pas éligible a cette promo")
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const deleteDiscount = (reference) => {
        props.setRequestGlobalAction(true),
        ProductService.deleteDiscount(reference)
            .then(() => {
                getDiscountMembers();
                setShowConfirmBox(false);
                NotificationManager.success("Le participant a été retiré")
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                list={members}
                loading={false}
                itemsFoundText={n => `${n} participants trouvés`}
                onAddClick={() => setShowAddMemberbox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun participant trouvé
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
                                                <td onClick={() => {
                                                    setDiscount(item);
                                                    setShowConfirmBox(true);
                                                }}>
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
            <AddMemberToDiscount
                show={showAddMemberbox}
                onSave={addDiscountMember}
                onClose={() => setShowAddMemberbox(false)}
            />
            { discount && showConfirmBox && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => {
                        deleteDiscount(discount.reference);
                    }}
                    leftButtonOnClick={() => {
                        setShowConfirmBox(false)
                    }}
                    message={'Etes vous sure de vouloir supprimer ce participant ?'}
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));