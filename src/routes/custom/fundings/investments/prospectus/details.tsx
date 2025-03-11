import { connect } from 'react-redux';
import { FUNDING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getInvestmentPerimeterTypeLabel } from 'Helpers/helpers';

const List = (props) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        props.setRequestGlobalAction(true),
        FundingService.findFundingProspectus(props.match.params.id)
        .then(response => setData(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <RctCardContent>
            <div className="table-responsive">
                <table className="table table-hover table-middle mb-0">
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
                                        <h4 className="m-0 fw-bold text-dark">Désignation</h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 text-dark">{data?.label}</h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">Date de création</h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 text-dark"><TimeFromMoment time={data?.createdAt} showFullDate /></h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2 className="text-left" style={{ marginTop: 20, marginBottom: 20 }}>
                Liste des rubriques
            </h2>
            <CustomList
                list={data ? data.investmentProspectusItems : []}
                loading={false}
                itemsFoundText={n => `${n} rubriques trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune rubrique trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Intitulé</th>
                                            <th className="fw-bold">Article</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.label}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.itemName}</p>
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
        </RctCardContent>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
