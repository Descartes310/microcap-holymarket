import { connect } from 'react-redux';
import { RctCard } from 'Components/RctCard';
import ShopFooter from './components/Footer';
import ShopHeader from './components/Header';
import MarketService from 'Services/markets';
import { withRouter } from "react-router-dom";
import MarketItem from './components/MarketItem';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';

const ShopMarkets = (props) => {

	const [markets, setMarkets] = useState([]);

	useEffect(() => {
		getMarkets();
	}, []);

	const getMarkets = () => {
		props.setRequestGlobalAction(true);
		MarketService.getAvailables(props.match.params.categoryReference ? {category_reference: props.match.params.categoryReference} : {})
		.then(response => setMarkets(response))
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
								{ markets.map(market => (
									<MarketItem market={market} />
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