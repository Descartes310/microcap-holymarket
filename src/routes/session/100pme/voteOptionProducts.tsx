import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import OrderService from 'Services/orders';
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
import { onAddItemToCart, onClearCart } from 'Actions';
import { getPriceWithCurrency } from 'Helpers/helpers';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { stripeZeroDecimalCurrencies } from 'Helpers/datas'
import {HOME, AUTH, LANDING, PME_PROJECT, joinUrlWithParamsId} from "Url/frontendUrl";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import OrderFormModal from 'Routes/custom/marketplace/checkout/orderFormModal'
import CodevSubscriptionModal from 'Routes/custom/marketplace/_components/codevSubscriptionModal';

const VoteOptionProducts = (props) => {

    const option = voteOptions.find(vo => vo.id == props.match.params.id)
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [orderData, setOrderData] = useState(null);
    const [myProducts, setMyProducts] = useState([]);
    const [myProduct, setMyProduct] = useState(null);
    const [codevData, setCodevData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [productModel, setProductModel] = useState(null);
    const [productModels, setProductModels] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

    useEffect(() => {
        getMyProducts();
        getProductModels();;
    }, []);


    useEffect(() => {
        if(productModel) {
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
		ProductService.getShopProducts({ model_reference: productModel.product.reference })
			.then(response => setProducts(response))
			.finally(() => props.setRequestGlobalAction(false))
	}

    const getProductModels = () => {
        props.setRequestGlobalAction(true);
        SystemService.getProductModels({option: option.value})
        .then(response => setProductModels(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = (order = null) => {
        const locality = localStorage.getItem('PME_LOCALITY');
        const city = JSON.parse(localStorage.getItem('PME_CITY'));
        const country = localStorage.getItem('PME_COUNTRY');
        const motivation = localStorage.getItem('PME_MOTIVATION');
        const user = props.authUser;

        if(option && city && user && country && (myProduct || order)) {
            props.setRequestGlobalAction(true);
            let data: any = {
                vote: option.value, city_id: city.id, city_name: city.name, referral_code: user.referralId, country, order_reference: myProduct ? myProduct.reference : order.reference
            }
        
            if(locality) {
                data.locality = locality;
            }
            if(motivation) {
                data.motivation = motivation;
            }
            SystemService.createVote(data)
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

    useEffect(() => {
        if(paymentData) {
            document.getElementById('stripe-id').click();
        }
    }, [paymentData]);

    const computePrice = () => {
        const amount = paymentData ? paymentData.amount : 0;
        const currency = paymentData ? paymentData.currency : 'EUR';
        return stripeZeroDecimalCurrencies.includes(currency) ? amount : amount * 100;
     }

    const onStripeSubmit = (token) => {
        props.setRequestGlobalAction(true);
  
        let data: any = {
           stripeToken: token,
           amount: paymentData.amount
        }
  
        if(paymentData.discountCode) {
           data.discountCode = paymentData.discountCode;
        }
  
        if(paymentData.subscriptionCode) {
           data.subscriptionCode = paymentData.subscriptionCode;
        }
  
        OrderService.paySale(paymentData.id, data)
           .then(() => {
                NotificationManager.success('Opération réussie');
                setPaymentData(false);
            })
           .finally(() => props.setRequestGlobalAction(false))
     }

    const onStripePayment = (token) => {
        onStripeSubmit(token.id);
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
                                        <h1 className="p-20">Je reserve un produit !</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-row">

                                        { myProducts.length > 0 ? 
                                            <>
                                                <p className='text-center text-black mb-10' style={{ fontSize: 16 }}>Félicitation, vous disposez de {myProducts.length} produits MicroCap pour cumuler des voix</p>
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
                                                <p className='text-center text-black mb-10 w-100' style={{ fontSize: 16 }}>Reserver un produit MicroCap pour cumuler des voix</p>
                                                <p className='text-center text-black mb-10 w-100 mb-20' style={{ fontSize: 16 }}>{option.description}</p>
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
                                                        getOptionLabel={(option) => `${option.product.label} (${option.value})`}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                                    <InputLabel className="text-left">
                                                        Prestataire
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
                                                            if(product.specialProduct == 'CODEV_DEAL_PLAN' || product.specialProduct == 'CODEV') {
                                                                setShowSubscriptionModal(true);
                                                            } else {
                                                                setShowOrderModal(true);
                                                            }
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
                                                    props.history.push(joinUrlWithParamsId(PME_PROJECT.SUBSCRIBE_ACCOUNT, option.id));
                                                }}
                                            >
                                                Guichet
                                            </Button>
                                        </FormGroup>
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
                    codevData={codevData}
                    product={product}
                    onSuccess={(response) => {
                        //onSubmit(response);
                        setOrderData(response)
                        getProducts();
                        setShowOrderModal(false);
                        setProduct(null);
                        props.onClearCart();
                        //setShowPaymentModal(true);
                    }}
                    customData={{vote: option.value, city_id: JSON.parse(localStorage.getItem('PME_CITY'))?.id, city_name: JSON.parse(localStorage.getItem('PME_CITY'))?.name, country: localStorage.getItem('PME_COUNTRY'), locality: localStorage.getItem('PME_LOCALITY'), motivation: localStorage.getItem('PME_MOTIVATION')}}
                    isPreOrder={true}
                />
            )}

            { showSubscriptionModal && product && (
                <CodevSubscriptionModal
                    show={showSubscriptionModal}
                    onClose={() => {
                        setShowSubscriptionModal(false);
                        setProduct(null);
                        props.onClearCart();
                    }}
                    onSendData={(data) => {
                        setShowSubscriptionModal(false);
                        setCodevData(data);
                        setShowOrderModal(true);
                    }}
                    product={product}
                />
            )}

        </QueueAnim>
    );
};

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction, onAddItemToCart, onClearCart })(injectIntl(VoteOptionProducts));
