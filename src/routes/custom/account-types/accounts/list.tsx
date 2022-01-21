import { connect } from 'react-redux';
import Switch from "@material-ui/core/Switch";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import { getReferralTypeLabel } from 'Helpers/helpers';
import UserAccountTypeService from 'Services/account-types';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Accounts = (props) => {

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccounts()
        .then(response => setAccounts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeAccountStatus = (account) => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.setAccountAsDefault(account.id, !account.default)
        .then(() => getAccounts())
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(USER_ACCOUNT_TYPE.ACCOUNT.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des comptes"}
            />
            <CustomList
                loading={false}
                list={accounts}
                itemsFoundText={n => `${n} compte.s trouvé.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun compte.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Label</th>
                                            <th className="fw-bold">Cible</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Par défaut</th>
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
                                                            <h4 className="m-0 text-dark">{getReferralTypeLabel(item.referralType)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{item.description}</h4>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.default}
                                                        onChange={() => { changeAccountStatus(item) }}
                                                    />
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Accounts));