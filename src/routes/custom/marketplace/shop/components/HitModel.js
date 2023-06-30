import { connect } from 'react-redux';
import React, { Component } from 'react';
import { RctCard } from 'Components/RctCard';
import { withRouter } from 'react-router-dom';
import { textTruncate, getFilePath } from "Helpers/helpers";
import { joinUrlWithParams, MARKETPLACE } from 'Url/frontendUrl';

class HitModel extends Component {
	state = {
		loading: false
	}

	render() {
		const { product } = this.props;
		return (
			<RctCard colClasses="d-flex col-md-3 col-sm-6 mb-0 flex-column justify-content-between overflow-hidden cursor-pointer">
				<div className="overlay-wrap overflow-hidden" onClick={() => {
					this.props.history.push(joinUrlWithParams(MARKETPLACE.SHOP_PRODUCTS, [{param: 'reference', value: product.reference}]));
				}}>
					<div className="text-center p-4">
						<img src={product.image ? getFilePath(product.image) : require('Assets/img/product.png')} className="img-fluid" alt="product" style={{ height: 185 }} />
					</div>
				</div>
				<div className="product-info border-top p-3" onClick={() => {
					this.props.history.push(joinUrlWithParams(MARKETPLACE.SHOP_PRODUCTS, [{param: 'reference', value: product.reference}]));
				}}>
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

export default connect(mapStateToProps, {})(withRouter(HitModel));