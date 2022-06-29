import { connect } from 'react-redux';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import CreatePrestationCoverageModal from 'Components/createPrestationCoverage';


const List = (props) => {

    const [prestation, setPrestation] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [showCreateCoverageBox, setShowCreateCoverageBox] = useState(false);

    useEffect(() => {
        getPrestations();
    }, []);

    const getPrestations = () => {
        props.setRequestGlobalAction(true),
        BankService.getPrestations()
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                loading={false}
                list={prestations}
                itemsFoundText={n => `${n} prestations trouvées`}
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
                                                            setShowCreateCoverageBox(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Ajouter une couverture
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

            { showCreateCoverageBox && prestation && (
                <CreatePrestationCoverageModal
                    prestation={prestation}
                    show={showCreateCoverageBox}
                    onClose={() => {
                        setShowCreateCoverageBox(false);
                        setPrestation(null);
                    }}
                    title={"Ajouter une couverture"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
