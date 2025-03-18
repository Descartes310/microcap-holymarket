import { Button } from "reactstrap";
import { connect } from 'react-redux';
import LogDetailsModal from './details';
import SystemService from 'Services/systems';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { getLogActionTypeLabel } from 'Helpers/helpers';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const AuditLogs = (props) => {

    const [datas, setDatas] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [showDetailsBox, setShowDetailsBox] = useState(false);

    useEffect(() => {
        getAudits();
    }, []);

    const getAudits = () => {
        props.setRequestGlobalAction(true);
        SystemService.getAuditLogs()
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

    return (
        <>
            <PageTitleBar
                title={"Liste des logs"}
            />
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} logs trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun log trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Utilisateur</th>
                                            <th className="fw-bold">Référence</th>
                                            <th className="fw-bold">Action</th>
                                            <th className="fw-bold">Entité</th>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.userName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.referralCode}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getLogActionTypeLabel(item.action)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.entityName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.timestamp} showFullDate format='LLL' />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        className="text-white mr-2 ml-10"
                                                        onClick={() => {
                                                            setSelectedLog(item);
                                                            setShowDetailsBox(true);
                                                        }}
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
            { selectedLog && showDetailsBox && (
                <LogDetailsModal
                    show={showDetailsBox}
                    log={selectedLog}
                    onClose={() => {
                        setSelectedLog(null);
                        setShowDetailsBox(false)
                    }}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AuditLogs));