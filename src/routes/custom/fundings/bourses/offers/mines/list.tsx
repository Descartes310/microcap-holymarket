import { connect } from 'react-redux';
import { FUNDING } from 'Url/frontendUrl';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';
import FundingOfferDetails from '../../../components/FundingOfferDetails';

const List = (props) => {

    const [datas, setDatas] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [showOfferDetails, setShowOfferDetails] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        FundingService.getMineFundingOffers({nature: 'OFFER'})
            .then(response => setDatas(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
            <>
            <CustomList
                list={datas}
                loading={false}
                // addText="Nouvelle offre"
                itemsFoundText={n => `${n} offres trouvées`}
                // onAddClick={() => props.history.push(FUNDING.BOURSE.OFFER.CREATE_MINE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune offre trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Date de création</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.label}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{getPriceWithCurrency(item.amount, item.currency)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.createdAt} showFullDate />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            setSelectedOffer(item);
                                                            setShowOfferDetails(true);
                                                        }}
                                                    >
                                                        Détails
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
            {selectedOffer && (
                <FundingOfferDetails
                    show={showOfferDetails}
                    onClose={() => {
                        setSelectedOffer(null);
                        setShowOfferDetails(false);
                    }}
                    reference={selectedOffer.reference}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
