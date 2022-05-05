import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class CreateCreditModal extends Component {
  
    state = {
        amount: null
    }

    constructor(props) {
        super(props);
    }    

    onSubmit = () => {

        const { amount } = this.state;

        if(!amount) {
            NotificationManager.error("Le montant est obligatoire");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {amount, referralCode: this.props.referralCode};

        BankService.createCompensationCredit(data).then(() => {
            NotificationManager.success("L'e credit a été ajouté avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de l'ajout du crédit");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;

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
                <RctCardContent>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="amount">
                            Montant à créditer
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="amount"
                            name='amount'
                            value={this.state.amount}
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
                            Créer le crédit
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreateCreditModal)));