import { connect } from 'react-redux';
import { MIPRO } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import PrevisionService from 'Services/previsions';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [previsions, setPrevisions] = useState([]);

    useEffect(() => {
        getPrevisions();
    }, []);

    const getPrevisions = () => {
        props.setRequestGlobalAction(true);
        PrevisionService.getPrevisions()
        .then((response) => setPrevisions(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des previsions"}
            />
            <CustomList
                list={previsions}
                loading={false}
                itemsFoundText={n => `${n} previsions trouvées`}
                onAddClick={() => props.history.push(MIPRO.PREVISION.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun previsions trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Date de début</th>
                                            <th className="fw-bold">Date de fin</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                         <div className="media-body pt-10 d-flex align-content-center align-items-center">
                                                                <div className={`user-status-pending-circle rct-notify`} style={{ background: item.status ? 'green' : 'red' }} />
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark ml-15">{item.label}</h4>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.startDate}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.endDate}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));