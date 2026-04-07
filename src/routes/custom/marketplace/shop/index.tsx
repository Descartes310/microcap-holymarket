import './style.css';
import { connect } from "react-redux";
import ShopFooter from './components/Footer';
import ShopHeader from './components/Header';
import HitModel from './components/HitModel';
import { RctCard } from 'Components/RctCard';
import { withRouter } from "react-router-dom";
import ProductService from "Services/products";
import React, { useEffect, useState } from 'react';
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

const Shop = (props) => {

	const [productModels, setProductModels] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProductModels({ type: 'HOLYMARKET' })
			.then(response => setProductModels(response))
			.finally(() => props.setRequestGlobalAction(false))
	}
    
    return (
        <div className="mc-shop-root userProfile-wrapper overflow-hidden">

            <ShopHeader />

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
    );
};

const mapStateToProps = ({ requestGlobalLoader }) => ({
    requestGlobalLoader
});

export default connect(
    mapStateToProps,
    { setRequestGlobalAction }
)(withRouter(Shop));