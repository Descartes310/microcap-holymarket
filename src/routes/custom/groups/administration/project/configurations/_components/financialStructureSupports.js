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
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';

const FinancialStructureSupports = (props) => {

    const {show, onClose, financialStructure} = props;
    
    const [datas, setDatas] = useState([]);
    const [isCreation, setIsCreation] = useState(false);

    const [lockable, setLockable] = useState(false);
    
    const [amount, setAmount] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const [option, setOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [label, setLabel] = useState(props.financialStructure?.label);

    useEffect(() => {
        getDatas();
        getOptions();
    }, [])

    const getOptions = () => {
        props.setRequestGlobalAction(true);
        GroupService.getFundingOptions({financial_structure_reference: financialStructure.reference}).then(response => {
            setOptions(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getDatas = () => {
		props.setRequestGlobalAction(true);
		GroupService.getFinancialStructureSupports(financialStructure.reference)
		.then(response => {
            setDatas(response);
            setLockable(response.filter(r => r.subscriptionRate && Number(r.subscriptionRate) >= 100).length == response.length)
        })
		.finally(() => props.setRequestGlobalAction(false))
	}

    const changeProgression = (item) => {
        props.setRequestGlobalAction(true),
        GroupService.changeFinancialStructureProgression(item.reference)
        .then(() => {
            window.location.reload()
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeLock = (item) => {
        props.setRequestGlobalAction(true),
        GroupService.changeFinancialStructureLock(item.reference)
        .then(() => {
            window.location.reload()
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!option || !quantity || !label) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            label, 
            emission: quantity,
            nominal_amount: amount,
            funding_option_reference: option.reference,
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
                    Détails de la structure financière
                </h3>
            )}
        >
            { !isCreation ? (
                <>
                    <CustomList
                        list={datas}
                        loading={false}
                        addingButton={props.financialStructure.lock}
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
                                                    <th className="fw-bold">Souscriptions</th>
                                                    <th className="fw-bold">Taux de Souscriptions (%)</th>
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
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.subscriptions}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.subscriptionRate} %</h4>
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
                    <div className='row d-flex' style={{ justifyContent: 'space-evenly' }}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => changeLock(props.financialStructure)}
                            disabled={!lockable}
                            className="text-white font-weight-bold"
                        >
                            Vérouiller la structure
                        </Button>
                        { props.financialStructure.progression === 'NONE' && (
                            <Button
                                color="primary"
                                variant="contained"
                            onClick={() => changeProgression(props.financialStructure)}
                                className="text-white font-weight-bold"
                            >
                                Soumettre
                            </Button>
                        )}
                        { props.financialStructure.progression === 'PENDING' && (
                            <Button
                                color="primary"
                                variant="contained"
                            onClick={() => changeProgression(props.financialStructure)}
                                className="text-white font-weight-bold"
                            >
                                Vérifier
                            </Button>
                        )}
                        { props.financialStructure.progression === 'VERIFIED' && (
                            <Button
                                color="primary"
                                variant="contained"
                            onClick={() => changeProgression(props.financialStructure)}
                                className="text-white font-weight-bold"
                            >
                                Approuver
                            </Button>
                        )}
                        { props.financialStructure.progression === 'APPROVED' && (
                            <Button
                                color="primary"
                                variant="contained"
                            onClick={() => changeProgression(props.financialStructure)}
                                className="text-white font-weight-bold"
                            >
                                Confirmer
                            </Button>
                        )}
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {}}
                            className="text-white font-weight-bold"
                        >
                            Fermer
                        </Button>
                    </div>
                </>
            ) : (
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
                            value={label}
                            className="input-lg"
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>

                    <div className='row'>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Option de financement
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={option}
                                options={options}
                                onChange={(__, item) => {
                                    setOption(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Valeur faciale
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

                    <div className='row'>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="emissionPrime">
                                Prime d'émission
                            </InputLabel>
                            <InputStrap
                                type="text"
                                disabled={true}
                                id="emissionPrime"
                                name="emissionPrime"
                                className="input-lg"
                                value={(amount && option && currency) ? getPriceWithCurrency(Math.max(0, amount - option.nominalAmount), currency.code) : '0'}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="total">
                                Montant total
                            </InputLabel>
                            <InputStrap
                                id="total"
                                name="total"
                                type="text"
                                disabled={true}
                                className="input-lg"
                                value={(amount && option && currency && quantity) ? getPriceWithCurrency(Math.max(0, amount - option.nominalAmount) * quantity, currency.code) : '0'}
                            />
                        </FormGroup>
                    </div>

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