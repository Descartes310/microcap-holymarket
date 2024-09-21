import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class LiquidOperationModal extends Component {

    state = {
        liquidReference: '',
        liquidationDate: null
    };

    constructor(props) {
        super(props);
    }

    liquidOperation = () => {
        this.props.setRequestGlobalAction(true);

        BankService.liquidServiceOrder(this.props.operation, this.state.liquidReference)
        .then(() => {
            NotificationManager.success("La liquidation a réussie.");
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite lors de la liquidation.")
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.onClose();
        });
    }

    render() {
        const { onClose, show, title } = this.props;
        const { liquidReference, liquidationDate } = this.state;
        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="sm"
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
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="date">
                        Date de liquidation
                    </InputLabel>
                    <InputStrap
                        required
                        type="date"
                        id="date"
                        name='date'
                        value={liquidationDate}
                        className="input-lg"
                        onChange={(e) => this.setState({ liquidationDate: e.target.value })}
                    />
                </FormGroup>

                <div className="d-flex justify-content-end mt-3">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => this.liquidOperation()}
                        className="text-white font-weight-bold"
                        disabled={!liquidReference || !liquidationDate}
                    >
                        Liquider
                    </Button>
                </div>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(LiquidOperationModal)));