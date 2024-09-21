import { connect } from "react-redux";
import { FormGroup } from 'reactstrap';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class ValidateOperationModal extends Component {

    state = {
        checked: false
    };

    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        this.props.setRequestGlobalAction(true);
        for (let index = 0; index < this.props.operations.length; index++) {
            const operation = this.props.operations[index];
            console.log(operation);
            BankService.validatePendingOperation(operation.reference).then(() => {
                NotificationManager.success("L'opération a été validée");
            }).catch(err => {
                NotificationManager.error("Une erreur est survenue");
            });
        }
        this.props.setRequestGlobalAction(false);
        this.props.onClose();
    }

    render() {
        const { onClose, show, title, validateOperation } = this.props;
        const { checked } = this.state;
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
                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={checked}
                            onChange={(e) => this.setState({checked: e.target.checked})}
                        />
                    } label={'Executer ces opérations'}
                    />
                </FormGroup>

                
                <div className="d-flex justify-content-end mt-3">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => this.onSubmit()}
                        className="text-white font-weight-bold"
                    >
                        Valider
                    </Button>
                </div>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(ValidateOperationModal)));