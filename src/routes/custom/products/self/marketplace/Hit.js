/**
 * Hits Component
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

// Card Component
import { RctCard } from 'Components/RctCard';
import AmountCurrency from "Components/AmountCurrency";

//Actions
//import { onAddItemToCart } from "../../../../src/actions/EcommerceActions";

//Helper
import { textTruncate } from "Helpers/helpers"

class Hit extends Component {
	state = {
		loading: false
	}

	
	
	/**
	 * Function to check either the item exist in cart or not
	 * Return boolean
	 * @param {boolean} id 
	 */
	isItemExistInCart(id) {
		const { cart } = this.props;
		let existence = false
		for (const item of cart) {
			if (item.id === id) {
				existence = true
			}
		}
		return existence;
	}

	render() {
		const { hit } = this.props;
		const { loading } = this.state;
		return (
			<RctCard customClasses="d-flex  mb-0 flex-column justify-content-between overflow-hidden">
				<div className="overlay-wrap overflow-hidden">
					<div className="text-center p-4">
						<img src={hit.image ? hit.image : require('Assets/avatars/img-default.gif') } className="img-fluid" alt="product" />
					</div>
					<div className="overlay-content d-flex align-items-end">
						<a href="#" className="bg-primary text-center w-100 cart-link text-white py-2" onClick={() => this.props.onPressViewProposition(hit)} >
							{loading ? <CircularProgress className="text-white" color="inherit" size={20} /> : 'Voir les propositions'}
						</a>
					</div>
				</div>
				<div className="product-info border-top p-3">
					<div className="d-flex justify-content-between">
						<h2 className="text-danger"> <AmountCurrency amount={hit.price} from={hit.currency} /></h2>
					</div>
					<h4 className="text-dark " style={{textOverflow: "ellipsis", whiteSpace: "nowrap",width:"100%", overflow: "hidden"}}>{hit.label}</h4>
					<p className="mb-5 text-muted font-xs" style={{textOverflow: "ellipsis", whiteSpace: "nowrap",width:"100%", overflow: "hidden"}}>
						{hit.description}
					</p>
				</div>
			</RctCard>
		)
	}
}

const mapStateToProps = ({ ecommerce }) => {
	const { cart } = ecommerce;
	return { cart };
}

export default connect(mapStateToProps)(Hit);