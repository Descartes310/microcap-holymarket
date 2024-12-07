import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import {NotificationManager} from 'react-notifications';
import {NDJANGUI_BUSINESS_NOMINAL_AMOUNT} from 'Helpers/datas';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateSubscription = (props) => {

    const {show, onClose} = props;
    
    const [label, setLabel] = useState(null);
    const [amounts, setAmounts] = useState([]);
    const [project, setProject] = useState(null);

    useEffect(() => {
        getSupports();
        getProject();
    }, [])

    const getProject = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getGroupProjects().then(response => {
            setProject(response[0]);
        })
        .catch(() => {
            setProject(null);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getSupports = () => {
		props.setRequestGlobalAction(true);
		GroupService.getActiveFinancialStructureSupports()
		.then(response => {
            setAmounts(response.map(s => { return {support: s, subscription: 0, personalAmount: 0, financableAmount: 0}}));
        })
		.finally(() => props.setRequestGlobalAction(false))
	}

    const onSubmit = () => {
        if(!project || amounts.reduce((subscriptions, item) => subscriptions + item.subscription, 0) <= 0) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        let data = {
            label,
            project_reference: project?.reference,
            supports: JSON.stringify(amounts.map(a => { return {reference: a.support.reference, subscription: a.subscription, personalAmount: a.personalAmount, financableAmount: a.financableAmount}}))
        }
        
        props.setRequestGlobalAction(true);
        ProjectService.createProjectSubscription(data).then(() => {
            NotificationManager.success("La souscription a été créée avec succès");
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard.");
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
                    Nouvelle souscription
                </h3>
            )}
        >
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
                <CustomList
                    list={amounts}
                    loading={false}
                    itemsFoundText={n => `${n} supports trouvés`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun support trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Support</th>
                                                <th className="fw-bold">Emission</th>
                                                <th className="fw-bold">Valeur nominale</th>
                                                <th className="fw-bold">Disponibilité</th>
                                                <th className="fw-bold">Souscription</th>
                                                <th className="fw-bold">Apport personnel</th>
                                                <th className="fw-bold">Apport à financer</th>
                                                <th className="fw-bold">Montant</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.support.supportType.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.support.quantity}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.support.nominalAmount, item.support.currency)}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">0/{item.support.quantity}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <InputStrap
                                                            required
                                                            id="amount"
                                                            type="number"
                                                            name='amount'
                                                            className="input-sm"
                                                            value={item.subscription}
                                                            onChange={(e) => {
                                                                setAmounts(amounts.map(obj => {
                                                                    if (obj.support.reference === item.support.reference) {
                                                                        return { ...obj, subscription: Number(e.target.value) };
                                                                    }
                                                                    return obj;
                                                                }))
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <InputStrap
                                                            required
                                                            type="number"
                                                            id="personnalAmount"
                                                            name='personnalAmount'
                                                            className="input-sm"
                                                            value={item.personalAmount}
                                                            onChange={(e) => {
                                                                setAmounts(amounts.map(obj => {
                                                                    if (obj.support.reference === item.support.reference) {
                                                                        return { ...obj, personalAmount: Number(e.target.value), financableAmount: Number(item.subscription * item.support.nominalAmount) - Number(e.target.value) };
                                                                    }
                                                                    return obj;
                                                                }))
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark">{getPriceWithCurrency(item.financableAmount, item.support.currency)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark">{getPriceWithCurrency(item.subscription * item.support.nominalAmount, item.support.currency)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="cursor-pointer">
                                                <td colSpan={7}>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">Ndjanguis équivalents</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{Math.ceil(amounts.reduce((sum, itm) => sum + itm.financableAmount, 0)/NDJANGUI_BUSINESS_NOMINAL_AMOUNT)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />
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
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateSubscription));