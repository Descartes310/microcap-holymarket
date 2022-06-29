import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import PartnershipService from 'Services/partnerships';
import CreatePartnershipModal from '../components/createPartnership';

const List = (props) => {

    const [partners, setPartners] = useState([]);
    const [showPartnerShipModal, setShowPartnerShipModal] = useState(false);

    useEffect(() => {
        getPartnerships();
    }, []);

    const getPartnerships = () => {
        props.setRequestGlobalAction(true);
        PartnershipService.getPartnerships({ type: 'BROKER' })
        .then((response) => {
            setPartners(response);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <CustomList
                list={partners}
                loading={false}
                itemsFoundText={n => `${n} brokers trouvés`}
                onAddClick={() => setShowPartnerShipModal(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucunes brokers trouvés
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.partnershipDetails.find(pd => pd.type === 'COMMERCIAL_NAME').value}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.partnershipDetails.find(pd => pd.type === 'IMMATRICULATION_NUMBER').value}</p>
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
                <CreatePartnershipModal
                    type={'BROKER'}
                    show={showPartnerShipModal}
                    onClose={() => {
                        setShowPartnerShipModal(false);
                    }}
                    title={"Création d'un partenariat"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));