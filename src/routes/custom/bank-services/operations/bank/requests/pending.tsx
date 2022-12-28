import { Button } from "reactstrap";
import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import Brouillard from './components/brouillard';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TimeFromMoment from "Components/TimeFromMoment";
import Autocomplete from '@material-ui/lab/Autocomplete';
import EditOperation from './components/updateOperation';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import LiquidOperationModal from './components/liquidOperationModal';
import ArchiveOperationModal from './components/archiveOperationModal';
import ExecuteOperationModal from './components/executeOperationModal';
import ValidateOperationModal from './components/validateOperationModal';
import LiquidOPMCMOperationModal from './components/liquidOPMCMOperationModal';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const ACTIONS = [
    {
        label: "Confirmation",
        value: 'CONFIRM',
        canHandleMany: false
    },{
        label: "Executer",
        value: 'TREAT',
        canHandleMany: false
    },
    // {
    //     label: "Retirer",
    //     value: 'REMOVE',
    //     canHandleMany: false
    // },
    // {
    //     label: "Imprimer",
    //     value: 'PRINT',
    //     canHandleMany: false
    // },
    // {
    //     label: "Editer",
    //     value: 'EDIT',
    //     canHandleMany: false
    // },
    // {
    //     label: "Mise en liquidation",
    //     value: 'LIQUID',
    //     canHandleMany: false
    // },
    {
        label: "Archiver",
        value: 'ARCHIVE',
        canHandleMany: false
    },{
        label: "Validation",
        value: 'VALIDATE',
        canHandleMany: false
    },
    {
        label: "Brouillard de bordereaux",
        value: 'FOG',
        canHandleMany: true
    },
];

const List = (props) => {

    const [action, setAction] = useState(null);
    const [operations, setOperations] = useState([]);
    const [checkerAll, setCheckAll] = useState('none');
    const [showLiquidModal, setShowLiquidModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [showExecuteModal, setShowExecuteModal] = useState(false);
    const [showValidateModal, setShowValidateModal] = useState(false);
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [selectedOperations, setSelectedOperations] = useState([]);
    const [showBrouillardModal, setShowBrouillardModal] = useState(false);
    const [showLiquidOPMCMModal, setShowLiquidOPMCMModal] = useState(false);
    const [showUpdateOperationModal, setShowUpdateOperationModal] = useState(false);

    useEffect(() => {
        getOperations();
    }, []);

    const getOperations = () => {
        props.setRequestGlobalAction(true),
        BankService.getAvailableOP()
        .then(response => {
            let datas = response//.filter(o => !o.liquidationReference);
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
        BankService.liquidServiceOrder(operations.find(op => op.id === selectedOperations[0]).reference, reference)
        .then(() => {
            NotificationManager.success("La liquidation a réussie.")
            getOperations();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite lors de la liquidation.")
        })
        .finally(() => {
            setShowLiquidModal(false);
            props.setRequestGlobalAction(false)
        });
    }

    const liquidOPMCMOperation = (reference) => {
        props.setRequestGlobalAction(true),
        BankService.liquidOPMCMServiceOrder(operations.find(op => op.id === selectedOperations[0]).reference, reference)
        .then(() => {
            NotificationManager.success("La confirmation a réussie.")
            getOperations();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite lors de la confirmation.")
        })
        .finally(() => {
            setShowLiquidOPMCMModal(false);
            props.setRequestGlobalAction(false)
        });
    }

    const archiveOperation = (reference) => {
        props.setRequestGlobalAction(true),
        BankService.archiveServiceOrder(operations.find(op => op.id === selectedOperations[0]).reference, reference)
        .then(() => {
            NotificationManager.success("L'archivage a réussie.")
            getOperations();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite lors de l'archivage.")
        })
        .finally(() => {
            setShowArchiveModal(false);
            props.setRequestGlobalAction(false)
        });
    }

    const brouillardBL = () => {
        props.setRequestGlobalAction(true),
        BankService.createBL({op_references: operations.filter(op => selectedOperations.includes(op.id)).map(op => op.reference)})
        .then(() => {
            NotificationManager.success("La création du brouillard a réussie.")
            getOperations();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite lors de la création du brouillard.")
        })
        .finally(() => {
            setShowArchiveModal(false);
            props.setRequestGlobalAction(false)
        });
    }

    const executeOperation = () => {
        NotificationManager.success("L'execution a réussie.");
        setShowExecuteModal(false);
        getOperations();
    }

    const validateOperation = () => {
        NotificationManager.success("La validation a réussie.");
        setShowValidateModal(false);
        getOperations();
    }

    const onToggleOperation = (operationIds) => {
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
            onToggleOperation([...operations.map(o => o.id)]);
        } else {
            setCheckAll('none');
            setSelectedOperations([]);
        }
    };

    return (
        <>
            <CustomList
                loading={false}
                list={operations}
                itemsFoundText={n => `${n} opérations trouvées`}
                rightComponent={() => (
                    <div className="col-md-12 col-sm-12 d-flex has-wrapper">
                        <Autocomplete
                            value={action}
                            options={ACTIONS}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setAction(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            style={{ width: 250 }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                        <Button
                            color="primary"
                            className="text-white mr-2 ml-10"
                            onClick={() => {
                                if(action?.value == 'EDIT') {
                                    setShowUpdateOperationModal(true);
                                }
                                if(action?.value == 'FOG') {
                                    brouillardBL();
                                }
                                if(action?.value == 'LIQUID') {
                                    setShowLiquidModal(true);
                                }
                                if(action?.value == 'ARCHIVE') {
                                    setShowArchiveModal(true);
                                }
                                if(action?.value == 'VALIDATE') {
                                    setShowValidateModal(true);
                                }
                                if(action?.value == 'TREAT') {
                                    setShowExecuteModal(true);
                                }
                                if(action?.value == 'CONFIRM') {
                                    setShowLiquidOPMCMModal(true);
                                }
                            }}
                            disabled={action == null || ((!action?.canHandleMany && selectedOperations.length > 1) || selectedOperations.length <= 0)}
                        >
                            Confirmer
                        </Button>
                    </div>
                )}
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
                                            <th className="fw-bold">Client</th>
                                            <th className="fw-bold">Compte</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Raison</th>
                                            <th className="fw-bold">Date</th>
                                            {/* <th className="fw-bold">Liquider</th> */}
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
                                                                        onChange={() => onToggleOperation([item.id])}
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
                                                {/* <td>
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
            { showLiquidModal && selectedOperations.length > 0 && (
                <LiquidOperationModal
                    show={showLiquidModal}
                    title={"Liquider l'ordre de service"}
                    onClose={() => {
                        setShowLiquidModal(false);
                    }}
                    operation={selectedOperations[0]}
                    liquidOperation={(ref) => liquidOperation(ref)}
                />  
            )}
            { showLiquidOPMCMModal && selectedOperations.length > 0 && (
                <LiquidOPMCMOperationModal
                    show={showLiquidOPMCMModal}
                    title={"Confirmer l'ordre de service"}
                    onClose={() => {
                        setShowLiquidOPMCMModal(false);
                    }}
                    operation={selectedOperations[0]}
                    liquidOperation={(ref) => liquidOPMCMOperation(ref)}
                />  
            )}

            { showArchiveModal && selectedOperations.length > 0 && (
                <ArchiveOperationModal
                    show={showArchiveModal}
                    title={"Archiver l'order de service"}
                    onClose={() => {
                        setShowArchiveModal(false);
                    }}
                    operation={selectedOperations[0]}
                    archiveOperation={(ref) => archiveOperation(ref)}
                />  
            )}

            { showExecuteModal && selectedOperations.length > 0 && (
                <ExecuteOperationModal
                    show={showExecuteModal}
                    title={"Executer l'ordre de service"}
                    onClose={() => {
                        setShowExecuteModal(false);
                    }}
                    operation={selectedOperations[0]}
                    executeOperation={() => executeOperation()}
                />  
            )}

            { showValidateModal && selectedOperations.length > 0 && (
                <ValidateOperationModal
                    show={showValidateModal}
                    title={"Valider l'ordre de service"}
                    onClose={() => {
                        setShowValidateModal(false);
                    }}
                    operation={selectedOperations[0]}
                    validateOperation={() => validateOperation()}
                />  
            )}

            { showUpdateOperationModal && action?.value == 'EDIT'  && (
                <EditOperation
                    show={showUpdateOperationModal}
                    onClose={() => {
                        setShowUpdateOperationModal(false);
                        setAction(null);
                    }}
                    title={"Editer une opération"}
                />
            )}

            { showBrouillardModal && action?.value == 'FOG'  && (
                <Brouillard
                    show={showBrouillardModal}
                    onClose={() => {
                        setShowBrouillardModal(false);
                        setAction(null);
                    }}
                    title={"Brouillard"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
