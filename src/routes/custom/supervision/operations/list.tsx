import { Button } from "reactstrap";
import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import { getPriceWithCurrency } from 'Helpers/helpers';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

const List = (props) => {

    const [operations, setOperations] = useState([]);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState(null);

    useEffect(() => {
        getOperations();
    }, []);

    const getOperations = () => {
        props.setRequestGlobalAction(true),
        BankService.getAntidatedOperations()
        .then(response => setOperations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const validateOperation = () => {

        if(!selectedOperation) {
            return;
        }

        props.setRequestGlobalAction(true);
        BankService.validateAntidatedOperations(selectedOperation.reference).then(() => {
            getOperations();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            props.setRequestGlobalAction(false);
            setSelectedOperation(null);
            setShowConfirmBox(false)
        });
    }

    return (
        <>
            <PageTitleBar title={'Supervisions d\'opérations'} />
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
                                            <th className="fw-bold">Date de valeur</th>
                                            <th className="fw-bold">Date d'enregistrement</th>
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
                                                                <TimeFromMoment time={item.valueDate} showFullDate />
                                                            </h4>
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
                                                        className="text-white mr-2 ml-10"
                                                        onClick={() => {
                                                            setSelectedOperation(item);
                                                            setShowConfirmBox(true);
                                                        }}
                                                    >
                                                        valider
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
                    rightButtonOnClick={() => validateOperation()}
                    leftButtonOnClick={() => {
                        setShowConfirmBox(false);
                        setSelectedOperation(null);
                    }}
                    message={'Etes vous sure de vouloir valider l\'opération ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
