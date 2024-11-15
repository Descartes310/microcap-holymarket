import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import UnitService from 'Services/units';
import { getTimeUnits } from 'Helpers/datas';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UserSelect from 'Components/UserSelect';
import ProjectService from 'Services/projects';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import AssociatedCost from 'Routes/custom/projects/components/AssociatedCost';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [part, setPart] = useState(null);
    const [units, setUnits] = useState([]);
    const [dueDates, setDueDates] = useState([]);
    const [project, setProject] = useState(null);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [mainCost, setMainCost] = useState(null);
    const [vehicule, setVehicule] = useState(null);
    const [timeUnit, setTimeUnit] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [amountUnit, setAmountUnit] = useState(null);
    const [startRentDate, setStartRentDate] = useState(null);
    const [locativeValue, setLocativeValue] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const [managementRate, setManagementRate] = useState(null);
    const [associatedCosts, setAssociatedCosts] = useState([]);
    const [minimalSubscription, setMinimalSubscription] = useState(null);

    useEffect(() => {
        getUnits();
        getProject();
        getProducts();
    }, []);

    const getUnits = () => {
        props.setRequestGlobalAction(false);
        UnitService.getUnits()
        .then((response) => setUnits(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }
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

    useEffect(() => {
        if(product) {
            getProductDetails(product.reference);
        }
    }, [product])

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductByModelCode({ code: 'NDBU' })
        .then(response => setProducts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getProductDetails = (reference) => {
        props.setRequestGlobalAction(true);
        ProductService.findProduct(reference).then(response => {
            setProductDetails(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getAmount = () => {
        return Number(Number(associatedCosts.reduce((amount, cost) => amount + cost.amount, 0)) + Number(mainCost));
    }

    const getPeriodicAmount = () => {
        return Number(Number(locativeValue) - (Number(locativeValue) * (Number(managementRate)/100)));
    }

    const getRentCount = (endDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        if(endDate && startRentDate) {
            const dayDiffs = (Math.round(Math.abs((new Date(endDate).getTime() - new Date(startRentDate).getTime()) / oneDay)));
            return dayDiffs;
        } else {
            return 0;
        }
    }

    // amount / montant ligne
    const getNdjanguiCount = () => {
        if(productDetails?.details) {
            const lineCount = productDetails.details.find(d => d.type == 'EMIT_LINE_COUNT')?.value;
            const quotient = productDetails.details.find(d => d.type == 'QUOTIENT')?.value;
            const cycleTime = productDetails.details.find(d => d.type == 'CYCLE_TIME')?.value;
            const depositAmount = productDetails.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value;
            if(lineCount && quotient && cycleTime && depositAmount) {
                return Math.ceil(getAmount() / ((Number(depositAmount) * Number(cycleTime)) * (Number(quotient)/100)));
            }
        }
        return 0;
    }

    const getMaximalSubscriptors = () => {
        if(productDetails?.details) {
            return Math.ceil(part * getNdjanguiCount() / minimalSubscription);
        }
        return 0;
    }

    const onSubmit = () => {

        console.log(dueDates);

        if(!project || !part || !startDate || !startRentDate || !label || !mainCost || !product || !timeUnit || !vehicule || !amountUnit || !locativeValue || !managementRate || !minimalSubscription || dueDates.length <= 0 || dueDates.some(obj => Object.values(obj).includes(null))) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            dueDates: JSON.stringify(dueDates),
            project_reference: project.reference, startDate,
            label, mainCost, locative_value: locativeValue, part, startRentDate,
            product_reference: product.reference, deposit_period: timeUnit.value,
            group_reference: vehicule.referralCode, unit_reference: amountUnit.code,
            management_rate: managementRate, minimal_subscription: minimalSubscription,
        }

        if(associatedCosts.length > 0) {
            data.associated_costs = JSON.stringify(associatedCosts)
        }

        props.setRequestGlobalAction(true);
        ProjectService.createInvestment(data)
        .then(() => {
            NotificationManager.success('L\' investissement a été créé avec succès');
            props.history.push(GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.FINANCEMENT.LIST);
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Une erreur est survenue lors de l\'investissement');
        }).finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className='row'>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="label">
                                Désignation investissement
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

                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="startDate">
                                Date de placement
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

                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="startRentDate">
                                Date de placement
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                id="startRentDate"
                                name='startRentDate'
                                className="input-lg"
                                value={startRentDate}
                                onChange={(e) => {
                                    setStartRentDate(e.target.value);
                                    getRentCount(e.target.value)
                                }}
                            />
                        </FormGroup>
                    </div>

                    <h1 className='mb-30'>Chiffres clés</h1>

                    <div className='row'>
                        <FormGroup className="has-wrapper col-sm-12 col-md-6">
                            <InputLabel className="text-left" htmlFor="mainCost">
                                Coût principal
                            </InputLabel>
                            <InputStrap
                                required
                                id="mainCost"
                                type="number"
                                name='mainCost'
                                className="input-lg"
                                value={mainCost}
                                onChange={(e) => setMainCost(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Devise
                            </InputLabel>
                            <Autocomplete
                                value={amountUnit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setAmountUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Coûts associés
                        </InputLabel>
                        <AssociatedCost 
                            costs={associatedCosts}
                            editable={true}
                            onSubmit={(item, isUpdate) => {
                                if(isUpdate) {
                                    setAssociatedCosts(associatedCosts.map(cost => {
                                        if(cost.id === item.id) {
                                            return {...cost, amount: item.amount, label: item.label};
                                        }
                                        return cost;
                                    }));
                                } else {
                                    setAssociatedCosts([...associatedCosts, {...item, id: new Date().getTime()}])
                                }
                            }}
                        />
                    </div>

                    <FormGroup className="has-wrapper col-sm-12 col-md-12">
                        <InputLabel className="text-left" htmlFor="totalCost">
                            Montant de l'investissement
                        </InputLabel>
                        <InputStrap
                            disabled={true}
                            id="totalCost"
                            type="number"
                            name='totalCost'
                            className="input-lg"
                            value={getAmount()}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left">
                            Ndjangui Business
                        </InputLabel>
                        <Autocomplete
                            value={product}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setProduct(item);
                            }}
                            getOptionLabel={(option) => `${option.label} | ${option.seller}`}
                            options={products}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="ndjanguiCount">
                            Nombre de ligne Ndjangui Business équivalent au montant de l'investissement
                        </InputLabel>
                        <InputStrap
                            type="number"
                            disabled={true}
                            id="ndjanguiCount"
                            name='ndjanguiCount'
                            className="input-lg"
                            value={getNdjanguiCount()}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="partCount">
                            Nombre de part
                        </InputLabel>
                        <InputStrap
                            value={part}
                            type="number"
                            id="partCount"
                            name='partCount'
                            className="input-lg"
                            onChange={(e) => setPart(e.target.value)}
                        />
                    </FormGroup>

                    <div className='row'>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="minimalSubscription">
                                Souscription minimale
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                className="input-lg"
                                id="minimalSubscription"
                                name='minimalSubscription'
                                value={minimalSubscription}
                                onChange={(e) => setMinimalSubscription(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="has-wrapper col-sm-6 col-md-4">
                            <InputLabel className="text-left" htmlFor="maximalSubscriptors">
                                Nombre de souscripteur maximal
                            </InputLabel>
                            <InputStrap
                                disabled={true}
                                id="maximalSubscriptors"
                                type="number"
                                name='maximalSubscriptors'
                                className="input-lg"
                                value={getMaximalSubscriptors()}
                            />
                        </FormGroup>

                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Période de versement des loyers
                            </InputLabel>
                            <Autocomplete
                                value={timeUnit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setTimeUnit(item);
                                }}
                                options={getTimeUnits()}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <h1 className='mb-30'>Objectifs</h1>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="locativeValue">
                            Valeur locative par période
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="locativeValue"
                            name='locativeValue'
                            className="input-lg"
                            value={locativeValue}
                            onChange={(e) => setLocativeValue(e.target.value)}
                        />
                    </FormGroup>

                    <div className='row'>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="managementRate">
                                Taux de gestion
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="managementRate"
                                name='managementRate'
                                className="input-lg"
                                value={managementRate}
                                onChange={(e) => setManagementRate(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="has-wrapper col-sm-6 col-md-4">
                            <InputLabel className="text-left" htmlFor="amount">
                                Montant par période
                            </InputLabel>
                            <InputStrap
                                disabled={true}
                                id="amount"
                                type="number"
                                name='amount'
                                value={getPeriodicAmount()}
                                className="input-lg"
                            />
                        </FormGroup>

                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor='partRate'>
                                Rémunération d'une part après gestion
                            </InputLabel>
                            <InputStrap
                                disabled={true}
                                id="partRate"
                                type="number"
                                name='partRate'
                                value={(getPeriodicAmount()/part).toFixed(2)}
                                className="input-lg"
                            />
                        </FormGroup>
                    </div>

                    <h1 className='mb-30'>Prévision de la rémunération d'une part</h1>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-middle mb-0 text-center">
                            <thead>
                                <tr>
                                    <td rowSpan={2}>Echéance</td>
                                    <td colSpan={3}>Exploitation</td>
                                    <td rowSpan={2}>Valorisation investissement</td>
                                    <td colSpan={4}>Rénumération</td>
                                    <td rowSpan={2}>Actions</td>
                                </tr>
                                <tr>
                                    <td>Taux</td>
                                    <td>Valeur locative</td>
                                    <td>Loyer échus</td>
                                    <td>Total loyer</td>
                                    <td>Part liquidative</td>
                                    <td>Total</td>
                                    <td>Rendement</td>
                                </tr>
                            </thead>
                            <tbody>
                                { dueDates.map((dueDate, index) => (
                                    <tr key={index}>
                                        <td>
                                            <InputStrap
                                                type="date"
                                                className="input-lg"
                                                id={`date-${index}`}
                                                name={`date-${index}`}
                                                value={dueDate.date}
                                                onChange={(e) => setDueDates(dueDates.map((dd, i) => {
                                                    if(i === index) {
                                                        return {...dd, date: e.target.value, totalRent: (dueDate.rent * getRentCount(dueDate.date))/part};
                                                    }
                                                    return dd;
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <InputStrap
                                                type="number"
                                                className="input-lg"
                                                id={`rate-${index}`}
                                                name={`rate-${index}`}
                                                value={dueDate.rate}
                                                onChange={(e) => setDueDates(dueDates.map((dd, i) => {
                                                    if(i === index) {
                                                        return {...dd, rate: Number(e.target.value)};
                                                    }
                                                    return dd;
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <InputStrap
                                                type="number"
                                                className="input-lg"
                                                id={`rent-${index}`}
                                                name={`rent-${index}`}
                                                value={dueDate.rent}
                                                onChange={(e) => setDueDates(dueDates.map((dd, i) => {
                                                    if(i === index) {
                                                        return {...dd, rent: Number(e.target.value), totalRent: (dueDate.rent * getRentCount(dueDate.date))/part, performance: (getAmount()/part)/(dueDate.pastRent * dueDate.rent)};
                                                    }
                                                    return dd;
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <InputStrap
                                                type="number"
                                                className="input-lg"
                                                id={`pastRent-${index}`}
                                                name={`pastRent-${index}`}
                                                value={dueDate.pastRent}
                                                onChange={(e) => setDueDates(dueDates.map((dd, i) => {
                                                    if(i === index) {
                                                        return {...dd, pastRent: Number(e.target.value), performance: (getAmount()/part)/(dueDate.pastRent * dueDate.rent)};
                                                    }
                                                    return dd;
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <InputStrap
                                                type="number"
                                                className="input-lg"
                                                id={`value-${index}`}
                                                name={`value-${index}`}
                                                value={dueDate.value}
                                                onChange={(e) => setDueDates(dueDates.map((dd, i) => {
                                                    if(i === index) {
                                                        return {...dd, value: Number(e.target.value)};
                                                    }
                                                    return dd;
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <InputStrap
                                                type="number"
                                                className="input-lg"
                                                id={`totalRent-${index}`}
                                                name={`totalRent-${index}`}
                                                value={(dueDate.rent * getRentCount(dueDate.date))/part}
                                                disabled={true}
                                            />
                                        </td>
                                        <td>
                                            <InputStrap
                                                type="number"
                                                className="input-lg"
                                                id={`part-${index}`}
                                                name={`part-${index}`}
                                                value={dueDate.part}
                                                onChange={(e) => setDueDates(dueDates.map((dd, i) => {
                                                    if(i === index) {
                                                        return {...dd, part: Number(e.target.value)};
                                                    }
                                                    return dd;
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <InputStrap
                                                type="number"
                                                className="input-lg"
                                                id={`total-${index}`}
                                                name={`total-${index}`}
                                                value={dueDate.total}
                                                onChange={(e) => setDueDates(dueDates.map((dd, i) => {
                                                    if(i === index) {
                                                        return {...dd, total: Number(e.target.value)};
                                                    }
                                                    return dd;
                                                }))}
                                            />
                                        </td>
                                        <td>
                                            <InputStrap
                                                type="number"
                                                disabled={true}
                                                className="input-lg"
                                                id={`performance-${index}`}
                                                value={(getAmount()/part)/(dueDate.pastRent * dueDate.rent)}
                                                name={`performance-${index}`}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={() => {
                                                    setDueDates([...dueDates.filter((_, i) => i !== index)])
                                                }}
                                                className="btn-danger mr-5 mb-10 text-white"
                                            >
                                                Supprimer
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={10}>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => {
                                                setDueDates([...dueDates, {
                                                    date: null,
                                                    rate: null,
                                                    rent: null,
                                                    pastRent: null,
                                                    value: null,
                                                    totalRent: null,
                                                    part: null,
                                                    total: null,
                                                    performance: null
                                                }])
                                            }}
                                            className="text-white font-weight-bold"
                                        >
                                            Ajouter une échéance
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <h1 className='mb-30 mt-30'>Véhicule d'investissement</h1>
                    
                    <UserSelect label={'Reference'} fromMyOrganisation={false} onChange={(_, user) => {
                        setVehicule(user);
                    }}/>

                    {/* <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="vehiculReference">
                            Reference
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            className="input-lg"
                            id="vehiculReference"
                            name='vehiculReference'
                            value={vehiculReference}
                            onChange={(e) => setVehiculReference(e.target.value)}
                        />
                    </FormGroup>

                    <div className='row'>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="nature">
                                Nature
                            </InputLabel>
                            <InputStrap
                                required
                                id="nature"
                                type="text"
                                name='nature'
                                className="input-lg"
                                value={nature}
                                onChange={(e) => setNature(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="has-wrapper col-sm-6 col-md-4">
                            <InputLabel className="text-left" htmlFor="juridicForm">
                                Forme juridique
                            </InputLabel>
                            <InputStrap
                                required
                                id="juridicForm"
                                type="text"
                                name='juridicForm'
                                className="input-lg"
                                value={juridicForm}
                                onChange={(e) => setJuridicForm(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Dénomination
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="denomination"
                                name='denomination'
                                className="input-lg"
                                value={denomination}
                                onChange={(e) => setDenomination(e.target.value)}
                            />
                        </FormGroup>
                    </div> */}

                    <h1 className='mt-10'>Financement</h1>

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