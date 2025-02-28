import { connect } from 'react-redux';
import React, { Component } from 'react';
import FundingService from 'Services/funding';
import ProjectService from 'Services/projects';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { initDealMethods, getTimeUnits } from 'Helpers/datas';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';
import { getPriceWithCurrency, objToString } from 'Helpers/helpers';

class PropositionDetailsModal extends Component {

    state = {
        proposition: null,
        compensations: [],
        natureCompensations: []
    }

    constructor(props) {
        super(props);
        this.findMyProposition();
    }

    findMyProposition = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.findProposition(this.props.reference)
        .then(response => {
            this.setState({
                proposition: response,
                compensations: response?.counterParts?.filter(c => c.fixPart),
                natureCompensations: response?.counterParts?.filter(c => !c.fixPart)
            });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show } = this.props;
        const { proposition, compensations, natureCompensations } = this.state;

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
                        <p>Contexte: Offre de cautionnement N. {proposition?.offer?.reference}</p>
                        <p>Dealer: Exploitant MicroCap</p>
                        <p>Souscripteur: Personne Physique 1</p>
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Methode de reglement
                            </InputLabel>
                            <InputStrap
                                type="text"
                                disabled={true}
                                className="input-lg"
                                value={initDealMethods().find(dm => dm.value == proposition?.initMethod)?.label}
                            />
                        </div>
                        {/* { proposition?.initMethod?.value == 'TICKETS' && (
                            <div className="col-md-12 col-sm-12 mb-30 d-flex">
                                <div className="col-md-6 col-sm-12">
                                    <InputLabel className="text-left">
                                        Mes codevs
                                    </InputLabel>
                                    <Autocomplete
                                        value={codev}
                                        options={codevs}
                                        id="combo-box-demo"
                                        onChange={(__, item) => {
                                            this.setState({ codev: item }, () => {
                                                this.findTickets();
                                            });
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>

                                <div className="col-md-6 col-sm-12">
                                    <InputLabel className="text-left">
                                        Mes tickets
                                    </InputLabel>
                                    <Autocomplete
                                        multiple
                                        options={tickets}
                                        id="combo-box-demo"
                                        value={selectedTickets}
                                        onChange={(__, items) => {
                                            this.setState({ selectedTickets: items });
                                        }}
                                        getOptionLabel={(option) => `Code: ${option.code}, Montant: ${getPriceWithCurrency(option.amount, option.currency)}, Date d'échéance: ${option.dueDate}`}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                            </div>
                        )}
                        { initMethod?.value == 'PERIOD' && (
                            <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                                <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                    <InputLabel className="text-left">
                                        Du
                                    </InputLabel>
                                    <InputStrap
                                        type="date"
                                        id="startDate"
                                        name='startDate'
                                        value={startDate}
                                        className="input-lg"
                                        placeholder="Date de début"
                                        onChange={(e) => this.setState({ startDate: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                    <InputLabel className="text-left">
                                        Au
                                    </InputLabel>
                                    <InputStrap
                                        type="date"
                                        id="endDate"
                                        name='endDate'
                                        value={endDate}
                                        className="input-lg"
                                        placeholder="Date de fin"
                                        onChange={(e) => this.setState({ endDate: e.target.value })}
                                    />
                                </FormGroup>
                            </div>
                        )} */}
                        <h2 className='mb-20'>Contrepartie en numeraire</h2>

                        { compensations.length > 0 && (
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
                        )}

                        <h2 className='mb-20'>Contrepartie en nature</h2>
                        
                        { natureCompensations.length > 0 && (
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
                        )}
                        <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    this.onSubmit();
                                }}
                                className="text-white font-weight-bold w-100"
                            >
                                Enregistrer
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(PropositionDetailsModal));