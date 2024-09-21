import { connect } from 'react-redux';
import BankService from 'Services/banks';
import CreateInjectionModal from './create';
import Button from '@material-ui/core/Button';
import { getFilePath } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ActivateInjectionModal from './activate';
import React, { useState, useEffect } from 'react';
import InjectionDocuments from './injectionDocument';
import TimeFromMoment from "Components/TimeFromMoment";

const List = (props) => {

    const [injections, setInjections] = useState([]);
    const [selectedInjection, setSelectedInjection] = useState(null);
    const [showInjectionCreateBox, setShowInjectionCreateBox] = useState(false);
    const [showInjectionActivateBox, setShowInjectionActivateBox] = useState(false);
    const [showInjectionDocumentBox, setShowInjectionDocumentBox] = useState(false);

    useEffect(() => {
        getInjections();
    }, []);

    const getInjections = () => {
        props.setRequestGlobalAction(true),
        BankService.getInjections()
        .then(response => setInjections(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        setShowInjectionCreateBox(true);
    }

    return (
        <>
            <CustomList
                loading={false}
                list={injections}
                itemsFoundText={n => `${n} injections trouvées`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune injection trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Numéro de série</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Justificatif</th>
                                            <th className="fw-bold">Date d'injection</th>
                                            <th className="fw-bold">Provisionner</th>
                                            <th className="fw-bold">Documents</th>
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
                                                            <p className="m-0 text-dark">{item.amount} {item.currency}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            {item.proof ? <p className="m-0 text-dark" onClick={() =>  window.open(getFilePath(item.proof), "_blank")}>Voir le justificatif</p> : <p>-</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark"><TimeFromMoment time={item.createdAt} format='LLL' /></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    { item.status == 'APPROVED' && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setSelectedInjection(item);
                                                                setShowInjectionActivateBox(true);
                                                            }}
                                                            className="text-white font-weight-bold"
                                                        >
                                                            Positionner
                                                        </Button>
                                                    )}
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setSelectedInjection(item);
                                                            setShowInjectionDocumentBox(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Documents
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
            { showInjectionCreateBox && (
                <CreateInjectionModal
                    show={showInjectionCreateBox}
                    onClose={() => {
                        setShowInjectionCreateBox(false);
                        getInjections();
                    }}
                    title={"Création d'un nouvelle injection"}
                />
            )}

            { showInjectionDocumentBox && selectedInjection && (
                <InjectionDocuments
                    show={showInjectionDocumentBox}
                    onClose={() => {
                        setShowInjectionDocumentBox(false);
                    }}
                    injection={selectedInjection}
                    title={"Arguments de l'injection"}
                />
            )}

            { showInjectionActivateBox && selectedInjection && (
                <ActivateInjectionModal
                    show={showInjectionActivateBox}
                    onClose={() => {
                        setShowInjectionActivateBox(false);
                        getInjections();
                    }}
                    injection={selectedInjection}
                    title={"Positionner l'injection"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
