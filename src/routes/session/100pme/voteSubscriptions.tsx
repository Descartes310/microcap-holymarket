import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import AppBar from '@material-ui/core/AppBar';
import { FormGroup, Button } from 'reactstrap';
import ProductService from 'Services/products';
import { voteOptions } from './components/data';
import Toolbar from '@material-ui/core/Toolbar';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { onAddItemToCart, onClearCart } from 'Actions';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import OrderFormModal from 'Routes/custom/marketplace/checkout/orderFormModal'
import {HOME, AUTH, LANDING, PME_PROJECT, joinUrlWithParamsId} from "Url/frontendUrl";

const VoteSubscriptions = (props) => {

    const option = voteOptions.find(vo => vo.id == props.match.params.id)
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [orderData, setOrderData] = useState(null);
    const [myProduct, setMyProduct] = useState(null);
    const [productModel, setProductModel] = useState(null);
    const [productModels, setProductModels] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        getProductModels();;
    }, []);


    useEffect(() => {
        if(productModel) {
            getProducts();
        }
    }, [productModel]);

    const getProducts = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProducts({ model_reference: productModel.reference })
			.then(response => setProducts(response))
			.finally(() => props.setRequestGlobalAction(false))
	}

    const getProductModels = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProductModels({ type: 'FINANCIAL' })
			.then(response => setProductModels([...response.filter(a => a.account)]))
			.finally(() => props.setRequestGlobalAction(false))
	}

    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    const onDiscoverClick = () => {
        props.history.push(LANDING.HOME);
    };

    const addToCart = (cartItem) => {
		if(!cartItem.profileBuyable) {
			alert("Votre profile ne vous donne pas accès à ce produit");
			return;
		}
		props.onAddItemToCart({...cartItem});
	}

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
            <div className='mb-50'></div>
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="center-hor-ver session-body d-flex flex-column">
                                    <div className="session-head mb-10 text-center">
                                        <h1 className="p-20">Je souscris à un compte</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-row">
                                        <p className='text-center text-black mb-10 w-100' style={{ fontSize: 16 }}>Les souscriptions au service de guichet avancé de banque vous permettent de faire des retraits, versements et paiements marchants auprès des guichet MicroCap</p>
                                        
                                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left">
                                                Compte de paiement
                                            </InputLabel>
                                            <Autocomplete
                                                value={productModel}
                                                options={productModels}
                                                id="combo-box-demo"
                                                onChange={(__, item) => {
                                                    setProductModel(item);
                                                }}
                                                getOptionLabel={(option) => `${option.label}`}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left">
                                                Etablissement
                                            </InputLabel>
                                            <Autocomplete
                                                value={product}
                                                options={products}
                                                id="combo-box-demo"
                                                onChange={(__, item) => {
                                                    setProduct(item);
                                                }}
                                                getOptionLabel={(option) => `${option.seller} (${getPriceWithCurrency(option.price, option.currency)})`}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                            <Button
                                                color="primary"
                                                disabled={!option}
                                                className="w-100 ml-0 mt-15 text-white"
                                                onClick={() => {
                                                    addToCart(product);
                                                    setShowOrderModal(true);
                                                }}
                                            >
                                                Souscrire
                                            </Button>
                                        </FormGroup>
                                        
                                        <FormGroup className="mb-25 col-md-12 col-sm-12 has-wrapper">
                                            <Button
                                                color="primary"
                                                disabled={!option}
                                                className="w-100 ml-0 text-white"
                                                onClick={() => {
                                                    props.history.push(joinUrlWithParamsId(PME_PROJECT.VOTE_PRODUCT, option.id));
                                                }}
                                            >
                                                Annuler
                                            </Button>
                                        </FormGroup>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { showOrderModal && product && (
                <OrderFormModal
                    show={showOrderModal}
                    onClose={() => {
                        setShowOrderModal(false);
                        setProduct(null);
                    }}
                    codevData={null}
                    customData={{isSubscription: true}}
                    product={product}
                    onSuccess={() => {
                        getProducts();
                        setShowOrderModal(false);
                        setProduct(null);
                        props.onClearCart();
                        props.history.push(joinUrlWithParamsId(PME_PROJECT.VOTE_PRODUCT, option.id));
                    }}
                    isPreOrder={true}
                />
            )}

        </QueueAnim>
    );
};

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction, onAddItemToCart, onClearCart })(injectIntl(VoteSubscriptions));
