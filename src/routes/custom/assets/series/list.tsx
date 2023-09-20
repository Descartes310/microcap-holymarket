import { connect } from 'react-redux';
import { ASSETS } from 'Url/frontendUrl';
import AssetService from 'Services/assets';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { getAssetSeriesTypeLabel } from 'Helpers/helpers';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Assets = (props) => {

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true);
        AssetService.getSeriesTypes()
        .then(response => {
            setDatas(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const goToCreate = () => {
        props.history.push(ASSETS.SERIES.TYPE.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Types de séries"}
            />
            <CustomList
                list={datas}
                loading={false}
                onAddClick={goToCreate}
                itemsFoundText={n => `${n} series trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun serie trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Type</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Date enregistrement</th>
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
                                                            <p className="m-0 fw-bold text-dark">{getAssetSeriesTypeLabel(item.type)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.createdAt} showFullDate />
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Assets));