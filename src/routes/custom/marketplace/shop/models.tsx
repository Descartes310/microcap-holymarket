import { connect } from 'react-redux';
import { RctCard } from 'Components/RctCard';
import ShopFooter from './components/Footer';
import ShopHeader from './components/Header';
import { withRouter } from "react-router-dom";
import HitModel from './components/HitModel';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import ProductService from 'Services/products';

const ShopMarkets = (props) => {
	
	const [productModels, setProductModels] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		props.setRequestGlobalAction(true);
		let datas: any = { type: 'HOLYMARKET' };
		if(props.match.params.categoryReference) {
			datas.category_reference = props.match.params.categoryReference;
		}
		if(props.match.params.marketReference) {
			datas.market_reference = props.match.params.marketReference;
		}
		ProductService.getShopProductModels(datas)
			.then(response => setProductModels(response))
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
								{ productModels.map(product => (
									<HitModel product={product} />
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(ShopMarkets));