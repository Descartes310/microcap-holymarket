import { connect } from 'react-redux';
import Filters from '../components/Filters';
import HitModel from '../components/HitModel';
import ProductService from 'Services/products';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

const Shop = (props) => {

	const [productModels, setProductModels] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProductModels({ type: 'FINANCIAL' })
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