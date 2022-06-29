import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from 'react-notifications';
import LiquidOperationModal from '../../components/liquidOperationModal';

const List = (props) => {

    const [operations, setOperations] = useState([]);
    const [showLiquidModal, setShowLiquidModal] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState(null);

    useEffect(() => {
        getOperations();
    }, []);

    const getOperations = () => {
        props.setRequestGlobalAction(true),
        BankService.getOperations()
        .then(response => {
            let datas = response.filter(o => !o.liquidationReference);
            setOperations(datas);
            if(showLiquidModal && datas.length > 0) {
                setSelectedOperation(datas[0]);
            } else {
                setSelectedOperation(null);
                setShowLiquidModal(false);
            }
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const liquidOperation = (reference) => {
        props.setRequestGlobalAction(true),
        BankService.liquidOperation(selectedOperation.id, reference)
        .then(() => getOperations())
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite lors de la liquidation.")
        })
        .finally(() => props.setRequestGlobalAction(false))
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
                                            <th className="fw-bold">Compte</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Raison</th>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Liquider</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.clientAccountCode}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.amount + ' EUR'}</h4>
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
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setSelectedOperation(item);
                                                            setShowLiquidModal(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Liquider
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
            { showLiquidModal && selectedOperation != null && (
                <LiquidOperationModal
                    show={showLiquidModal}
                    title={"Liquider l'opération"}
                    onClose={() => {
                        setShowLiquidModal(false);
                    }}
                    operation={selectedOperation}
                    liquidOperation={(ref) => liquidOperation(ref)}
                />  
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
