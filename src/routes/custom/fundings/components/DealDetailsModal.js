import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getTimeUnits } from 'Helpers/datas';
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

    getAccounts = () => {
        this.props.setRequestGlobalAction(true),
        AccountService.getAccountBySpeciality({special_product: this.state.interventionType?.value})
        .then(response => {
            this.setState({ accounts: response, account: null });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findDeal = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.findDeal(this.props.reference)
        .then(response => {
            this.setState({
                deal: response,
                compensations: response?.counterParts?.filter(c => c.fixPart),
                natureCompensations: response?.counterParts?.filter(c => !c.fixPart),
                interventionType: getFundingOfferInterventionTypes().find(i => i.value == response?.intervention)
            }, () => {
                this.getAccounts();
            });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    validateDeal = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.validateDeal(this.props.reference)
        .then(response => {
            this.props.onClose()
        })
        .catch((err) => {
            NotificationManager.error('Une erreur est survenue');
            this.setState({ showConfirmBox: false });
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

        const { onClose, show, isSender } = this.props;
        const { deal, compensations, natureCompensations, interventionType, showConfirmBox, editAccount, account, accounts } = this.state;

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
                        <p>Mode d'intervention: {interventionType?.label}</p>

                        <p>Domiciliation: {isSender ? deal?.account : deal?.receptorAccount} &nbsp;
                            <span 
                                onClick={() => { this.setState({ editAccount: !editAccount }) }}
                                style={{ fontStyle: 'italic', color: 'blue', cursor: 'pointer' }}
                            >
                                Modifier
                            </span>
                        </p>

                        { editAccount && (
                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputGroup className='w-100'>
                                    <Autocomplete
                                        value={account}
                                        options={accounts}
                                        id="combo-box-demo"
                                        onChange={(__, item) => {
                                            this.setState({ account: item });
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" variant="contained" onClick={() => {
                                            this.changeAccount();
                                        }} >
                                            <span className='text-white'>Enregistrer</span>
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        )}

                        { deal?.tickets?.length > 0 && (
                            <h2 className='mb-20'>Versements</h2>
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
                                                                            <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.amount, item.currency)}</h4>
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

                        { compensations.length > 0 && (
                            <>
                                <h2 className='mb-20'>Contrepartie en numeraire</h2>
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
                                                                <th className="fw-bold">Fix</th>
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

                        { natureCompensations.length > 0 && (
                            <>
                                <h2 className='mb-20'>Contrepartie en nature</h2>
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
                        <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    this.setState({ showConfirmBox: true });
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
                    </div>
                </RctCardContent>
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => this.validateDeal()}
                    leftButtonOnClick={() => {
                        this.setState({ showConfirmBox: false });
                    }}
                    message={'Etes vous sure de vouloir approuver ce deal ?'}
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