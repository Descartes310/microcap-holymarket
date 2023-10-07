import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class AccountInformationModal extends Component {
  
    state = {
        bic: null,
        iban: null,
        agencies: [],
        agency: null,
        name: null,
        telephone: null,
        email: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getBankAgencies();
    }

    getBankAgencies () {
        this.props.setRequestGlobalAction(true);
        UserService.getInstitutions({type: 'BANK_AGENCY'})
        .then(response => this.setState({ agencies: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {
        const { iban, agency, bic, name, email, telephone } = this.state;

        if(!iban || !bic || !agency || !name || !telephone) {
            NotificationManager.error('Toutes les informations du formulaire sont requises');
            return;
        }

        let data = {
            iban, bic, agency_code: agency.code, 
            name, telephone, email, status: true,
            use_domiciliation_datas: true, agency_name: agency.label
        };

        console.log(data);

        this.props.setRequestGlobalAction(true);
        OrderService.approvedOrder(this.props.order.id, data)
        .then(() => {
            NotificationManager.success('Opération déroulée avec succès');
            window.location.reload();
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.onClose();
        });
    }

    render() {

        const { onClose, show, title, authUser } = this.props;
        const { iban, agency, agencies, bic, name, email, telephone } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h1 className="fw-bold">
                        {title}
                    </h1>
                )}
            >
                <RctCardContent>
                    {/* <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={useDomiciliationDatas}
                                onChange={() => this.setState({useDomiciliationDatas : !this.state.useDomiciliationDatas})}
                            />
                        } label={'Utiliser les informations de domiciliation'}
                        />
                    </FormGroup> */}
                    <h2>Réference</h2>
                    <FormGroup className="has-wrapper mt-20">
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="bic">
                            BIC
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="bic"
                            name='bic'
                            value={bic}
                            className="input-lg"
                            onChange={(e) => this.setState({ bic: e.target.value })}
                        />
                    </FormGroup>

                    <h2>Domiciliation</h2>
                    <FormGroup className="has-wrapper mt-20">
                        <InputLabel className="text-left" htmlFor="bank">
                            Etablissement
                        </InputLabel>
                        <InputStrap
                            id="bank"
                            type="text"
                            name='bank'
                            value={authUser.userName}
                            disabled={true}
                            className="input-lg"
                        />
                    </FormGroup>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Agence
                        </InputLabel>
                        <Autocomplete
                            value={agency}
                            options={agencies}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ agency: item });
                            }}
                            getOptionLabel={(option) => option.code+" ("+option.label+")"}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    <h2>Conseiller</h2>
                    <FormGroup className="has-wrapper mt-20">
                        <InputLabel className="text-left" htmlFor="name">
                            Noms
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="name"
                            name='name'
                            value={name}
                            className="input-lg"
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="telephone">
                            Téléphone
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="telephone"
                            name='telephone'
                            value={telephone}
                            className="input-lg"
                            onChange={(e) => this.setState({ telephone: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="email">
                            Adresse email
                        </InputLabel>
                        <InputStrap
                            type="text"
                            id="email"
                            name='email'
                            value={email}
                            className="input-lg"
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </FormGroup>
                    {/* <FormGroup className="has-wrapper">
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
                    </FormGroup> */}
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