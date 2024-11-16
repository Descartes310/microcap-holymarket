import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getTimeUnits, getTimeUnitByValue } from 'Helpers/datas';
import FundingService from 'Services/funding';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import ConfirmBox from "Components/dialog/ConfirmBox"
import { getPriceWithCurrency } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import { getFundingOfferInterventionTypes } from 'Helpers/datas';
import { FormGroup, Button, InputGroup, InputGroupAddon } from 'reactstrap';

class DealDetailsModal extends Component {

    state = {
        deal: null,
        accounts: [],
        account: null,
        acceptDeal: true,
        compensations: [],
        editAccount: false,
        showConfirmBox: false,
        interventionType: null,
        natureCompensations: [],
    }

    constructor(props) {
        super(props);
        this.findDeal();
    }

    findDeal = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.findDeal(this.props.reference)
        .then(response => {
            this.setState({
                deal: response,
                compensations: response?.counterParts?.filter(c => c.fixPart) ?? [],
                natureCompensations: response?.counterParts?.filter(c => !c.fixPart) ?? [],
                interventionType: getFundingOfferInterventionTypes().find(i => i.value == response?.intervention) ?? null
            });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    validateDeal = () => {

        console.log(this.state.acceptDeal, this.state.deal, this.state.deal?.type, this.state.deal?.tickets);
        
        if(this.state.acceptDeal && this.state.deal && this.state.deal?.type == 'DEAL') {
            if(this.state.deal?.tickets <= 0) {
                NotificationManager.error("Selectionnez les tickets");
                return;
            }
        }

        this.props.setRequestGlobalAction(true);
        FundingService.validateDeal(this.props.reference, {status: this.state.acceptDeal})
        .then(() => {
            NotificationManager.success('Opération terminée avec succès');
            this.props.onClose();
        })
        .catch((err) => {
            if(err?.response?.status == 403) {
                NotificationManager.error("Vous ne pouvez pas accepter votre propre proposition");
            } else {
                NotificationManager.error('Une erreur est survenue');
            }
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    changeAccount = () => {
        if(!this.state.account) {
            return
        }

        this.props.setRequestGlobalAction(true);
        FundingService.changeAccountDeal(this.props.reference, {account_reference: this.state.account?.reference})
        .then((response) => {
            NotificationManager.success('Domiciliation mise a jour');
            this.findDeal();
        })
        .catch((err) => {
            NotificationManager.error('Une erreur est survenue');
        })
        .finally(() => {
            this.setState({ editAccount: false });
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, isSender, isBlocked } = this.props;
        const { deal, compensations, natureCompensations, interventionType, showConfirmBox, acceptDeal } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Détails deal
                    </h3>
                )}
            >
                <RctCardContent>
                    <div>
                        <p>Numéro deal: {deal?.reference}</p>

                        <h2 className='mb-20'>Contexte</h2>

                        <p>Objet: {deal?.type == 'NDJANGUI' ? `Ndjangui ` : `Offre de cautionnement `} {deal?.offer?.reference}</p>
                        <p>Souscripteur: {deal?.sender}</p>
                        <p>Beneficiaire: {deal?.receiver}</p>

                        <h2 className='mb-20'>Détails</h2>
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Détails</th>
                                        <th className="fw-bold">Valeur</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { deal?.offer?.label && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Désignation</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{deal?.offer?.label}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    { deal?.amount && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Montant demandé</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{getPriceWithCurrency(deal?.amount, deal?.currency)}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    { deal?.lastProposition.rate && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Taux de placement</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{deal?.lastProposition.rate} %</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    { deal?.lastProposition?.startDate && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Date de début</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{<TimeFromMoment time={deal?.lastProposition?.startDate} showFullDate />}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.endDate && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Date de fin</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{<TimeFromMoment time={deal?.lastProposition?.endDate} showFullDate />}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.endSubscriptionDate && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Date de cloture des souscriptions</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{<TimeFromMoment time={deal?.lastProposition?.endSubscriptionDate} showFullDate />}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.managementAmount && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Frais de gestion par période</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{getPriceWithCurrency(deal?.lastProposition.managementAmount, deal?.currency)}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.managementRate && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Taux de gestion par période de loyer</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{deal?.lastProposition.managementRate} %</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.numberOfPart && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Nombre de part du spot</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{deal?.lastProposition.numberOfPart}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.paymentStartDate && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Date de premier loyer</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{<TimeFromMoment time={deal?.lastProposition?.paymentStartDate} showFullDate />}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.periodicityLength && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Durée du spot (nombre de période)</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{deal?.lastProposition.periodicityLength}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.periodicity && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Périodicité</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{getTimeUnitByValue(deal?.lastProposition?.periodicity)?.label}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.prime && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Prime de liquidation anticipée</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{getPriceWithCurrency(deal?.lastProposition.prime, deal?.currency)}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.rate && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Taux de placement</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{deal?.lastProposition.rate} %</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.lastProposition?.rent && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Loyer</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{getPriceWithCurrency(deal?.lastProposition.rent, deal?.currency)}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.amount && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Status</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark">{deal?.status == 'PENDING' ? 'En attente' : deal?.status == 'APPROVED' ? 'Approuvé' : 'Refusé'}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    { deal?.amount && (
                                        <tr className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">Date d'expiration</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 text-dark"><TimeFromMoment time={deal?.expirationDate} showFullDate /></h4>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        { deal?.tickets?.length > 0 && (
                            <h2 className='mb-20 mt-20'>Versements</h2>
                        )}

                        { deal?.tickets?.length > 0 && (
                            <CustomList
                                loading={false}
                                list={deal?.tickets}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucun versement trouvé
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="fw-bold">Code</th>
                                                            <th className="fw-bold">Montant</th>
                                                            <th className="fw-bold">Date d'échéance</th>
                                                            <th className="fw-bold">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.code}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.amount} {item.currency}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">
                                                                                <TimeFromMoment time={item.date} showFullDate />
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">
                                                                                { item.status == 'USED' ? 'Reglé' : 'En attente' }
                                                                            </h4>
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
                        )}

                        { compensations?.length > 0 && (
                            <>
                                <h2 className='mb-20 mt-20'>Contrepartie en numeraire</h2>
                                <CustomList
                                    loading={false}
                                    list={compensations}
                                    renderItem={list => (
                                        <>
                                            {list && list.length === 0 ? (
                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                    <h4>
                                                        Aucune compensation trouvée
                                                    </h4>
                                                </div>
                                            ) : (
                                                <div className="table-responsive">
                                                    <table className="table table-hover table-middle mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="fw-bold">Début</th>
                                                                <th className="fw-bold">Fin</th>
                                                                <th className="fw-bold">Périodicité</th>
                                                                <th className="fw-bold">Durée</th>
                                                                <th className="fw-bold">Part fixe</th>
                                                                <th className="fw-bold">Taux variable</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {list && list.map((item, key) => (
                                                                <tr key={key} className="cursor-pointer">
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.startDate}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.endDate}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{getTimeUnits().find(t => t.value == item.periodicity).label}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.duration}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.fixPart}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.variablePart}</h4>
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
                            </>
                        )}

                        { natureCompensations?.length > 0 && (
                            <>
                                <h2 className='mb-20 mt-20'>Contrepartie en nature</h2>
                                <CustomList
                                    loading={false}
                                    list={natureCompensations}
                                    renderItem={list => (
                                        <>
                                            {list && list.length === 0 ? (
                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                    <h4>
                                                        Aucune compensation trouvée
                                                    </h4>
                                                </div>
                                            ) : (
                                                <div className="table-responsive">
                                                    <table className="table table-hover table-middle mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="fw-bold">Début</th>
                                                                <th className="fw-bold">Fin</th>
                                                                <th className="fw-bold">Périodicité</th>
                                                                <th className="fw-bold">Durée</th>
                                                                <th className="fw-bold">Offre</th>
                                                                <th className="fw-bold">Produit</th>
                                                                <th className="fw-bold">Unité</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {list && list.map((item, key) => (
                                                                <tr key={key} className="cursor-pointer">
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.startDate}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.endDate}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{getTimeUnits().find(t => t.value == item.periodicity).label}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.duration}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.offer}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.productName}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.unit}</h4>
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
                            </>
                        )}
                        { (!isBlocked && deal?.status == 'PENDING') && (
                            deal?.type == 'SPOT' ?
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                {/* <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        this.setState({ showConfirmBox: true, acceptDeal: false });
                                    }}
                                    disabled={deal?.status != 'PENDING'}
                                    className="text-white font-weight-bold"
                                >
                                    Refuser
                                </Button> */}
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        this.setState({ showConfirmBox: true, acceptDeal: true });
                                    }}
                                    disabled={deal?.status != 'PENDING'}
                                    className="text-white font-weight-bold ml-30"
                                >
                                    Accepter
                                </Button>
                            </FormGroup> :
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        this.setState({ showConfirmBox: true, acceptDeal: true });
                                    }}
                                    disabled={deal?.status != 'PENDING'}
                                    className="text-white font-weight-bold"
                                >
                                    Accepter
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        this.props.negociate();
                                    }}
                                    disabled={deal?.status != 'PENDING'}
                                    className="text-white font-weight-bold ml-20"
                                >
                                    Négocier
                                </Button>
                            </FormGroup>
                        )}
                    </div>
                </RctCardContent>
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => this.validateDeal()}
                    leftButtonOnClick={() => {
                        this.setState({ showConfirmBox: false });
                    }}
                    message={acceptDeal ? 'Etes vous sure de vouloir approuver ce deal ?' : 'Etes vous sure de vouloir refuser ce deal ?'}
                />
            </DialogComponent>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(DealDetailsModal));