import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import UnitSelect from 'Components/UnitSelect';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const FinancialStructureSupports = (props) => {

    const {show, onClose, financialStructure} = props;
    
    const [datas, setDatas] = useState([]);
    const [isCreation, setIsCreation] = useState(false);    
    
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [isin, setIsin] = useState(false);
    const [amount, setAmount] = useState(null);
    const [supports, setSupports] = useState([]);
    const [support, setSupport] = useState(null);
    const [category, setCategory] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getDatas();
        getCategories();
    }, [])

    useEffect(() => {
        if(category) {
            getTypes();
        } else {
            setTypes([]);
            setType(null);
            setSupports([]);
            setSupport(null);
        }
    }, [category]);

    useEffect(() => {
        if(type) {
            getSupports();
        } else {
            setSupports([]);
            setSupport(null);
        }
    }, [type]);

    const getCategories = () => {
        props.setRequestGlobalAction(true),
        GroupService.getFundingOptionCategories()
        .then(response => setCategories(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getTypes = () => {
        props.setRequestGlobalAction(true);
        GroupService.getOptionTypeByCategory(category?.reference)
        .then(response => setTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getSupports = () => {
        props.setRequestGlobalAction(true),
        GroupService.getOptionTypesSupport(type?.reference)
        .then(response => setSupports(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getDatas = () => {
		props.setRequestGlobalAction(true);
		GroupService.getFinancialStructureSupports(financialStructure.reference)
		.then(response => setDatas(response))
		.finally(() => props.setRequestGlobalAction(false))
	}

    const onSubmit = () => {

        if(!support || !type || !quantity || !amount || !currency) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            isin, 
            emission: quantity,
            nominal_amount: amount,
            currency: currency?.code,
            option_type_reference: type?.reference,
            support_type_reference: support?.reference
        }

        GroupService.createFinancialStructureSupport(financialStructure.reference, data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            setIsCreation(false);
            getDatas();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="lg"
            title={(
                <h3 className="fw-bold">
                    Supports
                </h3>
            )}
        >
            { !isCreation ? (
                <CustomList
                    list={datas}
                    loading={false}
                    itemsFoundText={n => `${n} élements trouvés`}
                    onAddClick={() => setIsCreation(true)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun élement trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Support</th>
                                                <th className="fw-bold">Emission</th>
                                                <th className="fw-bold">Valeur</th>
                                                <th className="fw-bold">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item?.supportType?.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item?.quantity}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.nominalAmount, item.currency)}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.nominalAmount * item.quantity, item.currency)}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />
            ) : (
                <Form onSubmit={onSubmit}>
                    <div className='row'>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Catégorie d'option de financement
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={category}
                                options={categories}
                                onChange={(__, item) => {
                                    setCategory(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>

                        <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Type d'option de financement autorisé
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={type}
                                options={types}
                                onChange={(__, item) => {
                                    setType(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <div className='row'>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Type de support
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={support}
                                options={supports}
                                onChange={(__, item) => {
                                    setSupport(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="quantity">
                                Emission (nombre de support à emettre)
                            </InputLabel>
                            <InputStrap
                                required
                                id="quantity"
                                type="number"
                                name='quantity'
                                value={quantity}
                                className="input-lg"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Valeur nominale
                            </InputLabel>
                            <InputStrap
                                required
                                id="amount"
                                type="number"
                                name='amount'
                                value={amount}
                                className="input-lg"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormGroup>
                        <UnitSelect label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
                    </div>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="total">
                            Montant total
                        </InputLabel>
                        <InputStrap
                            id="total"
                            type="text"
                            name='total'
                            disabled={true}
                            className="input-lg"
                            value={(amount && quantity && currency) ? getPriceWithCurrency(amount * quantity, currency.code) : '0'}
                        />
                    </FormGroup>

                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={isin}
                                onChange={() => setIsin(!isin)}
                            />
                        } label={'ISIN MicroCap'}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            )}
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(FinancialStructureSupports));