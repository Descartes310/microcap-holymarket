import { connect } from 'react-redux';
import { FUNDING } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import ConfigurePlacementModal from './configurePlacement';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import DealDetailsModal from 'Routes/custom/fundings/components/DealDetailsModal';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [deals, setDeals] = useState([]);
    const [deal, setDeal] = useState(null);
    const [project, setProject] = useState(null);
    const [account, setAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [selectedDeals, setSelectedDeals] = useState([]);
    const [showDealDetails, setShowDealDetails] = useState(false);    
    const [showConfigurePlacement, setShowConfigurePlacement] = useState(false);    

    useEffect(() => {
        getProject();
        getAccounts();
    }, []);



    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getAccounts()
                .then(response => setAccounts(response))
                .finally(() => props.setRequestGlobalAction(false))
    }


    useEffect(() => {
        if(project) {
            getDeals();
        }
    }, [project]);

    const getProject = () => {
        ProjectService.getProjectByReference(props.match.params.id)
        .then(response => {
            setProject(response);
        })
        .catch(() => {
            setProject(null);
            NotificationManager.error("Une erreur est survenue");
        });
    };

    const getDeals = () => {
        FundingService.getPlacementAvailableDeals({project_reference: project.reference})
        .then(response => {
            setDeals(response);
        })
        .catch(() => {
            setDeals([]);
            NotificationManager.error("Une erreur est survenue");
        });
    };
    
    const onSubmit = () => {        
        if(!label || selectedDeals.length <= 0 || !account) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }
        
        let data = {
            label,
            account_reference: account.reference,
            project_reference: project?.reference,
            amounts: selectedDeals.map(d => d.amount),
            deal_references: selectedDeals.map(d => d.deal.reference)
        }
        
        props.setRequestGlobalAction(true);
        FundingService.createPlacement(data).then(() => {
            NotificationManager.success("Le placement a été créé avec succès");
            props.history.push(FUNDING.PLACEMENT.ITEM.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du placement");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>

                    <div className="row">
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Projet
                            </InputLabel>
                            <InputStrap
                                type="text"
                                disabled={true}
                                value={project?.label}
                                className="input-lg"
                            />
                        </FormGroup>
                    </div>
                    <FormGroup className="has-wrapper">
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
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Compte de domiciliation
                        </InputLabel>
                        <Autocomplete
                            value={account}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setAccount(item)
                            }}
                            options={accounts}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <InputLabel className="text-left mb-5 mt-5">
                        Deals et Spots disponibles
                    </InputLabel>
                    <CustomList
                        list={deals.filter(d => !selectedDeals.map(d => d.deal).includes(d))}
                        loading={false}
                        itemsFoundText={n => `${n} éléments trouvés`}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucun élément trouvé
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Type</th>
                                                    <th className="fw-bold">Désignation</th>
                                                    <th className="fw-bold">Montant</th>
                                                    <th className="fw-bold">Date de création</th>
                                                    <th className="fw-bold">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.type}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.label}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{getPriceWithCurrency(item?.amount, item?.currency)}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <TimeFromMoment time={item.createdAt} showFullDate />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold"
                                                                onClick={() => {
                                                                    setDeal(item);
                                                                    setShowDealDetails(true);
                                                                }}
                                                            >
                                                                Détails
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold ml-5"
                                                                onClick={() => {
                                                                    setShowConfigurePlacement(true);
                                                                    setDeal(item);
                                                                }}
                                                            >
                                                                Ajouter
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
                    <InputLabel className="text-left mb-5 mt-5">
                        Mon placement
                    </InputLabel>
                    <CustomList
                        loading={false}
                        list={selectedDeals}
                        itemsFoundText={n => `${n} éléments selectionnés`}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucun élément selectionné
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Type</th>
                                                    <th className="fw-bold">Désignation</th>
                                                    <th className="fw-bold">Montant</th>
                                                    <th className="fw-bold">Total</th>
                                                    <th className="fw-bold">Date de création</th>
                                                    <th className="fw-bold">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item.deal.type}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item.deal?.label}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{getPriceWithCurrency(item?.amount, item?.currency)}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{getPriceWithCurrency(item.deal?.amount, item.deal?.currency)}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <TimeFromMoment time={item.deal.createdAt} showFullDate />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold"
                                                                onClick={() => {
                                                                    setDeal(item.deal);
                                                                    setShowDealDetails(true);
                                                                }}
                                                            >
                                                                Détails
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    setSelectedDeals([...selectedDeals.filter(d => d.deal.id != item.deal.id)])
                                                                }}
                                                                className="btn-danger text-white font-weight-bold ml-3"
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

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Convertir
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
            {(deal && showDealDetails) && (
                <DealDetailsModal
                    show={showDealDetails}
                    onClose={() => {
                        setDeal(null);
                        setShowDealDetails(false);
                    }}
                    reference={deal?.reference}
                    negociate={() => {
                        setShowDealDetails(false);
                    }}
                    isBlocked={true}
                    isSender={false}
                />
            )}
            {(deal && showConfigurePlacement) && (
                <ConfigurePlacementModal
                    show={showConfigurePlacement}
                    onClose={() => {
                        setDeal(null);
                        setShowConfigurePlacement(false);
                    }}
                    deal={deal}
                    validate={(item) => {
                        setSelectedDeals([...selectedDeals, item]);
                        setDeal(null);
                        setShowConfigurePlacement(false);
                    }}
                />
            )}
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));