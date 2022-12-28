import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import TimeFromMoment from "Components/TimeFromMoment";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const ACTIONS = [
    {
        label: "Retirer",
        value: 'REMOVE',
        canHandleMany: true
    }
];

class BLOperations extends Component {

    state = {
        action: null,
        operations: [],
        checkerAll: 'none',
        checkerAAll: 'none',
        selectedOperations: [],
        availableOperations: [],
        selectedAvailableOperations: [],
    }
  
    constructor(props) {
        super(props);
        this.getOperations();
        this.getAvailableOperations();
    }

    getOperations = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getBLOP(this.props?.bl?.reference)
        .then(response => {
            this.setState({ operations: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getAvailableOperations = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getAvailableOP()
        .then(response => {
            this.setState({ availableOperations: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    removeOperations = () => {
        this.props.setRequestGlobalAction(true),
        BankService.changeBLOperations(this.props?.bl?.reference, {op_references: this.state.operations.filter(op => this.state.selectedOperations.includes(op.id)).map(op => op.reference)})
        .then(response => {
            this.getOperations();
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    addOperations = () => {
        this.props.setRequestGlobalAction(true),
        BankService.changeBLOperations(this.props?.bl?.reference, {op_references: this.state.availableOperations.filter(op => this.state.selectedAvailableOperations.includes(op.id)).map(op => op.reference)})
        .then(response => {
            this.getOperations();
            this.getAvailableOperations();
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    validateBL = () => {
        this.props.setRequestGlobalAction(true),
        BankService.validateBL(this.props?.bl?.reference)
        .then(() => {
            this.props.onClose();
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onToggleOperation = (operationIds) => {
        const { selectedOperations } = this.state;
        let newOperations = [...selectedOperations];
        operationIds.forEach(userId => {
            if (newOperations.includes(userId)) {
                newOperations = newOperations.filter(u => u !== userId);
            } else newOperations.push(userId);
        });
        this.setState({ selectedOperations: newOperations });
    };

    onCheckerAll = () => {
        const { operations } = this.state;
        if (this.state.checkerAll !== 'all') {
            this.setState({ checkerAll: 'all' });
            this.onToggleOperation([...operations.map(o => o.id)]);
        } else {
            this.setState({ selectedOperations: [], checkerAll: 'none' });
        }
    };

    onToggleAOperation = (operationIds) => {
        const { selectedAvailableOperations } = this.state;
        let newOperations = [...selectedAvailableOperations];
        operationIds.forEach(userId => {
            if (newOperations.includes(userId)) {
                newOperations = newOperations.filter(u => u !== userId);
            } else newOperations.push(userId);
        });
        this.setState({ selectedAvailableOperations: newOperations });
    };

    onCheckerAAll = () => {
        const { availableOperations } = this.state;
        if (this.state.checkerAAll !== 'all') {
            this.setState({ checkerAAll: 'all' });
            this.onToggleAOperation([...availableOperations.map(o => o.id)]);
        } else {
            this.setState({ selectedAvailableOperations: [], checkerAAll: 'none' });
        }
    };
  
    render() {

        const { onClose, show, title } = this.props;
        const { operations, selectedOperations, action, availableOperations, selectedAvailableOperations } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <CustomList
                    loading={false}
                    list={operations}
                    addText="Valider"
                    onAddClick={() => this.validateBL()}
                    itemsFoundText={n => `${n} opérations trouvées`}
                    rightComponent={() => (
                        <div className="col-md-12 col-sm-12 d-flex has-wrapper">
                            <Autocomplete
                                value={action}
                                options={ACTIONS}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    this.setState({ action: item });
                                }}
                                getOptionLabel={(option) => option.label}
                                style={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                            <Button
                                color="primary"
                                className="text-white mr-2 ml-10"
                                onClick={() => {
                                    if(action?.value == 'REMOVE') {
                                        this.removeOperations();
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
                                                                onChange={(e) => this.onCheckerAll()}
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
                                                                            onChange={() => this.onToggleOperation([item.id])}
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
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />
                <h2>Opérations disponibles</h2>
                <CustomList
                    loading={false}
                    list={availableOperations}
                    addText="Ajouter au brouillard"
                    onAddClick={() => this.addOperations()}
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
                                                                indeterminate={selectedAvailableOperations.length > 0 && selectedAvailableOperations.length < availableOperations.length}
                                                                checked={selectedAvailableOperations.length > 0}
                                                                onChange={(e) => this.onCheckerAAll()}
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
                                                                            checked={selectedAvailableOperations.includes(item.id)}
                                                                            onChange={() => this.onToggleAOperation([item.id])}
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
        );
    }
}


export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(BLOperations)));