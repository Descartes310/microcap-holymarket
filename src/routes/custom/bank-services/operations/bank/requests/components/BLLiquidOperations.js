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
import LiquidOperationModal from '../components/liquidOperationModal';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const ACTIONS = [
];

class BLLiquidOperations extends Component {

    state = {
        action: null,
        operations: [],
        checkerAll: 'none',
        showLiquidModal: false,
        selectedOperations: [],
    }
  
    constructor(props) {
        super(props);
        this.getOperations();
    }

    getOperations = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getBLOP(this.props?.bl?.reference)
        .then(response => {
            this.setState({ operations: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    liquidOperation = (reference) => {
        this.props.setRequestGlobalAction(true),
        BankService.liquidBL(this.props?.bl?.reference, reference)
        .then(response => {
            this.props.onClose();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
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
  
    render() {

        const { onClose, show, title } = this.props;
        const { operations, selectedOperations, action, showLiquidModal } = this.state;

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
                    addText="Liquidation"
                    onAddClick={() => this.setState({ showLiquidModal: true })}
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
                { showLiquidModal && (
                    <LiquidOperationModal
                        show={showLiquidModal}
                        title={"Liquidation"}
                        onClose={() => {
                            this.setState({ showLiquidModal: false });
                        }}
                        liquidOperation={(ref) => this.liquidOperation()}
                    />  
                )}
            </DialogComponent>
        );
    }
}


export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(BLLiquidOperations)));