import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UnitService from 'Services/units';
import UserService from 'Services/users';
import FundingService from 'Services/funding';
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
        balance: null,
        iban: null,
        agencies: [],
        agency: null,
        name: null,
        telephone: null,
        email: null,
        key: null,
        number: null,
        referralCode: null,
        member: null,
        members: [],
        units: [],
        currency: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getBankAgencies();
        this.getUnits();
    }

    getUnits = () => {
        this.props.setRequestGlobalAction(false);
        UnitService.getUnits()
        .then((response) => this.setState({ units: response }))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    getMembers(id) {
        this.props.setRequestGlobalAction(true),
        UserService.getInstitutionMembers(id, {type: 'ADVISOR'})
        .then(response => this.setState({ members: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getBankAgencies () {
        this.props.setRequestGlobalAction(true);
        UserService.getInstitutions({type: 'BANK_AGENCY'})
        .then(response => this.setState({ agencies: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {
        const { iban, agency, bic, referralCode, key, number, member, balance, currency } = this.state;

        if(!iban || !bic || !agency || !referralCode || !member || !key || !number || !currency) {
            NotificationManager.error('Toutes les informations du formulaire sont requises');
            return;
        }

        let data = {
            iban, bic, agency_code: agency.code, currency: currency.code,
            referralCode, status: true, account_number: number, key,
            use_domiciliation_datas: true, agency_name: agency.label
        };

        if(!balance) {
            data.balance = 0;
        } else {
            data.balance = balance;
        }

        this.props.setRequestGlobalAction(true);
        FundingService.activateAccount(this.props.order.externalReference, data)
        .then(() => {
            NotificationManager.success('Opération déroulée avec succès');
            window.location.reload();
        })
        .catch(err => {
            if(err?.response?.status == 409) {
                NotificationManager.error('Ce numéro de compte existe déjà');
            } else if(err?.response?.status == 404) {
                NotificationManager.error('Ce compte n\'est pas prêt pour activation');
            } else {
                NotificationManager.error('Le formulaire n\'est pas bien renseigné');
            }
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.onClose();
        });
    }

    render() {

        const { onClose, show, title, authUser } = this.props;
        const { iban, agency, agencies, bic, key, number, member, members, currency, units, balance } = this.state;

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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="number">
                            Numéro de compte
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="number"
                            name='number'
                            value={number}
                            className="input-lg"
                            onChange={(e) => this.setState({ number: e.target.value })}
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

                    <h2>Domiciliation</h2>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="balance">
                            Solde initial
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="balance"
                            name='balance'
                            value={balance}
                            className="input-lg"
                            onChange={(e) => this.setState({ balance: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Devise
                        </InputLabel>
                        <Autocomplete
                            value={currency}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ currency: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
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
                                this.setState({ agency: item }, () => {
                                    this.getMembers(item.id);
                                });
                            }}
                            getOptionLabel={(option) => option.code+" ("+option.label+")"}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Conseiller
                        </InputLabel>
                        <Autocomplete
                            value={member}
                            options={members}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ member: item, referralCode: item.referralCode });
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    
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