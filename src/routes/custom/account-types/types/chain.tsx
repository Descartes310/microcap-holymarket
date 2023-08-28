import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getChainEventTypeValue } from 'Helpers/datas';
import { getReferralTypeLabel } from 'Helpers/helpers';
import UserAccountTypeService from 'Services/account-types';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { joinUrlWithParamsId, USER_ACCOUNT_TYPE } from 'Url/frontendUrl';

const List = (props) => {

    const [chains, setChains] = useState([]);

    useEffect(() => {
        getChains();
    }, []);

    const getChains = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getChains(props.match.params.id)
        .then(response => setChains(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(joinUrlWithParamsId(USER_ACCOUNT_TYPE.TYPE.CHAIN_CREATE, props.match.params.id));
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des liens"}
            />
            <CustomList
                loading={false}
                list={chains}
                itemsFoundText={n => `${n} lien.s trouvé.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun lien.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Type de compte initial</th>
                                            <th className="fw-bold">Type de compte destination</th>
                                            <th className="fw-bold">Cible</th>
                                            <th className="fw-bold">Evènement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.current.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark fw-bold ">{item.next.label}</h4>
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
                                                            <h4 className="m-0 text-dark">{getChainEventTypeValue(item.event).label}</h4>
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
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));