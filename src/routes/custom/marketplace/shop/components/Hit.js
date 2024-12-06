import { connect } from 'react-redux';
import React, { Component } from 'react';
import { RctCard } from 'Components/RctCard';
import ProductDetails from './ProductDetails';
import CodevStep1 from '../components/codev/step1';
import CodevStep4 from '../components/codev/step4';
import { onAddItemToCart, onClearCart } from 'Actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import OrderFormModal from 'Routes/custom/marketplace/checkout/orderFormModal';
import { textTruncate, getFilePath, getPriceWithCurrency } from "Helpers/helpers";
import CodevSubscriptionModal from 'Routes/custom/marketplace/_components/codevSubscriptionModal';

class Hit extends Component {
	state = {
		data: {},
		product: null,
		loading: false,
		codevData: null,
		showDetails: false,
		showCodevStep1: false,
		showCodevStep2: false,
		showCodevStep3: false,
		showOrderModal: false,
		showCodevStep4: false,
		showSubscriptionModal: false,
	}

	//Add Item to cart
	onPressAddToCart(cartItem, e) {
		switch (this.props.model?.specialType) {
			case 'CODEV':
				this.setState({ showCodevStep1: true, product: cartItem });
				break;
			default:
				this.addToCart(cartItem, e);
				break;
		}
	}

	addToCart = (cartItem, e = null) => {
		if(e) e.preventDefault();
		if(!cartItem.profileBuyable) {
			alert("Votre profile ne vous donne pas accès à ce produit");
			return;
		}
		this.setState({ loading: true });
		let lineCount = 1;
		let linePrice = 0;
		let lineAmount = 0;
		if(this.state.data) {
			cartItem.customInfos = this.state.data;
			if(this.state.data.linePrice && this.state.data.lineCount) {
				lineCount = Number(this.state.data.lineCount);
				linePrice = Number(this.state.data.linePrice);
				lineAmount = linePrice * (Math.max(lineCount-1, 0));
			}
		}
		console.log(linePrice, lineCount, lineAmount);
		this.props.onAddItemToCart({...cartItem, price: (cartItem.price + lineAmount), source: this.props.source, lineAmount});
		this.setState({ loading: false, product: null, data: null });
	}

	isItemExistInCart(id) {
		const { cart } = this.props;
		let existence = false
		for (const item of cart.items) {
			if (item.id === id) {
				existence = true
			}
		}
		return existence;
	}

	render() {

		const { product, onClearCart } = this.props;
		const { loading, showDetails, showCodevStep1, showCodevStep2, showCodevStep3, showCodevStep4, data, showOrderModal, showSubscriptionModal, codevData } = this.state;

		return (
			<RctCard colClasses="d-flex col-md-3 col-sm-6 mb-0 flex-column justify-content-between overflow-hidden">
				<div className="overlay-wrap overflow-hidden">
					<div className="text-center p-4">
						<img src={product.image ? getFilePath(product.image) : require('Assets/img/product.png')} className="img-fluid" alt="product" style={{ height: 185 }} />
					</div>
					<div className="overlay-content d-flex align-items-end">
						{
							!this.isItemExistInCart(product.id) && (
								<a href="#" className="bg-primary text-center w-100 cart-link text-white py-2" onClick={(e) => {
									this.setState({ showDetails: true });
									//
								}}>
									{loading ? <CircularProgress className="text-white" color="inherit" size={20} /> : 'Consulter les détails'}
								</a>
							)}
					</div>
				</div>
				<div className="product-info border-top p-3 cursor-pointer" onClick={() => {
					this.setState({ showDetails: true });
				}}>
					<div className="d-flex justify-content-between">
						<h2 className="text-danger">{getPriceWithCurrency(product.price, product?.details?.find(details => details.type === 'PRICE_CURRENCY')?.value)}</h2>
					</div>
					<h4 className="text-dark">{product.label}</h4>
					<h4 style={{ color: '#ffb93a' }}>{product.seller}</h4>
					<p className="mb-5 text-muted font-xs">
						{textTruncate(product.description, 50)}
					</p>
				</div>
				{ showDetails && (
					<ProductDetails 
						product={product}
						show={showDetails}
						title={product.label}
						onClose={() => this.setState({ showDetails: false })}
						onAddToCart={(e) => {
							this.onPressAddToCart(product, e);
							this.setState({ showDetails: false });
						}}
						onReserve={(e) => {
							onClearCart();
							this.addToCart(product, e);
							this.setState({ showOrderModal: true });
						}}
					/>
				)}
				{ showCodevStep1 && (
					<CodevStep1 
						product={product}
						show={showCodevStep1}
						onClose={() => this.setState({ showCodevStep1: false })}
						onSubmit={(data) => {
							if(data?.subscriptionType.value == 'INDIVISION') {
								this.setState({ 
									data: data,
									showCodevStep1: false,
									showCodevStep4: true 
								});
							} else {
								this.setState({ 
									data: data,
									showCodevStep1: false, 
									showCodevStep4: true
								});
							}
						}}
					/>
				)}
				{ showCodevStep4 && (
					<CodevStep4
						data={data}
						product={product}
						show={showCodevStep4}
						onClose={() => this.setState({ showCodevStep4: false })}
						onSubmit={(data) => {
							this.setState({ data: data, showCodevStep1: false, showCodevStep2: false, showCodevStep3: false , showCodevStep4: false }, () => {
								// console.log(data);
								this.addToCart(this.state.product);
							});
						}}
					/>
				)}
				{ showOrderModal && (
					<OrderFormModal
						show={showOrderModal}
						onClose={() => {
							this.setState({ showOrderModal: false, showSubscriptionModal: false, showCodevStep1: false, showCodevStep2: false, showCodevStep3: false , showCodevStep4: false });
							onClearCart();
						}}
						codevData={codevData}
						product={product}
						onSuccess={() => {
							onClearCart();
							this.setState({ showOrderModal: false, showSubscriptionModal: false, showCodevStep1: false, showCodevStep2: false, showCodevStep3: false , showCodevStep4: false, showDetails: false });

						}}
						customData={{}}
						isPreOrder={true}
					/>
				)}

				{ showSubscriptionModal && (
					<CodevSubscriptionModal
						show={showSubscriptionModal}
						onClose={() => {
							this.setState({ showSubscriptionModal: false });
							onClearCart();
						}}
						onSendData={(data) => {
							this.setState({ showSubscriptionModal: false, codevData: data, showOrderModal: true });
						}}
						product={product}
					/>
				)}
			</RctCard>
		)
	}
}

const mapStateToProps = ({ cart }) => {
	return { cart };
}

export default connect(mapStateToProps, { onAddItemToCart, onClearCart })(Hit);