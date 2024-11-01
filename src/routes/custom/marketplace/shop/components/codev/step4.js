import moment from 'moment';
import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getProductDetailsByName, getTimeUnitByValue } from "Helpers/datas";

const TO_AVOID = ['ADVANCE_OPTION'];

class CodevStep4 extends Component {

    state = {
        alias: null,        
        options: [],
        aliases: [],
        product: null,
        placements: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.product) {
            this.findProduct();
        }
        this.getAliases();
        this.getCodevDetails();
        this.getCodevConfigOptions();
    }

    getCodevDetails = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getCodevDetails({types: ['PLACEMENT']}).then(response => {
            this.setState({ placements: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getCodevConfigOptions = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getCodevConfigOptions({product_reference: this.props.product.reference}).then(response => {
            this.setState({ options: response.map(co => { return {...co, label: co.option.label}}) });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getAliases = () => {
        let data = {};
        if(this.props.referralCode) {
            data.referralCode = this.props.referralCode
        }
        UserService.getContacts(data).then((contacts) => {
            this.setState({ aliases: contacts.filter(c => c.type === 'ALIAS') });
        });
    }

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.product.reference)
        .then(response => {
            if(response.details.length <= 0) {
                NotificationManager.error('Produit non configuré');
                this.props.onClose();
            }
            this.setState({product: response});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    computeAvailableCapital = () => {
        let depositAmount = this.state.product?.details.find(d => d.type === "DEPOSIT_AMOUNT")?.value;
        let minimumRate = this.state.product?.details.find(d => d.type === "MINIMUM_RATE")?.value;
        let emitLineCount = this.state.product?.details.find(d => d.type === "EMIT_LINE_COUNT")?.value;
        return (depositAmount && minimumRate && emitLineCount) ? (depositAmount*Math.pow(1+minimumRate, emitLineCount)).toFixed(2) : 0;
    }
    
    render() {

        const { onClose, show, onSubmit, data } = this.props;
        const { aliases, alias, placements, options } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Récapitulatif de la commande
                    </h3>
                )}
            >
                <RctCardContent>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Alias à utiliser
                        </InputLabel>
                        <Autocomplete
                            value={alias}
                            options={aliases}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ alias: item });
                            }}
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <table className='table table-striped table-bordered' id="printablediv">
                        <thead>
                            <th>Nom du détails</th>
                            <th>Valeur courante</th>
                        </thead>
                        <tbody>
                            {this.state.product?.details.filter(d => !TO_AVOID.includes(d.type)).map(details => (
                                <tr>
                                    <td>{getProductDetailsByName(details.type)?.label}</td>
                                    { details.type == 'DEPOSITPERIOD' ?
                                        <td>{getTimeUnitByValue(details.value)?.label}</td> :
                                        details.type == 'PLACEMENT' ?
                                        <td>{placements.filter(p => details.value.split(',').includes(p.reference)).map(p => p.value).join(', ')}</td> :
                                        details.type == 'OPTION' ?
                                        <td>{options.filter(t => details.value.split(',').includes(t.reference)).map(p => p.label).join(', ')}</td> :
                                        details.type == 'START_DATE' ?
                                        <td>{moment(details.value).format('DD/MM/YYYY')}</td> :
                                        details.type == 'END_DATE' ?
                                        <td>{moment(details.value).format('DD/MM/YYYY')}</td> :
                                        details.type == 'AVAILABLE_CAPITAL' ?
                                        <td>{Number(details.value).toFixed(2)}</td> :
                                        <td>{details.value}</td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                if(alias) {
                                    onSubmit({...data, alias: alias});
                                } else {
                                    onSubmit(data);
                                }
                            }}
                            className="text-white font-weight-bold mb-20"
                        >
                            Souscrire
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevStep4));