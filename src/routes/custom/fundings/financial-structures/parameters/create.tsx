import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Switch from "@material-ui/core/Switch";
import FundingService from 'Services/funding';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import ProductService from 'Services/products';
import UnitSelect from 'Components/UnitSelect';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import CreateRule from 'Routes/custom/groups/administration/project/configurations/_components/createRule';
import CustomCart from 'Routes/custom/groups/administration/project/configurations/_components/customCart';
import { projectDistributionRules, getTimeUnits, getTimeUnitByValue, getBonificationBaseLabel } from 'Helpers/datas';
import CreatePrevision from 'Routes/custom/groups/administration/project/configurations/_components/createPrevision';
import CreateFundingOption from 'Routes/custom/groups/administration/project/configurations/_components/createFundingOption';

const Create = (props) => {

    const [rules, setRules] = useState([]);
    const [account, setAccount] = useState(null);
    
    const [dat, setDat] = useState(null);
    const [lineRate, setLineRate] = useState(null);
    const [remunerationRate, setRemunerationRate] = useState(null);
    const [capitalManagementRate, setCapitalManagementRate] = useState(null);

    const [codevs, setCodevs] = useState([]);
    const [codev, setCodev] = useState(null);
    const [details, setDetails] = useState([]);
    const [options, setOptions] = useState([]);
    const [minBase, setMinBase] = useState(null);
    const [minYear, setMinYear] = useState(null);
    const [maxYear, setMaxYear] = useState(null);
    const [maxBase, setMaxBase] = useState(null);
    const [minRate, setMinRate] = useState(null);
    const [maxRate, setMaxRate] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [previsions, setPrevisions] = useState([]);
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
    const [showCreatePrevision, setShowCreatePrevision] = useState(false);
    const [showCreateFundingOption, setShowCreateFundingOption] = useState(false);

    useEffect(() => {
        getProducts();
        getCustomCarts();
        getRules();
        getPrevisions();
        getOptions();
        getProjectDetails();
    }, []);

    useEffect(() => {
        if(codevs.length > 0 && details) {
            setCodev(codevs.find(c => c.reference == details.find(t => t.type == 'CODEV')?.value));
        }
    }, [codevs, details]);

    useEffect(() => {
        if(codev) {
            findProductModel();
        }
    }, [codev]);

    useEffect(() => {
        if(previsions.length > 0 && details) {
            let year = previsions.find(p => p.reference == details.find(t => t.type == 'BONIFICATION_BASE')?.value);
            setBonificationBase(year)
            setMinYear(year)
            setMaxYear(year)
        }
    }, [previsions, details]);

    useEffect(() => {
        if(minYear && maxYear && bonificationBase) {
            setPrevision(previsions.filter(bb => bb.year >= minYear.year && bb.year <= maxYear.year).reduce((sum, item) => sum + item.value, 0));
        } else {
            setPrevision(0);
        }
    }, [minYear, maxYear, bonificationBase])

    useEffect(() => {
        if(prevision && bonificationMinRate) {
            setDotationMinRate((Number(prevision) * Number(bonificationMinRate)).toFixed(2));
        }
        
        if(prevision && bonificationMaxRate) {
            setDotationMaxRate((Number(prevision) * Number(bonificationMaxRate)).toFixed(2));
        }

    }, [prevision, bonificationMaxRate, bonificationMinRate])

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({ types: ['PRODUCT'], nature: 'CODEV' })
            .then(response => setCodevs(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getRules = () => {
        props.setRequestGlobalAction(false);
        ProjectService.getProjectRules({type: 'MEMBER', reference: props.authUser.referralId})
        .then((response) => setRules(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getPrevisions = () => {
        props.setRequestGlobalAction(false);
        ProjectService.getProjectPrevisions({type: 'MEMBER', reference: props.authUser.referralId})
        .then((response) => setPrevisions(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    useEffect(() => {
        if(dat && lineRate) {
            setCapitalManagementRate((lineRate - dat).toFixed(2));
        }
    }, [dat, lineRate])

    const findProductModel = () => {
        props.setRequestGlobalAction(true);
        ProductService.findProductModel(codev.reference).then(response => {
            setDat(response.details.find(d => d.type == 'DAT_RATE')?.value);
            setLineRate(response.details.find(d => d.type == 'LINE_RATE')?.value);
            setRemunerationRate(response.details.find(d => d.type == 'REMUNERATION_RATE')?.value);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getProjectDetails = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getSettingDetails({project_reference: props.authUser.referralId, type: 'MEMBER'}).then(response => {
            setDetails(response);
            setMinBase(response.find(t => t.type == 'MINIMUM_FIXED_BASE')?.value ?? null);
            setMaxBase(response.find(t => t.type == 'MAXIMUM_FIXED_BASE')?.value ?? null);
            setMinRate(response.find(t => t.type == 'MINIMUM_RATE')?.value ?? null);
            setMaxRate(response.find(t => t.type == 'MAXIMUM_RATE')?.value ?? null)
            setPrevision(response.find(t => t.type == 'PREVISION')?.value ?? null)
            setBonificationMinRate(response.find(t => t.type == 'BONIFICATION_MIN_RATE')?.value ?? null)
            setBonificationMaxRate(response.find(t => t.type == 'BONIFICATION_MAX_RATE')?.value ?? null)
            setDotationMinRate(response.find(t => t.type == 'DOTATION_MIN_RATE')?.value ?? null)
            setDotationMaxRate(response.find(t => t.type == 'DOTATION_MAX_RATE')?.value ?? null)
            setPeriodicy(getTimeUnits().find(t => t.value == response.find(t => t.type == 'PERIODICITY')?.value) ?? null)
            setDistribution(projectDistributionRules().find(pd => pd.value == response.find(t => t.type == 'DISTRIBUTION')?.value) ?? null)
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCustomCarts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCustomCarts(props.authUser.referralId).then(response => {
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

    const deletePrevision = (reference) => {
        props.setRequestGlobalAction(true);
        ProjectService.deleteProjectPrevision(reference).then(() => {
            getPrevisions();
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

    const activeRule = (reference) => {
        props.setRequestGlobalAction(true);
        ProjectService.activeProjectRule(reference, {type: 'MEMBER', project_reference: props.authUser.referralId}).then(() => {
            getRules();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getOptions = () => {
        props.setRequestGlobalAction(true);
        GroupService.getFundingOptions({reference: props.authUser.referralId, type: 'MEMBER'}).then(response => {
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
        if(!minBase || !maxBase || !minRate || !maxRate || !currency || !distribution || !bonificationBase || !bonificationMinRate || !bonificationMaxRate ||
            !prevision || !dotationMinRate || !dotationMaxRate || !periodicity || !codev
        ) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        if(rules.length <= 0 || rules.filter(r => r.active).length <= 0) {
            NotificationManager.error('Vérifiez les règles');
            return;
        }

        let data = {
            type: 'MEMBER', project_reference: props.authUser.referralId,
            minBase, maxBase, bonificationBase: bonificationBase.reference,
            minRate, maxRate, bonificationMinRate, bonificationMaxRate,
            currency: currency.code, distribution: distribution.value,
            prevision, dotationMinRate, dotationMaxRate, periodicity: periodicity.value,
            codev_reference: codev.reference
        }
                
        props.setRequestGlobalAction(true);
        ProjectService.createSettingDetails(data).then(() => {
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
            <h1 className='mb-20'>Rappel des paramètres du plan</h1>
                <div className="row">
                    <div className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Plans disponibles
                        </InputLabel>
                        <Autocomplete
                            value={codev}
                            options={codevs}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setCodev(item)
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                </div>
                <div className="row mt-20">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="dat">
                            Taux du DAT MicroCap (En %)
                        </InputLabel>
                        <InputStrap
                            disabled
                            id="dat"
                            name='dat'
                            value={dat}
                            type="number"
                            className="input-lg"
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="remunerationRate">
                            Taux de rémunération d'un Ndjangui (En %)
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="number"
                            className="input-lg"
                            id="remunerationRate"
                            name='remunerationRate'
                            value={remunerationRate}
                        />
                    </FormGroup>
                </div>
                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="lineRate">
                            Taux d'intérêt de la ligne de placement (En %)
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="number"
                            id="lineRate"
                            name='lineRate'
                            value={lineRate}
                            className="input-lg"
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="capitalManagementRate">
                            Frais de gestion des fonds
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="number"
                            className="input-lg"
                            id="capitalManagementRate"
                            name='capitalManagementRate'
                            value={capitalManagementRate}
                        />
                    </FormGroup>
                </div>
                
                <h1 className='mb-20 mt-20'>Contre partie en numeraire des deals</h1>
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
                            Taux minimum (En %)
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
                            Taux maximum (En %)
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
                <h1 className='mb-20 mt-20'>Performances activités</h1>
                <CustomList
                    list={previsions}
                    loading={false}
                    itemsFoundText={n => `${n} previsions trouvées`}
                    onAddClick={() => setShowCreatePrevision(true)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune prevision trouvée
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Année d'exercice</th>
                                                <th className="fw-bold">Base</th>
                                                <th className="fw-bold">Valeur</th>
                                                <th className="fw-bold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.year}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{getBonificationBaseLabel(item.base)}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.value}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                deletePrevision(item.reference);
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
                <h1 className='mb-20 mt-20'>Bonification</h1>
                <div className='row'>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Début d'exercice
                        </InputLabel>
                        <Autocomplete
                            value={minYear}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setMinYear(item);
                            }}
                            getOptionLabel={(option) => option.year+""}
                            options={previsions}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Fin d'exercice
                        </InputLabel>
                        <Autocomplete
                            value={maxYear}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setMaxYear(item);
                            }}
                            getOptionLabel={(option) => option.year+""}
                            options={previsions}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                </div>
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
                            getOptionLabel={(option) => `Base: ${getBonificationBaseLabel(option.base)}, Valeur: ${option.value}`}
                            options={minYear && maxYear ? previsions : []}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Prevision de la base
                        </InputLabel>
                        <InputStrap
                            disabled
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
                            Taux minimal (En %)
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
                            Taux maximal (En %)
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
                    <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                    <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                    <UnitSelect className="col-md-4 col-sm-12 has-wrapper" label="Devise" isCurrency={true} initialValue={details?.find(t => t.type == 'CURRENCY')?.value} onChange={(c) => setCurrency(c)} />
                </div>

                <div className='row'>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
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
                            // value={dotationMinRate}
                            // onChange={(e) => setDotationMinRate(e.target.value)}
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
                                                <th className="fw-bold">Marché</th>
                                                <th className="fw-bold">Prix</th>
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

                <h1 className='mb-20 mt-20'>Options de financement</h1>
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
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Support</th>
                                                <th className="fw-bold">Valeur</th>
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
                                                <th className="fw-bold">Status</th>
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
                                                        <Switch
                                                            aria-label="Actif"
                                                            checked={item.active}
                                                            onChange={() => activeRule(item.reference) }
                                                        />
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
                        getCustomCarts();
                    }}
                    type='MEMBER'
                    project={{reference: props.authUser.referralId}}
                />

                <CreateFundingOption
                    show={showCreateFundingOption}
                    type='MEMBER'
                    onClose={() => {
                        setShowCreateFundingOption(false);
                        getOptions();
                    }}
                    project={{reference: props.authUser.referralId}}
                />

                <CreatePrevision
                    show={showCreatePrevision}
                    type='MEMBER'
                    project={{reference: props.authUser.referralId}}
                    onClose={() => {
                        setShowCreatePrevision(false);
                        getPrevisions();
                    }}
                />

                <CreateRule
                    show={showCreateRule}
                    project={{reference: props.authUser.referralId}}
                    type='MEMBER'
                    onClose={() => {
                        setShowCreateRule(false);
                        getRules();
                    }}
                />
            </RctCollapsibleCard>
        </div>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Create));
