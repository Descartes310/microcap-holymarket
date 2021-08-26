import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from "Actions";
import { getOrderPayments, getOrderDetails, uploadOrderPiece } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import Button from "@material-ui/core/Button";
import TimeFromMoment from "Components/TimeFromMoment";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import AmountCurrency from "Components/AmountCurrency";
import { joinUrlWithParamsId, STORE, PRODUCT, joinUrlWithParams } from "Url/frontendUrl";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import { FormGroup, Input as InputStrap } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import {getFilePath} from "Helpers/helpers";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
// import { Button } from "reactstrap";

class OrderShow extends Component {

    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.sale = this.props.match.location?.state.sale
            ? JSON.parse(this.props.match.location?.state.sale)
            : null;
        this.state = {
            loading: true,
            showBox: false,
            name: '',
            file: null,
            product: { order: { orderItems: [] } },
            payments: {},
            docs: null,
            pieceAction: {
                doc: null,
                action: 'add'
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    onContinueClick = () => {
        const url = joinUrlWithParamsId(STORE.CHECKOUT, this.state.product.order.id);
        this.props.history.push(url);
    };

    computeTotal() {
        let total = 0;
        this.state.product.order.orderItems.forEach(o => {
            total = total + o.typeProduct.price * o.quantity;
        })
        return total;
    }

    onEnterClick = (product, type) => {
        let url = joinUrlWithParams(PRODUCT.DETAILS, [{ param: 'id', value: product.id }, { param: 'type', value: type }]);
        this.props.history.push(url);
    };

    loadData = () => {
        this.setState({ loading: true });
        getOrderDetails(this.props.match.params.id)
            .then(res => {
                const product = res.sale, docs = res.docs;
                this.setState({ product, docs });
                if (product.order.acceptManyPayment) {
                    this.loadPayments();
                }
            })
            .catch(() => null)
            .finally(() => this.setState({ loading: false }));
    };

    loadPayments = () => {
        getOrderPayments(this.props.match.params.id)
            .then(payments => {
                this.setState({ payments });
            })
            .catch(() => null)
    };

    onActionOnPiece = (doc, action) => {
          this.setState({pieceAction: {doc, action}, showBox: true});
    };

    createPiece = () => {
        this.props.setRequestGlobalAction(true);
        uploadOrderPiece(this.state.product.order.id, {
            file: this.state.file,
            commercialPieceId: this.state.pieceAction.doc.id
        }, { fileData: ['file'], multipart: true })
            .then(data => {
                const _docs = [...this.state.docs];
                const doc = _docs.find(d => d.id === this.state.pieceAction.doc.id);
                if (doc) {
                    doc.file = data.file;
                    this.setState({
                        docs: _docs,
                        showBox: false,
                        pieceAction: {doc: null, action: 'add'}
                    });
                } else {
                    this.setState({ showBox: false, pieceAction: {doc: null, action: 'add'}});
                }
                NotificationManager.success("La pièce a été renseignée avec succès");
        }).catch(err => {
            console.log(err);
            NotificationManager.error("La pièce n'a pas pu etre renseignée");
        }).finally(() => {
            this.setState({ showBox: false });
            this.props.setRequestGlobalAction(false);
        });
    };

    render() {
        const { payments, product, showBox, loading, docs } = this.state;
        const { match, history } = this.props;

        console.log("docs => ", docs);

        if (loading) {
            return (<RctSectionLoader />)
        }

        return (
            <RctCollapsibleCard>
                <PageTitleBar title={"Détails de la commande " + product.order.name} match={match} history={history} enableBreadCrumb={true} />
                {product.order.orderStatus == 'PAID' ?
                    <span style={{ backgroundColor: 'rgba(0, 2000, 0, 0.5)', border: 10, padding: 10, borderRadius: 5, color: 'white', marginBottom: 20 }}>
                        Commande payée
                    </span> :
                    product.order.orderStatus == 'NOT_PAID' ?
                        <span style={{ backgroundColor: 'rgba(200, 0, 0, 0.5)', border: 10, padding: 10, borderRadius: 5, color: 'white', marginBottom: 20 }}>
                            Commande non payée
                    </span>
                        :
                        <span style={{ backgroundColor: '#ffc107', border: 10, padding: 10, borderRadius: 5, color: 'white', marginBottom: 20 }}>
                            En cours de paiement
                    </span>
                }
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 50
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Numéro de la commande</h2>
                            <span>{product.order.name}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Adresse de livraison 1</h2>
                            <span>{product.order.address1}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Adresse de livraison 2</h2>
                            <span>{product.order.address2}</span>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Pays</h2>
                            <span>{product.order.country}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Ville</h2>
                            <span>{product.order.city}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Code zip</h2>
                            <span>{product.order.zip}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Date de la commande</h2>
                            <span>{product.order.createdAt ? <TimeFromMoment time={product.order.createdAt} showFullDate /> : null}</span>
                        </div>
                    </div>
                </div>
                {
                    product.order.acceptManyPayment && payments.sales ?
                        <>
                            <h1 style={{ marginTop: 40 }}>Liste des paiements effectués (<AmountCurrency amount={payments.amount} from={payments.currency} /> sur <AmountCurrency style={{ color: '#ffc107' }} amounts={product.order.orderItems.map((e) => {
                                return { amount: e.typeProduct.price, currency: e.typeProduct.product ? e.typeProduct.product.priceCurrency : e.typeProduct.package1.currency, quantity: e.quantity }
                            })} />)</h1>
                            <CustomList
                                loading={false}
                                list={payments.sales}
                                // titleList={"Liste des produits commandés"}
                                itemsFoundText={n => `${n} paiements trouvés`}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucun paiements trouvés pour la commande
                                    </h4>
                                            </div>
                                        ) : (
                                                <div className="table-responsive">
                                                    <table className="table table-hover table-middle mb-0 text-center">
                                                        <thead>
                                                            <tr>
                                                                <th>Numéro</th>
                                                                <th>Montant</th>
                                                                <th>Devise</th>
                                                                <th>Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {list && list.map((item, key) => (
                                                                <tr key={key} className="cursor-pointer">
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark"><AmountCurrency amount={item.amount} from={item.currency.code} /></h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.currency.name}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.createdAt} showFullDate /></h4>
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
                        </> : null}

                {product.order.indirectSale && (
                    <CustomList
                        list={docs}
                        loading={false}
                        titleList={"List des pieces"}
                        itemsFoundText={n => ``}
                        showSearch={false}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucune pieces trouvés
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Nom de la piece</th>
                                                    <th>Exemple de piece</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {list && list.map((doc, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{doc.userPiece.name}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">
                                                                    <a href={getFilePath(doc.userPiece.file)} target="_blank">
                                                                        Cliquer pour voir un exemple
                                                                    </a>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                {doc.file ? (
                                                                    <div className="center-ver">
                                                                        <a href={getFilePath(doc.file)} target="_blank" className="btn btn-outline-info">
                                                                            Voir la piece uploadé
                                                                        </a>
                                                                        <Button
                                                                            size="small"
                                                                            color="primary"
                                                                            // disabled={loading}
                                                                            variant="contained"
                                                                            className={"text-white font-weight-bold ml-2 bg-blue"}
                                                                            onClick={() => this.onActionOnPiece(doc, 'replace')}
                                                                        >
                                                                            Remplacer la piece
                                                                        </Button>
                                                                        {/*<Button
                                                                            size="small"
                                                                            color="primary"
                                                                            // disabled={loading}
                                                                            variant="contained"
                                                                            className={"text-white font-weight-bold mr-3 bg-danger"}
                                                                            onClick={() => this.onEnterClick(item.typeProduct.product ? item.typeProduct.product : item.typeProduct.package1, item.type)}
                                                                        >
                                                                            Supprimer le document
                                                                        </Button>*/}
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        size="small"
                                                                        color="primary"
                                                                        // disabled={loading}
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3"}
                                                                        onClick={() => this.onActionOnPiece(doc, 'add')}
                                                                    >
                                                                        Téléverser la piece
                                                                    </Button>
                                                                )}
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

                <h1 style={{ marginTop: 40 }}>Liste des produits commandés</h1>
                <CustomList
                    loading={false}
                    list={product.order.orderItems}
                    // titleList={"Liste des produits commandés"}
                    itemsFoundText={n => `${n} produit trouvés`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun produits trouvés dans la commande
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th>Vendeur</th>
                                                    <th>Prix unitaire</th>
                                                    <th>Quantité</th>
                                                    <th>Prix total</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.typeProduct.product ? item.typeProduct.product.label : item.typeProduct.package1.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.typeProduct.organisation ? item.typeProduct.organisation.commercialName : '-'}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark"><AmountCurrency amount={item.typeProduct.price} from={item.typeProduct.product ? item.typeProduct.product.priceCurrency : item.typeProduct.package1.currency} /></h4>
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
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark"><AmountCurrency amount={item.typeProduct.price} from={item.typeProduct.product ? item.typeProduct.product.priceCurrency : item.typeProduct.package1.currency} quantity={item.quantity} /></h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <Button
                                                                        size="small"
                                                                        color="primary"
                                                                        // disabled={loading}
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                        onClick={() => this.onEnterClick(item.typeProduct.product ? item.typeProduct.product : item.typeProduct.package1, item.type)}
                                                                    >
                                                                        Voir les détails
                                                                            <i className="zmdi zmdi-arrow-right mr-2" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <thead>
                                                {list && list.length > 0 ?
                                                    <tr>
                                                        <td>
                                                        </td>
                                                        <td>
                                                        </td>
                                                        <td>
                                                        </td>
                                                        <td>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">
                                                                        <AmountCurrency amounts={list.map((e) => {
                                                                            return { amount: e.typeProduct.price, currency: e.typeProduct.product ? e.typeProduct.product.priceCurrency : e.typeProduct.package1.currency, quantity: e.quantity }
                                                                        })} />
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    : null}
                                            </thead>
                                        </table>
                                    </div>
                                )}
                        </>
                    )}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    {(product.order.indirectSale && !product.order.approved) ? (
                        <h2 className="mr-sm-25 mt-2">Commande en attente de confimation</h2>
                    ) : (
                        <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={() => this.onContinueClick()}
                            className={"text-white font-weight-bold mr-3"}
                            disabled={product.order.orderStatus == 'PAID' || !product.order.approved}
                        >
                            Payer la commande
                        </Button>
                    )}
                </div>
                <Dialog
                    open={this.state.showBox}
                    onClose={() => { this.setState({ showBox: false }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Reseigner une pièce
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
                                <div className="col-12 my-3">
                                    {/*<FormGroup style={{ width: '100%' }}>
                                        <InputLabel className="text-left">
                                            Nom de la pièce
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            type="text"
                                            value={this.state.name}
                                            className="has-input input-lg"
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                        />
                                         <span className="has-icon"><i className="ti-pencil"></i></span>
                                    </FormGroup>*/}
                                    {this.state.pieceAction.doc && this.state.pieceAction.doc.file && (
                                        <FormGroup style={{ width: '100%' }}>
                                            <InputLabel className="text-left">
                                                <a href={getFilePath(this.state.pieceAction.doc.file)} target="_blank">
                                                    Voir la piece actuelle
                                                </a>
                                            </InputLabel>
                                        </FormGroup>
                                    )}
                                    <FormGroup style={{ width: '100%' }}>
                                        <InputLabel className="text-left">
                                            Fichier
                                        </InputLabel>
                                        <Input
                                            style={{ width: '100%' }}
                                            id="File"
                                            type="file"
                                            name="file"
                                            onChange={event => this.setState({ file: event.target.files[0] })}
                                        />
                                    </FormGroup>
                                    <Button
                                        size="large"
                                        color="primary"
                                        variant="contained"
                                        className={"text-white font-weight-bold mr-3"}
                                        onClick={() => this.createPiece()}
                                    >
                                        Soumettre
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </DialogContent>
                </Dialog>
            </RctCollapsibleCard>
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
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(OrderShow))));
