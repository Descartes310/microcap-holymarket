import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TimeFromMoment from "Components/TimeFromMoment";
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class LiquidOperationModal extends Component {

    state = {
        liquidReference: ''
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { onClose, show, title, operation, liquidOperation } = this.props;
        const { liquidReference } = this.state;
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
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="reference">
                        Reference de liquidation
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="reference"
                        name='reference'
                        value={liquidReference}
                        className="input-lg"
                        onChange={(e) => this.setState({ liquidReference: e.target.value })}
                    />
                </FormGroup>

                <div className="table-responsive">
                    <table className="table table-hover table-middle mb-0">
                        <thead>
                            <tr>
                                <th className="fw-bold">Détails</th>
                                <th className="fw-bold">Valeur</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">Reference de liquidation</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">{liquidReference}</h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">Reference</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">{operation.reference.split('_')[2].toUpperCase()}</h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">Client</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">{operation.clientName}</h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">Agence</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">{operation.counterName}</h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">Montant</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">{operation.amount + ' EUR'}</h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">Date de l'opération</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={operation.emittedAt} showFullDate /></h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => liquidOperation(liquidReference)}
                        disabled={!liquidReference}
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