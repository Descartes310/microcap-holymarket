import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import TimeFromMoment from "Components/TimeFromMoment";
import DialogComponent from "Components/dialog/DialogComponent";

class LiquidOperationModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { onClose, show, title, operations, purgeOperations } = this.props;
        console.log(operations);
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
                <div className="d-flex justify-content-end mt-3">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => purgeOperations()}
                        //disabled={!member}
                        className="text-white font-weight-bold"
                    >
                        Liquider
                    </Button>
                </div>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(LiquidOperationModal)));