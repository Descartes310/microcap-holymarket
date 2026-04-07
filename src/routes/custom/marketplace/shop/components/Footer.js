import React from 'react';
import './style.css';

const ShopFooter = () => {
    
    return (
        <div className="mc-strip">
            <div className="mc-strip-text">
                Des questions ? Contactez notre <span>équipe commerciale</span>.
            </div>
            <button className="mc-strip-btn text-white">
                Nous contacter →
            </button>
        </div>
    );
};

export default ShopFooter;