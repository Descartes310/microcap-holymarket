import Hit from './components/Hit';
import { connect } from 'react-redux';
import Filters from './components/Filters';
import ProductService from 'Services/products';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

const Shop = (props) => {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProducts({ type: 'PRIVATE' })
			.then(response => setProducts(response))
			.finally(() => props.setRequestGlobalAction(false))
	}

	return (
		<div className="shop-wrapper">
			<PageTitleBar title={'MicroCap Shop'} />
			<div className="ais-InstantSearch">
				<div className="row">
					{/* <div className="col-lg-3 col-md-4 d-none d-md-block">
						<Filters products={products} />
					</div> */}
					<div className="col-lg-12 col-md-12 col-sm-12">
						<div className="shop-content">
							{ products.map(product => (
								<Hit product={product} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Shop));