import { connect } from 'react-redux';
import React, { Component } from 'react';
import { onAddItemToCart } from 'Actions';
import { RctCard } from 'Components/RctCard';
import ProductDetails from './ProductDetails';
import ProductService from 'Services/products';
import CodevStep1 from '../components/codev/step1';
import CodevStep2 from '../components/codev/step2';
import CodevStep3 from '../components/codev/step3';
import CodevStep4 from '../components/codev/step4';
import { textTruncate, getFilePath } from "Helpers/helpers";
import CircularProgress from '@material-ui/core/CircularProgress';

class Hit extends Component {
	state = {
		data: {},
		product: null,
		loading: false,
		showDetails: false,
		showCodevStep1: false,
		showCodevStep2: false,
		showCodevStep3: false,
		showCodevStep4: false,
	}

	//Add Item to cart
	onPressAddToCart(cartItem, e) {
		switch (this.props.model.specialType) {
			case 'CODEV':
				this.setState({ showCodevStep1: true, product: cartItem });
				break;
			default:
				this.addToCart(cartItem, e);
				break;
		}
	}

	addToCart = (cartItem, e = null) => {
		this.setState({ loading: true });
		if(this.state.data)
			cartItem.customInfos = this.state.data;
		this.props.onAddItemToCart(cartItem);
		if(e) e.preventDefault();
		this.setState({ loading: false, product: null, data: null });
		console.log(cartItem);
		if(cartItem?.customInfos?.type == 'CODEV') {
			if(cartItem.customInfos.line)
				ProductService.createLineBooking({line_references: [cartItem.customInfos.line.reference]});
			if(cartItem.customInfos.indivision)
				ProductService.createIndivisionBooking({indivision_references: [cartItem.customInfos.indivision.reference], dates: cartItem.customInfos.dates});
		}
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
		const { product } = this.props;
		const { loading, showDetails, showCodevStep1, 
			showCodevStep2, showCodevStep3, showCodevStep4, data } = this.state;
		return (
			<RctCard colClasses="d-flex col-md-3 col-sm-6 mb-0 flex-column justify-content-between overflow-hidden">
				<div className="overlay-wrap overflow-hidden">
					<div className="text-center p-4">
						<img src={product.image ? getFilePath(product.image) : require('Assets/img/product.png')} className="img-fluid" alt="product" style={{ height: 185 }} />
					</div>
					<div className="overlay-content d-flex align-items-end">
						{
							!this.isItemExistInCart(product.id) && (
								<a href="#" className="bg-primary text-center w-100 cart-link text-white py-2" onClick={(e) => this.onPressAddToCart(product, e)}>
									{loading ? <CircularProgress className="text-white" color="inherit" size={20} /> : 'Ajouter au panier'}
								</a>
							)}
					</div>
				</div>
				<div className="product-info border-top p-3 cursor-pointer" onClick={() => {
					this.setState({ showDetails: true });
				}}>
					<div className="d-flex justify-content-between">
						<h2 className="text-danger">€{product.price}</h2>
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
									showCodevStep2: true, 
									showCodevStep3: false,
									showCodevStep4: false 
								});
							} else {
								this.setState({ 
									data: data,
									showCodevStep1: false, 
									showCodevStep2: false, 
									showCodevStep3: false,
									showCodevStep4: true
								});
							}
						}}
					/>
				)}
				{ showCodevStep2 && (
					<CodevStep2 
						data={data}
						product={product}
						show={showCodevStep2}
						onClose={() => this.setState({ showCodevStep2: false })}						
						onSubmit={(data) => {
							this.setState({ 
								data: data,
								showCodevStep1: false, 
								showCodevStep2: false, 
								showCodevStep3: true,
								showCodevStep4: false,
							})
						}}
					/>
				)}
				{ showCodevStep3 && (
					<CodevStep3 
						data={data}
						product={product}
						show={showCodevStep3}
						onClose={() => this.setState({ showCodevStep3: false })}
						onSubmit={(data) => {
							this.setState({ data: data, showCodevStep1: false, showCodevStep2: false, showCodevStep3: false, showCodevStep4: true });
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
								this.addToCart(this.state.product);
							});
						}}
					/>
				)}
			</RctCard>
		)
	}
}

const mapStateToProps = ({ cart }) => {
	return { cart };
}

export default connect(mapStateToProps, { onAddItemToCart })(Hit);