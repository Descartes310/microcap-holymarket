import { connect } from 'react-redux';
import React, { Component } from 'react';
import { onAddItemToCart } from 'Actions';
import { RctCard } from 'Components/RctCard';
import { textTruncate, getFilePath } from "Helpers/helpers";
import CircularProgress from '@material-ui/core/CircularProgress';

class Hit extends Component {
	state = {
		loading: false
	}

	//Add Item to cart
	onPressAddToCart(cartItem, e) {
		this.setState({ loading: true });
		setTimeout(() => {
			this.props.onAddItemToCart(cartItem);
		}, 1000)
		e.preventDefault();
		this.setState({ loading: false });
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
		const { loading } = this.state;
		return (
			<RctCard colClasses="d-flex col-md-3 col-sm-6 mb-0 flex-column justify-content-between overflow-hidden">
				<div className="overlay-wrap overflow-hidden">
					<div className="text-center p-4">
						<img src={getFilePath(product.image)} className="img-fluid" alt="product" />
					</div>
					<div className="overlay-content d-flex align-items-end">
						{
							!this.isItemExistInCart(product.id) && (
								<a href="#" className="bg-primary text-center w-100 cart-link text-white py-2" onClick={(e) => this.onPressAddToCart(product, e)}>
									{loading ? <CircularProgress className="text-white" color="inherit" size={20} /> : 'Add To Cart'}
								</a>
							)}
					</div>
				</div>
				<div className="product-info border-top p-3">
					<div className="d-flex justify-content-between">
						<h2 className="text-danger">€{product.price}</h2>
					</div>
					<h4 className="text-dark">{textTruncate(product.label, 25)}</h4>
					<p className="mb-5 text-muted font-xs">
						{textTruncate(product.description, 50)}
					</p>
				</div>
			</RctCard>
		)
	}
}

const mapStateToProps = ({ cart }) => {
	return { cart };
}

export default connect(mapStateToProps, { onAddItemToCart })(Hit);