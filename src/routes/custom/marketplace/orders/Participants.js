import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import ProductService from "Services/products";
import { setRequestGlobalAction } from 'Actions';
import SearchMember from "Components/SearchMember";
import TimeFromMoment from "Components/TimeFromMoment";
import DialogComponent from "Components/dialog/DialogComponent";

class CodevParticipants extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        participants: [],
        showSearchMember: false
    }

    componentDidMount() {
        this.getParticipants();
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

    render() {

        const { onClose, show } = this.props;
        const { showSearchMember, participants } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Liste des participants
                    </h3>
                )}
            >
                <CustomList
                    loading={false}
                    list={participants}
                    itemsFoundText={n => `${n} type.s trouvé.s`}
                    onAddClick={() => this.setState({ showSearchMember: true })}
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
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />

                <SearchMember
                    show={showSearchMember}
                    submit={(member) => {
                        this.inviteSubscriber(member);
                        this.setState({ showSearchMember: false });
                    }}
                    onClose={() => this.setState({ showSearchMember: false })}
                />
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevParticipants));