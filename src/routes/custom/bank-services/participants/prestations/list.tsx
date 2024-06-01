import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import CreatePrestationEffectModal from 'Components/createPrestationEffect';
import CreatePrestationDetailsModal from 'Components/createPrestationDetails';


const List = (props) => {

    const [prestation, setPrestation] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [showCreateEffectBox, setShowCreateEffectBox] = useState(false);
    const [showCreateDetailsBox, setShowCreateDetailsBox] = useState(false);

    useEffect(() => {
        getPrestations();
    }, []);

    const getPrestations = () => {
        props.setRequestGlobalAction(true),
        BankService.getPrestations()
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(BANK.ADMIN.PRESTATION.CREATE);
    }

    return (
        <>
            <CustomList
                loading={false}
                list={prestations}
                itemsFoundText={n => `${n} prestations trouvées`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun prestations trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Effet</th>
                                            <th className="fw-bold">Détails</th>
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
                                                            <p className="m-0 text-dark">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setPrestation(item);
                                                            setShowCreateEffectBox(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Ajouter un effet
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setPrestation(item);
                                                            setShowCreateDetailsBox(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Ajouter un détails
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

            { showCreateEffectBox && prestation && (
                <CreatePrestationEffectModal
                    prestation={prestation}
                    show={showCreateEffectBox}
                    onClose={() => {
                        setShowCreateEffectBox(false);
                        setPrestation(null);
                    }}
                    title={"Gérer les effets"}
                />
            )}

            { showCreateDetailsBox && prestation && (
                <CreatePrestationDetailsModal
                    prestation={prestation}
                    show={showCreateDetailsBox}
                    onClose={() => {
                        setShowCreateDetailsBox(false);
                        setPrestation(null);
                    }}
                    title={"Gérer les détails"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
