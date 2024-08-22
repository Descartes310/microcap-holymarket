import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import { onAddItemToCart } from 'Actions';
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import SystemService from 'Services/systems';
import AppBar from '@material-ui/core/AppBar';
import { FormGroup, Button } from 'reactstrap';
import ProductService from 'Services/products';
import { voteOptions } from './components/data';
import Toolbar from '@material-ui/core/Toolbar';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {HOME, AUTH, LANDING, PME_PROJECT} from "Url/frontendUrl";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getPriceWithCurrency, getSellWay } from 'Helpers/helpers';
import OrderFormModal from 'Routes/custom/marketplace/checkout/orderFormModal'
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const VoteOptionProducts = (props) => {

    const option = voteOptions.find(vo => vo.id == props.match.params.id)
    const [product, setProduct] = useState(null);
    const [sellWay, setSellWay] = useState(null);
    const [products, setProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [myProduct, setMyProduct] = useState(null);
    const [productModel, setProductModel] = useState(null);
    const [productModels, setProductModels] = useState([]);
    const [showMyProducts, setShowMyProducts] = useState(true);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        getMyProducts();
    }, []);


    useEffect(() => {
        if(sellWay) {
            getProductModels();
        }
    }, [sellWay]);

    useEffect(() => {
        if(sellWay) {
            getProducts();
        }
    }, [productModel]);

    const getMyProducts = () => {
        props.setRequestGlobalAction(true);
        SystemService.getProducts()
        .then((response) => {
            setMyProducts(response);
        }).catch((err) => {
            setMyProducts([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getProducts = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProducts({ model_reference: productModel.reference })
			.then(response => setProducts(response))
			.finally(() => props.setRequestGlobalAction(false))
	}

    const getProductModels = () => {
        props.setRequestGlobalAction(true);
        ProductService.getShopProductModels({ type: sellWay.value })
        .then(response => setProductModels(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = (order = null) => {
        const locality = localStorage.getItem('PME_LOCALITY');
        const city = JSON.parse(localStorage.getItem('PME_CITY'));
        const country = localStorage.getItem('PME_COUNTRY');
        const user = props.authUser;

        if(option && city && user && locality && country && (myProduct || order)) {
            props.setRequestGlobalAction(true);
            SystemService.createVote({vote: option.value, city_id: city.id, city_name: city.name, referral_code: user.referralId, locality, country, order_reference: myProduct ? myProduct.reference : order.reference})
            .then(() => {
                getMyProducts();
                setMyProduct(null);
                NotificationManager.success("Action effectuée");
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                props.setRequestGlobalAction(false);
            })
        }
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
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to={HOME}>
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                    </Link>
                                </div>
                                <div className="center-hor-ver" style={{ marginRight: '10%' }}>
                                    <Button variant="contained" className="btn-light mr-2 p-10" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.signup" />
                                    </Button>
                                    <Button variant="contained" className="btn-primary mr-2 p-10" onClick={onDiscoverClick}>
                                        Tout Microcap
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="center-hor-ver session-body d-flex flex-column">
                                    <div className="session-head mb-10 text-center">
                                        <h1 className="p-20">Terminer mon vote !</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-row">
                                        <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Félicitation, vous disposez de {myProducts.length} produits MicroCap pour cumuler des voix</p>
                                        
                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={showMyProducts}
                                                    onChange={() => {
                                                        setShowMyProducts(!showMyProducts);
                                                    }}
                                                />
                                            } label={'Utiliser mes produits'}
                                            />
                                        </FormGroup>

                                        { showMyProducts ? 
                                            <>
                                                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                                    <InputLabel className="text-left">
                                                        Mes produits MicroCap
                                                    </InputLabel>
                                                    <Autocomplete
                                                        value={myProduct}
                                                        options={myProducts}
                                                        id="combo-box-demo"
                                                        onChange={(__, item) => {
                                                            setMyProduct(item);
                                                        }}
                                                        getOptionLabel={(option) => `${option.label} (${option.value})`}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                                    <Button
                                                        color="primary"
                                                        disabled={!option}
                                                        className="w-100 ml-0 mt-15 text-white"
                                                        onClick={() => {
                                                            onSubmit();
                                                        }}
                                                    >
                                                        Utiliser
                                                    </Button>
                                                </FormGroup>
                                            </>
                                        :
                                            <>
                                                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                                    <InputLabel className="text-left">
                                                        Canal de vente
                                                    </InputLabel>
                                                    <Autocomplete
                                                        value={sellWay}
                                                        options={getSellWay()}
                                                        id="combo-box-demo"
                                                        onChange={(__, item) => {
                                                            setSellWay(item);
                                                        }}
                                                        getOptionLabel={(option) => `${option.label}`}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                                    <InputLabel className="text-left">
                                                        Produits MicroCap
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
                                                        Commercants
                                                    </InputLabel>
                                                    <Autocomplete
                                                        value={product}
                                                        options={products}
                                                        id="combo-box-demo"
                                                        onChange={(__, item) => {
                                                            setProduct(item);
                                                        }}
                                                        getOptionLabel={(option) => `${option.seller} (${getPriceWithCurrency(option.price, option?.details?.find(details => details.type === 'PRICE_CURRENCY')?.value)})`}
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
                                                        Reserver
                                                    </Button>
                                                </FormGroup>
                                            </>
                                        }
                                        
                                        <FormGroup className="mb-25 col-md-12 col-sm-12 has-wrapper">
                                            <Button
                                                color="primary"
                                                disabled={!option}
                                                className="w-100 ml-0 text-white"
                                                onClick={() => {
                                                    props.history.push(PME_PROJECT.VOTE_PRODUCT_END);
                                                }}
                                            >
                                                Terminer
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
                    onSuccess={(response) => {
                        onSubmit(response);
                        getProducts();
                        setShowOrderModal(false);
                        setProduct(null);
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

export default connect(mapStateToProps, { setRequestGlobalAction, onAddItemToCart })(injectIntl(VoteOptionProducts));
