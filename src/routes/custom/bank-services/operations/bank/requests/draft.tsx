import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TimeFromMoment from "Components/TimeFromMoment";
import Autocomplete from '@material-ui/lab/Autocomplete';
import BLOperationsModal from './components/BLOperations';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const List = (props) => {

    const [bl, setBl] = useState(null);
    const [action, setAction] = useState(null);
    const [operations, setOperations] = useState([]);
    const [checkerAll, setCheckAll] = useState('none');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedOperations, setSelectedOperations] = useState([]);

    useEffect(() => {
        getOperations();
    }, []);

    const getOperations = () => {
        props.setRequestGlobalAction(true),
        BankService.getBLs()
        .then(response => setOperations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onToggleOperation = (operationIds) => {
        let newOperations = [...selectedOperations];

        operationIds.forEach(opId => {
            if (newOperations.includes(opId)) {
                newOperations = newOperations.filter(u => u !== opId);
            } else newOperations.push(opId);
        });

        setSelectedOperations(newOperations);
    };

    const onCheckerAll = () => {
        if (checkerAll !== 'all') {
            setCheckAll('all');
            onToggleOperation([...operations.map(o => o.reference)]);
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
                itemsFoundText={n => `${n} BL trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun BL trouvés
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
                                            <th className="fw-bold">Reference</th>
                                            <th className="fw-bold">Numéro</th>
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
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={selectedOperations.includes(item.reference)}
                                                                        onChange={() => onToggleOperation([item.reference])}
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.reference}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.number}</h4>
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
                                                            setBl(item);
                                                            setShowDetailsModal(true);
                                                        }}
                                                    >
                                                        Details
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
            { showDetailsModal && bl && (
                <BLOperationsModal
                    show={showDetailsModal}
                    onClose={() => {
                        setBl(null);
                        setShowDetailsModal(false);
                    }}
                    bl={bl}
                    title={"Operations"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
