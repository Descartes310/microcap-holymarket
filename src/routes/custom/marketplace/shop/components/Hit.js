import { connect } from 'react-redux';
import React, { Component } from 'react';
import ProductDetails from './ProductDetails';
import { onAddItemToCart, onClearCart } from 'Actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import OrderFormModal from 'Routes/custom/marketplace/checkout/orderFormModal';
import { textTruncate, getFilePath, getPriceWithCurrency } from "Helpers/helpers";

const hitStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

    .mc-hit-card {
        background: #fff;
        border: 1.5px solid #f0f0f0;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        transition: border-color 0.2s, box-shadow 0.2s, transform 0.18s;
        height: 100%;
        font-family: 'DM Sans', sans-serif;
        position: relative;
    }
    .mc-hit-card:hover {
        border-color: #FFB710;
        box-shadow: 0 8px 32px rgba(255, 183, 16, 0.13);
        transform: translateY(-3px);
    }

    /* ── IMAGE ── */
    .mc-hit-img-wrap {
        background: linear-gradient(135deg, #fffbee, #fff8e1);
        height: 185px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        flex-shrink: 0;
    }
    .mc-hit-img-wrap img {
        height: 145px;
        width: auto;
        max-width: 88%;
        object-fit: contain;
        transition: transform 0.3s ease;
    }
    .mc-hit-card:hover .mc-hit-img-wrap img {
        transform: scale(1.05);
    }

    /* Overlay CTA on image */
    .mc-hit-overlay {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        background: linear-gradient(to top, rgba(17,17,17,0.82) 0%, transparent 100%);
        padding: 1.2rem 1rem 0.9rem;
        display: flex;
        align-items: flex-end;
        opacity: 0;
        transition: opacity 0.22s;
    }
    .mc-hit-card:hover .mc-hit-overlay {
        opacity: 1;
    }
    .mc-hit-overlay-btn {
        width: 100%;
        background: #FFB710;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 8px 14px;
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 0.78rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: background 0.15s;
    }
    .mc-hit-overlay-btn:hover { background: #e6a400; }
    .mc-hit-overlay-btn.in-cart {
        background: #111;
        color: #FFB710;
        cursor: default;
    }

    /* ── BODY ── */
    .mc-hit-body {
        padding: 1rem 1.1rem 1.1rem;
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 3px;
    }
    .mc-hit-price {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        font-size: 1.1rem;
        color: #111;
        margin: 0 0 2px;
    }
    .mc-hit-name {
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 0.9rem;
        color: #111;
        margin: 0;
        line-height: 1.25;
    }
    .mc-hit-seller {
        font-size: 0.78rem;
        font-weight: 500;
        color: #FFB710;
        margin: 0;
    }
    .mc-hit-desc {
        font-size: 0.78rem;
        color: #aaa;
        line-height: 1.55;
        font-weight: 300;
        flex: 1;
        margin: 4px 0 0;
    }

    /* ── FOOTER ── */
    .mc-hit-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #f5f5f5;
    }
    .mc-hit-detail-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        background: transparent;
        color: #111;
        border: 1.5px solid #f0f0f0;
        border-radius: 8px;
        padding: 5px 12px;
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 0.73rem;
        cursor: pointer;
        transition: border-color 0.15s, background 0.15s, color 0.15s;
    }
    .mc-hit-detail-btn:hover {
        border-color: #FFB710;
        background: #FFB710;
        color: #fff;
    }
`;

class Hit extends Component {
    state = {
        data: {},
        product: null,
        loading: false,
        codevData: null,
        showDetails: false,
        showCodevStep1: false,
        showCodevStep2: false,
        showCodevStep3: false,
        showOrderModal: false,
        showCodevStep4: false,
        showSubscriptionModal: false,
    }

    onPressAddToCart(cartItem, e) {
        this.addToCart(cartItem, e);
    }

    addToCart = (cartItem, e = null) => {
        if (e) e.preventDefault();
        if (!cartItem.profileBuyable) {
            alert("Votre profile ne vous donne pas accès à ce produit");
            return;
        }
        this.setState({ loading: true });
        let lineCount = 1;
        let linePrice = 0;
        let lineAmount = 0;
        if (this.state.data) {
            cartItem.customInfos = this.state.data;
            if (this.state.data.linePrice && this.state.data.lineCount) {
                lineCount = Number(this.state.data.lineCount);
                linePrice = Number(this.state.data.linePrice);
                lineAmount = linePrice * (Math.max(lineCount - 1, 0));
            }
        }
        this.props.onAddItemToCart({ ...cartItem, price: (cartItem.price + lineAmount), source: this.props.source, lineAmount });
        this.setState({ loading: false, product: null, data: null });
    }

    isItemExistInCart(id) {
        const { cart } = this.props;
        let existence = false;
        for (const item of cart.items) {
            if (item.id === id) existence = true;
        }
        return existence;
    }

    render() {
        const { product, onClearCart } = this.props;
        const { loading, showDetails, showOrderModal, codevData } = this.state;

        const inCart = this.isItemExistInCart(product.id);
        const priceCurrency = product?.details?.find(d => d.type === 'PRICE_CURRENCY')?.value;

        return (
            <div className="col-md-3 col-sm-6 mb-4 d-flex flex-column">
                <style>{hitStyles}</style>

                <div className="mc-hit-card">

                    {/* ── Image + overlay CTA ── */}
                    <div className="mc-hit-img-wrap">
                        <img
                            src={product.image ? getFilePath(product.image) : require('Assets/img/product.png')}
                            alt={product.label}
                        />
                        <div className="mc-hit-overlay">
                            {!inCart ? (
                                <button
                                    className="mc-hit-overlay-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.setState({ showDetails: true });
                                    }}
                                >
                                    {loading
                                        ? <CircularProgress className="text-white" color="inherit" size={16} />
                                        : <><span className='text-white'>Consulter les détails</span><span className='text-white'>→</span></>
                                    }
                                </button>
                            ) : (
                                <button className="mc-hit-overlay-btn in-cart">
                                    ✓ Dans le panier
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ── Info ── */}
                    <div
                        className="mc-hit-body"
                        onClick={() => this.setState({ showDetails: true })}
                    >
                        <p className="mc-hit-price">
                            {getPriceWithCurrency(product.price, priceCurrency)}
                        </p>
                        <h4 className="mc-hit-name">{product.label}</h4>
                        {product.seller && (
                            <p className="mc-hit-seller">{product.seller}</p>
                        )}
                        <p className="mc-hit-desc">
                            {textTruncate(product.description, 60)}
                        </p>

                        <div className="mc-hit-footer">
                            <button
                                className="mc-hit-detail-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.setState({ showDetails: true });
                                }}
                            >
                                Voir le détail →
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Modals (logique inchangée) ── */}
                {showDetails && product && (
                    <ProductDetails
                        product={product}
                        show={showDetails}
                        title={product.label}
                        onClose={() => this.setState({ showDetails: false })}
                        onAddToCart={(e) => {
                            this.onPressAddToCart(product, e);
                            this.setState({ showDetails: false });
                        }}
                        onReserve={(e) => {
                            onClearCart();
                            this.addToCart(product, e);
                            this.setState({ showOrderModal: true });
                        }}
                    />
                )}

                {showOrderModal && (
                    <OrderFormModal
                        show={showOrderModal}
                        onClose={() => {
                            this.setState({
                                showOrderModal: false, showSubscriptionModal: false,
                                showCodevStep1: false, showCodevStep2: false,
                                showCodevStep3: false, showCodevStep4: false
                            });
                            onClearCart();
                        }}
                        codevData={codevData}
                        product={product}
                        onSuccess={() => {
                            onClearCart();
                            this.setState({
                                showOrderModal: false, showSubscriptionModal: false,
                                showCodevStep1: false, showCodevStep2: false,
                                showCodevStep3: false, showCodevStep4: false,
                                showDetails: false
                            });
                        }}
                        customData={{}}
                        isPreOrder={true}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ cart }) => {
    return { cart };
}

export default connect(mapStateToProps, { onAddItemToCart, onClearCart })(Hit);