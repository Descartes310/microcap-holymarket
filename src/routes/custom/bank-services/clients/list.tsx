import { Button } from "reactstrap";
import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { BANK, joinUrlWithParamsId } from "Url/frontendUrl";

const List = (props) => {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        getClients();
    }, []);

    const getClients = () => {
        props.setRequestGlobalAction(true),
        BankService.getSubscriptions()
        .then(response => setClients(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCheckBooks = (reference: any) => {
        props.history.push(joinUrlWithParamsId(BANK.CLIENT.CHECKBOOK.LIST, reference.split('_').pop()));
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des clients"}
            />
            <CustomList
                list={clients}
                loading={false}
                itemsFoundText={n => `${n} clients trouvés`}
                // onAddClick={() => props.history.push(BROKER.COUNTER.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun clients trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Noms</th>
                                            <th className="fw-bold">Email</th>
                                            <th className="fw-bold">IBAN</th>
                                            <th className="fw-bold">Compte MicroCap</th>
                                            <th className="fw-bold">Chequier</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.client.internalClient.userName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 fw-bold text-dark">{item.client.internalClient.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 fw-bold text-dark">{item.iban}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 fw-bold text-dark">{item.client.externalClientReference}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => goToCheckBooks(item.client.reference)}
                                                        className={"text-white font-weight-bold mr-3"}
                                                    >
                                                        Chequier
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
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));