import { connect } from 'react-redux';
import { FUNDING, joinUrlWithParamsId } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import FundingService from 'Services/funding';
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import { NotificationManager } from 'react-notifications';

const List = (props) => {

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        FundingService.getFundingProspectus()
        .then(response => setDatas(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeStatus = (item) => {
        props.setRequestGlobalAction(true),
        FundingService.activeFundingProspectus(item.reference)
        .then(() => {
            getDatas();
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <CustomList
            list={datas}
            loading={false}
            itemsFoundText={n => `${n} prospectus trouvée`}
            onAddClick={() => props.history.push(FUNDING.INVESTMENT.PROSPECTUS.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucune prospectus trouvé
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Intitulé</th>
                                        <th className="fw-bold">Description</th>
                                        <th className="fw-bold">Actif</th>
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
                                                        <p className="m-0 text-dark">{item?.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Switch
                                                    aria-label="Par défaut"
                                                    checked={item.active}
                                                    onChange={() => { changeStatus(item) }}
                                                />
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
                                                    onClick={() => props.history.push(joinUrlWithParamsId(FUNDING.INVESTMENT.PROSPECTUS.DETAILS, item.reference))}
                                                >
                                                    Détails
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
