import { connect } from "react-redux";
import { BANK } from "Url/frontendUrl";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { getPriceWithCurrency } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import { tileLayer } from "leaflet";

class validateOperationModal extends Component {

    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        this.props.setRequestGlobalAction(true);
        BankService.validatePendingOperation(this.props.operation.reference).then(() => {
            NotificationManager.success("L'opération a été validée");
            this.props.history.push(BANK.OPERATION.CASHDESK.LIST);
            this.props.onClose();
        }).catch(err => {
            NotificationManager.error("Une erreur est survenue");
            this.props.history.push(BANK.OPERATION.CASHDESK.LIST);
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        });
    }

    render() {
        const { onClose, show, title, operation } = this.props;
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
                <div>
                    <p>Etes vous sure de vouloir confirmer ce {operation.direction == 'CASH_IN' ? 'dépôt' : 'retrait'} de {getPriceWithCurrency(operation.amount, operation.currency)} ?</p>
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onClose()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Annuler
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Continuer
                        </Button>
                    </div>
                </div>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(validateOperationModal)));