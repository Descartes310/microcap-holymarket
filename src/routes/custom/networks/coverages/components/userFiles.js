import { connect } from 'react-redux';
import UserService from 'Services/users';
import { Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { getFilePath } from "Helpers/helpers";
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import CreateFileModal from 'Routes/custom/profiles/users/components/CreateFile';
import TranscriptionBox from 'Routes/custom/profiles/users/components/TranscriptFile';

const UserDocuments = (props) => {

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showCreateFile, setShowCreateFile] = useState(false);
    const [showTranscriptionBox, setShowTranscriptionBox] = useState(false);

    useEffect(() => {
        getUserFiles();
    }, []);

    const getUserFiles = () => {
        props.setRequestGlobalAction(true);
        UserService.getMyFilesByMember(props.reference, props.filters).then((response) => {
            setFiles(response);
        }).catch(() => {
            setFiles([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const changeStatus = (file) => {
        props.setRequestGlobalAction(true),
        UserService.validateFile(file.reference)
        .then(() => {
            getUserFiles();
            setSelectedFile(null);
            NotificationManager.success("La pièce a été vérifiée");
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue");
        })
        .finally(() => {
            setShowConfirmBox(false);
            props.setRequestGlobalAction(false)
        })
    }
    
    return (
        <div>
            <div className="table-responsive mt-30">
                <table className="table table-bordered table-middle mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">Titre</th>
                            <th className="fw-bold">Spéciment</th>
                            <th className="fw-bold">Document</th>
                            <th className="fw-bold">Status</th>
                            <th className="fw-bold">Vérifier</th>
                            <th className="fw-bold">Verser</th>
                            <th className="fw-bold">Transcrire</th>
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
                                    <Switch
                                        aria-label="Vérifié"
                                        checked={file.status}
                                        onChange={() => { setSelectedFile(file); setShowConfirmBox(true) }}
                                    />
                                </td>
                                <td>
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
                                </td>
                                <td>
                                    { file.value && (
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            className="text-white font-weight-bold ml-10"
                                            onClick={() => {
                                                setSelectedFile(file);
                                                setShowTranscriptionBox(true);
                                            }}
                                        >
                                            Transcrire
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    { showConfirmBox && selectedFile && (
                        <ConfirmBox
                            show={showConfirmBox}
                            rightButtonOnClick={() => changeStatus(selectedFile)}
                            leftButtonOnClick={() => {
                                setShowConfirmBox(false);
                                setSelectedFile(null);
                            }}
                            message={'Etes vous sure de vérifier cette pièce ?'}
                        />
                    )}
                    { showTranscriptionBox && selectedFile && (
                        <TranscriptionBox 
                            show={showTranscriptionBox} 
                            onClose={() => {
                                setShowTranscriptionBox(false);
                                setSelectedFile(null);
                                getUserFiles();
                            }}
                            file={selectedFile} 
                        />
                    )}
                    { showCreateFile && selectedFile && (
                        <CreateFileModal 
                            show={showCreateFile}
                            referralCode={props.reference}
                            onClose={() => {
                                setShowCreateFile(false);
                                getUserFiles();
                            }}
                            file={selectedFile} 
                        />
                    )}
                </table>
            </div>
        </div>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(UserDocuments));