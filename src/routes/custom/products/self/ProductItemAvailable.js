import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { getProductItemAvailable, setRequestGlobalAction } from "Actions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { getOneProductTypeFromCommercialOffer } from "Actions/independentActions";
import FetchFailedComponent from "Components/FetchFailedComponent";
import Button from "@material-ui/core/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import { deleteItemFromCart, onAddItemToCart } from "Actions/CartActions";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import AmountCurrency from "Components/AmountCurrency";
import { PRODUCT, joinUrlWithParams } from "Url/frontendUrl";

class ProductItemAvailable extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.productId = this.props.match.params.id;
        this.productType = this.props.match.params.type;
        this.currentProduct = this.props.match.location?.state.currentProduct
            ? JSON.parse(this.props.match.location?.state.currentProduct)
            : null;

        this.state = {
            showQuantityBox: false,
            showWarningBox: false,
            loading: true,
            products: [],
            currentProduct: this.currentProduct,
            productToAdd: null,
            showThankYou: false
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getProductItemAvailable(this.productId, this.productType)
            .then(products => this.setState({ products }))
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loading: false }));

        if (!this.currentProduct) {
            this.props.setRequestGlobalAction(true);
            getOneProductTypeFromCommercialOffer(this.productId, this.productType)
                .then(product => this.setState({ currentProduct: product }))
                .catch(() => {
                    NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    onEnterClick = (product, type) => {
        let url = joinUrlWithParams(PRODUCT.DETAILS, [{ param: 'id', value: product.pId }, { param: 'type', value: type }]);
        this.props.history.push(url);
    };

    onWantToAddItemToCart = (item) => {
        this.setState({ productToAdd: item, showQuantityBox: true });
    };

    onAddItemToCart = (item) => {
        const quantity = Number(item);
        if (!quantity) {
            NotificationManager.error("Vous devez entrer un nombre supérieur à 0");
            return;
        }
        const itemToAdd = this.state.productToAdd;
        itemToAdd.quantity = quantity;

        this.props.onAddItemToCart(itemToAdd);
        this.setState({ productToAdd: null, showQuantityBox: false, showThankYou: true });
        setTimeout(() => this.setState({ showThankYou: false }), 2500);
        // NotificationManager.success("Produit ajouté au panier");
    };

    onRemoveItemToCart = (item) => {
        this.props.deleteItemFromCart(item);
    };

    render() {
        const { cart } = this.props;
        const { loading, products, showQuantityBox } = this.state;

        if (loading) {
            return (<RctSectionLoader />);
        }

        if (!this.state.currentProduct) {
            return (<FetchFailedComponent _onRetryClick={this.loadData} />)
        }

        return (
            <>
                <CustomList
                    loading={loading}
                    list={products}
                    titleList={this.state.currentProduct.label}
                    itemsFoundText={n => `${n} produit(s) trouvé(s)`}
                    addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun produits trouvés
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th>Proposé par</th>
                                                    <th>Prix</th>
                                                    <th>Actions</th>
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
                                                                    <h4 className="m-0 fw-bold text-dark">{item.distributor ? item.distributor : '-'}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">
                                                                        <AmountCurrency amount={item.price} from={item.currency} />
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="table-action">
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                // disabled={loading}
                                                                variant="contained"
                                                                className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                onClick={() => this.onEnterClick(item, item.type)}
                                                            >
                                                                Voir les détails
                                                                            <i className="zmdi zmdi-arrow-right mr-2" />
                                                            </Button>
                                                            {cart.isProductPresent(item.id) ? (
                                                                <Button
                                                                    size="small"
                                                                    color="primary"
                                                                    // disabled={loading}
                                                                    variant="contained"
                                                                    className={"text-white font-weight-bold mr-3"}
                                                                    onClick={() => this.onWantToAddItemToCart(item)}
                                                                /*onClick={() => {
                                                                    const i = item;
                                                                    i.quantity = 6;
                                                                    this.props.onAddItemToCart(i);
                                                                }}*/
                                                                >
                                                                    Ajouter au panier
                                                                </Button>
                                                            ) : (
                                                                    <Button
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3 bg-danger"}
                                                                        onClick={() => this.onRemoveItemToCart(item)}
                                                                    >
                                                                        Retirer du panier
                                                                    </Button>
                                                                )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <SweetAlert
                                            input
                                            btnSize="sm"
                                            show={showQuantityBox}
                                            showCancel
                                            cancelBtnBsStyle="danger"
                                            title="Quantité"
                                            placeHolder="10"
                                            inputType="number"
                                            onConfirm={(value) => this.onAddItemToCart(value)}
                                            onCancel={() => this.setState({ showQuantityBox: false })}
                                            confirmBtnText="Ajouter au panier"
                                            cancelBtnText="Annuler"
                                            confirmBtnCssClass="bg-primary text-white"
                                        >
                                            Veuillez entrer la quantité à ajouter au panier
                                    </SweetAlert>

                                        <Snackbar
                                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                            open={this.state.showThankYou}
                                            onClose={() => this.setState({ showThankYou: false })}
                                            ContentProps={{
                                                'aria-describedby': 'message-id',
                                            }}
                                            message={<span id="message-id" className="text-center">Produit ajouté au panier</span>}
                                        />
                                    </div>
                                )}
                        </>
                    )}
                />
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
const mapStateToProps = ({ requestGlobalLoader, cart, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        cart
    }
};

export default connect(mapStateToProps, { onAddItemToCart, deleteItemFromCart, getProductItemAvailable, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(ProductItemAvailable))));
