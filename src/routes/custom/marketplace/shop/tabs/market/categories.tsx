import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import HitCategory from '../../components/HitCategory';

const Shop = (props) => {

	const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        props.setRequestGlobalAction(true);
        ProductService.getAvailableCategories()
            .then(response => setCategories(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

	return (
		<div className="shop-wrapper">
			<div className="ais-InstantSearch pt-25">
				<div className="row">
					{ categories.map(category => (
						<HitCategory category={category} />
					))}
				</div>
			</div>
		</div>
	)
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Shop));