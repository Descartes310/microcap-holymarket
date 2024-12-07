import { connect } from 'react-redux';
import React, { Component } from 'react';
import { convertDate } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import Indivision from './createIndivision.tsx';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { NDJANGUI_BUSINESS_NOMINAL_AMOUNT } from 'Helpers/datas';

const subscriptionTypeEnum = [
    {
        label: 'Individuelle',
        value: 'INDIVIDUAL'
    },
    {
        label: 'Indivision',
        value: 'INDIVISION'
    },
    {
        label: 'Multi-deals',
        value: 'DEALS'
    },
    {
        label: 'Multi-spots',
        value: 'SPOTS'
    },
    {
        label: 'Big deal',
        value: 'BIGDEAL'
    }
];

class CodevStep1 extends Component {

    state = {
        dates: [],
        plan: null,
        alias: null,
        aliases: [],
        tirages: [],
        projects: [],
        project: null,
        product: null,
        drawDate: null,
        investments: [],
        cessible: false,
        lineCount: null,
        editable: false,
        investment: null,
        indivision: null,
        advanceType: null,
        advanceValue: null,
        selectedLine: null,
        maxLineCount: this.props.maxLineCount ?? null,
        distribution: null,
        selectedDate: null,
        currentTirage: null,
        lineCountWanted: null,
        subscriptionType: null,
        showCreateIndivisionBox: false,
        indivisions: [{id: 0, name: 'Nouvelle indivision'}],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.product) {
            this.findProduct();
        }
    }

    findIndivisions = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getIndivisionsByProduct({})
        .then(response => {
            this.setState({ indivisions: [...this.state.indivisions, ...response
                .map(i => { return {...i, name: 'Date: '+convertDate(i.date, 'DD MMMM YYYY')+', Dénomination: '+i.label+', Montant périodique: '+getPriceWithCurrency(i.amount, this.props.product?.details.find(d => d.type == 'PRICE_CURRENCY')?.value)}})] });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.product.reference)
        .then(response => {
            if (response.details.length <= 0) {
                NotificationManager.error('Produit non configuré');
                this.props.onClose();
            } else {
                this.setState({ product: response }, () => this.findTirageDates());
                this.findIndivisions();
                this.getProjects();
            }
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findTirageDates = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getFreeTirages({reference: this.props.product.reference})
        .then(response => {
            this.setState({ dates: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getProjects = () => {
        this.props.setRequestGlobalAction(true);
        let data = {subscription: true};
        if(this.props.referralCode) {
            data.referralCode = this.props.referralCode;
        }
        ProjectService.getProjects(data).then(response => {
            this.setState({ projects: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getProjectInvestments = () => {
        this.props.setRequestGlobalAction(true);
        ProjectService.getProjectInvestments({ reference: this.state.project.reference })
        .then(response => this.setState({ investments: response, investment: null }))
        .catch(() => {
            this.setState({ investments: [], investment: null })
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onValidate = async () => {
        const { product, subscriptionType, indivision, project, distribution, lineCount, tirages, maxLineCount, investment } = this.state;

        if(subscriptionType.value === 'INDIVISION' && indivision.id === 0) {
            this.setState({ showCreateIndivisionBox: true });
            return;
        }

        if(subscriptionType.value === 'SPOTS' && !investment) {
            NotificationManager.error('Les lignes ne sont pas correctes 0');
            return;
        }

        if (!product || (['INDIVIDUAL', 'DEALS', 'SPOTS', 'BIGDEAL'].includes(subscriptionType.value) && lineCount < 1) || (subscriptionType.value == 'SPOTS' && !investment)) {
            NotificationManager.error('Le formulaire est mal renseigné 1');
            return;
        }

        if ((indivision == null && tirages.reduce((sum, item) => sum + item.line, 0) != lineCount) || (['DEALS', 'SPOTS'].includes(subscriptionType.value) && lineCount > maxLineCount)) {
            NotificationManager.error('Les lignes ne sont pas correctes');
            return;
        }

        if (!product || (['DEALS', 'SPOTS'].includes(subscriptionType.value) && (!project || !distribution) )) {
            NotificationManager.error('Le formulaire est mal renseigné 2');
            return;
        }

        let data = {
            product,
            lineCount,
            type: 'CODEV',
            subscriptionType, 
            productReference: product.reference,
            tirages: tirages.map(t => { return {date: t.date, line: t.line}}),
            linePrice: this.state.product.details.find(d => d.type == 'LINE_FEES')?.value ?? 0
        }

        if (['DEALS', 'SPOTS'].includes(subscriptionType.value) && project && distribution) {
            data.projectReference = project.reference;
            data.distribution = distribution.value;
        }

        if (['SPOTS'].includes(subscriptionType.value) && investment) {
            data.projectInvestment = investment.reference;
        }

        if(['INDIVIDUAL', 'DEALS', 'SPOTS', 'BIGDEAL'].includes(subscriptionType.value)) {
            this.props.onSubmit(data);
        } else {
            data.indivision = indivision;
            this.props.onSubmit(data);
        }

    }

    render() {
        
        const { onClose, show, product } = this.props;
        const { dates, selectedDate, subscriptionType, indivisions, indivision, tirages, investment, investments,
            showCreateIndivisionBox, distribution, projects, project, lineCount, currentTirage, lineCountWanted, maxLineCount } = this.state;

        return (
            showCreateIndivisionBox
            ? <Indivision
                data={{
                    product,
                    selectedDate,  
                    type: 'CODEV',
                    subscriptionType, 
                    productReference: product.reference 
                }}
                show={showCreateIndivisionBox}
                onClose={() => {
                    this.setState({ showCreateIndivisionBox: false });
                }}
                onValidate={(line) => {
                    this.setState({ indivision: line, lineCount: 1, tirages: [{date: selectedDate.date, line: 1}]}, () => {
                        this.onValidate()
                    });  
                }}
            /> :
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        Configuration du produit
                    </h3>
                )}
            >
                <RctCardContent>
                    <h1>Specification de la souscription</h1>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left">
                            Type de souscription
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={subscriptionType}
                            options={this.state.product?.modelCode !== 'NDBU' ? [] : subscriptionTypeEnum}
                            onChange={(__, item) => {
                                this.setState({ subscriptionType: item, project: null, investment: null, investments: [], lineCount: null, lineCountWanted: null, tirages: [] });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    { subscriptionType != null && ['DEALS', 'SPOTS'].includes(subscriptionType.value) && (
                         <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                            <InputLabel className="text-left" htmlFor="startDate">
                                Projets
                            </InputLabel>
                            <Autocomplete
                                options={projects}
                                value={project}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    const maxLine = Math.ceil(item.amountSubscribed / (Number(this.state.product.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value) * Number(this.state.product.details.find(d => d.type == 'CYCLE_TIME')?.value)));
                                    this.setState({ project: item, lineCount: subscriptionType?.value == 'DEALS' ? maxLine : null, maxLineCount: subscriptionType?.value == 'DEALS' ? maxLine : null }, () => {
                                        if(subscriptionType?.value == 'SPOTS') {
                                            this.getProjectInvestments();
                                        }
                                    });
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}
                    { subscriptionType != null && ['SPOTS'].includes(subscriptionType.value) && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                            <InputLabel className="text-left" htmlFor="startDate">
                                Fiche d'investissement
                            </InputLabel>
                            <Autocomplete
                                options={investments}
                                value={investment}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    const maxLine = Math.ceil(item.totalCost / NDJANGUI_BUSINESS_NOMINAL_AMOUNT);
                                    this.setState({ investment: item, lineCount: subscriptionType?.value == 'SPOTS' ? maxLine : null, maxLineCount: subscriptionType?.value == 'SPOTS' ? maxLine : null });
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}

                    {
                        subscriptionType != null && (
                            (['INDIVIDUAL', 'BIGDEAL'].includes(subscriptionType.value) || (['DEALS', 'SPOTS'].includes(subscriptionType.value) && project)) ?
                        <>
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="lineCount">
                                    Nombre de ligne souhaité {['DEALS', 'SPOTS'].includes(subscriptionType.value) && `(Nombre de ligne maximal = ${maxLineCount})` }
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="number"
                                    id="lineCount"
                                    name='lineCount'
                                    value={lineCount}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ lineCount: this.props.maxLineCount && this.props.maxLineCount < Math.ceil(e.target.value) ? this.props.maxLineCount : Math.ceil(e.target.value) })}
                                />
                            </FormGroup>
                            <CustomList
                                list={tirages}
                                loading={false}
                                itemsFoundText={n => `${n} tirages trouvés`}
                                renderItem={list => (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Date</th>
                                                    <th className="fw-bold">Lignes dispo.</th>
                                                    <th className="fw-bold">Lignes voulues ({tirages.reduce((sum, item) => sum + item.line, 0)} / {lineCount})</th>
                                                    <th className="fw-bold">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item.date}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item.available} lignes</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item.line}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td onClick={() => {
                                                            this.setState({ tirages: tirages.filter(t => t.date != item.date)})
                                                        }}>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold" style={{ color: 'red' }}>Annuler</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="cursor-pointer">
                                                    <td>
                                                        <Autocomplete
                                                            id="combo-box-demo"
                                                            value={currentTirage}
                                                            onChange={(__, item) => {
                                                                this.setState({ currentTirage: item });
                                                            }}
                                                            options={dates.filter(d => !tirages.map(t => t.date).includes(d.date))}
                                                            getOptionLabel={(option) => `${convertDate(option.date, 'DD MMMM YYYY')}`}
                                                            // getOptionLabel={(option) => `${convertDate(option.date, 'DD MMMM YYYY')} (${option.lineCount - option.lineBooked} / ${option.lineCount} lignes disponibles)`}
                                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                {currentTirage ? currentTirage.lineCount - currentTirage?.lineBooked : ''} 
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <InputStrap
                                                            min={0}
                                                            id="amount"
                                                            name='amount'
                                                            type="number"
                                                            className="input-lg"
                                                            value={lineCountWanted}
                                                            max={currentTirage ? currentTirage.lineCount - currentTirage?.lineBooked : 0}
                                                            onChange={(e) => this.setState({lineCountWanted: Math.ceil(e.target.value)})}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            disabled={(lineCountWanted + tirages.reduce((sum, item) => sum + item.line, 0)) > lineCount }
                                                            onClick={() => {
                                                                if(currentTirage && lineCountWanted && lineCountWanted > 0 && lineCountWanted <= (currentTirage.lineCount - currentTirage?.lineBooked)) {
                                                                    this.setState({
                                                                        tirages: [...tirages, {date: currentTirage.date, available: currentTirage.lineCount - currentTirage?.lineBooked, line: lineCountWanted}],
                                                                        currentTirage: null, lineCountWanted: ''
                                                                    })
                                                                } else {
                                                                    NotificationManager.error('Veuillez bien renseigner le formulaire')
                                                                }
                                                            }}
                                                        >
                                                            Ajouter
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            />
                        </> : 
                        ['INDIVISION'].includes(subscriptionType.value) && (
                            <>
                                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                                    <InputLabel className="text-left">
                                        Indivisions disponibles
                                    </InputLabel>
                                    <Autocomplete
                                        options={indivisions}
                                        value={indivision}
                                        id="combo-box-demo"
                                        onChange={(__, item) => {
                                            this.setState({ indivision: item });
                                        }}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </FormGroup>

                                { indivision?.id === 0 && (
                                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                                        <InputLabel className="text-left" htmlFor="startDate">
                                            Date du tirage
                                        </InputLabel>
                                        <Autocomplete
                                            options={dates}
                                            value={selectedDate}
                                            id="combo-box-demo"
                                            onChange={(__, item) => {
                                                this.setState({ selectedDate: item });
                                            }}
                                            getOptionLabel={(option) => convertDate(option.date, 'DD MMMM YYYY')}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </FormGroup>
                                )}
                            </>
                        )
                    )}
                    { subscriptionType != null && ['DEALS', 'SPOTS'].includes(subscriptionType.value) && project && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Mode de distribution
                            </InputLabel>
                            <Autocomplete
                                value={distribution}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    this.setState({ distribution: item });
                                }}
                                getOptionLabel={(option) => option.label}
                                options={[
                                    {label: 'Libre', value: 'PUBLIC'},
                                    {label: 'Privée', value: 'PRIVATE'}
                                ]}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => { this.onValidate() }}
                            className="text-white font-weight-bold mb-20"
                        >
                            Soumettre
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevStep1));