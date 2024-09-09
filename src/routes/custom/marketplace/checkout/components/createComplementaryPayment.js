import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class CreateComplementaryPaymentModal extends Component {
  
    state = {
        label: null,
        amount: null,
    }

    constructor(props) {
        super(props);
    }

    onSubmit = () => {

        const { amount, label } = this.state;

        if(!amount || !label) {
            NotificationManager.error("La désignation et le montant sont obligatoires");
            return;
        }

        let data = {label, amount, deletable: true};
        this.props.onSubmit(data);
    }

    render() {

        const { onClose, show } = this.props;
        const { amount, label } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Nouveau versement complémentaire
                    </h3>
                )}
            >
                <RctCardContent>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Désignation
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            name="label"
                            value={label}
                            className="input-lg"
                            type={"text"}
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="amount">
                            Montant
                        </InputLabel>
                        <InputStrap
                            required
                            id="amount"
                            name='amount'
                            type="number"
                            value={amount}
                            className="input-lg"
                            onChange={(e) => this.setState({ amount: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(CreateComplementaryPaymentModal)));