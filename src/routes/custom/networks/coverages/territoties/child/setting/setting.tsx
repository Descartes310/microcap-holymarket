import { connect } from 'react-redux';
import CreateDetails from "./createDetails";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TerritoryService from 'Services/territories';
import { translateTerritoryType } from 'Helpers/helpers';
import { translateTerritoryDetailsType } from 'Helpers/datas';
import { NETWORK, joinUrlWithParamsId } from 'Url/frontendUrl';

const List = (props) => {

    const [datas, setDatas] = useState([]);
    const [showCreateBox, setShowCreateBox] = useState(false);

    useEffect(() => {
        getTerritoriesDetails();
    }, [props.match.params.id]);

    const getTerritoriesDetails = () => {
        props.setRequestGlobalAction(true);
        TerritoryService.getTerritoryDetails(props.match.params.id, {})
        .then(response => {
            setDatas(response);
        })
        .catch(err => {
            console.log(err);
            props.history.goBack();
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} details trouvés`}
                onAddClick={() => {
                    setShowCreateBox(true)
                }}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun details trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Type</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{ translateTerritoryDetailsType(item.code) ? translateTerritoryDetailsType(item.code) : 'Infos. de territoire' }</h4>
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
            <CreateDetails 
                show={showCreateBox} 
                onClose={() => {
                    setShowCreateBox(false);
                    getTerritoriesDetails();
                }} 
            />
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));