import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TerritoryService from 'Services/territories';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import CreateCTOPartnershipModal from './createCTOPartnership';
import PartnershipService from 'Services/partnerships';

const List = (props) => {

    const [territories, setTerritories] = useState([]);
    const [showPartnerShipModal, setShowPartnerShipModal] = useState(false);

    useEffect(() => {
        getTerritories();
    }, []);

    const getTerritories = () => {
        props.setRequestGlobalAction(true);
        TerritoryService.getTerritoryChild({})
        .then(response => {
            setTerritories(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Centre de traitement"}
            />
            <CustomList
                list={[]}
                loading={false}
                itemsFoundText={n => `${n} opérateurs trouvées`}
                onAddClick={() => setShowPartnerShipModal(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucunes opérateurs trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Immatriculation</th>
                                            <th className="fw-bold">Contrat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.partnershipDetails.find(pd => pd.type === 'COMMERCIAL_NAME')?.value}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.partnershipDetails.find(pd => pd.type === 'IMMATRICULATION_NUMBER')?.value}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.contract}</p>
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
            { showPartnerShipModal && (
                <CreateCTOPartnershipModal
                    type={'CTO'}
                    show={showPartnerShipModal}
                    onClose={() => {
                        setShowPartnerShipModal(false);
                    }}
                    title={"Affectation CTO MCM"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));