import Hit from './components/Hit';
import { connect } from 'react-redux';
import Filters from './components/Filters';
import ProductService from 'Services/products';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

const Shop = (props) => {

	const [model, setModel] = useState(null);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		findProductModel();
		getProducts();
	}, []);

	const getProducts = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProducts({ model_reference: props.match.params.reference })
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
		<div className="shop-wrapper">
			<PageTitleBar title={model ? model.label : 'MicroCap Store'} />
			<div className="ais-InstantSearch">
				<div className="row">
					{ products.map(product => (
						<Hit product={product} model={model} source={props.match.params.reference} />
					))}
				</div>
			</div>
		</div>
	)
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Shop));