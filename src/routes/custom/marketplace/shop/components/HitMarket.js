import { connect } from 'react-redux';
import React, { Component } from 'react';
import { RctCard } from 'Components/RctCard';
import { withRouter } from 'react-router-dom';
import { textTruncate, getFilePath } from "Helpers/helpers";
import { joinUrlWithParams, MARKETPLACE } from 'Url/frontendUrl';

class HitMarket extends Component {
	state = {
		loading: false
	}

	render() {
		const { market, match } = this.props;
		return (
			<RctCard colClasses="d-flex col-md-3 col-sm-6 mb-0 flex-column justify-content-between overflow-hidden cursor-pointer">
				<div className="overlay-wrap overflow-hidden" onClick={() => {
					this.props.history.push(joinUrlWithParams(MARKETPLACE.SHOP.HOLYMARKET.PRODUCTS, [{param: 'categoryReference', value: match.params.categoryReference}, {param: 'marketReference', value: market.reference }]));
				}}>
					<div className="text-center p-4">
						<img src={market.image ? getFilePath(market.image) : require('Assets/img/product.png')} className="img-fluid" alt="market" style={{ height: 185 }} />
					</div>
				</div>
				<div className="product-info border-top p-3" onClick={() => {
					this.props.history.push(joinUrlWithParams(MARKETPLACE.SHOP.HOLYMARKET.PRODUCTS, [{param: 'categoryReference', value: match.params.categoryReference}, {param: 'marketReference', value: market.reference}]))
				}}>
					<h4 className="text-dark">{textTruncate(market.label, 25)}</h4>
					<p className="mb-5 text-muted font-xs">
						{textTruncate(market.description, 50)}
					</p>
				</div>
			</RctCard>
		)
	}
}

const mapStateToProps = ({ cart }) => {
	return { cart };
}

export default connect(mapStateToProps, {})(withRouter(HitMarket));