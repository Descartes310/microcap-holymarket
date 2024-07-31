import QRCode from "react-qr-code";
import { connect } from 'react-redux';
import UserService from "Services/users";
import BankService from "Services/banks";
import { Button } from "@material-ui/core";
import TerritoryType from "Enums/Territories";
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import TerritoryService from "Services/territories";
import CreateFileModal from '../components/CreateFile';
import { getFilePath, getReferralTypeLabel } from "Helpers/helpers";

const Card = (props) => {

    const [user, setUser] = useState(null);
    const [files, setFiles] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [showCreateFile, setShowCreateFile] = useState(false);

    useEffect(() => {
        getMineSubscriptions();
        getUser();
        _getCountries();
        _getUserFiles();
        const hrefParam = new URLSearchParams(props.location.search).get("href");
        if(hrefParam) {
            window.location.href = `#${hrefParam}`;
        }
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

    const _getUserFiles = () => {
        UserService.getMyFiles()
        .then(files => {
            setFiles(files);
        })
        .catch((error) => {
            setFiles([]);
        });
    };

    const getMineSubscriptions = () => {
        props.setRequestGlobalAction(true);
        BankService.getMineSubscriptions().then((response: any) => {
            setSubscriptions(response);
        }).catch(() => {
            setSubscriptions([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const getUser = () => {
        props.setRequestGlobalAction(true);
        UserService.kyc().then((response: any) => {
            setUser(response);
        }).catch(() => {
            setSubscriptions([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
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

            <h1 style={{ marginTop: '5%' }}>Informations bancaires</h1>

            <div className="table-responsive mt-30">
                <table className="table table-bordered table-middle mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">QR code</th>
                            <th className="fw-bold">Titre</th>
                            <th className="fw-bold">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        { subscriptions.map(subscription => (
                            <>
                                <tr className="cursor-pointer">
                                    <td rowSpan={2} className="text-center">
                                        <QRCode size={200} value={JSON.stringify({iban: subscription.reference.split("_").pop(), fullname: props.authUser.userName})} />
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">
                                                    Proprietaire du compte
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">
                                                    {props.authUser.userName}
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">
                                                    IBAN du compte
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">
                                                    {subscription.iban}
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* {
                subscriptions.map(subscription => (
                    <div className="mt-30">
                        <QRCode value={JSON.stringify({iban: subscription.reference.split("_").pop(), fullname: props.userName})} />
                        <div>
                            
                        </div>
                    </div>
                ))
            } */}

            <h1 style={{ marginTop: '5%' }} id="folder">Dossier utilisateur</h1>

            <div className="table-responsive mt-30">
                <table className="table table-bordered table-middle mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">Titre</th>
                            <th className="fw-bold">Cible</th>
                            <th className="fw-bold">Spéciment</th>
                            <th className="fw-bold">Mon document</th>
                            <th className="fw-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { files.map(file => (
                            <tr>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 fw-bold text-dark">
                                                {file.label}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className="m-0 text-dark">{getReferralTypeLabel(file.referralType)}</h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            { file.sample && (
                                                <span onClick={() => window.open(getFilePath(file.sample), 'blank')} className="cursor-pointer text-black">
                                                    Consulter spéciment
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            { file.value && (
                                                <span onClick={() => window.open(getFilePath(file.value), 'blank')} className="cursor-pointer text-black">
                                                    Consulter mon document
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                className="text-white font-weight-bold"
                                                onClick={() => {
                                                    setSelectedFile(file);
                                                    setShowCreateFile(true);
                                                }}
                                            >
                                                Fournir la pièce
                                            </Button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            { showCreateFile && selectedFile && (
                <CreateFileModal 
                    show={showCreateFile} 
                    onClose={() => {
                        setShowCreateFile(false);
                        _getUserFiles();
                    }}
                    file={selectedFile} 
                />
            )}
        </div>
    );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Card));
