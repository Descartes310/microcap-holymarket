import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import Switch from "@material-ui/core/Switch";
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { joinUrlWithParamsId, SETTING } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getFilePath, getReferralTypeLabel } from 'Helpers/helpers';

const List = (props) => {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        getUserFiles();
    }, []);

    const getUserFiles = () => {
        props.setRequestGlobalAction(true),
        SettingService.getAllUserFileTypes()
        .then(response => setFiles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeStatus = (item) => {
        props.setRequestGlobalAction(true),
        SettingService.updateUserFileTypes(item.reference)
        .then(() => getUserFiles())
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeRequired = (item) => {
        props.setRequestGlobalAction(true),
        SettingService.requiredUserFileTypes(item.reference)
        .then(() => getUserFiles())
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(SETTING.USER_FILE.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des dossiers utilisateurs"}
            />
            <CustomList
                loading={false}
                list={files}
                itemsFoundText={n => `${n} dossier.s trouvée.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun dossier.s trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Code</th>
                                            <th className="fw-bold">Cible</th>
                                            <th className="fw-bold">Exemple</th>
                                            <th className="fw-bold">Dossier membre</th>
                                            <th className="fw-bold">Dossier obligatoire</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.code}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{getReferralTypeLabel(item.referralType)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            { item.sample && (
                                                                <span onClick={() => window.open(getFilePath(item.sample), 'blank')}>
                                                                    Consulter l'exemple
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Dossier membre"
                                                        checked={item.type === 'MEMBER'}
                                                        onChange={() => { changeStatus(item) }}
                                                    />
                                                </td>
                                                <td>
                                                    <Switch
                                                        checked={item.required}
                                                        aria-label="Dossier obligatoire"
                                                        onChange={() => { changeRequired(item) }}
                                                    />
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(SETTING.USER_FILE.UPDATE, item.reference))}
                                                    >
                                                        Editer
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold ml-10"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(SETTING.USER_FILE.MODELS, item.reference))}
                                                    >
                                                        Transcriptions
                                                    </Button>
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
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));