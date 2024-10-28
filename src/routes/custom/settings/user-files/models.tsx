import { connect } from 'react-redux';
import CreateFileModel from './createModel';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import { NotificationManager } from "react-notifications";
import { joinUrlWithParamsId, SETTING } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [files, setFiles] = useState([]);
    const [model, setModel] = useState(null);
    const [showCreateBox, setShowCreateBox] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getFileModels();
    }, []);

    const getFileModels = () => {
        props.setRequestGlobalAction(true),
        SettingService.getFileModels(props.match.params.id)
        .then(response => setFiles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const deleteItem = () => {
        props.setRequestGlobalAction(true),
        SettingService.deleteFileModel(model.reference)
        .then(() => {
            setShowConfirmBox(false);
            setModel(null)
            NotificationManager.success("La suppression a été effectuée avec succès");
            getFileModels();
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard")
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des modèles"}
            />
            <CustomList
                loading={false}
                list={files}
                itemsFoundText={n => `${n} modèle.s trouvée.s`}
                onAddClick={() => {
                    setShowCreateBox(true)
                }}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun modèle.s trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Description</th>
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
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            setModel(item);
                                                            setShowCreateBox(true);
                                                        }}
                                                    >
                                                        Editer
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold ml-10"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(SETTING.USER_FILE.MODEL_ITEMS, item.reference))}
                                                    >
                                                        Données
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

            {showCreateBox && (
                <CreateFileModel
                    show={showCreateBox}
                    reference={props.match.params.id}
                    onClose={() => {
                        setShowCreateBox(false);
                        setModel(null);
                        getFileModels();
                    }}
                    model={model}
                />
            )}
            { model && showConfirmBox && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => deleteItem()}
                    leftButtonOnClick={() => {
                        setModel(null);
                        setShowConfirmBox(false);
                    }}
                    message={'Etes vous sure de vouloir supprimer ce modèle ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));