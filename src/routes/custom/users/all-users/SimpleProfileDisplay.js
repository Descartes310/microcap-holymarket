import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const SimpleProfileDisplay = props => {

    const { user } = props;

    return (
        <>
            <div className={"center-holder"}>
                {user.user.userType === "ORGANISATION" ?
                    ( user.commercialName  ? (
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
                        </div> ) : null
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

                {user.reference ? (<div className="row align-items-flex-end">
                    <div className="col-md-4 user-profile-item">
                        <h3>Numéro de l'utilisateur :</h3>
                    </div>
                    <div className="col-md-8 user-profile-item-value">
                        <span>{user.reference}</span>
                    </div>
                </div>) : null }

                {
                    user.membershipNumber ?
                    <div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3>Numéro d'adhésion :</h3>
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>{user.membershipNumber}</span>
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
                        </div>) :null 

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

            </div>
        </>
    );

}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { }
};

export default withRouter(connect(mapStateToProps, {})(injectIntl(SimpleProfileDisplay)));
