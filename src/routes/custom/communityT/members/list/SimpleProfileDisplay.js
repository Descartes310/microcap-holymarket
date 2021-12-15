import React from 'react';
import { Button } from "reactstrap";
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { verifiedAccount } from 'Actions';
import { withRouter } from 'react-router-dom';

const SimpleProfileDisplay = props => {

    const { user } = props;

    const verifiedUser = (reference) => {
        verifiedAccount(reference).finally(() => {
            props.onClose()
        })
    }

    const isCommunityAdmin = () => {
        let adminOccurence = props.communitySpace.admins.filter(a => a.referralId === props.authUser.id && a.referralType === props.authUser.user.userType);
        return adminOccurence ? adminOccurence.length >= 1 : false;
     }

    return (
        <>
            <div className={"center-holder"}>
                {user.userType === "ORGANISATION" ?
                    (user.principalName && (
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3> Nom commercial : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.principalName}</span>
                            </div>

                            <div className="col-md-4 user-profile-item">
                                <h3> Nom de l'organisattion : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.secondaryName}</span>
                            </div>
                        </div>)
                    ) : (
                        user.principalName && (
                            <div className="row align-items-flex-end">
                                <div className="col-md-4 user-profile-item">
                                    <h3>Nom : </h3>
                                </div>
                                <div className="col-md-8 user-profile-item-value">
                                    <span>{user.principalName}</span>
                                </div>

                                <div className="col-md-4 user-profile-item">
                                    <h3> Prénom :  </h3>
                                </div>
                                <div className="col-md-8 user-profile-item-value">
                                    <span>{user.secondaryName}</span>
                                </div>
                            </div>)
                    )}

                {
                    user.email && (
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3>Email :</h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.email}</span>
                            </div>
                        </div>
                    )
                }

                {
                    user.reference && (
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3>Numéro de l'utilisateur :</h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.reference}</span>
                            </div>
                        </div>
                    )
                }

                {
                    user.membershipNumber && (
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3>Numéro d'adhésion :</h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.membershipNumber}</span>
                            </div>
                        </div>
                    )
                }


                {user.userType === "ORGANISATION" ?
                    (
                        user.legalForm && (
                            <div className="row align-items-flex-end">
                                <div className="col-md-4 user-profile-item">
                                    <h3>Type d'organisation : </h3>
                                </div>
                                <div className="col-md-8 user-profile-item-value">
                                    <span>{user.legalForm}</span>
                                </div>
                            </div>
                        )
                    ) : (
                        user.phone && (
                            <div className="row align-items-flex-end">
                                <div className="col-md-4 user-profile-item">
                                    <h3>Numéro de téléphone :</h3>
                                </div>
                                <div className="col-md-8 user-profile-item-value">
                                    <span>{user.telephone}</span>
                                </div>
                            </div>)
                    )}

                {isCommunityAdmin() && props.community.typeGroup.name == 'COMMUNAUTE_CONVENTIONNEE' && (
                    <Button
                        color="primary"
                        className="text-white mr-2 mt-30"
                        onClick={() => verifiedUser(user.reference)}
                    >
                        {!user.verified ? 'Maquer comme vérifié' : 'Marquer comme non vérifié'}
                    </Button>
                )}
            </div>
        </>
    );

}

// map state to props
const mapStateToProps = ({ authUser, communitySpace }) => {
    return {
        authUser: authUser.data,
        communitySpace
    }
};

export default withRouter(connect(mapStateToProps, {})(injectIntl(SimpleProfileDisplay)));
