import moment from "moment";
import { connect } from 'react-redux';
import UnitService from 'Services/units';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AssociatedCost from '../../components/AssociatedCost';
import { PROJECT, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { NDJANGUI_BUSINESS_NOMINAL_AMOUNT, getTimeUnits } from 'Helpers/datas';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { getPriceWithCurrency } from "Helpers/helpers";

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [units, setUnits] = useState([]);
    const [rent, setRent] = useState(null);
    const [project, setProject] = useState(null);
    const [mainCost, setMainCost] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [periodCount, setPeriodCount] = useState(null);
    const [periodicity, setPeriodicity] = useState(null);
    const [rateOfReturn, setRateOfReturn] = useState(null);
    const [periodicRent, setPeriodicRent] = useState(null);
    const [associatedCosts, setAssociatedCosts] = useState([]);

    useEffect(() => {
        getUnits();
        getProject();
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
        ProjectService.getProjectByReference(props.match.params.id)
        .then((response) => setProject(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getAmount = () => {
        return Number(Number(associatedCosts.reduce((amount, cost) => amount + (cost.amount * cost.quantity), 0)) + Number(mainCost));
    }

    const getAmortizations = () => {
        if(startDate && periodCount && periodicity) {
            let date = moment(startDate).subtract(1, 'days');
            let amortizations = [];
            for (let index = 0; index < periodCount; index++) {
                amortizations[index] = {date: date.add(periodicity.days, 'days').format('LL')}
            }
            console.log(amortizations);
            return amortizations;
        } else {
            return [];
        }
    }

    const onSubmit = () => {

        if(!project || !startDate || !label || !mainCost || !periodicity || !currency || associatedCosts.length <= 0 || !periodCount || !rateOfReturn || !periodicRent) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            project_reference: project.reference, startDate,
            label, mainCost, associated_costs: JSON.stringify(associatedCosts),
            deposit_period: periodicity.value, currency: currency.code, periodCount,
            rateOfReturn, periodicRent
        }

        props.setRequestGlobalAction(true);
        ProjectService.createInvestment(data)
        .then(() => {
            NotificationManager.success('L\' investissement a été créé avec succès');
            props.history.push(joinUrlWithParamsId(PROJECT.MINE.FUNDING.LIST, project?.reference));
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Une erreur est survenue lors de l\'investissement');
        }).finally(() => props.setRequestGlobalAction(false))
    }

    useEffect(() => {
        getPeriodicRate();
    }, [rateOfReturn, periodicity])

    useEffect(() => {
        getRent();
    }, [mainCost, associatedCosts, rateOfReturn, periodCount, periodicity])

    const getBrutAmount = () => {
        if(mainCost && associatedCosts) {
            return (Number(mainCost) + Number(associatedCosts.reduce((a, cost) => a + (cost.amount * cost.quantity), 0)));
        } else {
            return 0
        }
    }

    const getPeriodicRate = () => {
        if(rateOfReturn && periodicity) {
            setPeriodicRent(rateOfReturn/periodicity.gap);
        } else {
            setPeriodicRent(0);
        }
    }

    const getRent = () => {
        if(mainCost && associatedCosts && rateOfReturn && periodCount && periodicity) {
            setRent((getBrutAmount() * (Number(periodicRent)/100)) / (1-Math.pow(1+(Number(periodicRent)/100), (-1 * Number(periodCount)) )));
        } else {
            setRent(0);
        }
    }

    const getInitialCapital = (rank) => {
        if(rank == 1) {
            return getAmount();
        } else {
            return getRemaningCapital(rank - 1)
        }
    }

    const getCost = (rank) => {
        return getInitialCapital(rank) * (periodicRent/100);
    }

    const getRepaidCapital = (rank) => {
        return rent - getCost(rank);
    }

    const getRemaningCapital = (rank) => {
       return rent * (1- Math.pow(1+(periodicRent/100), (-1 * (periodCount - rank))))/(periodicRent/100);
    }

    const getCumulatedCost = (rank) => {
        if(rank == 1) {
            return getCost(rank);
        } else {
            return getCumulatedCost(rank-1) + getCost(rank);
        }
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'un investissement"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className='row'>
                        <FormGroup className="has-wrapper col-sm-12 col-md-6">
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

                        <FormGroup className="has-wrapper col-sm-12 col-md-6">
                            <InputLabel className="text-left" htmlFor="startDate">
                                Date de financement
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                id="startDate"
                                name='startDate'
                                className="input-lg"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                }}
                            />
                        </FormGroup>

                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Devise du finanement
                            </InputLabel>
                            <Autocomplete
                                value={currency}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setCurrency(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <h1 className='mb-30'>Coût de l'investissement</h1>

                    <FormGroup className="has-wrapper col-sm-12 col-md-12">
                        <InputLabel className="text-left" htmlFor="mainCost">
                            Investissement brut
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
                                            return {...cost, amount: item.amount, label: item.label, quantity: item.quantity};
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
                            Coût de l'investissement
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

                    <h1 className='mb-30'>Amortissement de l'investissement</h1>

                    <div className='row'>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Périodicité d'amortissement
                            </InputLabel>
                            <Autocomplete
                                value={periodicity}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setPeriodicity(item);
                                }}
                                options={getTimeUnits()}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="periodCount">
                                Durée de l'amortissement (en nbre de période)
                            </InputLabel>
                            <InputStrap
                                required
                                id="periodCount"
                                type="number"
                                name='periodCount'
                                className="input-lg"
                                value={periodCount}
                                onChange={(e) => setPeriodCount(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="periodYearCount">
                                Durée en nombre d'année
                            </InputLabel>
                            <InputStrap
                                disabled={true}
                                type="number"
                                id="periodYearCount"
                                name='periodYearCount'
                                className="input-lg"
                                value={(periodicity && periodCount) ? (periodCount * periodicity.days)/360 : 0}
                            />
                        </FormGroup>
                    </div>

                    <h1 className='mb-30'>Financement de l'investissement</h1>

                    <div className='row'>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="rateOfReturn">
                                Taux de rendement (par année en %)
                            </InputLabel>
                            <InputStrap
                                required
                                id="rateOfReturn"
                                type="number"
                                name='rateOfReturn'
                                className="input-lg"
                                value={rateOfReturn}
                                onChange={(e) => setRateOfReturn(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="periodicRent">
                                Taux périodique (En %)
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                disabled={true}
                                id="periodicRent"
                                name='periodicRent'
                                className="input-lg"
                                value={Number(periodicRent).toFixed(2)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-sm-12 col-md-4">
                            <InputLabel className="text-left" htmlFor="rent">
                                Loyer
                            </InputLabel>
                            <InputStrap
                                required
                                id="rent"
                                name='rent'
                                type="number"
                                disabled={true}
                                className="input-lg"
                                value={Number(rent).toFixed(2)}
                            />
                        </FormGroup>
                    </div>

                    <FormGroup className="has-wrapper col-sm-12 col-md-12">
                        <InputLabel className="text-left" htmlFor="totalCost">
                            Nombre de ligne Ndjangui multi-spot équivalent
                        </InputLabel>
                        <InputStrap
                            disabled={true}
                            id="totalCost"
                            type="number"
                            name='totalCost'
                            className="input-lg"
                            value={Math.ceil(getAmount()/NDJANGUI_BUSINESS_NOMINAL_AMOUNT)}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Tableau d'amortissement du financement
                        </InputLabel>
                        <CustomList
                            loading={false}
                            list={getAmortizations()}
                            itemsFoundText={n => `${n} amortissement trouvés`}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun amortissement trouvé
                                            </h4>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="fw-bold">Rang</th>
                                                        <th className="fw-bold">Echéance</th>
                                                        <th className="fw-bold">Capital initial</th>
                                                        <th className="fw-bold">Loyer</th>
                                                        <th className="fw-bold">Coût</th>
                                                        <th className="fw-bold">Capital remboursé</th>
                                                        <th className="fw-bold">Capital restant</th>
                                                        <th className="fw-bold">Coût cumulé</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{0}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">-</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">-</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">-</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">-</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">-</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(getAmount(), currency?.code)}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">-</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {list && list.map((item, key) => (
                                                        <tr key={key} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{key+1}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.date}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        {getInitialCapital(key+1).toFixed(2)} {currency?.code}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        {rent.toFixed(2)} {currency.code}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        {getCost(key+1).toFixed(2)} {currency.code}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        {getRepaidCapital(key+1).toFixed(2)} {currency.code}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        {getRemaningCapital(key+1).toFixed(2)} {currency?.code}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        {getCumulatedCost(key+1).toFixed(2)} {currency.code}
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
                    </div>

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