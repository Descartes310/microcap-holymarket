import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AccountService from 'Services/accounts';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { FUNDING, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

const List = (props) => {

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getAccounts()
                .then(response => setAccounts(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar title={'Mes comptes'} />
            <CustomList
                list={accounts}
                loading={false}
                itemsFoundText={n => `${n} comptes`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun comptes
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">#Reference</th>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Type de compte</th>
                                            <th className="fw-bold">Solde</th>
                                            <th className="fw-bold">Détails</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">#{item.reference.split('_').pop().toUpperCase()}</h4>
                                                        </div>
                                                    </div>
                                                </td>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.accountType.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.balance} {item.currencyCode}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(FUNDING.ACCOUNT.DETAILS, item.id))}
                                                    >
                                                        Détails
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
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));