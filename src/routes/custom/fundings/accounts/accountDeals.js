import { connect } from 'react-redux';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import FundingService from "Services/funding";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from 'Components/TimeFromMoment';
import DialogComponent from "Components/dialog/DialogComponent";
import DealDetailsModal from 'Routes/custom/fundings/components/DealDetailsModal';

class AccountDeals extends Component {

    state = {
        deals: [],
        deal: null,
        showDealDetails: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getDeals();
    }

    getDeals = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.getDealsByAccount({account_reference: this.props.reference}).then(response => {
            this.setState({deals: response});
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { deals, deal, showDealDetails } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
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
                                                                    this.setState({ deal: item, showDealDetails: true });
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
                    {deal && (
                        <DealDetailsModal
                            show={showDealDetails}
                            onClose={() => {
                                this.setState({ showDealDetails: false, deal: null });
                            }}
                            reference={deal?.reference}
                            negociate={() => {
                                this.setState({ showDealDetails: false, deal: null });
                            }}
                            isSender={false}
                            isBlocked={true}
                        />
                    )}
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(AccountDeals));