import Hit from './components/Hit';
import { connect } from 'react-redux';
import { RctCard } from 'Components/RctCard';
import ShopFooter from './components/Footer';
import ShopHeader from './components/Header';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';

const MarketProducts = (props) => {

	const [model, setModel] = useState(null);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		findProductModel();
		getProducts();
	}, []);

	const getProducts = () => {
		props.setRequestGlobalAction(true);
		let category = new URLSearchParams(props.location.search).get("category");
		let market = new URLSearchParams(props.location.search).get("market");
		let datas: any = {model_reference: props.match.params.reference};
		if(category) {
			datas.category_reference = category;
		}
		if(market) {
			datas.market_reference = market;
		}
		ProductService.getShopProducts(datas)
			.then(response => setProducts(response))
			.finally(() => props.setRequestGlobalAction(false))
	}

	const findProductModel = () => {
		props.setRequestGlobalAction(true);
		ProductService.findProductModel(props.match.params.reference)
			.then(response => setModel(response))
			.finally(() => props.setRequestGlobalAction(false))
	}

	return (        
		<div className="mc-shop-root userProfile-wrapper overflow-hidden">
			<ShopHeader />

			{/* <PageTitleBar title={model ? model.label : 'MicroCap Store'} /> */}
			<RctCard className="mc-card-container">
				<div className="mc-tab-body">
					<div className="shop-wrapper">
						<div className="ais-InstantSearch p-25">
							<div className="row">
								{ products.map(product => (
									<Hit product={product} model={model} source={props.match.params.reference} />
								))}
							</div>
						</div>
					</div>
				</div>

				<ShopFooter />
			</RctCard>
		</div>
	)
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(MarketProducts));