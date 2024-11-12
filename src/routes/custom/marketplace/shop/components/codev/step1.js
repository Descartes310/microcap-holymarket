import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import React, { Component } from 'react';
import { convertDate } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import ProjectService from 'Services/projects';
import Indivision from './createIndivision.tsx';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const subscriptionTypeEnum = [
    {
        label: 'Individuelle',
        value: 'ALONE'
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
    // {
    //     label: 'Joint',
    //     value: 'JOINT'
    // }
];

class CodevStep1 extends Component {

    state = {
        dates: [],
        plan: null,
        alias: null,
        aliases: [],
        projects: [],
        project: null,
        product: null,
        drawDate: null,
        cessible: false,
        indivision: null,
        editable: false,
        advanceType: null,
        advanceValue: null,
        selectedLine: null,
        distribution: null,
        selectedDate: null,
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
        ProductService.getIndivisionsByProduct({reference: this.props.product.reference})
        .then(response => {
            this.setState({ indivisions: [...this.state.indivisions, ...response
                .map(i => { return {...i, name: 'Date: '+convertDate(i.date, 'DD MMMM YYYY')+', Dénomination: '+i.denomination+', Montant: '+getPriceWithCurrency(i.amount, this.props.product?.details.find(d => d.type == 'PRICE_CURRENCY')?.value)}})] });
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
        let data = {};
        if(this.props.referralCode) {
            data.referralCode = this.props.referralCode;
        }
        ProjectService.getProjects(data).then(response => {
            this.setState({ projects: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onValidate = async () => {
        const { product, selectedDate, subscriptionType, indivision, project, distribution } = this.state;

        if(subscriptionType.value === 'INDIVISION' && indivision.id === 0) {
            this.setState({ showCreateIndivisionBox: true });
            return;
        }

        if (!product || (['ALONE', 'DEALS', 'SPOTS'].includes(subscriptionType.value) && !selectedDate )) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        if (!product || (['DEALS', 'SPOTS'].includes(subscriptionType.value) && (!selectedDate || !project || !distribution) )) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data = {
            product,
            selectedDate,  
            type: 'CODEV',
            subscriptionType, 
            productReference: product.reference
        }

        if (['DEALS', 'SPOTS'].includes(subscriptionType.value) && selectedDate && project && distribution) {
            data.projectReference = project.reference;
            data.distribution = distribution.value;
        }

        if(['ALONE', 'DEALS', 'SPOTS'].includes(subscriptionType.value)) {
            this.props.onSubmit(data);
        } else {
            data.indivision = indivision;
            this.props.onSubmit(data);
        }

    }

    render() {
        
        const { onClose, show, product } = this.props;
        const { dates, selectedDate, subscriptionType, indivisions, indivision, 
            showCreateIndivisionBox, distribution, projects, project } = this.state;

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
                    this.setState({ indivision: line }, () => {
                        this.onValidate()
                    });  
                }}
            /> :
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
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
                            options={this.props.product?.code !== 'NDBU' ? [] : subscriptionTypeEnum}
                            onChange={(__, item) => {
                                this.setState({ subscriptionType: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    {
                        subscriptionType != null && (
                         ['ALONE', 'DEALS', 'SPOTS'].includes(subscriptionType.value) ?
                    
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
                        </FormGroup> : 
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
                    )}
                    { subscriptionType != null && ['DEALS', 'SPOTS'].includes(subscriptionType.value) && (
                        <>
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                                <InputLabel className="text-left" htmlFor="startDate">
                                    Projets
                                </InputLabel>
                                <Autocomplete
                                    options={projects}
                                    value={project}
                                    id="combo-box-demo"
                                    onChange={(__, item) => {
                                        this.setState({ project: item });
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
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
                        </>
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