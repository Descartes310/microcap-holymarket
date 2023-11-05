import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getTimeUnits } from 'Helpers/datas';
import FundingService from 'Services/funding';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import { getFundingOfferInterventionTypes } from 'Helpers/datas';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

class DealDetailsModal extends Component {

    state = {
        deal: null,
        compensations: [],
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
                compensations: response?.counterParts?.filter(c => c.fixPart),
                natureCompensations: response?.counterParts?.filter(c => !c.fixPart),
                interventionType: getFundingOfferInterventionTypes().find(i => i.value == response?.offer?.intervention)
            });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show } = this.props;
        const { deal, compensations, natureCompensations, interventionType } = this.state;

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

                        <p>Objet: Offre de cautionnement {deal?.offer?.reference}</p>
                        <p>Souscripteur: {deal?.sender}</p>
                        <p>Beneficiaire: {deal?.receiver}</p>
                        <p>Mode d'intervention: {interventionType?.label}</p>

                        {/* <div className="col-md-12 col-sm-12 has-wrapper mb-30 mt-10">
                            <InputLabel className="text-left">
                                Mode d'intervention
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={interventionType}
                                onChange={(__, item) => {
                                    this.setState({ interventionType: item })
                                }}
                                getOptionLabel={(option) => option.label}
                                options={getFundingOfferInterventionTypes()}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div> */}

                        <p>Domiciliation: {deal?.account}</p>

                        <h2 className='mb-20'>Versements</h2>

                        { deal?.tickets.length > 0 && (
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
                                    //this.onSubmit();
                                }}
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
                                className="text-white font-weight-bold ml-20"
                            >
                                Négocier
                            </Button>
                        </FormGroup>
                    </div>
                </RctCardContent>
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