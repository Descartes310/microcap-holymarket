import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';

const List = (props) => {

    const [distributions, setDistributions] = useState(null);

    useEffect(() => {
        getDistributions();
    }, []);

    const getDistributions = () => {
        props.setRequestGlobalAction(true),
        ProductService.getProductDistributionReceived({})
        .then(response => setDistributions(response))
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
                                            <th className="fw-bold">Date de création</th>
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
                                                    <TimeFromMoment time={item.createdAt} showFullDate />
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
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));