import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import FinanceService from 'Services/finances';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import { FormGroup, Input as InputStrap  } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class SettlementRequestModal extends Component {
  
    state = {
        settlement: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.findSettlement()
    }

    findSettlement = () => {
        this.props.setRequestGlobalAction(true);
        FinanceService.findSettlement(this.props.reference)
        .then(response => {
            this.setState({settlement: response});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = (status) => {

        this.props.setRequestGlobalAction(true);

        FinanceService.respondSettlement(this.props.reference, {status, notificationId: this.props.notification}).then(() => {
            NotificationManager.success("La demande a été traité avec succès");
            window.location.reload();
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors du traitement");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { settlement } = this.state;
        const { onClose, show, title } = this.props;

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
                <RctCardContent>
                    { settlement && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="label">
                                    Désignation
                                </InputLabel>
                                <InputStrap
                                    required
                                    id="label"
                                    type="text"
                                    disabled={true}
                                    className="input-lg"
                                    defaultValue={settlement?.title}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="amount">
                                    Montant
                                </InputLabel>
                                <InputStrap
                                    required
                                    id="amount"
                                    type="text"
                                    disabled={true}
                                    className="input-lg"
                                    defaultValue={settlement?.amount + " " + settlement?.currency}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="endDate">
                                    Delai de paiement
                                </InputLabel>
                                <InputStrap
                                    required
                                    id="endDate"
                                    type="text"
                                    disabled={true}
                                    className="input-lg"
                                    defaultValue={settlement?.endDate}
                                />
                            </FormGroup>
                        </div>
                    )}
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit(false)}
                            className="text-white btn-danger font-weight-bold"
                        >
                            Refuser la demande
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit(true)}
                            className="text-white font-weight-bold ml-15"
                        >
                            Accepter la demande
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(SettlementRequestModal)));