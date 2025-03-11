import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import {NotificationManager} from 'react-notifications';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import AddCampaignSupport from '../../configurations/_components/addCampaignSupport';
import { getPriceWithCurrency } from 'Helpers/helpers';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [supports, setSupports] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedSupports, setSelectedSupports] = useState([]);
    const [showAddValueBox, setShowAddValueBox] = useState(false);
    const [financialStructure, setFinancialStructure] = useState(null);

    useEffect(() => {
        findFinancialStructure();
    }, []);

    useEffect(() => {
        if(financialStructure) {
            getSupports();
        }
    }, [financialStructure]);

    useEffect(() => {
        if(selectedSupports.length > 0) {
            setAmount(selectedSupports.map(s => s.support.nominalAmount * s.quantity).reduce((sum, item) => sum+item, 0)+" "+financialStructure.currency)
        } else {
            setAmount("0 EUR")
        }
    }, [selectedSupports]);

    const findFinancialStructure = () => {
        props.setRequestGlobalAction(true),
        GroupService.findFinancialStructure(props.match.params.id)
        .then(response => setFinancialStructure(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getSupports = () => {
		props.setRequestGlobalAction(true);
		GroupService.getFinancialStructureSupports(financialStructure.reference)
		.then(response => {
            setSupports(response);
        })
		.finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!label || !startDate || !endDate || !financialStructure || selectedSupports.length <= 0) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        if((financialStructure.totalAmount - financialStructure.campaignAmount) < amount) {
            NotificationManager.error("Vous avez dépassé le montant maximum");
            return;
        }

        let data: any = {
            label, description,
            startDate, endDate,
            reference: props.match.params.id,
            amount: selectedSupports.map(s => s.support.nominalAmount * s.quantity).reduce((sum, item) => sum+item, 0),
            currency: financialStructure?.currency ?? 'EUR', supports: JSON.stringify(selectedSupports.map(s => {
                return {reference: s.support.reference, quantity: s.quantity}
            }))
        }

        props.setRequestGlobalAction(true);
        GroupService.createCampaign(data)
        .then(() => {
            NotificationManager.success("L'element a été créé avec succès");
            props.history.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CAMPAIGN_LIST, props.match.params.id));
        }).catch((error) => {
            console.log(error);
            NotificationManager.error("Une erreur est survenue lors de l'element");
        }).finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>

            <PageTitleBar
                title={"Création d'une campagne"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Date de debut
                        </InputLabel>
                        <InputStrap
                            required
                            id="startDate"
                            type="date"
                            name='startDate'
                            className="input-lg"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="endDate">
                            Date de fin
                        </InputLabel>
                        <InputStrap
                            required
                            id="endDate"
                            type="date"
                            name='endDate'
                            className="input-lg"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </FormGroup>

                    <InputLabel className="text-left">
                        Liste des rubriques
                    </InputLabel>
                    <CustomList
                        list={selectedSupports}
                        loading={false}
                        itemsFoundText={n => `${n} paramètre trouvé`}
                        onAddClick={() => setShowAddValueBox(true)}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucune paramètre trouvé
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Intitulé</th>
                                                    <th className="fw-bold">Montant nominal</th>
                                                    <th className="fw-bold">Quantité</th>
                                                    <th className="fw-bold">Total</th>
                                                    <th className="fw-bold">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.support?.supportType?.label}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{getPriceWithCurrency(item?.support?.nominalAmount, item?.support?.currency)}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{getPriceWithCurrency(item?.support?.nominalAmount * item?.quantity, item?.support?.currency)}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    setSelectedSupports([...selectedSupports.filter(s => s.support.reference != item.support.reference && s.quantity != item.quantity)])
                                                                }}
                                                                className="btn-danger text-white font-weight-bold mr-3"
                                                            >
                                                                Supprimer
                                                            </Button>
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

                    <div className="row">
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Montant disponible
                            </InputLabel>
                            <InputStrap
                                disabled
                                type="text"
                                value={financialStructure ? (financialStructure.totalAmount - financialStructure.campaignAmount)+' '+financialStructure.currency : ''}
                                className="input-lg"
                            />
                        </FormGroup>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Montant de la campagne
                            </InputLabel>
                            <InputStrap
                                disabled
                                id="amount"
                                type="text"
                                name='amount'
                                value={amount}
                                className="input-lg"
                            />
                        </FormGroup>
                    </div>

                    { showAddValueBox && (
                        <AddCampaignSupport
                            show={showAddValueBox}
                            supports={supports}
                            onClose={() => setShowAddValueBox(!showAddValueBox)}
                            onSubmit={(item) => {
                                setSelectedSupports([...selectedSupports, item]);
                                setShowAddValueBox(false)
                            }}
                        />
                    )}

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));