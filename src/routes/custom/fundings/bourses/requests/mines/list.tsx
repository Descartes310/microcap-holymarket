import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';
import InitDealModal from 'Routes/custom/fundings/components/InitDealModal';
import DealChildModal from 'Routes/custom/fundings/components/DealChildModal';
import DealDetailsModal from 'Routes/custom/fundings/components/DealDetailsModal';

const List = (props) => {

    const [datas, setDatas] = useState([]);
    const [deal, setDeal] = useState(null);
    const [showInitDeal, setShowInitDeal] = useState(false);
    const [showDealChild, setShowDealChild] = useState(false);
    const [showDealDetails, setShowDealDetails] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        FundingService.getRequests({mine: true})
        .then(response => setDatas(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} deals trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun deal trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Souscripteur</th>
                                            <th className="fw-bold">Destinataire</th>
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
                                                            <p className="m-0 text-dark">{getPriceWithCurrency(item?.amount, item?.currency)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.sender}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.receiver}</p>
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
                                                            setDeal(item);
                                                            setShowDealChild(true);
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

            {deal && showDealChild && (
                <DealChildModal
                    show={showDealChild}
                    onClose={() => {
                        setDeal(null);
                        setShowDealChild(false);
                    }}
                    dealReference={deal?.reference}
                />
            )}
            {deal && showDealDetails && (
                <DealDetailsModal
                    show={showDealDetails}
                    onClose={() => {
                        setDeal(null);
                        setShowDealDetails(false);
                    }}
                    reference={deal?.reference}
                    negociate={() => {
                        setShowDealDetails(false);
                        setShowInitDeal(true);
                    }}
                    isSender={true}
                />
            )}
            {deal && showInitDeal && (
                <InitDealModal 
                    show={showInitDeal}
                    onClose={() => {
                        setDeal(null);
                        setShowInitDeal(false);
                    }}
                    deal={deal}
                    dealType={deal.type}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
