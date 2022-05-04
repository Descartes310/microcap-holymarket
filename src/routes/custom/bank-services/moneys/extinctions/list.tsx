import { connect } from 'react-redux';
import BankService from 'Services/banks';
import CreateExtinctionModal from './create';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";

const List = (props) => {

    const [extinctions, setExtinctions] = useState([]);
    const [showExtinctionCreateBox, setShowExtinctionCreateBox] = useState(false);

    useEffect(() => {
        getExtinctions();
    }, []);

    const getExtinctions = () => {
        props.setRequestGlobalAction(true),
        BankService.getExtinctions()
        .then(response => setExtinctions(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        setShowExtinctionCreateBox(true);
    }

    return (
        <>
            <CustomList
                loading={false}
                list={extinctions}
                itemsFoundText={n => `${n} extinctions trouvées`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune extinction trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Numéro de série</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Date d'injection</th>
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
                                                            <p className="m-0 text-dark">{item.amount} $</p>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            />
            { showExtinctionCreateBox && (
                <CreateExtinctionModal
                    show={showExtinctionCreateBox}
                    onClose={() => {
                        setShowExtinctionCreateBox(false);
                        getExtinctions();
                    }}
                    title={"Création d'un nouvelle extinctions"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

