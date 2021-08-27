import React from 'react';
import { Button } from "reactstrap";
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { verifiedAccount } from 'Actions';
import { withRouter } from 'react-router-dom';

const SimpleProfileDisplay = props => {

    const { user, community } = props;
    
    const verifiedUser = (id) => {
        verifiedAccount(id).finally(() => {
            props.onClose()
        })
    }

    return (
        <>
            <div className={"center-holder"}>
                {user.user.userType === "ORGANISATION" ?
                    (user.commercialName ? (
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3> Nom commercial : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.commercialName}</span>
                            </div>

                            <div className="col-md-4 user-profile-item">
                                <h3> Nom de l'organisattion : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.corporateName}</span>
                            </div>
                        </div>) : null
                    ) : (
                        user.firstName ? (
                            <div className="row align-items-flex-end">
                                <div className="col-md-4 user-profile-item">
                                    <h3>Nom : </h3>
                                </div>
                                <div className="col-md-8 user-profile-item-value">
                                    <span>{user.firstName}</span>
                                </div>

                                <div className="col-md-4 user-profile-item">
                                    <h3> Prénom :  </h3>
                                </div>
                                <div className="col-md-8 user-profile-item-value">
                                    <span>{user.lastName}</span>
                                </div>
                            </div>) : null
                    )}

                {user.user.email ?
                    (<div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3>Email :</h3>
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>{user.user.email}</span>
                        </div>
                    </div>) : null}

                {user.user.reference ? (<div className="row align-items-flex-end">
                    <div className="col-md-4 user-profile-item">
                        <h3>Numéro de l'utilisateur :</h3>
                    </div>
                    <div className="col-md-8 user-profile-item-value">
                        <span>{user.user.reference}</span>
                    </div>
                </div>) : null}

                {
                    user.user.membershipNumber ?
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3>Numéro d'adhésion :</h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.user.membershipNumber}</span>
                            </div>
                        </div> : null}


                {user.user.userType === "ORGANISATION" ?
                    (
                        user.legalForm ? (<div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3>Type d'organisation : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{user.legalForm}</span>
                            </div>
                        </div>) : null

                    ) : (

                        user.user.phone ? (
                            <div className="row align-items-flex-end">
                                <div className="col-md-4 user-profile-item">
                                    <h3>Numéro de téléphone :</h3>
                                </div>
                                <div className="col-md-8 user-profile-item-value">
                                    <span>{user.user.phone}</span>
                                </div>
                            </div>) : null
                    )}

                {props.community.admins.includes(props.authUser.user.id) && (
                    <Button
                        color="primary"
                        className="text-white mr-2 mt-30"
                        onClick={() => verifiedUser(user.user.reference)}
                    >
                        { !user.user.verified ? 'Maquer comme vérifié' : 'Marquer comme non vérifié' }
                    </Button>
                )}
            </div>
        </>
    );

}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default withRouter(connect(mapStateToProps, {})(injectIntl(SimpleProfileDisplay)));
