import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getInvestmentPerimeterTypeLabel } from 'Helpers/helpers';

const List = (props) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        props.setRequestGlobalAction(true),
        FundingService.findFundingStrategy(props?.reference ?? props.match.params.id)
        .then(response => setData(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <div className={`${props.page ? 'm-60 pb-40' : 'mr-60'}`}>
            <div className="table-responsive">
                <table className="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">Détails</th>
                            <th className="fw-bold">Valeur</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0">Désignation</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0 text-dark">{data?.label}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0">Politique</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0 text-dark">{data?.politicName}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0">Date de création</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0 text-dark"><TimeFromMoment time={data?.createdAt} showFullDate /></p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            { data?.investmentSettingValueList?.length > 0 && (
                <h2 className="text-left" style={{ marginTop: 40, marginBottom: 30, fontSize: '1.8rem' }}>
                    Liste des paramètres
                </h2>
            )}
            { data?.investmentSettingValueList?.length > 0 && (
                <CustomList
                    list={data ? data.investmentSettingValueList : []}
                    loading={false}
                    showSearch={false}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <p>
                                        Aucune paramètre trouvé
                                    </p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Périmetre</th>
                                                <th className="fw-bold">Valeur</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0">{item?.label} ({getInvestmentPerimeterTypeLabel(item?.perimeter)})</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0"><span dangerouslySetInnerHTML={{__html: item.value}}></span></p>
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
            )}
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
