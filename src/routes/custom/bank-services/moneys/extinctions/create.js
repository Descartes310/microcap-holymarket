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

class CreateExtinctionModal extends Component {
  
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

        let data = {amount};

        BankService.createExtinction(data).then(() => {
            NotificationManager.success("L'extinction a été ajoutée avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de l'ajout de l'extinction");
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
                            Montant à éteindre
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
                            Créer l'extinction
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreateExtinctionModal)));