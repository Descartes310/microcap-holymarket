import { connect } from 'react-redux';
import BrokerService from 'Services/brokers';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { BROKER, FUNDING, joinUrlWithParamsId } from 'Url/frontendUrl';

const List = (props) => {

    const [cashdesk, setCashdesk] = useState(null);
    const [cashdesks, setCashdesks] = useState([]);

    useEffect(() => {
        getCashdesks();
    }, []);

    const getCashdesks = () => {
        props.setRequestGlobalAction(true),
        BrokerService.getCashdesk()
        .then(response => setCashdesks(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des caisses"}
            />
            <CustomList
                list={cashdesks}
                loading={false}
                itemsFoundText={n => `${n} caisse trouvées`}
                onAddClick={() => props.history.push(BROKER.CASHDESK.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune caisse trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Responsable</th>
                                            <th className="fw-bold">Agence</th>
                                            <th className="fw-bold">Actions</th>
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
                                                            <p className="m-0 text-dark">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.userName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.counter.label}</p>
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));