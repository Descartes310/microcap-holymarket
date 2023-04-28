import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import TimeFromMoment from "Components/TimeFromMoment";
import DialogComponent from "Components/dialog/DialogComponent";
import LiquidOperationModal from '../components/liquidOperationModal';

class BLLiquidOperations extends Component {

    state = {
        action: null,
        operations: [],
        checkerAll: 'none',
        showLiquidModal: false,
        selectedOperations: [],
        selectedOperation: null
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
  
    render() {

        const { onClose, show, title } = this.props;
        const { operations, selectedOperation, showLiquidModal } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
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
                                                <th className="fw-bold">Ref. liquid.</th>
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
                                                                <h4 className="m-0 fw-bold text-dark">{item?.liquidationReference}</h4>
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
                                                        { !item?.liquidationReference && (
                                                            <Button
                                                                color="primary"
                                                                className="text-white mr-2 ml-10"
                                                                onClick={() => {
                                                                    this.setState({ selectedOperation: item, showLiquidModal: true });
                                                                }}
                                                            >
                                                                Liquider
                                                            </Button>
                                                        )}
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
                { (selectedOperation && showLiquidModal) && (
                    <LiquidOperationModal
                        title={"Liquidation"}
                        show={showLiquidModal}
                        operation={selectedOperation}
                        onClose={() => {
                            this.setState({ showLiquidModal: false, selectedOperation: null });
                        }}
                    />  
                )}
            </DialogComponent>
        );
    }
}


export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(BLLiquidOperations)));