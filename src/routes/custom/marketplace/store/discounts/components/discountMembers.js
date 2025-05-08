import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import DialogComponent from "Components/dialog/DialogComponent";

const List = (props) => {

    const {show, onClose, reference} = props;

    const [members, setMembers] = useState([]);

    useEffect(() => {
        getDiscountMembers();
    }, []);

    const getDiscountMembers = () => {
        props.setRequestGlobalAction(true);
        ProductService.getDiscountMembers(reference)
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

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="lg"
            title={(
                <h3 className="fw-bold">
                    Liste des utilisateurs
                </h3>
            )}
        >
            <CustomList
                list={members}
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
                                            <th className="fw-bold">Commerçant</th>
                                            <th className="fw-bold">Code</th>
                                            <th className="fw-bold">Limite d'usage</th>
                                            <th className="fw-bold">Usage restant</th>
                                            <th className="fw-bold">Réduction</th>
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
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.percentage} %</p>
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
        </DialogComponent>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));