import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';

const Details = (props) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        props.setRequestGlobalAction(true),
        FundingService.findFundingProgram(props?.reference ?? props.match.params.id)
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
                                    <div className="media-body">
                                        <p className="m-0">Désignation</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0 text-dark">{data?.label}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0">Enveloppe d'investissement</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0 text-dark">{getPriceWithCurrency(data?.amount, data?.currency)}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0">Nombre min. de souscription</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0 text-dark">{data?.minimalSubscription}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0">Plan CODEV</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0 text-dark">{data?.codevName}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0">Nombre de ligne</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0 text-dark">{data?.numberOfLine} lignes</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0">Stratégies</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0 text-dark">{data?.strategyName}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0">Date de création</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p className="m-0 text-dark"><TimeFromMoment time={data?.createdAt} showFullDate /></p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            { data?.investmentProgramItemList?.length > 0 && (
                <h2 className="text-left" style={{ marginTop: 40, marginBottom: 30, fontSize: '1.8rem' }}>
                    Liste des investissements
                </h2>
            )}
            { data?.investmentProgramItemList?.length > 0 && (
                <CustomList
                    list={data ? data.investmentProgramItemList : []}
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
                                                <th className="fw-bold">Intitulé</th>
                                                <th className="fw-bold">Coût</th>
                                                <th className="fw-bold">Durée</th>
                                                <th className="fw-bold">Option sortie</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body">
                                                                <p className="m-0 text-dark">{item?.label}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body">
                                                                <p className="m-0 text-dark">{getPriceWithCurrency(item?.amount, item?.currency)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body">
                                                                <p className="m-0 text-dark">{item?.period}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body">
                                                                <p className="m-0 text-dark">{item?.exitOption}</p>
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Details));
