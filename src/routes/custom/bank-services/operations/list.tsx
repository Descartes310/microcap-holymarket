import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import PurgeOperationModal from './components/purgeOperationModal';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const List = (props) => {

    const [operations, setOperations] = useState([]);
    const [checkerAll, setCheckAll] = useState('none');
    const [showPurgeModal, setShowPurgeModal] = useState(false);
    const [selectedOperations, setSelectedOperations] = useState([]);

    useEffect(() => {
        getOperations();
    }, []);

    const getOperations = () => {
        props.setRequestGlobalAction(true),
        BankService.getOperations()
        .then(response => setOperations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onToggleUser = (operationIds) => {
        let newOperations = [...selectedOperations];
        operationIds.forEach(userId => {
            if (newOperations.includes(userId)) {
                newOperations = newOperations.filter(u => u !== userId);
            } else newOperations.push(userId);
        });
        setSelectedOperations(newOperations);
    };

    const onCheckerAll = () => {
        if (checkerAll !== 'all') {
            setCheckAll('all');
            onToggleUser([...operations.map(o => o.id)]);
        } else {
            setCheckAll('none');
            setSelectedOperations([]);
        }
    };

    const purgeOperations = () => {

        if(selectedOperations.length <= 0) {
            return;
        }

        let data = {
            operationIds: selectedOperations
        }

        props.setRequestGlobalAction(true);
        BankService.purgeOperations(data).then(() => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <>
            <PageTitleBar title={'Mes opérations'} />
            <CustomList
                loading={false}
                list={operations}
                addText="Purger la selection"
                onAddClick={() => setShowPurgeModal(true)}
                addingButton={selectedOperations.length <= 0}
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
                                            <th className="w-5">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            indeterminate={selectedOperations.length > 0 && selectedOperations.length < operations.length}
                                                            checked={selectedOperations.length > 0}
                                                            onChange={(e) => onCheckerAll()}
                                                            value="all"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Tous"
                                                />
                                            </th>
                                            <th className="fw-bold">Ref</th>
                                            <th className="fw-bold">Client</th>
                                            <th className="fw-bold">Guichet</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={selectedOperations.includes(item.id)}
                                                                        onChange={() => onToggleUser([item.id])}
                                                                        color="primary"
                                                                    />
                                                                }
                                                                label=""
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.reference.split('_')[2].toUpperCase()}</h4>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.counterName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.amount + ' euro.s'}</h4>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            />
            { showPurgeModal && selectedOperations.length > 0 && (
                <PurgeOperationModal
                    show={showPurgeModal}
                    title={"Purger les opérations"}
                    onClose={() => {
                        setShowPurgeModal(false);
                    }}
                    purgeOperations={purgeOperations}
                    operations={operations.filter(o => selectedOperations.includes(o.id))}
                />  
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
