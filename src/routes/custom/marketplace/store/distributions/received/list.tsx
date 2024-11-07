import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';
import {NotificationManager} from 'react-notifications';
import ProductPaymentIncorrect from '../../components/productPaymentIncorrect';
import UpdateDistributionPrice from '../../components/UpdateDistributionPrice';

const List = (props) => {

    const [distribution, setDistribution] = useState(null);
    const [distributions, setDistributions] = useState([]);
    const [showPriceUpdate, setShowPriceUpdate] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        getDistributions();
    }, []);

    const getDistributions = () => {
        props.setRequestGlobalAction(true),
        ProductService.getProductDistributionReceived({})
        .then(response => setDistributions(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeStatus = (distribution) => {
        props.setRequestGlobalAction(true),
        ProductService.updateProductDistributionStatus(distribution.reference, {})
        .then(() => {
            getDistributions();
            setDistribution(null)
        })
        .catch((err) => {
            setDistribution(distribution);    
            if(err?.response?.status == 412) {
                setShowPaymentModal(true);
            } else {
                NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
            }
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                loading={false}
                list={distributions}
                itemsFoundText={n => `${n} distributions trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucunes distributions trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0 w-auto">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Produit</th>
                                            <th className="fw-bold">Commercant</th>
                                            <th className="fw-bold">Prix</th>
                                            <th className="fw-bold">Disponible</th>
                                            <th className="fw-bold">Date de création</th>
                                            <th className="fw-bold">Prix</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.productName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.userName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{getPriceWithCurrency(item.price, item.currency)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.status}
                                                        onChange={() => { changeStatus(item) }}
                                                    />
                                                </td>
                                                <td>
                                                    <TimeFromMoment time={item.createdAt} showFullDate />
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setDistribution(item);
                                                            setShowPriceUpdate(true);
                                                        }}
                                                        className="text-white font-weight-bold mr-3"
                                                    >
                                                        Prix
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            />
            { showPriceUpdate && distribution && (
                <UpdateDistributionPrice
                    show={showPriceUpdate}
                    distribution={distribution}
                    onClose={() => {
                        setShowPriceUpdate(false);
                        getDistributions();
                    }}
                />
            )}

            { distribution && showPaymentModal && (
                <ProductPaymentIncorrect
                    product={distribution}
                    show={showPaymentModal && distribution} 
                    onClose={() => { setShowPaymentModal(false); }} 
                    onSuccess={() => props.history.push(MARKETPLACE.STORE.PAYMENT.CONFIGURATION.LIST)} 
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));