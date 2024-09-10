import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment'
import { getPriceWithCurrency } from 'Helpers/helpers';

const Sales = (props) => {

   const [sales, setSales] = useState([]);

   useEffect(() => {
      getSales();
   }, []);

   const getSales = () => {
      props.setRequestGlobalAction(true);
      OrderService.getAllSales()
         .then(response => setSales(response))
         .finally(() => props.setRequestGlobalAction(false))
   }

   return (
        <>
            <CustomList
                list={sales}
                loading={false}
                itemsFoundText={n => `${n} payments`}
                renderItem={list => (
                    <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun payments
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                <tr>
                                    <th className="fw-bold">#Reference</th>
                                    <th className="fw-bold">Acheteur</th>
                                    <th className="fw-bold">Commande</th>
                                    <th className="fw-bold">Montant</th>
                                    <th className="fw-bold">Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list && list.map((item, key) => (
                                    <tr key={key} className="cursor-pointer">
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">
                                                        #{item.paymentReference.split('_').pop()}
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">
                                                        {item.userName}
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">
                                                        {item.label}
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">
                                                        {getPriceWithCurrency(item.amount, item.currency)}
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <TimeFromMoment time={item.createdAt} showFullDate format='LLLL' />
                                                </div>
                                            </div>
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
   )
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Sales));