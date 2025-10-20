import QRCode from "react-qr-code";
import { connect } from 'react-redux';
import UserService from "Services/users";
import BankService from "Services/banks";
import Button from '@material-ui/core/Button';
import TerritoryType from "Enums/Territories";
import { withRouter } from "react-router-dom";
import { getFilePath } from "Helpers/helpers";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import TerritoryService from "Services/territories";
import ConfirmBox from "Components/dialog/ConfirmBox";
import CreateFileModal from '../components/CreateFile';
import { NotificationManager } from 'react-notifications';
import TranscriptionBox from '../components/TranscriptFile';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Card = (props) => {

    const [user, setUser] = useState(null);
    const [files, setFiles] = useState([]);
    const [countries, setCountries] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [showCreateFile, setShowCreateFile] = useState(false);
    const [showConfirmAuthBox, setShowConfirmAuthBox] = useState(false);
    const [showTranscriptionBox, setShowTranscriptionBox] = useState(false);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

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

    const askForFileAuthentification = () => {
        if(!selectedFile) {
            NotificationManager.error("Veuillez bien remplir le formulaire");
            return
        }

        props.setRequestGlobalAction(true);
        UserService.askForFileAuthentification(selectedFile.reference)
        .then(() => {
            NotificationManager.success("La demande a été envoyée avec succès");
            setSelectedFile(null);
            setShowConfirmAuthBox(false);
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
        })
        .finally(() => props.setRequestGlobalAction(false))
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
                        {/* <tr className="cursor-pointer">
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
                        </tr> */}
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
            
            { subscriptions.length > 0 && (
                <>
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
                </>
            )}
            {/* {
                subscriptions.map(subscription => (
                    <div className="mt-30">
                        <QRCode value={JSON.stringify({iban: subscription.reference.split("_").pop(), fullname: props.userName})} />
                        <div>
                            
                        </div>
                    </div>
                ))
            } */}

            <div className="row justify-content-between align-items-end">
                <h1 style={{ marginTop: '5%' }} id="folder">Dossier utilisateur</h1>
                {/* <Button
                    color="primary"
                    variant="contained"
                    className="text-white font-weight-bold"
                    style={{height: 'fit-content'}}
                    onClick={() => {
                    }}
                >
                    Demander à authentificer mon compte
                </Button> */}
            </div>

            <div className="table-responsive mt-30">
                <table className="table table-bordered table-middle mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">Titre</th>
                            <th className="fw-bold">Spéciment</th>
                            <th className="fw-bold">Mon document</th>
                            <th className="fw-bold">Status</th>
                            <th className="fw-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { files.map((file, key) => (
                            <tr>
                                <td>
                                    <div className="media">
                                        <div className="media-body pt-10">
                                            <h4 className={`m-0 fw-bold ${file.required ? 'text-danger' : 'text-dark'}`}>
                                                {file.label} {file.required ? '(Obligatoire)' : '(optionnel)'}
                                            </h4>
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
                                                    Consulter le document
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="media">
                                        <div className="user-status-pending d-flex flex-row align-items-center" style={{ position: 'relative' }}>
                                            <div className={`user-status-pending-circle rct-notify mr-10`} style={{
                                                background: file.status ? 'green' : 'red'
                                            }} />
                                            {file.status ? 'Vérifié' : 'Non vérifié'}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3">
                                        <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                                            Actions
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem style={{ color: 'black' }}
                                                onClick={() => {
                                                    setSelectedFile(file);
                                                    setShowCreateFile(true);
                                                }}
                                            >
                                                Fournir la pièce
                                            </DropdownItem>
                                            <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                    setSelectedFile(file);
                                                    setShowTranscriptionBox(true);
                                                }}
                                            >
                                                Transcrire
                                            </DropdownItem>
                                            { (file.value && !file.status)&& (
                                                <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                        setSelectedFile(file);
                                                        setShowConfirmAuthBox(true);
                                                }}>
                                                    Demander l'authentification
                                                </DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                    
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
            { showTranscriptionBox && selectedFile && (
                <TranscriptionBox 
                    show={showTranscriptionBox} 
                    onClose={() => {
                        setShowTranscriptionBox(false);
                        setSelectedFile(null);
                        _getUserFiles();
                    }}
                    file={selectedFile} 
                />
            )}

            { showConfirmAuthBox && selectedFile && (
                <ConfirmBox
                    show={showConfirmAuthBox}
                    rightButtonOnClick={() => askForFileAuthentification()}
                    leftButtonOnClick={() => {
                        setShowConfirmAuthBox(false);
                        setSelectedFile(null);
                    }}
                    message={'Etes vous sure de vouloir demander l\'authentification ?'}
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
