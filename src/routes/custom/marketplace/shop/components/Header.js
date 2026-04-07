import './style.css';
import React from 'react';
import { ROOT } from 'Url/frontendUrl';
import Cart from 'Components/Header/Cart';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

const ShopHeader = (props) => {
    
    return (
        <div className="mc-hero">
            <div>
                <div className="mc-hero-label">MicroCap Marketplace</div>
                <h1 className="mc-hero-title">
                    Trouvez le produit<br />
                    qui vous <em>correspond</em>.
                </h1>
                <p className="mc-hero-sub">
                    Parcourez notre sélection exclusive de produits financiers,
                    services bancaires et offres promotionnelles.
                </p>
            </div>
            <div>
                <IconButton aria-label="bag" onClick={() => props.history.push(ROOT)}>
                    <i className="zmdi zmdi-store"></i>
                </IconButton>
                <Cart />
            </div>
        </div>
    );
};

export default withRouter(ShopHeader);