import { connect } from 'react-redux';
import { ASSETS } from 'Url/frontendUrl';
import AssetService from 'Services/assets';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { getAssetActionTypeLabel } from 'Helpers/helpers';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Assets = (props) => {

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true);
        AssetService.getProfiles()
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
        props.history.push(ASSETS.PROFILE.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Profils de gestion"}
            />
            <CustomList
                list={datas}
                loading={false}
                onAddClick={goToCreate}
                itemsFoundText={n => `${n} profils trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun profil trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Action</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Date création</th>
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
                                                            <p className="m-0 fw-bold text-dark">
                                                                {item.actions.map(a => getAssetActionTypeLabel(a)).join(", ")}
                                                            </p>
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