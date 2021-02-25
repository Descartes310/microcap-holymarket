import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import { getUsers, getOrganisationTypes } from "Actions";
import { NotificationManager } from "react-notifications";
import { injectIntl } from 'react-intl';
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { getUser } from "Actions/independentActions";
import CountryManager from 'Helpers/CountryManager';
import { getUserProfiles } from "Actions/GeneralActions";
import { getAllNetworkProfile } from "Actions/NetworkProfileActions";

const UserShowProfile = props => {

    const [user, setUser] = useState({});

    const [userType, setUserType] = useState({
        loading: true,
        data: null
    });

    const [organisationTypes, setOrganisationTypes] = useState({
        loading: true,
        data: null
    });

    useEffect(() => {
        _getOrganisationType();
    }, []);

    const _getOrganisationType = () => {
        return new Promise((resolve, reject) => {
            setOrganisationTypes({ loading: true, data: null });
            getOrganisationTypes()
                .then(result => {
                    setOrganisationTypes({ loading: false, data: result });
                    resolve();
                    console.log("Grace result", result);
                })
                .catch(error => {
                    setOrganisationTypes({ loading: false, data: null });
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
    };

    useEffect(() => {
        getUser(parseInt(this.props.match.params.id)).then(data => {
            setUser(data);
        });
    }, []);

    return (
        <>
            <div className={"center-holder"}>
                {user.user.userType === "ORGANISATION" ?
                    (
                        <div className="row align-items-flex-end">
                            <div className="col-md-3 user-profile-item">
                                <h3> Nom commercial : </h3>
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{user.commercialName}</span>
                            </div>

                            <div className="col-md-3 user-profile-item">
                                <h3> Nom de l'organisattion : </h3>
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{user.corporateName}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row align-items-flex-end">
                            <div className="col-md-3 user-profile-item">
                                <h3>Nom : </h3>
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{user.firstName}</span>
                            </div>

                            <div className="col-md-3 user-profile-item">
                                <h3> Prénom :  </h3>
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{user.lastName}</span>
                            </div>
                        </div>
                    )}

                <div className="row align-items-flex-end">
                    <div className="col-md-3 user-profile-item">
                        <h3>Email :</h3>
                    </div>
                    <div className="col-md-9 user-profile-item-value">
                        <span>{user.user.email}</span>
                    </div>
                </div>

                <div className="row align-items-flex-end">
                    <div className="col-md-3 user-profile-item">
                        <h3>Numéro d'utilisateur :</h3>
                    </div>
                    <div className="col-md-9 user-profile-item-value">
                        <span>{user.user.reference}</span>
                    </div>
                </div>

                {
                    user.user.membershipNumber ?
                        <div className="row align-items-flex-end">
                            <div className="col-md-3 user-profile-item">
                                <h3>Numéro d'adhésion :</h3>
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{user.user.membershipNumber}</span>
                            </div>
                        </div> : null}


                {user.user.userType === "ORGANISATION" ?
                    (
                        <div className="row align-items-flex-end">
                            <div className="col-md-3 user-profile-item">
                                <h3>Type d'organisation : </h3>
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{user.legalForm}</span>
                            </div>
                        </div>

                    ) : (


                        <div className="row align-items-flex-end">
                            <div className="col-md-3 user-profile-item">
                                <h3>Numéro de téléphone :</h3>
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{user.user.phone}</span>
                            </div>
                        </div>
                    )}
            </div>
        </>
    );

}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, userProfile }) => {
    return { loading: requestGlobalLoader, authUser: authUser.data, userProfiles: userProfile }
};

export default withRouter(connect(mapStateToProps, { getUserProfiles, getAllNetworkProfile, getUsers, setRequestGlobalAction })(injectIntl(UserShowProfile)));
