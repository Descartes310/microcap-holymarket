import { connect } from 'react-redux';
import MarketService from 'Services/markets';
import { withRouter } from "react-router-dom";
import HitMarket from '../components/HitMarket';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';

const Shop = (props) => {

	const [markets, setMarkets] = useState([]);

	useEffect(() => {
		getMarkets();
	}, []);

	const getMarkets = () => {
		props.setRequestGlobalAction(true);
		MarketService.getAvailables()
		.then(response => setMarkets(response))
		.finally(() => props.setRequestGlobalAction(false))
	}

	return (
		<div className="shop-wrapper">
			<div className="ais-InstantSearch pt-25">
				<div className="row">
					{ markets.map(market => (
						<HitMarket market={market} />
					))}
				</div>
			</div>
		</div>
	)
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Shop));