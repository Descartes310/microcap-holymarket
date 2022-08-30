import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { convertDate } from "Helpers/helpers";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getProductDetailsByName, getTimeUnitByValue } from "Helpers/datas";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CodevStep1 extends Component {

    state = {
        dates: [],
        plan: null,
        product: null,
        cessible: false,
        editable: false,
        advanceType: null,
        advanceValue: null,
        selectedDate: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.product) {
            this.findProduct();
        }
    }

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.product.reference)
        .then(response => {
            if(response.details.length <= 0) {
                NotificationManager.error('Produit non configuré');
                this.props.onClose();
            }
            this.setState({product: response}, () => {
                this.computeAvailableDate();
            });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    computeAvailableDate = () => {
        let dates = [];
        let startDate = new Date(this.state.product?.details.find(d => d.type === 'STARTDATE')?.value);
        let endDate = new Date(this.state.product?.details.find(d => d.type === 'ENDDATE')?.value);
        let depositPeriod = getTimeUnitByValue(this.state.product?.details.find(d => d.type === 'DEPOSITPERIOD')?.value)?.days;
        let date = startDate;
        while(date <= endDate) {
            dates.push(convertDate(date));
            date.setDate(date.getDate() + depositPeriod);
        }
        this.setState({ dates });
    }

    onValidate = () => {
        const { product, cessible, editable, advanceValue, advanceType, selectedDate, plan } = this.state;

        if(!product || !plan || !advanceType || advanceValue == null || !selectedDate) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data = {
            plan: plan.value, advanceType: advanceType.value,
            selectedDate, cessible, editable, advanceValue, productReference: product.reference
        }

        this.props.onSubmit(data);
    }

    render() {

        const { onClose, show } = this.props;
        const { product, cessible, editable, advanceValue, 
            advanceType, dates, plan, selectedDate } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Configuration du produit
                    </h3>
                )}
            >
                <RctCardContent>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <th>Nom du détails</th>
                            <th>Valeur courante</th>
                        </thead>
                        <tbody>
                            {product?.details.map(details => (
                                <tr>
                                    <td>{getProductDetailsByName(details.type)?.label}</td>
                                    { details.type == 'DEPOSITPERIOD' ?
                                        <td>{getTimeUnitByValue(details.value)?.label}</td> :
                                        <td>{details.value}</td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left">
                            Plan souhaité
                        </InputLabel>
                        <Autocomplete
                            value={plan}
                            id="combo-box-demo"
                            options={[
                                {
                                    label: 'Ligne indivis', value: 'INDIVIS'
                                }, {
                                    label: 'Ligne individuelle', value: 'PERSONNAL'
                                }]
                            }
                            onChange={(__, item) => {
                                this.setState({plan: item});
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left">
                            Date de tirage pour l'option d'avance
                        </InputLabel>
                        <Autocomplete
                            value={selectedDate}
                            id="combo-box-demo"
                            options={dates}
                            onChange={(__, item) => {
                                this.setState({selectedDate: item});
                            }}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left">
                            Caractéristiques des coupons d'avance
                        </InputLabel>
                        <FormGroup className="col-sm-12 mb-0">
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    checked={cessible}
                                    onChange={() => this.setState({ cessible: !cessible })}
                                />
                                } label={'Cessible'}
                            />
                        </FormGroup>
                        <FormGroup className="col-sm-12 mb-0">
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    checked={editable}
                                    onChange={() => this.setState({ editable: !editable })}
                                />
                                } label={'Modifiable'}
                            />
                        </FormGroup>
                    </div>
                    {/* <p>Validité du 20 juin 2022 au 30 septembre 2022</p> */}
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left">
                            Type d'avance
                        </InputLabel>
                        <Autocomplete
                            value={advanceType}
                            id="combo-box-demo"
                            options={[{
                                label: 'Amortissement', value: 'AMORTISSEMENT'
                            }, {
                                label: 'Infinie', value: 'INFINITY'
                            }]}
                            onChange={(__, item) => {
                                this.setState({advanceType: item});
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="advanceValue">
                            Inscrit sur avance
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="advanceValue"
                            name='advanceValue'
                            className="input-lg"
                            value={advanceValue}
                            onChange={(e) => this.setState({advanceValue: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => { this.onValidate() }}
                            className="text-white font-weight-bold mb-20"
                        >
                            Soumettre
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevStep1));