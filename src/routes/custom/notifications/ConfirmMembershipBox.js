import { connect } from "react-redux";
import React, { Component } from 'react';
import UserService from 'Services/users';
import OrderService from 'Services/orders';
import IntlMessages from 'Util/IntlMessages';
import TerritoryType from "Enums/Territories";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import TerritoryService from 'Services/territories';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import {NotificationManager} from 'react-notifications';
import DialogComponent from "Components/DialogComponent";
import { setRequestGlobalAction, logout } from "Actions";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Form, FormGroup, Input, Label, Col } from 'reactstrap';

class ConfirmMembershipBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            billingInformation: {
                state: '',
                zipCode: '',
                country: null,
                mobileNumber: '',
                addressLine1: '',
                addressLine2: '',
                email: this.props.authUser.email,
            },
            countries: [],
            models: [],
            selections: [],
            membership: props.authUser.referralId,
            member: props.authUser,
        }
    }

    onChangeBillingInformation = (key, value) => {
        this.setState({
           billingInformation: {
              ...this.state.billingInformation,
              [key]: value
           }
        })
     }  

    componentDidMount() {
      this.getCountries();
      this.getModels();
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

    getModels = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getServiceAccountModels()
        .then(models => {
            this.setState({ models, selections: models.map((m, index) => { return {index, model: m, seller: null, domiciliation: null, domiciliations: []}}) });
        })
        .catch(error => {
            this.setState({ models: [] });
            NotificationManager.error("An error occur " + error);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        });
    };

    getBankAgencies = (productReference, index) => {
        this.props.setRequestGlobalAction(true);
        UserService.getInstitutions({type: 'BANK_AGENCY', product_reference: productReference})
        .then(response => {
            this.setState(prevState => ({
                selections: prevState.selections.map(item =>
                  item.index === index
                    ? { ...item, domiciliations: response }
                    : item
                )
            }));
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    isFormValid() {
        const { email, mobileNumber, addressLine1, zipCode, country, state } = this.state.billingInformation;
        if (email && addressLine1 && mobileNumber && zipCode && country && state) {
            for (let index = 0; index < this.state.selections.length; index++) {
                const selection = this.state.selections[index];
                if(!selection.seller || !selection.domiciliation || selection.domiciliations.length <= 0) {
                    return false;
                }
            }
            return true;
        } else {
           return false
        }
    }

    onSubmit = () => {
        if(!this.isFormValid()) {
            return;
        }
        const { email, mobileNumber, addressLine1, zipCode, country, state } = this.state.billingInformation;
        let data = {
            notification_id: this.props.notification.id,
            email, telephone: mobileNumber, address: addressLine1, postalCode: zipCode, country: country?.reference, state,
            products: JSON.stringify(this.state.selections.map(s => { return {productReference: s.seller.reference, domiciliation: s.domiciliation.id}}))
        }
        this.props.setRequestGlobalAction(true);
        OrderService.activateMembership(data)
        .then(() => {
            NotificationManager.success("Votre adhésion a été confirmée");
            window.location.reload();
        })
        .catch(error => {
            NotificationManager.error("An error occur " + error);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        });
    }

    render() {

        return (
            <DialogComponent
                title="Confirmer mon adhésion"
                onClose={this.props.onClose}
                show={this.props.show}
            >
                <>
                    <Form>
                        <FormGroup row>
                            <Col sm={6}>
                                <Label for="email"><IntlMessages id="components.email" /></Label>
                                <Input
                                    type="email"
                                    name="mail"
                                    id="email"
                                    className="mb-4 mb-sm-0 input-lg"
                                    defaultValue={this.state.billingInformation.email}
                                    onChange={(e) => this.onChangeBillingInformation('email', e.target.value)}
                                />
                            </Col>
                            <Col sm={6}>
                                <Label for="contactNumber"><IntlMessages id="components.mobileNumber" /></Label>
                                <Input
                                    type="tel"
                                    name="number"
                                    id="contactNumber"
                                    className="mb-4 mb-sm-0 input-lg"
                                    defaultValue={this.state.billingInformation.mobileNumber}
                                    onChange={(e) => this.onChangeBillingInformation('mobileNumber', e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <h4 className="mb-20 mt-20">Adresse de facturation</h4>
                        <FormGroup row>
                            <Col sm={12}>
                                <Label for="address1"><IntlMessages id="components.address" /></Label>
                                <Input
                                    type="textarea"
                                    name="address"
                                    id="address1"
                                    className="mb-4 mb-sm-0 input-lg"
                                    defaultValue={this.state.billingInformation.addressLine1}
                                    onChange={(e) => this.onChangeBillingInformation('addressLine1', e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={4}>
                                <Label className="text-left">
                                    <IntlMessages id="components.country" />
                                </Label>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.countries}
                                    classes={{ paper: 'custom-input' }}
                                    getOptionLabel={(option) => option.label}
                                    value={this.state.billingInformation.country}
                                    onChange={(__, item) => { this.setState({ billingInformation: {...this.state.billingInformation, country: item} }) }}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Col>
                            <Col sm={4}>
                                <Label for="stateName"><IntlMessages id="components.state" /></Label>
                                <Input
                                    type="text"
                                    name="state"
                                    id="stateName"
                                    className="mb-4 mb-sm-0 input-lg"
                                    onChange={(e) => this.onChangeBillingInformation('state', e.target.value)}
                                />
                            </Col>
                            <Col sm={4}>
                                <Label for="zip"><IntlMessages id="components.zip" /></Label>
                                <Input
                                    type="number"
                                    name="zip"
                                    id="zip"
                                    className="mb-4 mb-sm-0 input-lg"
                                    onChange={(e) => this.onChangeBillingInformation('zipCode', e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                    <h2 className="mt-50 mb-20">Comptes de service</h2>
                    { this.state.models.map((model, index) => (
                        <FormGroup key={index} row className="mb-30">
                            <Col sm={4}>
                                <Label className="text-left">
                                    Comptes
                                </Label>
                                <Input
                                    type="text"
                                    disabled={true}
                                    value={model.productModel}
                                    className="mb-4 mb-sm-0 input-lg"
                                />
                            </Col>
                            <Col sm={4}>
                                <Label className="text-left">
                                    Commercants
                                </Label>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={model.products}
                                    classes={{ paper: 'custom-input' }}
                                    getOptionLabel={(option) => `${option.seller} (${getPriceWithCurrency(option.price, option.currency)})`}
                                    value={this.state.selections[index].seller}
                                    onChange={(__, value) => {
                                        this.setState(prevState => ({
                                            selections: prevState.selections.map(item =>
                                              item.index === index
                                                ? { ...item, seller: value, domiciliation: null, domiciliations: [] }
                                                : item
                                            )
                                        }), () => {
                                            this.getBankAgencies(value.reference, index);
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Col>
                            <Col sm={4}>
                                <Label className="text-left">
                                    Domiciliations
                                </Label>
                                <Autocomplete
                                    id="combo-box-demo"
                                    onChange={(__, value) => {
                                        this.setState(prevState => ({
                                            selections: prevState.selections.map(item =>
                                                item.index === index
                                                ? { ...item, domiciliation: value }
                                                : item
                                            )
                                        }));
                                    }}
                                    value={this.state.selections[index].domiciliation}
                                    options={this.state.selections[index].domiciliations}
                                    getOptionLabel={(option) => option.label+" ("+option.code+")"}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Col>
                        </FormGroup>
                    ))}
                    <div className="d-flex justify-content-end mb-30">
                        <Button
                            color="primary"
                            variant="contained"
                            className='text-white'
                            disabled={!this.isFormValid()}
                            onClick={() => this.onSubmit()}
                        >
                            Confirmer mon adhésion
                        </Button>
                    </div>
                </>
            </DialogComponent>
        );
    }
}

export default connect(({ authUser }) => ({ authUser: authUser.data }), { setRequestGlobalAction, logout })(ConfirmMembershipBox);
