import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import BrokerService from 'Services/brokers';
import TerritoryType from "Enums/Territories";
import { withRouter } from "react-router-dom";
import ContractService from 'Services/contracts';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import TerritoryService from "Services/territories";
import PartnershipService from 'Services/partnerships';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import { ThreeDRotationSharp } from "@material-ui/icons";

const PARTNER_TYPES = [
    {label: 'Opérateur', value: 'OPERATOR'},
    {label: 'Communauté', value: 'COMMUNITY'},
    {label: 'Broker', value: 'BROKER'},
]

class CreateCTOPartnershipModal extends Component {
  
    state = {
        bic: null,
        member: null,
        contracts: [],
        country: null,
        countries: [],
        bankCode: null,
        contract: null,
        membership: null,
        commercialName: null,
        partnerType: null,
        partner: null,
        partners: [],
        agencies: [],
        counters: [],
        ctos: [],
        cto: null,
        brokers: [],
        broker: null,
        selectedAgencies: [],
        selectedCTOAgencies: [],
        selectedCounters: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getContracts();
        this.getCountries();
        //this.getBrokerPartnerships();
        //this.getCTOPartnerships();
    }

    getPartnerships = () => {
        this.props.setRequestGlobalAction(true);
        PartnershipService.getPartnershipByCountry({ type: this.state.partnerType.value, country: this.state.country.reference })
        .then((response) => {
            this.setState({ partners: response });
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    getPartnership = (broker) => {
        this.props.setRequestGlobalAction(true);
        PartnershipService.getPartnershipByType({ type: 'CTO', code: broker.referralCode })
        .then((response) => {
            this.setState({ ctos: response });
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    attachPartnershipCounter = () => {
        this.props.setRequestGlobalAction(true);
        PartnershipService.addAttachedCounters({ partnership_reference: this.state.cto.reference, counters_reference: this.state.selectedCounters.map(c => c.reference).join(',') })
        .finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    // getCTOPartnerships = () => {
    //     this.props.setRequestGlobalAction(true);
    //     PartnershipService.getPartnerships({ type: 'CTO' })
    //     .then((response) => {
    //         this.setState({ ctos: response });
    //     })
    //     .finally(() => {
    //         this.props.setRequestGlobalAction(false);
    //     })
    // }

    getBrokerPartnerships = (country) => {
        if(country) {
            this.props.setRequestGlobalAction(true);
            //PartnershipService.getPartnerships({ type: 'BROKER' })
            PartnershipService.getPartnershipByCountry({ type: 'BROKER', country: country.reference })
            .then((response) => {
                this.setState({ brokers: response });
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false);
            });
        }
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

    getCountries = () => {
        TerritoryService.getTerritories(TerritoryType.COUNTRY)
        .then(countries => {
            this.setState({ countries });
        })
        .catch(error => {
            this.setState({ countries: [] });
            NotificationManager.error("An error occur " + error);
        });
    };

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

    getAgencies = () => {
        this.props.setRequestGlobalAction(true),
        BrokerService.getAgenciesByBroker({reference: this.state.partner.referralCode})
        .then(response => this.setState({ agencies: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getCounters = (items) => {
        this.props.setRequestGlobalAction(true);
        BrokerService.getCountersByAgenciesWithoutCTO({references: items.map(a => a.reference)})
        .then(response => this.setState({ counters: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {

        const { partner, contract, commercialName, selectedCounters } = this.state;

        if(!contract || !partner || !commercialName || selectedCounters.length <= 0) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        // this.props.setRequestGlobalAction(true);

        // let data = {
        //     type: this.props.type,
        //     contractId: contract.id,
        //     commercialName: commercialName,
        //     referralCode: partner.referralCode,
        //     counter_references: selectedCounters.map(c => c.reference)
        // }

        // PartnershipService.createPartnership(data).then(() => {
        //     NotificationManager.success("Le partenariat a été créé avec succès");
        //     window.location.reload();
        //     this.props.onClose();
        // }).catch((err) => {
        //     console.log(err);
        //     NotificationManager.error("Une erreur est survenu lors du partenariat");
        // }).finally(() => {
        //     this.props.setRequestGlobalAction(false);
        // })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { cto, partnerType, partners, ctos, partner,
            broker, brokers, country, countries, agencies, selectedAgencies, 
            counters, selectedCounters } = this.state;

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

                    <h2>Selectionner un guichet</h2>
                    <br />

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Séléctionnez un pays
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={country}
                            options={countries}
                            onChange={(__, item) => {
                                this.setState({ country: item });
                                this.getBrokerPartnerships(item);
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                            getOptionLabel={(option) => option.label}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type de partenariat
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={partnerType}
                            options={PARTNER_TYPES}
                            disabled={!this.state.country}
                            onChange={(__, item) => {
                                this.setState({ partnerType: item }, () => this.getPartnerships());
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Partenaires
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={partner}
                            options={partners}
                            onChange={(__, item) => {
                                this.setState({ partner: item }, () => this.getAgencies());
                            }}
                            getOptionLabel={(option) => option.partnershipDetails.find(pd => pd.type === 'COMMERCIAL_NAME')?.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Agences
                        </InputLabel>
                        <Autocomplete
                            multiple
                            id="combo-box-demo"
                            value={selectedAgencies}
                            options={agencies}
                            onChange={(__, items) => {
                                this.setState({ selectedAgencies: [...items] }, this.getCounters(items));
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Guichets
                        </InputLabel>
                        <Autocomplete
                            multiple
                            id="combo-box-demo"
                            value={selectedCounters}
                            options={counters}
                            onChange={(__, items) => {
                                this.setState({ selectedCounters: items });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <h2>CTO MCM</h2>
                    <br />

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Partenaires
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={broker}
                            options={brokers}
                            disabled={!this.state.country}
                            onChange={(__, item) => {
                                this.setState({ broker: item }, () => this.getPartnership(item));
                            }}
                            getOptionLabel={(option) => option.partnershipDetails.find(pd => pd.type === 'COMMERCIAL_NAME')?.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            CTO MCM
                        </InputLabel>
                        <Autocomplete
                            value={cto}
                            options={ctos}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ cto: item });
                            }}
                            getOptionLabel={(option) => option.partnershipDetails.find(pd => pd.type === 'COMMERCIAL_NAME')?.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.attachPartnershipCounter()}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer l'asso
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreateCTOPartnershipModal)));