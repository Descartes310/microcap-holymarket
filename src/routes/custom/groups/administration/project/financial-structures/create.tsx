import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UnitSelect from 'Components/UnitSelect';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import ProjectService from 'Services/projects';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [project, setProject] = useState(null);
    const [isin, setIsin] = useState(false);
    const [amount, setAmount] = useState(null);
    const [supports, setSupports] = useState([]);
    const [support, setSupport] = useState(null);
    const [category, setCategory] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        getCategories();
        getProject();
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

    const getProject = () => {
        props.setRequestGlobalAction(false);
        ProjectService.getGroupProjects()
        .then((response) => setProject(response[0]))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {

        if(!support || !type || !quantity || !amount || !label || !currency || !project) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            isin, label, 
            emission: quantity,
            nominal_amount: amount,
            currency: currency?.code,
            project_reference: project.reference,
            option_type_reference: type?.reference,
            support_type_reference: support?.reference
        }

        GroupService.createFinancialStructure(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            props.history.push(GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>

            <PageTitleBar
                title={"Structures financieres"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Intitulé
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>

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
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));