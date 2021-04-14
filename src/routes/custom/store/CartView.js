/**
 * View Cart Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';

//Actions
import { deleteItemFromCart, onUpdateItemToCart } from "Actions/CartActions";

//Helper
import {copyToClipboard, getSessonId, textTruncate, getFilePath} from "Helpers/helpers";

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import {NotificationManager} from "react-notifications";
import UserAvatar from "Components/UserAvatar";
import {joinUrlWithParamsId, STORE} from "Url/frontendUrl";
import {withRouter} from "react-router-dom";
import {placeOrder, onClearCart, setRequestGlobalAction} from "Actions";
import {ERROR_500} from "Constants/errors";
import InvitationType from "Enums/InvitationType";
import SweetAlert from "react-bootstrap-sweetalert";
import AmountCurrency from "Components/AmountCurrency";

class CartView extends Component {
    state = {
        showConfirmBox: false,
        orderRef: '',
        orderId: '',
    };

    onChangeQuantity = (newQuantity, cartItem) => {
        const quantity = Number(newQuantity);
        if (!quantity) {
            NotificationManager.error("Vous devez entrer un nombre supérieur à 0");
            return;
        }
        this.props.onUpdateItemToCart({...cartItem, quantity});
    };

    onInitPayment = () => {
        const items = this.props.cart.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            type: item.type,
            nature: item.nature
        }));

        const branchUrl = window.location.host;

        this.props.setRequestGlobalAction(true);
        placeOrder({branchUrl: branchUrl, items: JSON.stringify(items), sessionId: getSessonId()})
            .then((result) => {
                this.props.onClearCart();
                this.setState({showConfirmBox: true, orderRef: result.reference, orderId: result.id});
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onDeleteItem = (cartItem) => {
        this.props.deleteItemFromCart(cartItem);
    };

    onContinueClick = () => {
        this.setState({showConfirmBox: false});
        const url = joinUrlWithParamsId(STORE.CHECKOUT, this.state.orderId);
        this.props.history.push(url);
    };

    render() {
        const { cart, match, history } = this.props;
        const { showConfirmBox } = this.state;

        return (
            <div className="cart-wrapper">
                <PageTitleBar title="Panier" match={match} enableBreadCrumb={false} />
                <RctCard>
                    <RctCardContent noPadding>
                        <Table hover responsive className="mb-0">
                            <thead>
                                <tr>
                                    <th className="w-10"/>
                                    <th className="w-50"><IntlMessages id="components.product" /></th>
                                    <th className="w-10 text-center"><IntlMessages id="components.quantity" /></th>
                                    <th className="w-10 text-center"><IntlMessages id="widgets.price" /></th>
                                    <th className="w-10 text-center"><IntlMessages id="components.totalPrice" /></th>
                                    <th className="w-10 text-center"><IntlMessages id="components.removeProduct" /></th>
                                </tr>
                            </thead>
                            <tbody>
                            {!cart.isCartEmpty() ? cart.items.map((cartItem, key) => (
                                    <tr key={key}>
                                        <td className="w-10 text-center">
                                            <UserAvatar
                                                avatar={getFilePath(cartItem.image)}
                                                name={cartItem.name}
                                                className="media-object"
                                                witdh="100"
                                                height="100"
                                            />
                                        </td>
                                        <td className="w-50">
                                            <h3>{textTruncate(cartItem.name, 40)}</h3>
                                            <span className="fs-14 d-block text-muted">{textTruncate(cartItem.description, 80)}</span>
                                            {/*<span className="fs-14 d-block text-muted">{cartItem.brand}</span>*/}
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                defaultValue={cartItem.quantity}
                                                // value={cartItem.quantity}
                                                onChange={(e) => this.onChangeQuantity(e.target.value, cartItem)}
                                            />
                                        </td>
                                        <td className="text-danger text-center"><AmountCurrency amount={cartItem.price} from={cartItem.currency} /></td>
                                        <td className="text-bold text-center"><AmountCurrency amount={cartItem.price} from={cartItem.currency} quantity={cartItem.quantity} /></td>
                                        <td className="text-center">
                                            <IconButton onClick={() => this.onDeleteItem(cartItem)}>
                                                <i className="zmdi zmdi-close"/>
                                            </IconButton>
                                        </td>
                                    </tr>
                                )) :
                                <tr>
                                    <td colSpan="6" className="text-center h-25">
                                        <span className="d-block font-5x mb-30 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
                                        <span className="mb-20 font-3x"><IntlMessages id="components.CartEmptyText" /></span>
                                    </td>
                                </tr>
                            }
                            </tbody>
                            <tfoot>
                            <tr className="text-center">
                                <td colSpan="3"></td>
                                <td><span className="font-weight-bold">Total</span></td>
                                <td><span className="font-weight-bold"><AmountCurrency amounts={cart.items.map((e) => {
											return { amount: e.price, currency: e.currency, quantity: e.quantity }
										})} styles={{ fontWeight: 'bold' }} /></span></td>
                                <td>
                                    {!cart.isCartEmpty() && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className="text-white"
                                            onClick={() => this.props.history.push(STORE.ORDER)}
                                        >
                                            Commander
                                        </Button>
                                    )}
                                </td>
                            </tr>
                            </tfoot>
                        </Table>
                    </RctCardContent>
                </RctCard>

                <SweetAlert
                    success
                    show={showConfirmBox}
                    title={"Infos commande"}
                    onConfirm={() => this.onContinueClick()}
                    confirmBtnText="Continuer"
                    confirmBtnClass="btn-lg btn-primary btn-sm text-white"
                >
                    <div className="row">
                        <div className="col-12">
                            <p>Commande enregistré avec success</p>
                        </div>
                        <div className="col-12">
                            <p className="fw-bold my-3">
                                N° {this.state.orderRef}
                            </p>
                        </div>
                        <div className="col-12">
                            <p>A conserver. Il vous sera utile pour toutes demande d'informations</p>
                        </div>
                        <div className="col-12">
                            <a
                                href="#"
                                onClick={() => copyToClipboard(this.state.orderRef)}
                                className="fw-bold text-success"
                            >
                                Copier
                            </a>
                        </div>
                    </div>
                </SweetAlert>
            </div>
        )
    }
}

const mapStateToProps = ({ cart }) => {
    return { cart };
};

export default connect(mapStateToProps, {
    deleteItemFromCart,
    onUpdateItemToCart,
    setRequestGlobalAction,
    onClearCart
})(withRouter(CartView));
