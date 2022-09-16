import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import React, { Component } from 'react';
import { convertDate } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CodevStep3 extends Component {

    state = {
        product: null,
        dates: [],
        configs: [],
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

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.product.reference)
        .then(response => {
            if(response.details.length <= 0) {
                NotificationManager.error('Produit non configuré');
                this.props.onClose();
            }
            let startDate = response.details.find(d => d.type == 'START_DATE')?.value;
            let endDate = response.details.find(d => d.type == 'END_DATE')?.value;
            let cycle = Number(response.details.find(d => d.type == 'CYCLE_TIME')?.value);
            let period = response.details.find(d => d.type == 'DEPOSIT_PERIOD')?.value;

            let tmpDates = [];
            let date = new Date(startDate);
            let end = new Date(endDate);

            while (date <= end) {
                tmpDates.push(convertDate(date, "YYYY-MM-DD"));
                switch (period) {
                    case "DAYS":
                        date.setDate(date.getDate() + cycle);
                        break;
                    case "WEEK":
                        date.setDate(date.getDate() + (cycle*7));
                        break;
                    case "MONTH":
                        date.setDate(date.getDate() + (cycle*30));
                        break;
                
                    default:
                        date.setDate(date.getDate() + cycle);
                        break;
                }
            }

            this.setState({product: response, dates: tmpDates}, () => this.getCodevConfigOptions());
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }


    render() {

        const { configs, dates } = this.state;
        const { onClose, show, onSubmit, data } = this.props;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Rythme des versement
                    </h3>
                )}
            >
                <RctCardContent>
                    <table className='table table-bordered'>
                        <thead>
                            <th>Date de versement</th>
                            <th>Tickets</th>
                        </thead>
                        <tbody>
                            { dates.map(d => (
                                <tr>
                                    <td>{d}</td>
                                    <td>
                                        {
                                            configs.map(op => (
                                                <FormGroup className="col-sm-12 has-wrapper">
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            color="primary"
                                                        />
                                                    } label={op.label}
                                                    />
                                                </FormGroup>
                                            ))
                                        }
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