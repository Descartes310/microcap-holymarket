import { connect } from 'react-redux';
import ProductService from 'Services/products';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import HitModel from '../../components/HitModel';
import React, { useState, useEffect } from 'react';

const Shop = (props) => {

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
		<div className="shop-wrapper">
			<div className="ais-InstantSearch pt-25">
				<div className="row">
					{ productModels.map(product => (
						<HitModel product={product} />
					))}
				</div>
			</div>
		</div>
	)
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Shop));