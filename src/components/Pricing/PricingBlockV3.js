/**
 * Pricing Component
 */
import React from 'react';
import { Button } from 'reactstrap';

// component
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages'
import ReactTooltip from "react-tooltip";
import { Badge } from 'reactstrap';

const PricingBlockV3 = ({ reduction, planType, type, description, price, per, oldPrice, features, color, buttonText }) => (
    <RctCollapsibleCard customClasses="text-center" colClasses="col-md-4">
        <div className="pricing-icon mb-40">
            <img src={require('Assets/img/pricing.png')} alt="pricing icon" className="img-fluid" width="" height="" />
        </div>
        <h2 className={`text-${color} pricing-title`}>
            {type}
        </h2>
        <p>{description}</p>
        <div className="mb-25">
            {planType === 'free' ?
                <h2 className="amount-title"><IntlMessages id={price} /></h2>
                : <h2 className="amount-title">${price}<sub>/{per}</sub></h2>
            }
        </div>
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <ul className="list-unstyled plan-info-listing">
                    <ReactTooltip place="right" effect="solid" className="rct-tooltip" />
                    {features.map((feature, key) => (
                        <li className="d-flex text-left justify-align-start align-items-center" key={key}>
                            <i className="ti-check-box" />
                            <a data-tip={feature}>{feature}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                {
                    reduction ?

                        <Badge color="danger" style={{ widh: 60, marginLeft: '90%', padding: 5 }}>-5%</Badge>
                        : null
                }
              A lieu de {oldPrice} ! Payez... <br />A partir de {price} à l'achat et le solde en 90 jours
          </div>
        </div>
        <Button color={color} className='btn-block btn-lg text-white'>
            <IntlMessages id={buttonText} />
        </Button>
    </RctCollapsibleCard>
);

export default PricingBlockV3;
