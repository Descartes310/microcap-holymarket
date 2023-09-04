import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import TimeFromMoment from "Components/TimeFromMoment";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import ValidateOperationModal from '../components/validateOperationModal';

const List = (props) => {

    const [operations, setOperations] = useState([]);
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [showValidateOperationModal, setShowValidateOperationModal] = useState(false);

    useEffect(() => {
        getOperations();
    }, []);

    const getOperations = () => {
        props.setRequestGlobalAction(true),
        BankService.getPendingOperations()
        .then(response => setOperations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar title={'Opérations en attentes'} />
            <CustomList
                list={operations}
                loading={false}
                itemsFoundText={n => `${n} opérations trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune opération trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Direction</th>
                                            <th className="fw-bold">Client</th>
                                            <th className="fw-bold">Compte</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.direction === 'CASH_OUT' ? 'Retrait' : item.direction === 'CASH_IN' ? 'Dépôt' : '-'}</h4>
                                                        </div>
                                                    </div>
                                                </td>
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
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setSelectedOperation(item);
                                                            setShowValidateOperationModal(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Valider
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
            { showValidateOperationModal && selectedOperation && (
                <ValidateOperationModal
                    show={showValidateOperationModal}
                    title={"Valider l'opération"}
                    onClose={() => {
                        setShowValidateOperationModal(false);
                        getOperations();
                    }}
                    operation={selectedOperation}
                />  
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
