import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import SettingService from 'Services/settings';
import { withRouter } from "react-router-dom";
import ContractService from 'Services/contracts';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import PartnershipService from 'Services/partnerships';
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CreatePartnershipModal extends Component {
  
    state = {
        bic: null,
        member: null,
        noBic: false,
        contracts: [],
        bankCode: null,
        contract: null,
        membership: null,
        noBankCode: false,
        commercialName: null,
        immatriculation: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getContracts();
    }

    getContracts = () => {
        this.props.setRequestGlobalAction(true);
        ContractService.getAvailableContracts({type: 'PARTNER'})
        .then(response => {
            this.setState({ contracts: response });
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    generateCode = (code) => {
        this.props.setRequestGlobalAction(true);
        let data = {
            nature: code
        };

        if(code == 'BIC_CODE') {
            data.referral_code = this.state.membership
        }

        SettingService.generateCode(data)
        .then(response => {
            if(code == 'BANK_CODE') {
                this.setState({ bankCode: response });
            } else {
                if(code == 'BIC_CODE') {
                    this.setState({ bic: response });
                }
            }
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    findUserByMembership = () => {
        this.props.setRequestGlobalAction(true);
        UserService.findUserByReference(this.state.membership)
        .then(response => {
            this.setState({ member: response });
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {

        const { member, contract, commercialName, immatriculation, bic, bankCode } = this.state;

        if(!contract || !member || !commercialName || !immatriculation) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {
            type: this.props.type,
            contractId: contract.id,
            commercialName: commercialName,
            referralCode: member.referralCode,
            immatriculation: immatriculation,
        }

        if(bic)
            data.bic = bic;

        if(bankCode)
            data.bankCode = bankCode;

        PartnershipService.createPartnership(data).then(() => {
            NotificationManager.success("Le partenariat a été créé avec succès");
            window.location.reload();
            this.props.onClose();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors du partenariat");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { contracts, membership, member, contract, noBic,
            commercialName, immatriculation, bic, bankCode, noBankCode } = this.state;

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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="membership">
                            Numéro utilisateur
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="membership"
                            name='membership'
                            value={membership}
                            className="input-lg"
                            onChange={(e) => this.setState({ membership: e.target.value })}
                        />
                    </FormGroup>

                    {member && (
                        <>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.userName}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.email}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={getReferralTypeLabel(member.referralType)}
                                />
                            </FormGroup>
                        </>
                    )}
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Séléctionnez un contrat
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={contract}
                            options={contracts}
                            onChange={(__, item) => {
                                this.setState({ contract: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="commercialName">
                            Nom d'enseigne
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="commercialName"
                            className="input-lg"
                            name='commercialName'
                            value={commercialName}
                            onChange={(e) => this.setState({ commercialName: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="immatriculation">
                            Numéro d'immatriculation
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            className="input-lg"
                            id="immatriculation"
                            name='immatriculation'
                            value={immatriculation}
                            onChange={(e) => this.setState({ immatriculation: e.target.value })}
                        />
                    </FormGroup>
                    {
                        this.props.type.toLowerCase() === 'operator' && member && (
                            <>
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="bic">
                                        BIC
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        type="text"
                                        className="input-lg"
                                        id="bic"
                                        name='bic'
                                        value={bic}
                                        disabled={noBic}
                                        onChange={(e) => this.setState({ bic: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-12 col-sm-12 mb-20">
                                    <FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                            checked={noBic}
                                            onChange={(e) => {
                                                this.setState({ noBic: e.target.checked }, () => {
                                                    if(this.state.noBic) {
                                                        this.generateCode('BIC_CODE');
                                                    }
                                                })
                                            }}
                                        />
                                    } label={"Je n'ai pas de code BIC"}
                                    />
                                </FormGroup>
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="bankCode">
                                        Code Banque
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        type="text"
                                        id="bankCode"
                                        name='bankCode'
                                        value={bankCode}
                                        className="input-lg"
                                        disabled={noBankCode}
                                        onChange={(e) => this.setState({ bankCode: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-12 col-sm-12 mb-20">
                                    <FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                            checked={noBankCode}
                                            onChange={(e) => {
                                                this.setState({ noBankCode: e.target.checked }, () => {
                                                    if(this.state.noBankCode) {
                                                        this.generateCode('BANK_CODE');
                                                    }
                                                })
                                            }}
                                        />
                                    } label={"Je n'ai pas de code banque"}
                                    />
                                </FormGroup>
                            </>
                    )}
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!membership}
                            onClick={() => this.findUserByMembership()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Vérifier l'utilisateur
                        </Button>
                        <Button
                            color="primary"
                            disabled={!member}
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Créer le partenariat
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreatePartnershipModal)));