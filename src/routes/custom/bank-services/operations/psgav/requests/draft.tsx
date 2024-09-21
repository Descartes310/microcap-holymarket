import { Button } from "reactstrap";
import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import { getPriceWithCurrency } from "Helpers/helpers";
import { NotificationManager } from 'react-notifications';

const Draft = (props) => {

    const [operations, setOperations] = useState([]);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showCancelBox, setShowCancelBox] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState(null);

    useEffect(() => {
        getOperations();
    }, []);

    const getOperations = () => {
        props.setRequestGlobalAction(true),
        BankService.getOperationFog()
        .then(response => {
            setOperations(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const brouillardBL = () => {
        if(!selectedOperation) {
            return
        }
        props.setRequestGlobalAction(true),
        BankService.createBL(selectedOperation.reference, {status: false})
        .then(() => {
            NotificationManager.success("Le brouillard a été annulé.")
            getOperations();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite lors de l'annuler du brouillard.")
        })
        .finally(() => {
            setShowCancelBox(false);
            props.setRequestGlobalAction(false)
        });
    }

    const liquidation = () => {
        if(!selectedOperation) {
            return
        }
        props.setRequestGlobalAction(true),
        BankService.liquidBL(selectedOperation.reference)
        .then(() => {
            NotificationManager.success("La demande de liquidation a été envoyée.")
            getOperations();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite lors de la demande de liquidation.")
        })
        .finally(() => {
            setShowConfirmBox(false);
            props.setRequestGlobalAction(false)
        });
    }

    return (
        <>
            <CustomList
                loading={false}
                list={operations}
                itemsFoundText={n => `${n} opérations trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun opérations trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Client</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Raison</th>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.clientName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.amount, item.currency)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p>{item.reason}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                <TimeFromMoment time={item.emittedAt} showFullDate />
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="danger"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setSelectedOperation(item);
                                                            setShowCancelBox(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Annuler
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setSelectedOperation(item);
                                                            setShowConfirmBox(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Liquidation
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
            { showConfirmBox && selectedOperation && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => liquidation()}
                    leftButtonOnClick={() => {
                        setShowConfirmBox(false);
                        setSelectedOperation(null);
                    }}
                    message={'Etes vous sure de vouloir demander la liquidation ?'}
                />
            )}
            { showCancelBox && selectedOperation && (
                <ConfirmBox
                    show={showCancelBox}
                    rightButtonOnClick={() => brouillardBL()}
                    leftButtonOnClick={() => {
                        setShowCancelBox(false);
                        setSelectedOperation(null);
                    }}
                    message={'Etes vous sure de annuler le brouillard ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Draft));
