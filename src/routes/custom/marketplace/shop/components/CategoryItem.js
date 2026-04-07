import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { textTruncate, getFilePath } from "Helpers/helpers";
import { joinUrlWithParams, MARKETS } from 'Url/frontendUrl';

const hitModelStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

    .mc-product-card {
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
    }
    .mc-product-card:hover {
        border-color: #FFB710;
        box-shadow: 0 8px 32px rgba(255, 183, 16, 0.13);
        transform: translateY(-3px);
    }

    /* ── IMAGE AREA ── */
    .mc-product-img-wrap {
        background: linear-gradient(135deg, #fffbee, #fff8e1);
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }
    .mc-product-img-wrap img {
        height: 140px;
        width: auto;
        max-width: 90%;
        object-fit: contain;
        transition: transform 0.3s ease;
    }
    .mc-product-card:hover .mc-product-img-wrap img {
        transform: scale(1.06);
    }
    .mc-product-img-corner {
        position: absolute;
        bottom: 0; right: 0;
        width: 48px; height: 48px;
        background: #FFB710;
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
        opacity: 0;
        transition: opacity 0.2s;
    }
    .mc-product-card:hover .mc-product-img-corner {
        opacity: 1;
    }

    /* ── BODY ── */
    .mc-product-body {
        padding: 1rem 1.1rem 1.2rem;
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 4px;
    }
    .mc-product-name {
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 0.95rem;
        color: #111;
        line-height: 1.2;
        margin: 0;
    }
    .mc-product-desc {
        font-size: 0.8rem;
        color: #999;
        line-height: 1.55;
        font-weight: 300;
        flex: 1;
        margin: 0;
    }

    /* ── FOOTER ── */
    .mc-product-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #f5f5f5;
    }
    .mc-product-cta {
        display: flex;
        align-items: center;
        gap: 5px;
        background: #111;
        color: #FFB710;
        border: none;
        border-radius: 8px;
        padding: 6px 13px;
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 0.75rem;
        cursor: pointer;
        transition: background 0.15s, color 0.15s, transform 0.12s;
        pointer-events: none;
    }
    .mc-product-card:hover .mc-product-cta {
        background: #FFB710;
        color: #fff;
    }
`;

class CategoryItem extends Component {
    state = {
        loading: false
    }

    navigate = () => {
        const { category } = this.props;
		this.props.history.push(joinUrlWithParams(MARKETS, [{param: 'categoryReference', value: category.reference}]));
    }

    render() {
        const { category } = this.props;

        return (
            <>
                <style>{hitModelStyles}</style>
                <div className="col-md-3 col-sm-6 mb-4 d-flex flex-column">
                    <div className="mc-product-card" onClick={this.navigate}>

                        {/* Image */}
                        <div className="mc-product-img-wrap">
							<img src={category.image ? getFilePath(category.image) : require('Assets/img/product.png')} className="img-fluid" alt="market" style={{ height: 185 }} />
                            <div className="mc-product-img-corner" />
                        </div>

                        {/* Body */}
                        <div className="mc-product-body">
                            <h4 className="mc-product-name">
                                {textTruncate(category.label, 25)}
                            </h4>
                            <p className="mc-product-desc">
                                {textTruncate(category.description, 60)}
                            </p>

                            <div className="mc-product-footer" onClick={this.navigate}>
                                <span className="mc-product-cta text-white">
                                    Voir le produit →
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ cart }) => {
    return { cart };
}

export default connect(mapStateToProps, {})(withRouter(CategoryItem));