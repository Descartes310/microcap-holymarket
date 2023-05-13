import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { convertDate } from 'Helpers/helpers';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputLabel, TextField } from '@material-ui/core';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";

const Indivision = (props) => {

    const { show, onClose } = props;
    const [units, setUnits] = useState([]);
    const [amount, setAmount] = useState(null);
    const [product, setProduct] = useState(null);
    const [priceUnit, setPriceUnit] = useState(null);
    const [distribution, setDistribution] = useState(null);
    const [selectedLine, setSelectedLine] = useState(null);
    const [denomination, setDenomination] = useState(null);

    useEffect(() => {
        getUnits();
        findLines();
        findProduct();
        console.log(props.data);
    }, []);

    const findLines = () => {
        props.setRequestGlobalAction(true);
        ProductService.getLinesByDate({reference: props.data.product.reference, date: props.data.selectedDate.date, show: true})
        .then(response => {
            setSelectedLine(response[0]);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getUnits = () => {
        props.setRequestGlobalAction(false);
        UnitService.getUnits()
            .then((response) => setUnits(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const findProduct = () => {
        setRequestGlobalAction(true);
        ProductService.findProduct(props.data.product.reference)
        .then(response => {
            setProduct(response);
        })
        .finally(() => setRequestGlobalAction(false))
    }

    const onSumit = () => {

        if(!denomination || !amount || !selectedLine || !distribution) {
            return;
        }

        let period = product.details.find(d => d.type == 'DEPOSIT_PERIOD')?.value;
        let depositStartDate = product.details.find(d => d.type == 'START_DEPOSIT_DATE')?.value;
        let cycleTime = product.details.find(d => d.type == 'CYCLE_TIME')?.value;

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

        let data = {
            amount: amount,
            dates: tmpDates,
            title: denomination,
            distribution: distribution.value,
            line_reference: selectedLine?.reference
        }

        props.setRequestGlobalAction(true);
        ProductService.createIndivision(data).then((response) => {
            props.onValidate(response[0]);
            onClose();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Nouvelle Indivision
                </h3>
            )}
        >
            <RctCardContent>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                    Une indivision autorise plusieurs personnes à faire les versements sur un même compte/plan d'épargne
                </div>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                    <h4 className='mb-40'>Reservation: {selectedLine?.reference}</h4>
                    <h4 className='mb-40'>Montant périodique: {props?.data.product?.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value}</h4>
                    <div className='row'>
                        <FormGroup className="col-md-8 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Montant du versement unitaire
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="amount"
                                name='amount'
                                className="input-lg"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Devise
                            </InputLabel>
                            <Autocomplete
                                value={priceUnit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setPriceUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>
                    <div className="row d-flex align-items-center">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="denomination">
                                Dénomination de l'indivision
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="denomination"
                                name='denomination'
                                className="input-lg"
                                value={denomination}
                                onChange={(e) => setDenomination(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Distribution de l'indivision
                            </InputLabel>
                            <Autocomplete
                                value={distribution}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setDistribution(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={[{label: 'Libre', value: 'PUBLIC'}, {label: 'Privée', value: 'PRIVATE'}]}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => onClose()}
                            className="primary font-weight-bold mb-20"
                        >
                            Annuler
                        </Button>
                    </FormGroup>
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSumit()}
                            className="text-white font-weight-bold mb-20"
                        >
                            Créer l'indivision
                        </Button>
                    </FormGroup>
                </div>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Indivision));