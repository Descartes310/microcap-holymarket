import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import AccountService from 'Services/accounts';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import CreateAccount from '../components/createAccount';
import { FUNDING, joinUrlWithParamsId } from 'Url/frontendUrl';

const Accounts = (props) => {

    const [accounts, setAccounts] = useState([]);
    const [showAddBox, setShowAddBox] = useState(false);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getExternalAccounts()
        .then(response => setAccounts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                loading={false}
                list={accounts}
                itemsFoundText={n => `${n} comptes trouvés`}
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
                                            <th className="fw-bold">Nom</th>
                                            <th className="fw-bold">Numéro compte</th>
                                            <th className="fw-bold">Clé</th>
                                            <th className="fw-bold">IBAN</th>
                                            <th className="fw-bold">Date de création</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {item.detailsList.find(d => d.type == 'ACCOUNT_NUMBER')?.value}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {item.detailsList.find(d => d.type == 'KEY')?.value}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {item.detailsList.find(d => d.type == 'IBAN')?.value}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0">
                                                                <TimeFromMoment time={item.createdAt} showFullDate />
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    { item.accountReference && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => props.history.push(joinUrlWithParamsId(FUNDING.ACCOUNT.DETAILS, item.accountReference))}
                                                        >
                                                            Détails
                                                        </Button>
                                                    )}
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
            <CreateAccount
                type="BANK_AGENCY"
                show={showAddBox}
                onClose={() => {
                    setShowAddBox(false);
                    getAccounts();
                }}
                title="Création d'une nouvelle agence"
            />
        </>
    );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Accounts));
