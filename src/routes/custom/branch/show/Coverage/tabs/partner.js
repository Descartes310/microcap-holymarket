import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import IntlMessages from 'Util/IntlMessages';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { getProducts, setRequestGlobalAction } from "Actions";
import { getOrganisationByReference, createPartner, getPartnersByBranch, getUsersAccounts, addOperator, getPartnersOperatorByBranch } from 'Actions/independentActions'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';


class ClassicSale extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            contrat: '',
            adhesion: '',
            selectedType: null,
            partners: [],
            loading: true,
            showBox: false,
            organisation: null,
            type: null,
            accounts: [],
            operators: []
        }
    }

    componentDidMount() {
        //this.getUsersAccountsBranchs();
        this.getPartners(this.props.authUser.user.branch.id);
    }

    onResearch = () => {
        getOrganisationByReference(this.state.adhesion).then(data => {
            this.setState({ organisation: data })
        }).catch(err => {
            this.setState({ organisation: null })
        })
    };

    getPartners = (id) => {
        this.setState({ loading: true });
        getPartnersByBranch(id).then(data => {
            console.log(data)
            this.setState({ partners: data })
        }).catch(err => {
            this.setState({ partners: [] })
        }).finally(() => this.setState({ loading: false }))
    };

    getPartnersOperator = () => {
        this.setState({ loading: true });
        getPartnersOperatorByBranch(this.props.authUser.user.branch.id, this.props.authUser.user.hostCountry).then(data => {
            this.setState({ operators: data })
        }).catch(err => {
            this.setState({ operators: [] })
        }).finally(() => this.setState({ loading: false, showOperator: true }))
    };

    getUsersAccountsBranchs = (type) => {
        this.setState({ loading: true });
        getUsersAccounts(this.props.authUser.user.branch.id, type).then(data => {
            this.setState({ accounts: data, showBox: true, selectedType: type })
        }).catch(err => {
            this.setState({ partners: [] })
        }).finally(() => this.setState({ loading: false }))
    };

    onSubmit = () => {
        createPartner(this.state.organisation.id, this.state.contrat, this.state.type).then(data => {
            this.setState({ organisation: null, contrat: '', showBox: false })
            this.getPartners(this.props.authUser.user.branch.id);
        }).catch(err => {
            NotificationManager.error("Echec de la création du partenaire")
            this.setState({ organisation: null, contrat: '', showBox: false })
        })
    };

    render() {
        const { partners, loading } = this.state;
        const { usersAccounts } = this.props;

        return (
            <>
                <Accordion>
                    <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                        <Typography>Opérateur Microcap</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CustomList
                            loading={loading}
                            list={partners.filter(p => p.networkProfile.type == 'OPERATOR')}
                            style={{ width: '-webkit-fill-available' }}
                            onAddClick={() => this.getUsersAccountsBranchs('OPERATOR')}
                            // titleList={"Produits"}
                            itemsFoundText={n => `${n} partenaires trouvés`}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun partenaire trouvés
                                    </h4>
                                        </div>
                                    ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0 text-center">
                                                    <thead>
                                                        <tr>
                                                            <th><IntlMessages id="components.name" /></th>
                                                            <th>Email</th>
                                                            <th>Numéro de contrat</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.organisation ? item.organisation.commercialName : item.person.firstName + ' ' + item.person.lastName}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.organisation ? item.organisation.user.email : item.person.user.email}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.contractNumber}</h4>
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
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                        <Typography>Communauté Microcap</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CustomList
                            loading={loading}
                            list={partners.filter(p => p.networkProfile.type == 'COMMUNITY')}
                            style={{ width: '-webkit-fill-available' }}
                            onAddClick={() => this.getUsersAccountsBranchs('COMMUNITY')}
                            // titleList={"Produits"}
                            itemsFoundText={n => `${n} partenaires trouvés`}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun partenaire trouvés
                                    </h4>
                                        </div>
                                    ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0 text-center">
                                                    <thead>
                                                        <tr>
                                                            <th><IntlMessages id="components.name" /></th>
                                                            <th>Email</th>
                                                            <th>Numéro de contrat</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.organisation ? item.organisation.commercialName : item.person.firstName + ' ' + item.person.lastName}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.organisation ? item.organisation.user.email : item.person.user.email}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.contractNumber}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Button
                                                                        size="large"
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3"}
                                                                        onClick={() => this.getPartnersOperator()}
                                                                    >
                                                                        Operateur de supervision
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
                    </AccordionDetails>
                </Accordion>
                <Dialog
                    open={this.state.showOperator}
                    onClose={() => this.setState({ showOperator: false })}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Sélectionner un opérateur
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showOperator: false }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <table className="table table-hover table-middle mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th><IntlMessages id="components.name" /></th>
                                        <th>Email</th>
                                        <th>Numéro de contrat</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.operators && this.state.operators.map((item, key) => (
                                        <tr key={key} className="cursor-pointer">
                                            <td>
                                                <div className="media">
                                                    <div className="media-left media-middle mr-15">
                                                        {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                    </div>
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{item.organisation ? item.organisation.commercialName : item.person.firstName + ' ' + item.person.lastName}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-left media-middle mr-15">
                                                        {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                    </div>
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{item.organisation ? item.organisation.user.email : item.person.user.email}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-left media-middle mr-15">
                                                        {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                    </div>
                                                    <div className="media-body pt-10">
                                                        <h4 className="m-0 fw-bold text-dark">{item.contractNumber}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button
                                                    size="large"
                                                    color="primary"
                                                    variant="contained"
                                                    className={"text-white font-weight-bold mr-3"}
                                                    onClick={() => NotificationManager.success("Opérateur assigné avec succès")}
                                                >
                                                    Assigner
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={this.state.showBox}
                    onClose={() => { this.setState({ showBox: false }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Créer un nouveau partenaire
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showBox: false }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-12">
                                <Form onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <FormGroup className="col-md-10 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="adhesion">
                                                Numéro d'adhésion
                                            </InputLabel>
                                            <InputStrap
                                                required
                                                id="adhesion"
                                                type="text"
                                                name={'adhesion'}
                                                className="has-input input-lg"
                                                value={this.state.adhesion}
                                                onChange={(e) => this.setState({ adhesion: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-md-2 col-sm-12">
                                            <InputLabel className="text-left" htmlFor="defautlPrice">

                                            </InputLabel>
                                            <Button
                                                color="primary"
                                                // disabled={this.props.requestGlobalLoader}
                                                variant="contained"
                                                onClick={() => this.onResearch()}
                                                className="text-white font-weight-bold"
                                            >
                                                Rechercher
                                            </Button>
                                        </FormGroup>
                                    </div>
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="typeCatalogName">
                                            Raison social
                                        </InputLabel>
                                        <InputStrap
                                            disabled
                                            type="text"
                                            className="input-lg"
                                            id="typeCatalogName"
                                            name="typeCatalogName"
                                            value={this.state.organisation?.corporateName}
                                        />
                                    </FormGroup>
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="typeCatalogName">
                                            Nom commercial
                                        </InputLabel>
                                        <InputStrap
                                            disabled
                                            type="text"
                                            className="input-lg"
                                            id="typeCatalogName"
                                            name="typeCatalogName"
                                            value={this.state.organisation?.commercialName}
                                        />
                                    </FormGroup>
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="typeCatalogName">
                                            Immatriculation
                                        </InputLabel>
                                        <InputStrap
                                            disabled
                                            type="text"
                                            className="input-lg"
                                            id="typeCatalogName"
                                            name="typeCatalogName"
                                            value={this.state.organisation?.immatriculationValue}
                                        />
                                    </FormGroup>
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="type">
                                            Type de partenariat
                                        </InputLabel>
                                        <select
                                            className="form-control"
                                            style={{ width: '100%', display: 'inline-block' }}
                                            onChange={(e) => this.setState({ type: e.target.value })}
                                        >
                                            <option value={null}>
                                                Choisissez un partenariat
                                            </option>
                                            {
                                                this.state.accounts.map(ua => (
                                                    <option key={ua.id} value={ua.id}>
                                                        {ua.label}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </FormGroup>
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="contrat">
                                            Numéro du contrat
                                        </InputLabel>
                                        <InputStrap
                                            type="text"
                                            className="input-lg"
                                            id="contrat"
                                            name="contrat"
                                            value={this.state.contrat}
                                            onChange={(e) => this.setState({ contrat: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button
                                            color="primary"
                                            disabled={!this.state.organisation || this.state.contrat.length <= 0 || !this.state.type}
                                            variant="contained"
                                            onClick={() => this.onSubmit()}
                                            className="text-white font-weight-bold"
                                        >
                                            Créer le partenaire
                                            </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>

                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

// map state to props
const mapStateToProps = ({ requestGlobalLoader, products, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: products.loading,
        products: products.data,
        error: products.error
    }
};

export default connect(mapStateToProps, { getProducts, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(ClassicSale))));
