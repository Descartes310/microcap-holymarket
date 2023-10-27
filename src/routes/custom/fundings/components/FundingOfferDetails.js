import { connect } from 'react-redux';
import React, { Component } from 'react';
import FundingService from 'Services/funding';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { getPriceWithCurrency } from 'Helpers/helpers';
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

class FundingOfferDetails extends Component {

    state = {
        offer: null
    }

    constructor(props) {
        super(props);
        this.findOffer();
    }

    findOffer = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.findFundingOffer(this.props.reference)
        .then(response => {
            this.setState({offer: response});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show, authUser } = this.props;
        const { offer } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Détails de l'offre
                    </h3>
                )}
            >
                <RctCardContent>
                    <div className="table-responsive">
                        <table className="table table-hover table-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="fw-bold">Détails</th>
                                    <th className="fw-bold">Valeur</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Reference</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{offer?.reference}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Montant</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{getPriceWithCurrency(offer?.amount, offer?.currency)}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor-pointer">
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Type</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 text-dark">{offer?.negociable ? 'Offre négociable' : 'Offre ferme'}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                { offer?.dedicatedReferralCode && (
                                    <tr className="cursor-pointer">
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">Ref. bénéficiaire</h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 text-dark">{offer?.dedicatedReferralCode}</h4>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(FundingOfferDetails));