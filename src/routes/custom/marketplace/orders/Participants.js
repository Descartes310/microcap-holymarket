import { connect } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import FundingService from "Services/funding";
import AppBar from '@material-ui/core/AppBar';
import CustomList from "Components/CustomList";
import ProductService from "Services/products";
import { setRequestGlobalAction } from 'Actions';
import SwipeableViews from "react-swipeable-views";
import TabContainer from "Components/TabContainer";
import { getPriceWithCurrency } from "Helpers/helpers";
import TimeFromMoment from "Components/TimeFromMoment";
import InviteParticipantModal from "./InviteParticipant";
import DialogComponent from "Components/dialog/DialogComponent";
import InitDealModal from 'Routes/custom/fundings/components/InitDealModal';
import DealDetailsModal from 'Routes/custom/fundings/components/DealDetailsModal';

class CodevParticipants extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        deals: [],
        deal: null,
        member: null,
        activeTab: 0,
        participants: [],
        showInitDeal: false,
        showDealDetails: false,
        showSearchMember: false,
        showInviteMemberModal: false
    }

    componentDidMount() {
        this.getParticipants();
        if(this.props.type == 'DEALS') {
            this.getDeals();
        }
    }

    getDeals = () => {
        this.props.setRequestGlobalAction(true),
        FundingService.getDeals({received: true, referral_code: this.props.referralCode, entity_reference: this.props.codevLine})
        .then(response => this.setState({ deals: response }))
        .catch(() => this.setState({ deals: [] }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    inviteSubscriber = (member) => {
        this.props.setRequestGlobalAction(true);
        ProductService.inviteCodevSubscriber({referral_code: member.referralCode, line_reference: this.props.codevLine})
        .then(() => {
            this.props.onClose();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue");
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    getParticipants = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getParticipantsByOrderRef({reference: this.props.codevLine})
        .then(response => this.setState({participants: response}))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    handleChange = (__, value) => {
        this.setState({ activeTab: value });
    };

    render() {

        const { onClose, show, type, isPrivate } = this.props;
        const { showInviteMemberModal, participants, showInitDeal, member, activeTab, deals, deal, showDealDetails } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        Souscriptions
                    </h3>
                )}
            >
                <AppBar position="static" color="default">
                    <div className="d-flex align-items-center">
                        <Tabs
                            value={activeTab}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            variant="scrollable"
                            textColor="primary"
                        >
                            <Tab label="Participants" />
                            { type == 'DEALS' && (
                                <Tab label="Deals" />
                            )}
                            { type == 'SPOTS' && (
                                <Tab label="Spots" />
                            )}
                            { type == 'INDIVISION' && (
                                <Tab label="Indivisions" />
                            )}
                        </Tabs>
                    </div>
                </AppBar>
                <SwipeableViews
                    index={this.state.activeTab}
                >
                    <div className="card mb-0 transaction-box">
                        <TabContainer>
                            <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                <CustomList
                                    loading={false}
                                    list={participants}
                                    addingButton={!isPrivate}
                                    itemsFoundText={n => `${n} type.s trouvé.s`}
                                    onAddClick={() => this.setState({ showInviteMemberModal: true })}
                                    renderItem={list => (
                                        <>
                                            {list && list.length === 0 ? (
                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                    <h4>
                                                        Aucun participant.s trouvé.s
                                                    </h4>
                                                </div>
                                            ) : (
                                                <div className="table-responsive">
                                                    <table className="table table-hover table-middle mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="fw-bold">Noms & prénoms</th>
                                                                <th className="fw-bold">Date de souscriptions</th>
                                                                <th className="fw-bold">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {list && list.map((item, key) => (
                                                                <tr key={key} className="cursor-pointer">
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold text-dark">{item.alias}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 text-dark"><TimeFromMoment time={item.createdAt} showFullDate /></h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="media">
                                                                        <div className="user-status-pending d-flex flex-row align-items-center" style={{ position: 'relative' }}>
                                                                            <div className={`user-status-pending-circle rct-notify mr-10`} style={{
                                                                                    background: item?.status == 'APPROVED' ? 'green' : item?.status == 'PENDING' ? 'orange' : 'red'
                                                                            }} />
                                                                            {item?.status == 'APPROVED' ? 'Validé' : item?.status == 'PENDING' ? 'En attente' : 'Rejeté'}
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
                            </div>
                        </TabContainer>
                    </div>
                    { type == 'DEALS' && (
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <CustomList
                                        list={deals}
                                        loading={false}
                                        itemsFoundText={n => `${n} deals trouvés`}
                                        onAddClick={() => this.setState({ showInitDeal: true })}
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
                                                                    <th className="fw-bold">Bénéficiaire</th>
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
                                                                                    <p className="m-0 text-dark">{item?.offer?.label}</p>
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
                                </div>
                            </TabContainer>
                        </div>
                    )}
                    { type == 'SPOTS' && (
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                </div>
                            </TabContainer>
                        </div>
                    )}
                    { type == 'INDIVISION' && (
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                </div>
                            </TabContainer>
                        </div>
                    )}
                </SwipeableViews>

                {showInitDeal && (
                    <InitDealModal 
                        show={showInitDeal}
                        onClose={() => {
                            this.setState({ showSearchMember: false, member: null, showInitDeal: false });
                            this.getDeals();
                        }}
                        dealType='NDJANGUI'
                        subscriber={member}
                        lineReference={this.props.codevLine}
                    />
                )}

                {showInviteMemberModal && (
                    <InviteParticipantModal
                        show={showInviteMemberModal}
                        referralCode={this.props.referralCode}
                        onClose={() => {
                            this.setState({ showInviteMemberModal: false });
                            this.getParticipants();
                        }}
                        lineReference={this.props.codevLine}
                    />
                )}

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
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevParticipants));