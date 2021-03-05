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
import { getSaleProducts, getOrderDetails } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import Button from "@material-ui/core/Button";
import TimeFromMoment from "Components/TimeFromMoment";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import AmountCurrency from "Components/AmountCurrency";
import { joinUrlWithParamsId, STORE, PRODUCT, joinUrlWithParams } from "Url/frontendUrl";
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
            product: { order: { orderItems: [] } }
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
        getOrderDetails(this.props.match.params.id)
            .then(product => {
                console.log(product)
                this.setState({ product });
            })
            .catch((err) => {
                console.log("Error => ", err)
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loading: false }));
    };
    render() {
        const { sale, product } = this.state;
        const { match, history } = this.props;

        return (
            <RctCollapsibleCard>
                <PageTitleBar title={"Détails de la commande " + product.order.name} match={match} history={history} enableBreadCrumb={true} />
                {product.order.status ?
                    <span style={{ backgroundColor: 'rgba(0, 2000, 0, 0.5)', border: 10, padding: 10, borderRadius: 5, color: 'white', marginBottom: 20 }}>
                        Commande payée
                    </span> :
                    <span style={{ backgroundColor: 'rgba(200, 0, 0, 0.5)', border: 10, padding: 10, borderRadius: 5, color: 'white', marginBottom: 20 }}>
                        Commande non payée
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
                            <span>{product.name}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Adresse de livraison 1</h2>
                            <span>{product.address1}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Adresse de livraison 2</h2>
                            <span>{product.address2}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Pays</h2>
                            <span>{product.country}</span>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Email</h2>
                            <span>{product.email}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Numéro de téléphone</h2>
                            <span>{product.phone}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Code zip</h2>
                            <span>{product.zip}</span>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h2>Date de la commande</h2>
                            <span>{product.createdAt ? <TimeFromMoment time={product.createdAt} showFullDate /> : null}</span>
                        </div>
                    </div>
                </div>
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
                                                                        onClick={() => this.onEnterClick(item.typeProduct.product ? item.typeProduct.product : item.typeProduct.package1, item.type )}
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
                    <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        className={"text-white font-weight-bold mr-3"}
                    // onClick={() => this.setState({ showQuantityBox: true })}
                    >
                        Confirmer une livraison
                    </Button>
                    <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        disabled={this.state.product.order.status}
                        className={"text-white font-weight-bold mr-3"}
                        onClick={() => this.onContinueClick()}
                    >
                        Payer la commande
                    </Button>
                </div>
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
