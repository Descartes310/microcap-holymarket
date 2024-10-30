import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import AccountSelect from 'Components/AccountSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { bookingAdvantages, bookingAdvantageTargets } from 'Helpers/datas';

class CreateBookingGift extends Component {

    state = {
        member: null,
        useLimit: null,
        hasDiscount: false,
        advantage: null,
        sponsor: null,
        sponsorUnit: null,
        sponsorLimit: null,
        discount: null,
        discounts: [],
        target: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getDiscounts();
    }

    getDiscounts = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getDiscountModels()
            .then((response) => this.setState({ discounts: response }))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false);
            })
    }
    
    onSubmit = () => {

        const {advantage, sponsor, sponsorLimit, sponsorUnit, discount, target } = this.state;

        if(!advantage || !target) {
            NotificationManager.error('Le formulaire n\'est pas bien renseigné');
            return;
        }

        var data = {type: advantage.value, target: target.value}

        if(advantage.value == 'PAYOUT_BOND' || advantage.value == 'SHOP_BOND') {
            if(!sponsor || !sponsorLimit || !sponsorUnit) {
                NotificationManager.error('Les informations de sponsoring ne sont pas correctement renseignées');
                return;
            } else {
                data.accountReference = sponsor.reference;
                data.amountLimit = sponsorLimit;
                data.amountUnit = sponsorUnit;
            }
        }

        if(advantage.value == 'DISCOUNT') {
            if(!discount) {
                NotificationManager.error('Le code de réduction doit être renseigné');
                return;
            } else {
                data.discountReference = discount.reference;
            }
        }

        this.props.setRequestGlobalAction(true);

        ProductService.createBookingGift(this.props.booking.reference, data).then(() => {
            NotificationManager.success('L\'avantage a été créé avec succès');
            this.props.onClose();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenue');
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {
        const {advantage, sponsor, sponsorUnit, sponsorLimit, discount, target, discounts } = this.state;
        const { onClose, show, title } = this.props;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Ajouter un avantage
                    </h3>
                )}
            >
                <Form onSubmit={this.onSubmit}>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Type d'avantage
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={advantage}
                            options={bookingAdvantages()}
                            onChange={(__, item) => {
                                this.setState({ advantage: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            getOptionSelected={(option, value) => option.value === value.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Bénéficiaire
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={target}
                            options={bookingAdvantageTargets()}
                            onChange={(__, item) => {
                                this.setState({ target: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            getOptionSelected={(option, value) => option.value === value.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    { (advantage?.value == 'PAYOUT_BOND' || advantage?.value == 'SHOP_BOND') && (
                        <AccountSelect isSubscritpion={true} isPayment={false} onChange={(_, account) => {
                            this.setState({ sponsor: account });
                        }}/>
                    )}

                    { (advantage?.value == 'PAYOUT_BOND' || advantage?.value == 'SHOP_BOND') && sponsor && (
                        <div className='row'>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="sponsorUnit">
                                    Montant unitaire
                                </InputLabel>
                                <InputStrap
                                    required
                                    id="sponsorUnit"
                                    type="number"
                                    name='sponsorUnit'
                                    className="input-lg"
                                    value={sponsorUnit}
                                    onChange={(e) => this.setState({ sponsorUnit: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="sponsor">
                                    Plafond de sponsorisation
                                </InputLabel>
                                <InputStrap
                                    required
                                    id="sponsor"
                                    type="number"
                                    name='sponsor'
                                    className="input-lg"
                                    value={sponsorLimit}
                                    onChange={(e) => this.setState({ sponsorLimit: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="currency">
                                    Devise
                                </InputLabel>
                                <InputStrap
                                    disabled
                                    id="currency"
                                    type="text"
                                    name='currency'
                                    className="input-lg"
                                    value={sponsor.currencyCode}
                                />
                            </FormGroup>
                        </div>
                    )}
                    { advantage?.value == 'DISCOUNT' && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Coupons de réduction
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={discount}
                                options={discounts}
                                onChange={(__, item) => {
                                    this.setState({ discount: item });
                                }}
                                getOptionLabel={(option) => `${option.label} - ${option.percentage}%`}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onClose()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Annuler
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Continuer
                        </Button>
                    </div>
                </Form>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(CreateBookingGift)));