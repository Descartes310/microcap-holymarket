import { connect } from 'react-redux';
import Switch from "@material-ui/core/Switch";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { joinUrlWithParamsId, USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import { getReferralTypeLabel } from 'Helpers/helpers';
import UserAccountTypeService from 'Services/account-types';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Types = (props) => {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes()
        .then(response => setTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeAccountTypeStatus = (account) => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.setAccountTypeAsDefault(account.id, !account.default)
        .then(() => getTypes())
        .finally(() => props.setRequestGlobalAction(false))
    }


    const goToCreate = () => {
        props.history.push(USER_ACCOUNT_TYPE.TYPE.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des type de comptes"}
            />
            <CustomList
                loading={false}
                list={types}
                itemsFoundText={n => `${n} type.s trouvé.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun type.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Cible</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Catégorie</th>
                                            <th className="fw-bold">Par défaut</th>
                                            <th className="fw-bold">Action</th>
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
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{item.userAccountTypeCategory.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.default}
                                                        onChange={() => { changeAccountTypeStatus(item) }}
                                                    />
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(USER_ACCOUNT_TYPE.TYPE.CHAIN, item.id))}
                                                    >
                                                        Chaine
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Types));