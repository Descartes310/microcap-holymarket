import { connect } from 'react-redux';
import React, { Component } from 'react';
import { convertDate } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class CodevStep3 extends Component {

    state = {
        dates: [],
        lines: [],
        configs: [],
        supports: [],
        product: null,
        endDate: null,
        startDate: null,
        selectedSupports: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.product) {
            this.findProduct();
        }
        this.findSupports();
    }

    getCodevConfigOptions = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getCodevConfigOptions({product_reference: this.state.product.reference}).then(response => {
            this.setState({configs: response.filter(t => this.state.product?.details.find(d => d.type == 'OPTION')?.value.split(',').includes(t.reference))
            .map(co => { return {...co, label: co.option.label}})});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findLines = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getIndivisionsByLine({show: true, reference: this.props.data.indivision.line.reference})
        .then(response => {
            this.setState({ lines: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findSupports = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getLineSupports({reference: this.props.data.indivision.line.reference})
        .then(response => {
            this.setState({ supports: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.product.reference)
        .then(response => {
            if(response.details.length <= 0) {
                NotificationManager.error('Produit non configuré');
                this.props.onClose();
            }

            let period = response.details.find(d => d.type == 'DEPOSIT_PERIOD')?.value;
            let depositStartDate = response.details.find(d => d.type == 'START_DEPOSIT_DATE')?.value;
            let cycleTime = response.details.find(d => d.type == 'CYCLE_TIME')?.value;

            let tmpDates = [];
            let date = new Date(depositStartDate);

            for (let index = 0; index < Number(cycleTime); index++) {

                tmpDates.push(convertDate(date, "YYYY-MM-DD"));
                switch (period) {
                    case "DAYS":
                        date.setDate(date.getDate() + 1);
                        break;
                    case "WEEKS":
                        date.setDate(date.getDate() + 7);
                        break;
                    case "MONTHS":
                        date.setDate(date.getDate() + 30);
                        break;
                    default:
                        date.setDate(date.getDate() + 1);
                        break;
                }
            }

            this.setState({product: response, dates: tmpDates, startDate: depositStartDate, endDate: tmpDates[tmpDates.length-1]}, () => {
                this.getCodevConfigOptions();
                this.findLines();
            });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show, onSubmit, data } = this.props;
        const { selectedSupports, dates, startDate, endDate, supports } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Rythme des versements
                    </h3>
                )}
            >
                <RctCardContent>
                    <h4>Filtre</h4>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="startDate">
                                Date de début
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                className="input-lg"
                                id="startDate"
                                name='startDate'
                                value={startDate}
                                onChange={(e) => this.setState({ startDate: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="endDate">
                                Date de fin
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                id="endDate"
                                name='endDate'
                                value={endDate}
                                className="input-lg"
                                onChange={(e) => this.setState({ endDate: e.target.value })}
                            />
                        </FormGroup>
                    </div>
                    <table className='table table-bordered'>
                        <thead>
                            <th>Date de versement</th>
                            <th>Tickets</th>
                        </thead>
                        <tbody>
                            { dates.filter(d => d >= startDate && d <= endDate).map(d => (
                                <tr>
                                    <td>{d}</td>
                                    <td>
                                        <div className="col-md-12 col-sm-12">
                                            <Autocomplete
                                                multiple
                                                id="combo-box-demo"
                                                onChange={(__, item) => {
                                                    this.setState({ selectedSupports: item});
                                                }}
                                                getOptionLabel={(option) => 'Tiquet de reférence: '+option.reference.split('_')[2]}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                options={supports.filter(s => s.date === d && s.referralCode == null && s.status == 'FREE')}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => { if(selectedSupports.length >= 0) {
                                    onSubmit({...data, supports: selectedSupports.map(ss => ss.reference)}); 
                                } else {
                                    NotificationManager.error('Sélectionnez au moins un tiquet');
                                }
                            }}
                            className="text-white font-weight-bold mb-20"
                        >
                            Continuer
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevStep3));