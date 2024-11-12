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
import InitDealModal from '../../../components/InitDealModal';
import FundingOfferDetails from '../../../components/FundingOfferDetails';
import FundingOfferPropositions from '../../../components/OfferPropositions';
import PropositionDetailsModal from '../../../components/PropositionDetailsModal';

const List = (props) => {

    const [datas, setDatas] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [showInitDealBox, setShowInitDealBox] = useState(false);
    const [showOfferDetails, setShowOfferDetails] = useState(false);
    const [propositionReference, setPropositionReference] = useState(null);
    const [showOfferPropositions, setShowOfferPropositions] = useState(false);
    const [showPropositionDetails, setShowPropositionDetails] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        FundingService.getAllFundingOffers({nature: 'OFFER'})
            .then(response => setDatas(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
            <>
            <CustomList
                list={datas}
                loading={false}
                addText="Nouvelle proposition"
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
                                            <th className="fw-bold">Propositions</th>
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
                                                <td>
                                                    { item?.referralCode !== props?.authUser?.referralId && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setSelectedOffer(item);
                                                                setShowOfferPropositions(true);
                                                            }}
                                                        >
                                                            Deals
                                                        </Button>
                                                    )}
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

            {selectedOffer && (
                <FundingOfferPropositions
                    show={showOfferPropositions}
                    onClose={() => {
                        setSelectedOffer(null);
                        setShowOfferPropositions(false);
                    }}
                    reference={selectedOffer.reference}
                    showDetails={(reference) => {
                        setSelectedOffer(null);
                        setShowPropositionDetails(true);
                        setShowOfferPropositions(false);
                        setPropositionReference(reference);
                    }}
                    onCreateProposition={() => {
                        setShowOfferPropositions(false);
                        setShowInitDealBox(true);
                    }}
                />
            )}

            {propositionReference && (
                <PropositionDetailsModal
                    show={showPropositionDetails}
                    onClose={() => {
                        setPropositionReference(null);
                        setShowPropositionDetails(false);
                    }}
                    reference={propositionReference}
                />
            )}

            {selectedOffer && (
                <InitDealModal 
                    show={showInitDealBox}
                    onClose={() => {
                        setSelectedOffer(null);
                        setShowInitDealBox(false);
                    }}
                    reference={selectedOffer?.reference}
                />
            )}
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(List));
