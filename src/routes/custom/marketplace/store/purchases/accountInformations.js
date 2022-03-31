import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class AccountInformationModal extends Component {
  
    state = {
        key: '',
        iban: '',
        bankCode: '',
        agencyCode: '',
        accountNumber: '',
        useDomiciliationDatas: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    
    }

    onSubmit = () => {
        const { iban, useDomiciliationDatas, bankCode, 
            agencyCode, accountNumber, key } = this.state;

        if(!useDomiciliationDatas) {
            if(!iban) {
                NotificationManager.error("Veuille renseigner la valeur de l'IBAN");
                return;
            }
        } else {
            if(!bankCode || !agencyCode || !accountNumber || !key) {
                NotificationManager.error('Toutes les informations du formulaire sont requises');
                return;
            }
        }

        let data = {
            iban, useDomiciliationDatas, bankCode, 
            agencyCode, accountNumber, key, status: true
        };

        this.props.setRequestGlobalAction(true);
        OrderService.approvedOrder(this.props.order.id, data)
        .then(() => getPurchases())
        .finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.onClose();
        });
    }

    render() {

        const { onClose, show, title, order } = this.props;
        const { iban, useDomiciliationDatas, bankCode, 
            agencyCode, accountNumber, key } = this.state;

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
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={useDomiciliationDatas}
                                onChange={() => this.setState({useDomiciliationDatas : !this.state.useDomiciliationDatas})}
                            />
                        } label={'Utiliser les informations de domiciliation'}
                        />
                    </FormGroup>

                    { !useDomiciliationDatas ? 
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="iban">
                                IBAN
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="iban"
                                name='iban'
                                value={iban}
                                className="input-lg"
                                onChange={(e) => this.setState({ iban: e.target.value })}
                            />
                        </FormGroup>
                        :
                        <>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="bankCode">
                                    Code banque
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="bankCode"
                                    name='bankCode'
                                    value={bankCode}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ bankCode: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="agencyCode">
                                    Code guichet
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="agencyCode"
                                    name='agencyCode'
                                    value={agencyCode}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ agencyCode: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="accountNumber">
                                    Numéro de compte
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="accountNumber"
                                    name='accountNumber'
                                    value={accountNumber}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ accountNumber: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="key">
                                    Clé
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="key"
                                    name='key'
                                    value={key}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ key: e.target.value })}
                                />
                            </FormGroup>
                        </>
                    }
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Valider la commande
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(AccountInformationModal)));