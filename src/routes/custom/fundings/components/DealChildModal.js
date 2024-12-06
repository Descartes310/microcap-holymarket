import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import FundingService from 'Services/funding';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { getPriceWithCurrency } from 'Helpers/helpers';
import TimeFromMoment from "Components/TimeFromMoment";
import DialogComponent from "Components/dialog/DialogComponent";
import InitDealModal from 'Routes/custom/fundings/components/InitDealModal';
import InitSpotModal from 'Routes/custom/fundings/components/InitSpotModal';
import DealDetailsModal from 'Routes/custom/fundings/components/DealDetailsModal';

class DealChildModal extends Component {

    state = {
        deals: [],
        deal: null,
        showInitDeal: false,
        showDealDetails: false
    }

    constructor(props) {
        super(props);
        this.findDealChild();
    }

    findDealChild = () => {
        this.setState({ deals: [], deal: null });
        this.props.setRequestGlobalAction(true);
        FundingService.getDealChild(this.props.dealReference)
        .then(response => {
            this.setState({deals: response});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show } = this.props;
        const { deals, deal, showDealDetails, showInitDeal } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        Liste des deals
                    </h3>
                )}
            >
                <RctCardContent>
                    <div>
                        <CustomList
                            list={deals}
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
                                                                        this.setState({deal: item, showDealDetails: true});
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

                        {deal && showDealDetails && (
                            <DealDetailsModal
                                show={showDealDetails}
                                onClose={() => {
                                    this.setState({deal: null, showDealDetails: false});
                                }}
                                reference={deal?.reference}
                                negociate={() => {
                                    this.setState({showDealDetails: false, showInitDeal: true});
                                }}
                                isSender={true}
                            />
                        )}
                        {/* {deal && showInitDeal && (
                            <InitDealModal 
                                show={showInitDeal}
                                onClose={() => {
                                    this.setState({deal: null, showInitDeal: false});
                                }}
                                deal={deal}
                                dealType={deal.type}
                            />
                        )} */}
                        {deal && showInitDeal && (
                            <>
                                { deal.type == 'DEAL' ?
                                    <InitDealModal 
                                        show={showInitDeal}
                                        onClose={() => {
                                            this.setState({deal: null, showInitDeal: false});
                                        }}
                                        deal={deal}
                                        dealType={deal.type}
                                    /> : 
                                    <InitSpotModal 
                                        show={showInitDeal}
                                        onClose={() => {
                                            this.setState({deal: null, showInitDeal: false});
                                        }}
                                        deal={deal}
                                        dealType={deal.type}
                                    />
                                }
                            </>
                        )}
                        
                    </div>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(DealChildModal));