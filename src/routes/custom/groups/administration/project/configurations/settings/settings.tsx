import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import ProductService from 'Services/products';
import UnitSelect from 'Components/UnitSelect';
import CustomCart from '../_components/customCart';
import React, { useEffect, useState } from 'react';
import CreateRule from '../_components/createRule';
import TextField from '@material-ui/core/TextField';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import CreateFundingOption from '../_components/createFundingOption';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { projectDistributionRules, bonificationBases, getTimeUnits, getTimeUnitByValue } from 'Helpers/datas';

const List = (props) => {

    const [rules, setRules] = useState([]);
    const [details, setDetails] = useState([]);
    const [options, setOptions] = useState([]);
    const [project, setProject] = useState(null);
    const [minBase, setMinBase] = useState(null);
    const [maxBase, setMaxBase] = useState(null);
    const [minRate, setMinRate] = useState(null);
    const [maxRate, setMaxRate] = useState(null);
    const [prevision, setPrevision] = useState(null);
    const [periodicity, setPeriodicy] = useState(null);
    const [customCarts, setCustomCarts] = useState([]);
    const [distribution, setDistribution] = useState(null);
    const [showCreateRule, setShowCreateRule] = useState(false);
    const [dotationMinRate, setDotationMinRate] = useState(null);
    const [dotationMaxRate, setDotationMaxRate] = useState(null);
    const [bonificationBase, setBonificationBase] = useState(null);
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [bonificationMaxRate, setBonificationMaxRate] = useState(null);
    const [bonificationMinRate, setBonificationMinRate] = useState(null);
    const [showCreateFundingOption, setShowCreateFundingOption] = useState(false);

    useEffect(() => {
        getOptions();
        getProjectDetails();
        getProject();
    }, []);

    useEffect(() => {
        if(project) {
            getCustomCarts();
            getRules();
        }
    }, [project]);

    useEffect(() => {
        if(prevision && bonificationMinRate) {
            setDotationMinRate((Number(prevision) * Number(bonificationMinRate)).toFixed(2));
        }
        
        if(prevision && bonificationMaxRate) {
            setDotationMaxRate((Number(prevision) * Number(bonificationMaxRate)).toFixed(2));
        }

    }, [prevision, bonificationMaxRate, bonificationMinRate])

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

    const getRules = () => {
        props.setRequestGlobalAction(false);
        ProjectService.getProjectRules({project_reference: project.reference})
        .then((response) => setRules(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getProjectDetails = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectSetting({}).then(response => {
            setDetails(response);
            setMinBase(response.find(t => t.type == 'MINIMUM_FIXED_BASE')?.value ?? null);
            setMaxBase(response.find(t => t.type == 'MAXIMUM_FIXED_BASE')?.value ?? null);
            setMinRate(response.find(t => t.type == 'MINIMUM_RATE')?.value ?? null);
            setMaxRate(response.find(t => t.type == 'MAXIMUM_RATE')?.value ?? null)
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCustomCarts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCustomCarts(project.reference).then(response => {
            setCustomCarts(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const deleteCustomCarts = (reference) => {
        props.setRequestGlobalAction(true);
        ProductService.deleteCustomCarts(reference).then(() => {
            getCustomCarts();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const deleteRule = (reference) => {
        props.setRequestGlobalAction(true);
        ProjectService.deleteProjectRule(reference).then(() => {
            getRules();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getOptions = () => {
        props.setRequestGlobalAction(true);
        GroupService.getFundingOptions().then(response => {
            setOptions(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const deleteOptions = (reference) => {
        props.setRequestGlobalAction(true);
        GroupService.deleteFundingOptions(reference).then(response => {
            getOptions();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {        
        if(!minBase || !maxBase || !minRate || !maxRate) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        let data = {
            minBase, maxBase,
            minRate, maxRate,
        }
                
        props.setRequestGlobalAction(true);
        ProjectService.createProjectSetting(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <div>
            <RctCollapsibleCard>
                <h1 className='mb-20'>Contre partie en numeraire des deals</h1>
                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="minBase">
                            Base fixe minimum
                        </InputLabel>
                        <InputStrap
                            required
                            id="minBase"
                            type="number"
                            name='minBase'
                            value={minBase}
                            className="input-lg"
                            onChange={(e) => setMinBase(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="maxBase">
                            Base fixe maximum
                        </InputLabel>
                        <InputStrap
                            required
                            id="maxBase"
                            type="number"
                            name='maxBase'
                            value={maxBase}
                            className="input-lg"
                            onChange={(e) => setMaxBase(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="minRate">
                            Taux minimum
                        </InputLabel>
                        <InputStrap
                            required
                            id="minRate"
                            type="number"
                            name='minRate'
                            value={minRate}
                            className="input-lg"
                            onChange={(e) => setMinRate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="maxRate">
                            Taux maximum
                        </InputLabel>
                        <InputStrap
                            required
                            id="maxRate"
                            type="number"
                            name='maxRate'
                            value={maxRate}
                            className="input-lg"
                            onChange={(e) => setMaxRate(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <h1 className='mb-20 mt-20'>Bonification</h1>
                <div className='row'>
                    <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Règle de distribution
                        </InputLabel>
                        <Autocomplete
                            value={distribution}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setDistribution(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            options={projectDistributionRules()}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Base
                        </InputLabel>
                        <Autocomplete
                            value={bonificationBase}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setBonificationBase(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            options={bonificationBases()}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Prevision de la base
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="prevision"
                            name='prevision'
                            value={prevision}
                            className="input-lg"
                            onChange={(e) => setPrevision(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className='row'>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Taux minimal
                        </InputLabel>
                        <InputStrap
                            required
                            id="prevision"
                            type="number"
                            name='prevision'
                            className="input-lg"
                            value={bonificationMinRate}
                            onChange={(e) => setBonificationMinRate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Taux maximal
                        </InputLabel>
                        <InputStrap
                            required
                            id="prevision"
                            type="number"
                            name='prevision'
                            className="input-lg"
                            value={bonificationMaxRate}
                            onChange={(e) => setBonificationMaxRate(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className='row'>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Dotation aux bonifications minimal
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="number"
                            id="prevision"
                            name='prevision'
                            className="input-lg"
                            value={dotationMinRate}
                            onChange={(e) => setDotationMinRate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Dotation aux bonifications maximal
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="number"
                            id="prevision"
                            name='prevision'
                            className="input-lg"
                            value={dotationMaxRate}
                            onChange={(e) => setDotationMaxRate(e.target.value)}
                        />
                    </FormGroup>
                </div>

                <div className='row'>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Périodicité de dotation
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={periodicity}
                            options={getTimeUnits()}
                            onChange={(__, item) => {
                                setPeriodicy(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <UnitSelect className="col-md-6 col-sm-12 has-wrapper" label="Devise" isCurrency={true} onChange={(c) => setMaxRate(c)} />
                </div>
                <div className='row'>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Rémunération globale en numéraire pour un jour de versement deal
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="number"
                            id="prevision"
                            name='prevision'
                            className="input-lg"
                            value={dotationMinRate}
                            onChange={(e) => setDotationMinRate(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <h1 className='mb-20 mt-20'>Contre partie en nature des deals</h1>
                <CustomList
                    list={customCarts}
                    loading={false}
                    itemsFoundText={n => `${n} products trouvés`}
                    onAddClick={() => setShowCreateProduct(true)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun produit trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Prix</th>
                                                <th className="fw-bold">Marché</th>
                                                <th className="fw-bold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.product.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.market.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.price, item.currency)}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                deleteCustomCarts(item.id);
                                                            }}
                                                            className="text-white font-weight-bold mr-3"
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

                <h1 className='mb-20 mt-20'>Structure financiere</h1>
                <CustomList
                    list={options}
                    loading={false}
                    addText='Ajouter'
                    showAddIcon={false}
                    itemsFoundText={n => `${n} éléments trouvés`}
                    onAddClick={() => setShowCreateFundingOption(true)}
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
                                                <th className="fw-bold">Support</th>
                                                <th className="fw-bold">Valeur</th>
                                                <th className="fw-bold">Estimation</th>
                                                <th className="fw-bold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.supportType.label}</h4>
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
                                                                <h4 className="m-0 fw-bold text-dark">{item.quantity}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                deleteOptions(item.reference)
                                                            }}
                                                            className="text-white font-weight-bold mr-3"
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

                <h1 className='mb-20 mt-20'>Règles de rénumération prédéfinies</h1>
                <CustomList
                    list={rules}
                    loading={false}
                    itemsFoundText={n => `${n} règles trouvées`}
                    onAddClick={() => setShowCreateRule(true)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun règle trouvée
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Périodicité</th>
                                                <th className="fw-bold">Date de début</th>
                                                <th className="fw-bold">Date de fin</th>
                                                <th className="fw-bold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.duration} {getTimeUnitByValue(item.periodicity)?.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.startDate} showFullDate /></h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.endDate} showFullDate /></h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                deleteRule(item.reference);
                                                            }}
                                                            className="text-white font-weight-bold mr-3"
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
                        Enregistrer
                    </Button>
                </FormGroup>

                <CustomCart
                    show={showCreateProduct}
                    onClose={() => {
                        setShowCreateProduct(false);
                    }}
                    project={project}
                />

                <CreateFundingOption
                    show={showCreateFundingOption}
                    onClose={() => {
                        getOptions();
                        setShowCreateFundingOption(false);
                    }}
                />

                <CreateRule
                    show={showCreateRule}
                    project={project}
                    onClose={() => {
                        getRules();
                        setShowCreateRule(false);
                    }}
                />
            </RctCollapsibleCard>
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
