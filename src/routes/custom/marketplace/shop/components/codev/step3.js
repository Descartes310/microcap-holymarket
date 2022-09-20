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
        product: null,
        endDate: null,
        startDate: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.product) {
            this.findProduct();
        }
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
        ProductService.getIndivisionsByDate({reference: this.state.product.reference, date: this.props.data.selectedDate.date})
        .then(response => {
            this.setState({ lines: response });
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
        const { configs, dates, startDate, endDate, lines } = this.state;

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
                                                    //setDepositPeriod(item);
                                                }}
                                                getOptionLabel={(option) => option.label}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                options={Array(lines.length).fill(configs).flatMap(c => c).map((c, index) => { return {...c, label: 'Ticket N° '+index+': '+c.support.label} })}
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
                            onClick={() => { onSubmit(data) }}
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