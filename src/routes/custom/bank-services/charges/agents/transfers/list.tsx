import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';


const List = (props) => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = () => {
        props.setRequestGlobalAction(true),
        BankService.getAgentChargeRequests()
        .then(response => setRequests(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(BANK.CHARGE.AGENT.TRANSFER.CREATE);
    }

    return (
        <>
            <CustomList
                loading={false}
                list={requests}
                itemsFoundText={n => `${n} mouvements trouvés`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune mouvement trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Banque</th>
                                            <th className="fw-bold">Couverture</th>
                                            <th className="fw-bold">Reference couv.</th>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{ getPriceWithCurrency(item.amount, item.currency) }</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.bankCode}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.typeCoverage?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.coverageReference}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.paidAt} format='LLL' /></h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                         <div className="media-body pt-10 d-flex align-content-center align-items-center">
                                                                <div className={`user-status-pending-circle rct-notify`} style={{ background: item.status == 'ACCEPTED' ? 'green' : 'orange' }} />
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark ml-15">{item.status}</h4>
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
