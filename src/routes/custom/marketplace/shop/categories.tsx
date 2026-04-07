import { connect } from 'react-redux';
import { RctCard } from 'Components/RctCard';
import ShopFooter from './components/Footer';
import ShopHeader from './components/Header';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import CategoryItem from './components/CategoryItem';

const ShopCategories = (props) => {

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
		<div className="mc-shop-root userProfile-wrapper overflow-hidden">
			<ShopHeader />

			{/* <PageTitleBar title={model ? model.label : 'MicroCap Store'} /> */}
			<RctCard className="mc-card-container">
				<div className="mc-tab-body">
					<div className="shop-wrapper">
						<div className="ais-InstantSearch p-25">
							<div className="row">
								{ categories.map(category => (
									<CategoryItem category={category} />
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(ShopCategories));