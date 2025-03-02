import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import AccounService from 'Services/accounts';
import CustomList from "Components/CustomList";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import { FUNDING, joinUrlWithParamsId } from 'Url/frontendUrl';

const List = (props) => {

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        AccounService.getBigDealAccounts()
        .then(response => setDatas(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <CustomList
            list={datas}
            loading={false}
            itemsFoundText={n => `${n} bigdeals trouvés`}
            onAddClick={() => props.history.push(FUNDING.FINANCIAL_STRUCTURES.PARAM.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun bigdeal trouvé
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Intitulé</th>
                                        <th className="fw-bold">Lignes</th>
                                        <th className="fw-bold">Date de création</th>
                                        <th className="fw-bold">Actions</th>
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
                                                        <p className="m-0 text-dark">{item?.lineTotal} ligne.s</p>
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
                                            <td>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className="text-white font-weight-bold"
                                                    onClick={() => {
                                                        props.history.push(joinUrlWithParamsId(FUNDING.FINANCIAL_STRUCTURES.PARAM.CREATE, item.reference))
                                                    }}
                                                >
                                                    Paramètres
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
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
