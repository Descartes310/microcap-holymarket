import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import ProductService from "Services/products";
import { setRequestGlobalAction } from 'Actions';
import SearchMember from "Components/SearchMember";
import DialogComponent from "Components/dialog/DialogComponent";

class CodevParticipants extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        showSearchMember: false
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

    render() {

        const { showSearchMember } = this.state;
        const { onClose, show, participants } = this.props;

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
                                                <th className="fw-bold">Adresse email</th>
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
                                                                <h4 className="m-0 text-dark">{item.email}</h4>
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