import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { joinUrlWithParamsId, MARKETPLACE } from 'Url/frontendUrl';
import PaymentConfigService from 'Services/paymentConfig';
import { getPaymentConfigNatures, getPaymentConfigTypes } from 'Helpers/datas';

const List = (props) => {

    const [paymentConfigs, setPaymentConfigs] = useState([]);

    useEffect(() => {
        getPaymentConfigs();
    }, []);

    const getPaymentConfigs = () => {
        props.setRequestGlobalAction(true);
        PaymentConfigService.get()
            .then((response) => setPaymentConfigs(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    return (
        <CustomList
            list={paymentConfigs}
            loading={false}
            itemsFoundText={n => `${n} configs trouvées`}
            onAddClick={() => props.history.push(MARKETPLACE.STORE.PAYMENT.CONFIGURATION.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucune configuration trouvée
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Désignation</th>
                                        <th className="fw-bold">Type</th>
                                        <th className="fw-bold">Nature</th>
                                        <th className="fw-bold">Date de début</th>
                                        <th className="fw-bold">Date de fin</th>
                                        {/* <th className="fw-bold">Actions</th> */}
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
                                                        <h4 className="m-0 fw-bold text-dark">{getPaymentConfigTypes().find(t => item.type)?.label}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{getPaymentConfigNatures().find(t => item.nature)?.label}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 text-dark"><TimeFromMoment time={item.startDate} showFullDate /></p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 text-dark"><TimeFromMoment time={item.endDate} showFullDate /></p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => props.history.push(joinUrlWithParamsId(MARKETPLACE.STORE.PAYMENT.CONFIGURATION.UPDATE, item.reference))}
                                                    className="text-white font-weight-bold mr-3"
                                                >
                                                    Editer
                                                </Button>
                                            </td> */}
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));