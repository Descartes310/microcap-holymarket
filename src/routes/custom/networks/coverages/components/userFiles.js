import { connect } from 'react-redux';
import UserService from 'Services/users';
import Switch from "@material-ui/core/Switch";
import { getFilePath } from "Helpers/helpers";
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';

const UserDocuments = (props) => {

    const [files, setFiles] = useState([]);

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
        .then(() => getUserFiles())
        .finally(() => props.setRequestGlobalAction(false))
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
                            <th className="fw-bold">Vérifié</th>
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
                                                    Consulter mon document
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <Switch
                                        aria-label="Vérifié"
                                        checked={file.status}
                                        onChange={() => { changeStatus(file) }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(UserDocuments));