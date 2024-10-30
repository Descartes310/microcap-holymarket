import { connect } from 'react-redux';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import AddBookingSponsor from './AddBookingSponsor';


const BookingSponsor = (props) => {

    const [showAddBox, setShowAddBox] = useState(false);
    const [selectedAccounts, setSelectedAccounts] = useState([]);

    useEffect(() => {
        props.onSubmit(selectedAccounts.map(sa => sa.account));
    }, [selectedAccounts]);

    return (
        <>
            <CustomList
                loading={false}
                list={selectedAccounts}
                itemsFoundText={n => `${n} comptes trouvés`}
                onAddClick={() => setShowAddBox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun compte trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Sponsor</th>
                                            <th className="fw-bold">Compte</th>
                                            <th className="fw-bold">Plafond</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.owner}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.account.label}</h4>
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
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setSelectedAccounts(selectedAccounts.filter(sa => sa.account.id !== item.account.id))
                                                        }}
                                                        className="text-white font-weight-bold"
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

            { showAddBox && (
                <AddBookingSponsor
                    onSubmit={(account, quantity) => {
                        setSelectedAccounts([...selectedAccounts, {account, quantity}]);
                    }}
                    show={showAddBox}
                    onClose={() => {
                        setShowAddBox(false);
                    }}
                    accounts={props.accounts.filter(a => !selectedAccounts.map(sa => sa.account.id).includes(a.id))}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(BookingSponsor));
