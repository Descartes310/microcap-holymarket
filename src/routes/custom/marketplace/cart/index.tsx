import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 import { Table, Input } from 'reactstrap';
 import { MARKETPLACE } from 'Url/frontendUrl';
 import Button from '@material-ui/core/Button';
 import IconButton from '@material-ui/core/IconButton';
 import { RctCard, RctCardContent } from 'Components/RctCard';
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 import { deleteItemFromCart, onChangeProductQuantity } from "Actions";
 import { textTruncate, getFilePath, getPriceWithCurrency, addCurrency, getPrice } from "Helpers/helpers";
 
 class Carts extends Component<any, any> {
 
    onChangeQuantity(quantity, cartItem) {
       if (quantity > 0) {
          this.props.onChangeProductQuantity(quantity, cartItem.id);
       }
    }
 
	//Get Total Price
	getTotalPrice() {
		const { cart } = this.props;
		let totalPrice = 0;
		if(cart.count() === 0) return 0;
		totalPrice = cart.items.map(ci => getPrice(ci.price * ci.quantity, ci.currency)).reduce((sum, current) => sum + current);
		return totalPrice.toFixed(2);
	}
 
	//Is Cart Empty
	isCartEmpty() {
		const { cart } = this.props;
		if (cart.count() === 0) {
			return true;
		}
	}
 
    render() {
       const { cart, deleteItemFromCart } = this.props;
       return (
          <div className="cart-wrapper">
             <PageTitleBar title={'Mon panier'} />
             <RctCard>
                <RctCardContent noPadding>
                   <Table hover responsive className="mb-0">
                      <thead>
                         <tr>
                            <th className="w-10"></th>
                            <th className="w-50">Produit</th>
                            <th className="w-10 text-center">Quantité</th>
                            <th className="w-10 text-center">Prix unitaire</th>
                            <th className="w-10 text-center">Prix total</th>
                            <th className="w-10 text-center">Supprimer le produit</th>
                         </tr>
                      </thead>
                      <tbody>
                         {!this.isCartEmpty() ? cart.items.map((cart, key) => (
                            <tr key={key}>
                               <td className="w-10 text-center">
                                   <img src={cart.image ? getFilePath(cart.image) : require('Assets/img/product.png')} alt="products" className="media-object" width="100" height="100" />
                                </td>
                               <td className="w-50">
                                  <h3>{textTruncate(cart.label, 40)}</h3>
                                  <span className="fs-14 d-block text-muted">{textTruncate(cart.description, 80)}</span>
                               </td>
                               <td>
                                  <Input
                                     type="number"
                                     value={cart.quantity}
                                     onChange={(e) => this.onChangeQuantity(e.target.value, cart)}
                                  />
                               </td>
                               <td className="text-danger text-center">{getPriceWithCurrency(cart.price, cart.currency)}</td>
                               <td className="text-bold text-center">{getPriceWithCurrency(Number(cart.price) * Number(cart.quantity), cart.currency)}</td>
                               <td className="text-center">
                                  <IconButton onClick={() => deleteItemFromCart(cart)}>
                                     <i className="zmdi zmdi-close"></i>
                                  </IconButton>
                               </td>
                            </tr>
                         )) :
                            <tr>
                               <td colSpan={6} className="text-center h-25">
                                  <span className="d-block font-5x mb-30 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
                                  <span className="mb-20 font-3x">Aucun produit dans le panier</span>
                               </td>
                            </tr>
                         }
                      </tbody>
                      <tfoot>
                         <tr className="text-center">
                            <td colSpan={3} />
                            <td><span className="font-weight-bold">Total</span></td>
                            <td><span className="font-weight-bold">{addCurrency(this.getTotalPrice())}</span></td>
                            <td>
                               <Button variant="contained" size="large" color="primary" className="text-white" component={Link} to={MARKETPLACE.CHECKOUT}>
                                 Commander
                               </Button>
                            </td>
                         </tr>
                      </tfoot>
                   </Table>
                </RctCardContent>
             </RctCard>
          </div>
       )
    }
 }
 
 const mapStateToProps = ({ cart }) => {
    return { cart };
 }
 
 export default connect(mapStateToProps, {
    deleteItemFromCart,
    onChangeProductQuantity
 })(Carts);