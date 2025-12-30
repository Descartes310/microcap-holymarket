import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import CreateFileModelItem from './createModelItem';
import ConfirmBox from "Components/dialog/ConfirmBox";
import { NotificationManager } from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [files, setFiles] = useState([]);
    const [modelItem, setModelItem] = useState(null);
    const [showCreateBox, setShowCreateBox] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getFileModelItems();
    }, []);

    const getFileModelItems = () => {
        props.setRequestGlobalAction(true),
        SettingService.getFileItems(props.match.params.id)
        .then(response => setFiles(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const deleteItem = () => {
        props.setRequestGlobalAction(true),
        SettingService.deleteFileItem(modelItem.reference)
        .then(() => {
            setShowConfirmBox(false);
            setModelItem(null)
            NotificationManager.success("La suppression a été effectuée avec succès");
            getFileModelItems();
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard")
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des données"}
            />
            <CustomList
                loading={false}
                list={files}
                itemsFoundText={n => `${n} donnée.s trouvée.s`}
                onAddClick={() => {
                    setShowCreateBox(true);
                }}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun donnée.s trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Edite la donée</th>
                                            <th className="fw-bold">Type</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.userDataItem.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.updateAssociatedInput ? 'Oui' : 'Non'}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.userDataItem.type}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold ml-10"
                                                        onClick={() => {
                                                            setModelItem(item);
                                                            setShowConfirmBox(true);
                                                        }}
                                                    >
                                                        Supprimer
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
                <CreateFileModelItem
                    show={showCreateBox}
                    reference={props.match.params.id}
                    onClose={() => {
                        setShowCreateBox(false);
                        setModelItem(null);
                        getFileModelItems();
                    }}
                    item={modelItem}
                />
            )}
            { modelItem && showConfirmBox && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => deleteItem()}
                    leftButtonOnClick={() => {
                        setModelItem(null);
                        setShowConfirmBox(false);
                    }}
                    message={'Etes vous sure de vouloir supprimer cette donnée ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));