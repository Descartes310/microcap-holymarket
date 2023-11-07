import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import FundingService from 'Services/funding';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from "Components/TimeFromMoment";
import DialogComponent from "Components/dialog/DialogComponent";

class PropositionModal extends Component {

    state = {
        offer: null,
        propositions: []
    }

    constructor(props) {
        super(props);
        this.findOffer();
        this.getPropositions();
    }

    findOffer = () => {
        this.setState({ offer: null });
        this.props.setRequestGlobalAction(true);
        FundingService.findFundingOffer(this.props.reference)
        .then(response => {
            this.setState({offer: response});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getPropositions = () => {
        this.setState({ propositions: [] });
        this.props.setRequestGlobalAction(true);
        FundingService.getPropositions({reference: this.props.reference}).then(response => {
            this.setState({ propositions: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { propositions, offer } = this.state;
        const { onClose, show, authUser, onCreateProposition } = this.props;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Propositions de deal
                    </h3>
                )}
            >
                <RctCardContent>
                    <div>
                        <CustomList
                            loading={false}
                            list={propositions}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucune proposition trouvée
                                            </h4>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="fw-bold">Souscripteur</th>
                                                        <th className="fw-bold">Date de proposition</th>
                                                        <th className="fw-bold">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list && list.map((item, key) => (
                                                        <tr key={key} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.userName}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">
                                                                            <TimeFromMoment time={item.createdAt} showFullDate />
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    color="primary"
                                                                    variant="contained"
                                                                    className="text-white font-weight-bold"
                                                                    onClick={() => {
                                                                        this.props.showDetails(item.reference);
                                                                    }}
                                                                >
                                                                    Details
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

                        { offer?.referralCode !== authUser?.referralId && (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    onCreateProposition()
                                }}
                                className="text-white font-weight-bold w-100 mt-10"
                            >
                                Faire une proposition
                            </Button>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(PropositionModal));