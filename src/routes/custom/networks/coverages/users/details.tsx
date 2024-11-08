import QRCode from "react-qr-code";
import { connect } from 'react-redux';
import UserService from "Services/users";
import BankService from "Services/banks";
import TerritoryType from "Enums/Territories";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import { userActionTypes } from "Helpers/helpers";
import React, { useEffect, useState } from 'react';
import TerritoryService from "Services/territories";
import UserDocuments from '../components/userFiles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AuthenticateUser from '../components/authenticateUser';
import UserDocumentsModal from '../components/userFilesModal';
import MemberDocumentsModal from '../components/memberFilesModal';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import SendContactMessage from '../components/sendContactMessage';

const UserDetails = (props) => {

    const [user, setUser] = useState(null);
    const [action, setAction] = useState(null);
    const [countries, setCountries] = useState([]);
    // const [subscriptions, setSubscriptions] = useState([]);
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [showUserFileBox, setShowUserFileBox] = useState(false);
    const [showMemberFileBox, setShowMemberFileBox] = useState(false);
    const [showAuthentificationBox, setShowAuthentificationBox] = useState(false);

    useEffect(() => {
        // getMineSubscriptions();
        getUser();
        _getCountries();
    }, []);

    const _getCountries = () => {
        TerritoryService.getTerritories(TerritoryType.COUNTRY)
        .then(countries => {
            setCountries(countries);
        })
        .catch(error => {
            setCountries([]);
        });
    };

    // const getMineSubscriptions = () => {
    //     props.setRequestGlobalAction(true);
    //     BankService.getMineSubscriptions().then((response: any) => {
    //         setSubscriptions(response);
    //     }).catch(() => {
    //         setSubscriptions([]);
    //     }).finally(() => {
    //         props.setRequestGlobalAction(false);
    //     });
    // }

    const getUser = () => {
        props.setRequestGlobalAction(true);
        UserService.userKYC(props.match.params.id).then((response: any) => {
            setUser(response);
        }).catch(() => {
            setUser(null);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const handleCallAction = () => {
        switch (action?.value) {
            case 'CONTACT':
                setShowMessageBox(true);
                break;
            case 'AUTHENTICATE':
                setShowMemberFileBox(true);
                break;
        
            default:
                break;
        }
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des utilisateurs"}
                rightComponent={
                    <div className="row align-items-center">
                        <div className="has-wrapper mr-10" style={{ width: '20em' }}>
                            <p>Liste des actions</p>
                            <Autocomplete
                                id="combo-box-demo"
                                value={action}
                                options={userActionTypes()}
                                onChange={(__, item) => {
                                    setAction(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => handleCallAction()}
                                className="text-white font-weight-bold"
                            >
                                Confirmer
                            </Button>
                        </div>
                    </div>
                }
            />
            <div style={{ padding: '3%' }}>
                <h1 className=''>Référence MicroCap</h1>
                <div className="table-responsive mt-30">
                    <table className="table table-bordered table-middle mb-0">
                        <thead>
                            <tr>
                                <th className="fw-bold">Titre</th>
                                <th className="fw-bold">Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                Numéro de référence
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                {user?.referralId}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                Numéro d'adhésion
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                {user?.membershipNumber}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <h1 style={{ marginTop: '5%' }}>Informations personnelles</h1>
                <div className="table-responsive mt-30">
                    <table className="table table-bordered table-middle mb-0">
                        <thead>
                            <tr>
                                <th className="fw-bold">Titre</th>
                                <th className="fw-bold">Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                Noms et prénoms
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                {user?.userName}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                Email
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                {user?.email}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                Adresse de notification
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                {user?.notificationAddress}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                Numéro d'identification
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                {user?.identificationNumber}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                période de validité
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                du {user?.identificationStartDate} au {user?.identificationEndDate}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="cursor-pointer">
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                Pays de résidence
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                {countries?.find(c => c.id == user?.residenceCountry)?.label}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h1 style={{ marginTop: '5%' }}>Dossier utilisateur</h1>
                <UserDocuments reference={props.match.params.id} />
                
            </div>
            { user && (
                <SendContactMessage
                    user={user}
                    show={showMessageBox}
                    onClose={() => {
                        setShowMessageBox(false);
                    }}
                />
            )}
            {/* { user && showUserFileBox && (
                <UserDocumentsModal
                    user={user}
                    show={showUserFileBox}
                    reference={props.match.params.id}
                    onClose={() => {
                        setShowUserFileBox(false);
                    }}
                    onValidate={() => {
                        setShowUserFileBox(false);
                        setShowMemberFileBox(true);
                    }}
                />
            )} */}
            { user && showMemberFileBox && (
                <MemberDocumentsModal
                    user={user}
                    show={showMemberFileBox}
                    reference={props.match.params.id}
                    onClose={() => {
                        setShowMemberFileBox(false);
                    }}
                    onValidate={() => {
                        setShowMemberFileBox(false);
                        setShowAuthentificationBox(true);
                    }}
                />
            )}
            { user && showAuthentificationBox && (
                <AuthenticateUser
                    user={user}
                    show={showAuthentificationBox}
                    onClose={(reload = false) => {
                        setShowAuthentificationBox(false);
                        if(reload) getUser();
                    }}
                />
            )}
        </>
    );
}

// map state to props
const mapStateToProps = ({}) => {
    return {}
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(UserDetails));
