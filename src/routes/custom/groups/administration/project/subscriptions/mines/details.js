import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import {NDJANGUI_BUSINESS_NOMINAL_AMOUNT} from 'Helpers/datas';
import DialogComponent from "Components/dialog/DialogComponent";

const DetailsSubscription = (props) => {

    const {show, onClose, subscription} = props;
    
    const [supports, setSupports] = useState(null);

    useEffect(() => {
        getSupports();
    }, [])

    const getSupports = () => {
		props.setRequestGlobalAction(true);
		ProjectService.getProjectSubscriptionSupports(subscription.reference)
		.then(response => {
            setSupports(response);
        })
		.finally(() => props.setRequestGlobalAction(false))
	}
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="lg"
            title={(
                <h3 className="fw-bold">
                    Détails de souscription
                </h3>
            )}
        >
            <div className="table-responsive mb-20">
                <table className="table  table-striped table-bordered mb-0">
                    <tbody>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 fw-bold text-dark">Intitulé</h4>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <h4 className="m-0 text-dark">{subscription.label}</h4>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <CustomList
                list={supports}
                loading={false}
                itemsFoundText={n => `${n} supports trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun support trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Support</th>
                                            <th className="fw-bold">Valeur nominale</th>
                                            <th className="fw-bold">Souscription</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Ndjanguis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.financialStructureSupport.supportType.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.financialStructureSupport.nominalAmount, item.financialStructureSupport.currency)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.quantity}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{getPriceWithCurrency(item.quantity * item.financialStructureSupport.nominalAmount, item.financialStructureSupport.currency)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{Math.ceil((item.quantity * item.financialStructureSupport.nominalAmount)/NDJANGUI_BUSINESS_NOMINAL_AMOUNT)}</p>
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
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(DetailsSubscription));